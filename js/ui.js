/* ============================================
   UI.JS — Tabs, zoom, notifications, modals,
           template grid, saved designs panel
   ============================================ */
"use strict";

/* ===== TABS ===== */
function switchTab(name) {
  const names = ['content','design','media','templates','overlays'];
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
  const sw    = (areaW / 1200) * 100;
  const sh    = (areaH / 627)  * 100;
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