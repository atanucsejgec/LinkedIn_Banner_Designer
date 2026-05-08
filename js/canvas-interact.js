/* ============================================
   CANVAS-INTERACT.JS — Element selection, move,
   resize, layers, inline text edit, grid/align
   ============================================ */
"use strict";

const CI = {
  selected: null,
  handles: [],
  handlesContainer: null,
  gridOverlay: null,
  guideElements: [],
  dimTip: null,
  posTip: null,
  dragging: false,
  resizing: false,
  resizeDir: '',
  startX: 0, startY: 0,
  startLeft: 0, startTop: 0,
  startW: 0, startH: 0,
  shiftHeld: false,
  selectableEls: [],
  SNAP_THRESHOLD: 5,
  HANDLE_DIRS: ['nw','n','ne','e','se','s','sw','w', 'rot'],
};

/* ===== INIT ===== */
function initCanvasInteraction() {
  const canvas = document.getElementById('bannerCanvas');
  if (!canvas) return;
  cleanupInteractionUI();

  CI.selectableEls = [];
  Array.from(canvas.children).forEach((child, idx) => {
    const pos = window.getComputedStyle(child).position;
    if (pos === 'absolute' || pos === 'relative') {
      if (!child.dataset.ciIdx) child.dataset.ciIdx = idx;
      child.dataset.domIdx = idx;
      CI.selectableEls.push(child);
    }
  });

  ensureOverlayElements(canvas);
  restoreElementPositions();
  buildLayerPanel();

  if (AppState.selectedElementIdx != null) {
    const el = CI.selectableEls.find(e => +e.dataset.ciIdx === AppState.selectedElementIdx);
    if (el) selectElement(el, true);
    else deselectAll();
  }
}

/* ===== OVERLAY ELEMENTS ===== */
function ensureOverlayElements(canvas) {
  if (!CI.handlesContainer) {
    CI.handlesContainer = document.createElement('div');
    CI.handlesContainer.className = 'ci-handles-container';
  }
  if (!canvas.contains(CI.handlesContainer)) canvas.appendChild(CI.handlesContainer);
  CI.handlesContainer.innerHTML = '';
  CI.handles = [];
  CI.HANDLE_DIRS.forEach(dir => {
    const h = document.createElement('div');
    h.className = `ci-handle ci-handle-${dir}`;
    h.dataset.ciDir = dir;
    h.style.display = 'none';
    CI.handlesContainer.appendChild(h);
    CI.handles.push(h);
  });

  if (!CI.gridOverlay) {
    CI.gridOverlay = document.createElement('div');
    CI.gridOverlay.className = 'ci-grid-overlay';
  }
  if (!canvas.contains(CI.gridOverlay)) canvas.appendChild(CI.gridOverlay);
  applyGridClass();
  CI.gridOverlay.classList.toggle('active', !!AppState.gridEnabled);

  if (!CI.guideElements.length) {
    for (let i = 0; i < 6; i++) {
      const g = document.createElement('div');
      g.className = 'ci-guide ' + (i < 3 ? 'ci-guide-h' : 'ci-guide-v');
      if (i === 0 || i === 3) g.classList.add('ci-guide-center');
      g.style.display = 'none';
      CI.guideElements.push(g);
    }
  }
  CI.guideElements.forEach(g => { g.style.display = 'none'; if (!canvas.contains(g)) canvas.appendChild(g); });

  if (!CI.dimTip) { CI.dimTip = document.createElement('div'); CI.dimTip.className = 'ci-dimension-tip'; }
  if (!canvas.contains(CI.dimTip)) canvas.appendChild(CI.dimTip);
  if (!CI.posTip) { CI.posTip = document.createElement('div'); CI.posTip.className = 'ci-position-tip'; }
  if (!canvas.contains(CI.posTip)) canvas.appendChild(CI.posTip);
}

function cleanupInteractionUI() {
  document.querySelectorAll('.ci-selected').forEach(el => el.classList.remove('ci-selected'));
}

/* ===== LAYER NAME HELPER ===== */
function layerName(el, idx) {
  const style = el.getAttribute('style') || '';
  if (style.includes('inset:0') || style.includes('inset: 0')) {
    if (style.includes('gradient')) return '🎨 Background';
    if (style.includes('repeating')) return '📐 Pattern';
    return '⬛ Fill';
  }
  if (el.classList.contains('glow-blob')) return '💡 Glow';
  if (el.classList.contains('sparkle')) return '✨ Sparkle';
  if (el.classList.contains('banner-footer-bar')) return '📎 Footer';
  if (el.classList.contains('top-badge-pill')) return '🏷️ Badge';
  if (el.querySelector && el.querySelector('.phone-frame-outer')) return '📱 Phone';
  const text = (el.textContent || '').trim();
  if (text.length > 0 && text.length < 40) return '📝 ' + text.slice(0, 22);
  if (text.length >= 40) return '📝 Text Block';
  if (style.includes('height:5px') || style.includes('height: 5px')) return '➖ Top Bar';
  return '▪ Layer ' + idx;
}

/* ===== Z-INDEX VISUAL ORDER ===== */
function getVisualOrder() {
  const getZ = (el) => {
    if (el.style.zIndex) return parseInt(el.style.zIndex) || 0;
    const isSel = el.classList.contains('ci-selected');
    if (isSel) el.classList.remove('ci-selected');
    const z = parseInt(window.getComputedStyle(el).zIndex) || 0;
    if (isSel) el.classList.add('ci-selected');
    return z;
  };
  return [...CI.selectableEls].sort((a, b) => {
    const za = getZ(a);
    const zb = getZ(b);
    if (za !== zb) return za - zb;
    return (+a.dataset.domIdx) - (+b.dataset.domIdx);
  });
}

/* ===== BUILD LAYER PANEL ===== */
function buildLayerPanel() {
  const container = document.getElementById('layersList');
  if (!container) return;
  container.innerHTML = '';

  // Reverse so top-most layer is first visually
  const els = getVisualOrder().reverse();
  els.forEach((el, visualIdx) => {
    const idx = +el.dataset.ciIdx;
    const isHidden = el.style.display === 'none';
    const isSelected = CI.selected === el;
    const name = layerName(el, idx);
    const isFirst = visualIdx === 0; // topmost in visual order
    const isLast = visualIdx === els.length - 1; // bottommost in visual order

    const row = document.createElement('div');
    row.className = 'layer-row' + (isSelected ? ' layer-selected' : '') + (isHidden ? ' layer-hidden' : '');
    row.dataset.layerIdx = idx;
    row.innerHTML = `
      <button class="layer-vis-btn" title="Toggle visibility">${isHidden ? '🚫' : '👁'}</button>
      <span class="layer-name">${name}</span>
      <input type="number" class="layer-order-input" value="${visualIdx + 1}" min="1" max="${els.length}" title="Change Layer Order">
      <button class="layer-lock-btn" title="Select">${isSelected ? '🔵' : '⚪'}</button>
      <button class="layer-delete-btn" title="Delete Layer" style="background:transparent;border:none;color:#ff5252;cursor:pointer;margin-left:5px;padding:0;">🗑️</button>
    `;

    // Delete Layer Click
    row.querySelector('.layer-delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteElement(el);
    });

    // Click row to select
    row.querySelector('.layer-name').addEventListener('click', () => {
      if (!isHidden) { 
        if (CI.selected === el) deselectAll();
        else selectElement(el); 
        buildLayerPanel(); 
      }
    });
    // Toggle visibility
    row.querySelector('.layer-vis-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      el.style.display = isHidden ? '' : 'none';
      if (CI.selected === el) deselectAll();
      buildLayerPanel();
    });
    // Layer order input
    const orderInput = row.querySelector('.layer-order-input');
    orderInput.addEventListener('click', (e) => e.stopPropagation());
    orderInput.addEventListener('mousedown', (e) => e.stopPropagation());
    orderInput.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        e.preventDefault();
        orderInput.blur(); // Triggers the change event
      }
    });
    orderInput.addEventListener('change', (e) => {
      e.stopPropagation();
      let newVisualPosition = parseInt(e.target.value);
      if (isNaN(newVisualPosition)) newVisualPosition = visualIdx + 1;
      newVisualPosition = Math.max(1, Math.min(newVisualPosition, els.length));
      
      if (newVisualPosition !== visualIdx + 1) {
        moveLayerToPosition(el, newVisualPosition - 1);
      } else {
        e.target.value = visualIdx + 1;
      }
    });
    // Select button
    row.querySelector('.layer-lock-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      if (!isHidden) { 
        if (CI.selected === el) deselectAll();
        else selectElement(el); 
        buildLayerPanel(); 
      }
    });

    container.appendChild(row);
  });

  // Show element properties if something is selected
  showElementProps();
}

/* ===== MOVE LAYER TO POSITION (change z-index order) ===== */
function moveLayerToPosition(el, newVisualIdx) {
  let order = getVisualOrder().reverse(); // Top to bottom visual order
  const currentIndex = order.indexOf(el);
  if (currentIndex === -1 || currentIndex === newVisualIdx) return;
  
  // Remove el from current position
  order.splice(currentIndex, 1);
  // Insert el at new position
  order.splice(newVisualIdx, 0, el);
  
  // Re-apply z-indexes
  const bottomToTop = order.reverse();
  bottomToTop.forEach((o, i) => {
    o.style.zIndex = (i + 1);
    persistElementPosition(o);
    // Physically move in DOM to fix html2canvas preview issues with z-index
    if (o.parentNode) o.parentNode.appendChild(o);
  });
  
  // Ensure interaction overlays remain at the absolute bottom of the DOM (visually on top)
  const canvas = document.getElementById('bannerCanvas');
  if (canvas) {
    if (CI.gridOverlay) canvas.appendChild(CI.gridOverlay);
    CI.guideElements.forEach(g => canvas.appendChild(g));
    if (CI.handlesContainer) canvas.appendChild(CI.handlesContainer);
    if (CI.dimTip) canvas.appendChild(CI.dimTip);
    if (CI.posTip) canvas.appendChild(CI.posTip);
  }
  
  buildLayerPanel();
  showNotification('📑 Layer order updated');
}

function rebuildSelectableList() {
  // Deprecated: No longer changing DOM order, so CI.selectableEls remains valid
}

function showElementProps() {
  const container = document.getElementById('elementProps');
  if (!container) return;

  if (!CI.selected) {
    container.innerHTML = '<p class="help-text" style="text-align:center;opacity:0.5;">Select an element to see its properties</p>';
    return;
  }

  const el = CI.selected;
  const x = Math.round(parseFloat(el.style.left) || el.offsetLeft);
  const y = Math.round(parseFloat(el.style.top) || el.offsetTop);
  const w = Math.round(el.offsetWidth);
  const h = Math.round(el.offsetHeight);
  const s = parseFloat(el.style.scale) || 1;
  const r = parseFloat(el.style.rotate) || 0;

  container.innerHTML = `
    <div class="elem-props-grid">
      <div class="elem-prop-field">
        <label>X</label>
        <input type="number" id="epX" value="${x}" oninput="updateElementProp('left', this.value)">
        <span>px</span>
      </div>
      <div class="elem-prop-field">
        <label>Y</label>
        <input type="number" id="epY" value="${y}" oninput="updateElementProp('top', this.value)">
        <span>px</span>
      </div>
      <div class="elem-prop-field">
        <label>W</label>
        <input type="number" id="epW" value="${w}" min="10" oninput="updateElementProp('width', this.value)">
        <span>px</span>
      </div>
      <div class="elem-prop-field">
        <label>H</label>
        <input type="number" id="epH" value="${h}" min="10" oninput="updateElementProp('height', this.value)">
        <span>px</span>
      </div>
      <div class="elem-prop-field">
        <label>R</label>
        <input type="number" id="epR" value="${Math.round(r)}" oninput="updateElementProp('rotate', this.value)">
        <span>°</span>
      </div>
      <div class="elem-prop-field">
        <label>Scale</label>
        <input type="range" id="epScale" min="0.1" max="5" step="0.05" value="${s}" oninput="updateElementProp('scale', this.value)" style="width:100%">
        <span id="epScaleVal" style="width:25px; text-align:right;">${s.toFixed(2)}x</span>
      </div>
    </div>
  `;
}

function updateElementProp(prop, value) {
  if (!CI.selected) return;
  let v;
  if (prop === 'scale') {
    v = parseFloat(value);
    CI.selected.style.transformOrigin = 'top left';
    CI.selected.style.scale = v;
    const disp = document.getElementById('epScaleVal');
    if (disp) disp.textContent = v.toFixed(2) + 'x';
  } else if (prop === 'rotate') {
    v = parseFloat(value);
    CI.selected.style.rotate = v + 'deg';
  } else {
    v = parseInt(value);
    CI.selected.style[prop] = v + 'px';
  }
  if (isNaN(v)) return;
  updateHandlePositions();
  persistElementPosition(CI.selected);
}

function updateElementPropsPanelRealtime() {
  if (!CI.selected) return;
  const epX = document.getElementById('epX');
  const epY = document.getElementById('epY');
  const epW = document.getElementById('epW');
  const epH = document.getElementById('epH');
  const epR = document.getElementById('epR');
  const epScale = document.getElementById('epScale');
  const epScaleVal = document.getElementById('epScaleVal');
  const s = parseFloat(CI.selected.style.scale) || 1;
  const r = parseFloat(CI.selected.style.rotate) || 0;
  if (epX && epY && epW && epH) {
    epX.value = Math.round(parseFloat(CI.selected.style.left) || CI.selected.offsetLeft);
    epY.value = Math.round(parseFloat(CI.selected.style.top) || CI.selected.offsetTop);
    epW.value = Math.round(CI.selected.offsetWidth);
    epH.value = Math.round(CI.selected.offsetHeight);
  }
  if (epR) epR.value = Math.round(r);
  if (epScale) epScale.value = s;
  if (epScaleVal) epScaleVal.textContent = s.toFixed(2) + 'x';
}

/* ===== SELECT / DESELECT ===== */
function selectElement(el, silent) {
  if (CI.selected === el) return;
  deselectAll();
  CI.selected = el;
  AppState.selectedElementIdx = +el.dataset.ciIdx;
  el.classList.add('ci-selected');
  updateHandlePositions();
  CI.handles.forEach(h => h.style.display = 'block');
  document.querySelectorAll('.ci-align-btn').forEach(b => b.disabled = false);
  buildLayerPanel();
  showElementProps();
  if (!silent) showNotification('✏️ Selected — drag to move, double-click text to edit');
}

function deselectAll() {
  if (CI.selected) CI.selected.classList.remove('ci-selected');
  CI.selected = null;
  AppState.selectedElementIdx = null;
  CI.handles.forEach(h => h.style.display = 'none');
  hideGuides();
  if (CI.dimTip) CI.dimTip.classList.remove('visible');
  if (CI.posTip) CI.posTip.classList.remove('visible');
  document.querySelectorAll('.ci-align-btn').forEach(b => b.disabled = true);
  showElementProps();
}

/* ===== HANDLE POSITIONS ===== */
function updateHandlePositions() {
  if (!CI.selected) return;
  const el = CI.selected;
  const s = parseFloat(el.style.scale) || 1;
  const l = parseFloat(el.style.left) || el.offsetLeft;
  const t = parseFloat(el.style.top) || el.offsetTop;
  const w = el.offsetWidth * s;
  const h = el.offsetHeight * s;
  const rot = parseFloat(el.style.rotate) || 0;
  const ho = 5;

  const cx = l + w/2;
  const cy = t + h/2;

  const rotatePoint = (px, py, angleDeg, cx, cy) => {
    if (!angleDeg) return { left: px, top: py };
    const rad = angleDeg * Math.PI / 180;
    const cos = Math.cos(rad), sin = Math.sin(rad);
    const nx = cos * (px - cx) - sin * (py - cy) + cx;
    const ny = sin * (px - cx) + cos * (py - cy) + cy;
    return { left: nx, top: ny };
  };

  const pos = {
    nw:{left:l-ho,top:t-ho}, n:{left:l+w/2-ho,top:t-ho}, ne:{left:l+w-ho,top:t-ho},
    e:{left:l+w-ho,top:t+h/2-ho}, se:{left:l+w-ho,top:t+h-ho}, s:{left:l+w/2-ho,top:t+h-ho},
    sw:{left:l-ho,top:t+h-ho}, w:{left:l-ho,top:t+h/2-ho},
    rot:{left:l+w/2-ho, top:t-ho-25}
  };
  CI.handles.forEach(handle => {
    const p = pos[handle.dataset.ciDir];
    if (p) {
      const rp = rotatePoint(p.left, p.top, rot, cx, cy);
      handle.style.left = rp.left+'px'; handle.style.top = rp.top+'px';
    }
  });
}

function getCIScale() { return (AppState.zoom || 55) / 100; }

/* ===== FIND TOPMOST ELEMENT AT POINT ===== */
function findTopmostSelectable(x, y, canvas) {
  const visualEls = getVisualOrder();
  // Check elements in reverse (last rendered / highest z-index = topmost)
  for (let i = visualEls.length - 1; i >= 0; i--) {
    const el = visualEls[i];
    if (el.style.display === 'none') continue;
    // Skip full-canvas background layers unless nothing else matches
    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) continue;
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      // Skip background layers (inset:0 covering full canvas) if we can find something better
      const style = el.getAttribute('style') || '';
      const isBg = (style.includes('inset:0') || style.includes('inset: 0'));
      if (!isBg) return el;
    }
  }
  // Fallback: return any element including backgrounds
  for (let i = visualEls.length - 1; i >= 0; i--) {
    const el = visualEls[i];
    if (el.style.display === 'none') continue;
    const rect = el.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return el;
  }
  return null;
}

/* ===== EVENTS ===== */
let _ciEventsAttached = false;
function attachCIEvents() {
  if (_ciEventsAttached) return;
  _ciEventsAttached = true;
  const canvas = document.getElementById('bannerCanvas');
  if (!canvas) return;
  canvas.addEventListener('mousedown', onCIMouseDown, true);
  canvas.addEventListener('dblclick', onCIDblClick, true);
  document.addEventListener('mousemove', onCIMouseMove, true);
  document.addEventListener('mouseup', onCIMouseUp, true);
  document.addEventListener('keydown', onCIKeyDown, true);
  document.addEventListener('keyup', onCIKeyUp, true);

  const canvasArea = document.getElementById('canvasArea');
  if (canvasArea) {
    canvasArea.addEventListener('mousedown', (e) => {
      if (!e.target.closest('#bannerCanvas')) {
        if (CI.selected) {
          deselectAll();
          buildLayerPanel();
        }
      }
    });
  }
}

/* ===== MOUSE DOWN ===== */
function onCIMouseDown(e) {
  const canvas = document.getElementById('bannerCanvas');
  if (!canvas) return;
  // Skip if editing text
  if (e.target.isContentEditable) return;
  const scale = getCIScale();

  // Resize handle?
  if (e.target.classList.contains('ci-handle')) {
    e.preventDefault(); e.stopPropagation();
    CI.resizing = true;
    CI.resizeDir = e.target.dataset.ciDir;
    CI.startX = e.clientX; CI.startY = e.clientY;
    if (CI.selected) {
      CI.selected.classList.add('ci-is-interacting');
      CI.startScale = parseFloat(CI.selected.style.scale) || 1;
      CI.startLeft = parseFloat(CI.selected.style.left) || CI.selected.offsetLeft;
      CI.startTop = parseFloat(CI.selected.style.top) || CI.selected.offsetTop;
      CI.baseW = CI.selected.offsetWidth;
      CI.baseH = CI.selected.offsetHeight;
      CI.startW = CI.baseW * CI.startScale;
      CI.startH = CI.baseH * CI.startScale;
      if (CI.resizeDir === 'rot') {
        const rect = CI.selected.getBoundingClientRect();
        CI.centerX = rect.left + rect.width / 2;
        CI.centerY = rect.top + rect.height / 2;
      }
    }
    return;
  }

  // Find topmost selectable element at click point (skip backgrounds)
  const selectable = findTopmostSelectable(e.clientX, e.clientY, canvas);

  if (selectable) {
    e.preventDefault(); e.stopPropagation();
    selectElement(selectable);
    CI.dragging = true;
    CI.selected.classList.add('ci-is-interacting');
    CI.startX = e.clientX; CI.startY = e.clientY;
    CI.startLeft = parseFloat(selectable.style.left) || selectable.offsetLeft;
    CI.startTop = parseFloat(selectable.style.top) || selectable.offsetTop;
  } else {
    deselectAll();
    buildLayerPanel();
  }
}

/* ===== DOUBLE CLICK — inline text edit ===== */
function onCIDblClick(e) {
  if (e.target.isContentEditable) return;
  // Find the closest text-containing element
  let target = e.target;
  const canvas = document.getElementById('bannerCanvas');
  // Walk up to find an element with direct text content
  while (target && target !== canvas) {
    const hasText = Array.from(target.childNodes).some(n => n.nodeType === 3 && n.textContent.trim());
    if (hasText && target.closest('#bannerCanvas')) {
      enableInlineEdit(target);
      return;
    }
    target = target.parentElement;
  }
  
  // If no text found, double click on empty space deselects everything.
  const selectable = findTopmostSelectable(e.clientX, e.clientY, canvas);
  const isBackground = selectable && (selectable.getAttribute('style') || '').includes('inset: 0');
  
  if (!selectable || isBackground) {
    deselectAll();
    buildLayerPanel();
  }
}

function enableInlineEdit(el) {
  el.contentEditable = 'true';
  el.style.cursor = 'text';
  el.style.outline = '2px solid #FFD700';
  el.style.outlineOffset = '2px';
  el.focus();

  // Select all text
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);

  const finish = () => {
    el.contentEditable = 'false';
    el.style.cursor = '';
    el.style.outline = '';
    el.style.outlineOffset = '';
    el.removeEventListener('blur', finish);
    el.removeEventListener('keydown', onEditKey);
    // Persist custom text if applicable
    if (el.dataset.ciIdx && el.dataset.ciIdx.startsWith('custom-text-')) {
       const idx = parseInt(el.dataset.ciIdx.replace('custom-text-', ''));
       if (AppState.customTexts[idx]) {
           AppState.customTexts[idx].text = el.textContent;
       }
    }
    showNotification('✅ Text updated');
  };

  const onEditKey = (e) => {
    if (e.key === 'Escape' || e.key === 'Enter') { e.preventDefault(); el.blur(); }
    e.stopPropagation(); // prevent arrow keys from moving element
  };

  el.addEventListener('blur', finish);
  el.addEventListener('keydown', onEditKey);
}

/* ===== MOUSE MOVE ===== */
function onCIMouseMove(e) {
  const scale = getCIScale();
  if (CI.dragging && CI.selected) {
    e.preventDefault();
    const dx = (e.clientX - CI.startX) / scale;
    const dy = (e.clientY - CI.startY) / scale;
    let nL = CI.startLeft + dx, nT = CI.startTop + dy;
    if (AppState.gridEnabled && AppState.snapEnabled) { nL = snapToGrid(nL); nT = snapToGrid(nT); }
    const guides = findAlignmentGuides(CI.selected, nL, nT);
    if (guides.snapX !== null) nL = guides.snapX;
    if (guides.snapY !== null) nT = guides.snapY;
    renderGuides(guides);
    CI.selected.style.left = nL + 'px';
    CI.selected.style.top = nT + 'px';
    updateHandlePositions();
    showPositionTip(nL, nT);
    persistElementPosition(CI.selected);
    updateElementPropsPanelRealtime();
  }
  if (CI.resizing && CI.selected) {
    e.preventDefault();
    const dir = CI.resizeDir;
    if (dir === 'rot') {
      const angle = Math.atan2(e.clientY - CI.centerY, e.clientX - CI.centerX) * 180 / Math.PI;
      let newAngle = angle + 90;
      if (AppState.gridEnabled && AppState.snapEnabled) {
          newAngle = Math.round(newAngle / 15) * 15; // snap to 15 degrees
      }
      CI.selected.style.rotate = newAngle + 'deg';
      persistElementPosition(CI.selected);
      updateHandlePositions();
      updateElementPropsPanelRealtime();
      return;
    }

    const dx = (e.clientX - CI.startX) / scale;
    const dy = (e.clientY - CI.startY) / scale;
    
    // Adjust dx, dy based on element's rotation
    const rot = parseFloat(CI.selected.style.rotate) || 0;
    const rad = rot * Math.PI / 180;
    const localDx = dx * Math.cos(rad) + dy * Math.sin(rad);
    const localDy = -dx * Math.sin(rad) + dy * Math.cos(rad);

    let nL = CI.startLeft, nT = CI.startTop;
    let nW = CI.startW, nH = CI.startH;

    // Corner handles = uniform scale
    if (dir === 'nw' || dir === 'ne' || dir === 'sw' || dir === 'se') {
       if (dir.includes('e')) nW = Math.max(10, CI.startW + localDx);
       if (dir.includes('w')) { nW = Math.max(10, CI.startW - localDx); }
       if (dir.includes('s')) nH = Math.max(10, CI.startH + localDy);
       if (dir.includes('n')) { nH = Math.max(10, CI.startH - localDy); }

       let ratio = 1;
       if (dir.includes('e') || dir.includes('w')) ratio = nW / CI.startW;
       else ratio = nH / CI.startH;
       
       // Maintain aspect ratio via uniform scale
       const newScale = Math.max(0.05, CI.startScale * ratio);
       CI.selected.style.transformOrigin = 'top left';
       CI.selected.style.scale = newScale;
       
       nW = CI.baseW * newScale;
       nH = CI.baseH * newScale;

       // Adjust position to keep opposite corner anchored
       if (dir === 'nw') { nL = CI.startLeft + CI.startW - nW; nT = CI.startTop + CI.startH - nH; }
       if (dir === 'ne') { nT = CI.startTop + CI.startH - nH; }
       if (dir === 'sw') { nL = CI.startLeft + CI.startW - nW; }

    } else {
       // Edge handles = change CSS width/height (non-uniform bounds resize)
       if (dir === 'e') nW = Math.max(10, CI.startW + localDx);
       if (dir === 'w') { nW = Math.max(10, CI.startW - localDx); nL = CI.startLeft + CI.startW - nW; }
       if (dir === 's') nH = Math.max(10, CI.startH + localDy);
       if (dir === 'n') { nH = Math.max(10, CI.startH - localDy); nT = CI.startTop + CI.startH - nH; }
       
       if (AppState.gridEnabled && AppState.snapEnabled) { nW = snapToGrid(nW); nH = snapToGrid(nH); }
       CI.selected.style.width = (nW / CI.startScale) + 'px';
       CI.selected.style.height = (nH / CI.startScale) + 'px';
    }

    CI.selected.style.left = nL + 'px'; 
    CI.selected.style.top = nT + 'px';
    
    updateHandlePositions();
    showDimensionTip(nW, nH, nL, nT);
    persistElementPosition(CI.selected);
    updateElementPropsPanelRealtime();
  }
}

function onCIMouseUp() {
  if (CI.selected) CI.selected.classList.remove('ci-is-interacting');
  if (CI.dragging || CI.resizing) {
    CI.dragging = false; CI.resizing = false; CI.resizeDir = '';
    hideGuides();
    if (CI.dimTip) CI.dimTip.classList.remove('visible');
    if (CI.posTip) setTimeout(() => CI.posTip.classList.remove('visible'), 600);
    updateElementPropsPanelRealtime();
  }
}

/* ===== KEYBOARD ===== */
function onCIKeyDown(e) {
  if (e.key === 'Shift') CI.shiftHeld = true;
  if (!CI.selected) return;
  if (document.activeElement.isContentEditable) return;
  const nudge = e.shiftKey ? 10 : 1;
  let handled = false;
  if (e.key === 'ArrowLeft')  { moveSelected(-nudge, 0); handled = true; }
  if (e.key === 'ArrowRight') { moveSelected(nudge, 0);  handled = true; }
  if (e.key === 'ArrowUp')    { moveSelected(0, -nudge); handled = true; }
  if (e.key === 'ArrowDown')  { moveSelected(0, nudge);  handled = true; }
  if (e.key === 'Escape') { deselectAll(); buildLayerPanel(); handled = true; }
  if ((e.key === 'Delete' || e.key === 'Backspace') && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    CI.selected.style.display = 'none'; deselectAll(); buildLayerPanel();
    showNotification('🗑️ Layer hidden'); handled = true;
  }
  if (handled) e.preventDefault();
}
function onCIKeyUp(e) { if (e.key === 'Shift') CI.shiftHeld = false; }

function moveSelected(dx, dy) {
  if (!CI.selected) return;
  const el = CI.selected;
  let l = parseFloat(el.style.left) || el.offsetLeft;
  let t = parseFloat(el.style.top) || el.offsetTop;
  el.style.left = (l + dx) + 'px'; el.style.top = (t + dy) + 'px';
  updateHandlePositions(); persistElementPosition(el);
  updateElementPropsPanelRealtime();
}

/* ===== GRID ===== */
function snapToGrid(val) { return Math.round(val / (AppState.gridSize||20)) * (AppState.gridSize||20); }
function toggleGrid() {
  AppState.gridEnabled = !AppState.gridEnabled;
  const btn = document.getElementById('gridToggleBtn');
  if (btn) btn.classList.toggle('ci-grid-active', AppState.gridEnabled);
  if (CI.gridOverlay) CI.gridOverlay.classList.toggle('active', AppState.gridEnabled);
  showNotification(AppState.gridEnabled ? '⊞ Grid ON' : '⊞ Grid OFF');
}
function setGridSize(px) { AppState.gridSize = px; applyGridClass(); }
function applyGridClass() {
  if (!CI.gridOverlay) return;
  CI.gridOverlay.classList.remove('ci-grid-overlay-10','ci-grid-overlay-20','ci-grid-overlay-40','ci-grid-overlay-60');
  CI.gridOverlay.classList.add('ci-grid-overlay-' + (AppState.gridSize || 20));
}

/* ===== ALIGNMENT ===== */
function alignElement(dir) {
  if (!CI.selected) { showNotification('⚠️ Select an element first'); return; }
  const el = CI.selected, cW = AppState.bannerW, cH = AppState.bannerH;
  const s = parseFloat(el.style.scale) || 1;
  const eW = el.offsetWidth * s, eH = el.offsetHeight * s;
  if (dir==='left') el.style.left='0px';
  else if (dir==='center-h') el.style.left=((cW-eW)/2)+'px';
  else if (dir==='right') el.style.left=(cW-eW)+'px';
  else if (dir==='top') el.style.top='0px';
  else if (dir==='center-v') el.style.top=((cH-eH)/2)+'px';
  else if (dir==='bottom') el.style.top=(cH-eH)+'px';
  updateHandlePositions(); persistElementPosition(el);
  updateElementPropsPanelRealtime();
}

/* ===== GUIDES ===== */
function findAlignmentGuides(el, nL, nT) {
  const cW = AppState.bannerW, cH = AppState.bannerH;
  const s = parseFloat(el.style.scale) || 1;
  const eW = el.offsetWidth * s, eH = el.offsetHeight * s;
  const r = { snapX: null, snapY: null, guides: [] };
  if (!AppState.showGuides) return r;
  const th = CI.SNAP_THRESHOLD;
  const eCX = nL+eW/2, eCY = nT+eH/2, ccx = cW/2, ccy = cH/2;
  if (Math.abs(eCX-ccx)<th) { r.snapX=ccx-eW/2; r.guides.push({type:'v',pos:ccx,isCenter:true}); }
  if (Math.abs(eCY-ccy)<th) { r.snapY=ccy-eH/2; r.guides.push({type:'h',pos:ccy,isCenter:true}); }
  CI.selectableEls.forEach(o => {
    if (o===el||o.style.display==='none') return;
    const os = parseFloat(o.style.scale) || 1;
    const oL=parseFloat(o.style.left)||o.offsetLeft, oT=parseFloat(o.style.top)||o.offsetTop;
    const oW=o.offsetWidth * os, oH=o.offsetHeight * os;
    if (Math.abs(nL-oL)<th&&r.snapX===null) { r.snapX=oL; r.guides.push({type:'v',pos:oL,isCenter:false}); }
    if (Math.abs(nL+eW-(oL+oW))<th&&r.snapX===null) { r.snapX=oL+oW-eW; r.guides.push({type:'v',pos:oL+oW,isCenter:false}); }
    if (Math.abs(nT-oT)<th&&r.snapY===null) { r.snapY=oT; r.guides.push({type:'h',pos:oT,isCenter:false}); }
    if (Math.abs(nT+eH-(oT+oH))<th&&r.snapY===null) { r.snapY=oT+oH-eH; r.guides.push({type:'h',pos:oT+oH,isCenter:false}); }
  });
  return r;
}

function renderGuides(gd) {
  CI.guideElements.forEach(g => { g.classList.remove('visible'); g.style.display='none'; });
  if (!gd||!gd.guides.length) return;
  gd.guides.forEach((guide,i) => {
    if (i>=CI.guideElements.length) return;
    const el = CI.guideElements[i];
    el.style.display='block'; el.className='ci-guide';
    if (guide.type==='h') { el.classList.add('ci-guide-h'); el.style.top=guide.pos+'px'; el.style.left='0'; el.style.right='0'; }
    else { el.classList.add('ci-guide-v'); el.style.left=guide.pos+'px'; el.style.top='0'; el.style.bottom='0'; }
    if (guide.isCenter) el.classList.add('ci-guide-center');
    requestAnimationFrame(() => el.classList.add('visible'));
  });
}
function hideGuides() { CI.guideElements.forEach(g => { g.classList.remove('visible'); setTimeout(()=>g.style.display='none',150); }); }

/* ===== TOOLTIPS ===== */
function showDimensionTip(w,h,l,t) { if(!CI.dimTip)return; CI.dimTip.textContent=`${Math.round(w)} × ${Math.round(h)}`; CI.dimTip.style.left=(l+w+8)+'px'; CI.dimTip.style.top=(t-20)+'px'; CI.dimTip.classList.add('visible'); }
function showPositionTip(l,t) { if(!CI.posTip)return; CI.posTip.textContent=`x:${Math.round(l)} y:${Math.round(t)}`; CI.posTip.style.left=l+'px'; CI.posTip.style.top=(t-18)+'px'; CI.posTip.classList.add('visible'); }

/* ===== PERSIST / RESTORE ===== */
function persistElementPosition(el) {
  const idx = el.dataset.ciIdx; if (idx===undefined) return;
  if (!AppState.elementOverrides) AppState.elementOverrides = {};
  AppState.elementOverrides[idx] = { 
    left:el.style.left, 
    top:el.style.top, 
    width:el.style.width||'', 
    height:el.style.height||'',
    zIndex:el.style.zIndex||'',
    scale:el.style.scale||'',
    rotate:el.style.rotate||''
  };
}
function restoreElementPositions() {
  if (!AppState.elementOverrides) return;
  const canvas = document.getElementById('bannerCanvas'); if (!canvas) return;
  Object.keys(AppState.elementOverrides).forEach(idx => {
    const ov = AppState.elementOverrides[idx];
    const el = canvas.querySelector(`[data-ci-idx="${idx}"]`);
    if (el && ov) { 
      if(ov.left)el.style.left=ov.left; 
      if(ov.top)el.style.top=ov.top; 
      if(ov.width)el.style.width=ov.width; 
      if(ov.height)el.style.height=ov.height; 
      if(ov.zIndex)el.style.zIndex=ov.zIndex;
      if(ov.scale){ el.style.transformOrigin='top left'; el.style.scale=ov.scale; }
      if(ov.rotate)el.style.rotate=ov.rotate;
    }
  });
}
function resetElementPositions() {
  AppState.elementOverrides = {}; AppState.selectedElementIdx = null;
  deselectAll(); renderBanner(); showNotification('↺ Positions reset');
}

/* ===== ELEMENT DELETION ===== */
function deleteElement(el) {
  const idx = el.dataset.ciIdx;
  if (!AppState.deletedElements) AppState.deletedElements = {};
  AppState.deletedElements[idx] = true;
  el.remove();
  deselectAll();
  buildLayerPanel();
  showNotification('🗑️ Layer deleted');
}

function applyDeletions() {
  if (!AppState.deletedElements) return;
  const canvas = document.getElementById('bannerCanvas');
  Object.keys(AppState.deletedElements).forEach(idx => {
    const el = canvas.querySelector(`[data-ci-idx="${idx}"]`);
    if (el) el.remove();
  });
}

/* ===== BOOT ===== */
(function() {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(attachCIEvents, 100));
  else setTimeout(attachCIEvents, 100);
})();
