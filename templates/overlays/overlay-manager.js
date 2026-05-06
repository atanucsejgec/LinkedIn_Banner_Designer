/* ============================================
   OVERLAY-MANAGER.JS — Central registry for
   all design overlays. Templates/overlays are
   composited on top of the banner render.
   
   HOW TO ADD NEW OVERLAYS:
   1. Create a .js file in this folder
   2. Push your overlay object to OVERLAYS array
   3. The overlay will auto-appear in the UI
   ============================================ */
"use strict";

/* ===== OVERLAY REGISTRY ===== */
const OVERLAYS = [];

/* ===== OVERLAY STATE (which are active + their settings) ===== */
window.OverlayState = {};

/* ===== REGISTER AN OVERLAY ===== */
function registerOverlay(overlay) {
  /*  overlay = {
        id:       string   — unique key
        name:     string   — display name
        icon:     string   — emoji
        category: string   — 'style' | 'photo' | 'mockup' | 'decoration'
        controls: [        — optional UI controls
          { id, type, label, min, max, value, options }
        ]
        render:   function(colors, overlayState) → HTML string
      }
  */
  OVERLAYS.push(overlay);
  // Init default state
  window.OverlayState[overlay.id] = { enabled: false };
  if (overlay.controls) {
    overlay.controls.forEach(ctrl => {
      window.OverlayState[overlay.id][ctrl.id] = ctrl.value;
    });
  }
}

/* ===== BUILD OVERLAY PANEL UI ===== */
function buildOverlayPanel() {
  const container = document.getElementById('overlayList');
  if (!container) return;

  if (OVERLAYS.length === 0) {
    container.innerHTML = '<p class="help-text">No overlays available.</p>';
    return;
  }

  // Group by category
  const categories = {};
  OVERLAYS.forEach(o => {
    const cat = o.category || 'decoration';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(o);
  });

  const catLabels = {
    style: '🎨 Style Effects',
    photo: '📸 Photo / Logo',
    mockup: '💻 Device Mockups',
    decoration: '✨ Decorations'
  };

  let html = '';
  for (const [cat, overlays] of Object.entries(categories)) {
    html += `<div class="overlay-category">
      <div class="overlay-category-title">${catLabels[cat] || cat}</div>`;

    overlays.forEach(o => {
      const state = window.OverlayState[o.id];
      html += `
        <div class="overlay-card ${state.enabled ? 'active' : ''}" id="overlay-card-${o.id}">
          <div class="overlay-card-header">
            <div class="overlay-card-info">
              <span class="overlay-icon">${o.icon}</span>
              <span class="overlay-name">${o.name}</span>
            </div>
            <label class="toggle">
              <input type="checkbox" ${state.enabled ? 'checked' : ''}
                     onchange="toggleOverlay('${o.id}', this.checked)">
              <span class="toggle-slider"></span>
            </label>
          </div>
          ${o.controls && o.controls.length ? `
            <div class="overlay-controls" id="overlay-ctrls-${o.id}"
                 style="display:${state.enabled ? 'block' : 'none'}">
              ${o.controls.map(ctrl => renderOverlayControl(o.id, ctrl)).join('')}
            </div>
          ` : ''}
        </div>`;
    });

    html += '</div>';
  }

  container.innerHTML = html;
}

/* ===== RENDER A SINGLE CONTROL ===== */
function renderOverlayControl(overlayId, ctrl) {
  const val = window.OverlayState[overlayId][ctrl.id];
  const inputId = `ov-${overlayId}-${ctrl.id}`;

  switch (ctrl.type) {
    case 'range':
      return `
        <div class="overlay-ctrl-row">
          <label class="form-label">${ctrl.label}</label>
          <div class="range-row">
            <input type="range" id="${inputId}"
                   min="${ctrl.min}" max="${ctrl.max}" value="${val}"
                   oninput="updateOverlaySetting('${overlayId}','${ctrl.id}',this.value)">
            <span class="range-value" id="${inputId}-val">${val}${ctrl.suffix || ''}</span>
          </div>
        </div>`;

    case 'color':
      return `
        <div class="overlay-ctrl-row">
          <label class="form-label">${ctrl.label}</label>
          <div class="color-picker-row">
            <input type="color" id="${inputId}" value="${val}"
                   oninput="updateOverlaySetting('${overlayId}','${ctrl.id}',this.value)">
            <span class="range-value">${ctrl.label}</span>
          </div>
        </div>`;

    case 'select':
      return `
        <div class="overlay-ctrl-row">
          <label class="form-label">${ctrl.label}</label>
          <select class="form-select" id="${inputId}"
                  onchange="updateOverlaySetting('${overlayId}','${ctrl.id}',this.value)">
            ${ctrl.options.map(opt =>
              `<option value="${opt.value}" ${opt.value === val ? 'selected' : ''}>
                ${opt.label}
              </option>`
            ).join('')}
          </select>
        </div>`;

    case 'file':
      return `
        <div class="overlay-ctrl-row">
          <label class="form-label">${ctrl.label}</label>
          <div class="slot-drop-zone overlay-file-drop"
               onclick="document.getElementById('${inputId}').click()">
            <input type="file" accept="image/*" id="${inputId}"
                   onchange="handleOverlayFile('${overlayId}','${ctrl.id}',event)"
                   style="display:none">
            <div class="slot-icon">🖼️</div>
            <div class="slot-text">Click to upload</div>
          </div>
          ${val ? `<img src="${val}" class="overlay-file-preview" alt="preview">` : ''}
        </div>`;

    default:
      return '';
  }
}

/* ===== TOGGLE OVERLAY ON/OFF ===== */
function toggleOverlay(id, enabled) {
  window.OverlayState[id].enabled = enabled;
  const card = document.getElementById('overlay-card-' + id);
  const ctrls = document.getElementById('overlay-ctrls-' + id);
  if (card) card.classList.toggle('active', enabled);
  if (ctrls) ctrls.style.display = enabled ? 'block' : 'none';
  renderBanner();
  showNotification(enabled ? `✅ ${id} overlay on` : `❌ ${id} overlay off`);
}

/* ===== UPDATE OVERLAY SETTING ===== */
function updateOverlaySetting(overlayId, settingId, value) {
  window.OverlayState[overlayId][settingId] = value;
  // Update displayed value
  const valEl = document.getElementById(`ov-${overlayId}-${settingId}-val`);
  if (valEl) {
    const overlay = OVERLAYS.find(o => o.id === overlayId);
    const ctrl = overlay?.controls?.find(c => c.id === settingId);
    valEl.textContent = value + (ctrl?.suffix || '');
  }
  renderBanner();
}

/* ===== HANDLE OVERLAY FILE UPLOAD ===== */
function handleOverlayFile(overlayId, settingId, event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    window.OverlayState[overlayId][settingId] = e.target.result;
    buildOverlayPanel();  // rebuild to show preview
    renderBanner();
    showNotification('📸 Overlay image uploaded!');
  };
  reader.readAsDataURL(file);
}

/* ===== RENDER ALL ACTIVE OVERLAYS ===== */
function renderOverlays(colors) {
  let html = '';
  OVERLAYS.forEach(o => {
    if (window.OverlayState[o.id]?.enabled) {
      try {
        html += `<div class="overlay-layer" data-overlay="${o.id}">
          ${o.render(colors, window.OverlayState[o.id])}
        </div>`;
      } catch (err) {
        console.warn(`Overlay ${o.id} render error:`, err);
      }
    }
  });
  return html;
}
