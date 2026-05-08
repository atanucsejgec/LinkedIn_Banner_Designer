/* ============================================
   UI.JS — Tabs, zoom, notifications, modals,
           template grid, saved designs panel
   ============================================ */
"use strict";

/* ===== TABS ===== */
function switchTab(name) {
  const names = ['content','design','media','templates','overlays','layers'];
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach((t,i) => {
    const isActive = names[i]===name;
    t.classList.toggle('active', isActive);
    // Scroll the active tab into view within the tab bar
    if (isActive) {
      t.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  });
  document.querySelectorAll('.tab-content').forEach(t => {
    t.classList.remove('active');
  });
  document.getElementById('tab-'+name).classList.add('active');
}

/* ===== ZOOM ===== */
function zoom(delta) {
  AppState.zoom = Math.max(15, Math.min(100, AppState.zoom + delta));
  applyZoom();
}

function applyZoom() {
  const s = AppState.zoom / 100;
  document.getElementById('canvasWrapper').style.transform = `scale(${s})`;
  document.getElementById('zoomValue').textContent = AppState.zoom + '%';
}

function fitToScreen() {
  const area  = document.getElementById('canvasArea');
  const areaW = area.clientWidth  - 60;
  const areaH = area.clientHeight - 60;
  const sw    = (areaW / AppState.bannerW) * 100;
  const sh    = (areaH / AppState.bannerH) * 100;
  AppState.zoom = Math.max(15, Math.floor(Math.min(sw, sh)));
  applyZoom();
}

/* ===== PREVIEW OFFSET ===== */
function adjustPreviewOffset(value) {
  const wrapper = document.getElementById('canvasWrapper');
  const val = parseInt(value) || 0;
  // Store offset, apply as margin-top
  AppState.previewOffsetY = val;
  wrapper.style.marginTop = val + 'px';
  document.getElementById('previewOffsetVal').textContent = val + 'px';
}

function resetPreviewOffset() {
  AppState.previewOffsetY = 0;
  document.getElementById('previewOffsetY').value = 0;
  document.getElementById('canvasWrapper').style.marginTop = '0px';
  document.getElementById('previewOffsetVal').textContent = '0px';
}

/* ===== NOTIFICATION ===== */
let _notifTimer = null;
function showNotification(msg) {
  const n = document.getElementById('notification');
  n.textContent = msg;
  n.classList.add('show');
  if (_notifTimer) clearTimeout(_notifTimer);
  _notifTimer = setTimeout(() => n.classList.remove('show'), 2600);
}

/* ===== MODAL ===== */
function showPreview() {
  document.getElementById('previewModal').classList.add('show');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('show');
  }
});

/* ===== TEMPLATE GRID ===== */
function buildTemplateGrid() {
  const grid = document.getElementById('templateGrid');
  grid.innerHTML = TEMPLATES.map(t => `
    <div class="template-card ${t.id===AppState.currentTemplateId?'selected':''}"
         id="tcard-${t.id}"
         onclick="applyTemplate('${t.id}')">
      <div class="template-thumb">
        <div class="template-thumb-inner" style="background:${t.thumb.bg};">
          <span style="font-size:22px;">${t.thumb.emoji}</span>
          <span>${t.thumb.label}</span>
        </div>
      </div>
      <div class="template-name">
        ${t.name}
        <br><span class="template-tag">${t.tag}</span>
      </div>
    </div>
  `).join('');
}

/* ===== APPLY TEMPLATE ===== */
function applyTemplate(id) {
  const tmpl = TEMPLATES.find(t => t.id === id);
  if (!tmpl) return;

  AppState.currentTemplateId = id;

  // Update selected state in grid
  document.querySelectorAll('.template-card').forEach(c => {
    c.classList.toggle('selected', c.id === 'tcard-'+id);
  });

  // Update screenshot slots count
  updateScreenshotSlots(tmpl.screenshots);

  // Update label in toolbar
  document.getElementById('activeTemplateName').textContent =
    'Template: ' + tmpl.name;

  // Re-render
  renderBanner();
  showNotification('📐 Template: ' + tmpl.name);
}

/* ===== STATUS ===== */
function setStatus(msg) {
  document.getElementById('statusText').textContent = msg;
  document.getElementById('lastUpdate').textContent =
    'Updated ' + new Date().toLocaleTimeString();
}

/* ===== BANNER SIZE MANAGEMENT ===== */
const BANNER_SIZE_PRESETS = {
  '1200x627':  { label: 'LinkedIn', ratio: '1.91:1' },
  '1080x1080': { label: 'Square',   ratio: '1:1' },
  '1080x1350': { label: 'Portrait', ratio: '4:5' },
  '1080x1920': { label: 'Story',    ratio: '9:16' },
  '1500x500':  { label: 'Twitter',  ratio: '3:1' },
  '1584x396':  { label: 'LI Cover', ratio: '4:1' },
};

function applyBannerSize(w, h, btn) {
  // Update width/height inputs
  document.getElementById('bannerWidth').value = w;
  document.getElementById('bannerHeight').value = h;

  // Update preset button selection
  document.querySelectorAll('.size-preset-btn').forEach(b => b.classList.remove('selected'));
  if (btn) btn.classList.add('selected');

  applySizeToCanvas(w, h);
}

function applyCustomBannerSize() {
  const w = Math.max(200, Math.min(4000, parseInt(document.getElementById('bannerWidth').value) || 1200));
  const h = Math.max(200, Math.min(4000, parseInt(document.getElementById('bannerHeight').value) || 627));

  // Deselect all preset buttons (user is typing custom)
  document.querySelectorAll('.size-preset-btn').forEach(b => {
    const match = parseInt(b.dataset.w) === w && parseInt(b.dataset.h) === h;
    b.classList.toggle('selected', match);
  });

  applySizeToCanvas(w, h);
}

function applySizeToCanvas(w, h) {
  AppState.bannerW = w;
  AppState.bannerH = h;

  // Resize the banner canvas element
  const canvas = document.getElementById('bannerCanvas');
  canvas.style.width  = w + 'px';
  canvas.style.height = h + 'px';

  // Update toolbar labels
  const sizeKey = `${w}x${h}`;
  const preset = BANNER_SIZE_PRESETS[sizeKey];
  const ratioStr = preset ? preset.ratio : calcRatio(w, h);
  const label = preset ? preset.label : 'Custom';

  document.getElementById('canvasSizeLabel').textContent = `📐 ${w} × ${h} px`;
  document.getElementById('canvasRatioLabel').textContent = `🖼️ ${label} (${ratioStr})`;

  // Update preview modal title
  const modalTitle = document.getElementById('previewModalTitle');
  if (modalTitle) modalTitle.textContent = `👁 Banner Preview (${w}×${h})`;

  // Update size info bar
  const infoBar = document.getElementById('sizeInfoBar');
  if (infoBar) {
    infoBar.innerHTML = `<span>📐 ${w} × ${h} px</span><span>Ratio: ${ratioStr}</span>`;
  }

  // Re-fit and re-render
  fitToScreen();
  renderBanner();
}

function lockAspectRatio() {
  AppState.aspectLocked = !AppState.aspectLocked;
  const btn = document.getElementById('aspectLockBtn');
  btn.textContent = AppState.aspectLocked ? '🔒' : '🔓';
  showNotification(AppState.aspectLocked ? '🔒 Aspect ratio locked' : '🔓 Aspect ratio unlocked');
}

function calcRatio(w, h) {
  const g = gcd(w, h);
  const rw = w / g;
  const rh = h / g;
  // Simplify to common ratios if close
  if (rw > 10 || rh > 10) {
    return (w / h).toFixed(2) + ':1';
  }
  return rw + ':' + rh;
}

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }