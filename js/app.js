/* ============================================
   APP.JS — Main init, state, keyboard shortcuts
   ============================================ */
"use strict";

/* ===== GLOBAL STATE ===== */
window.AppState = {
  features: [
    "Kotlin + Jetpack Compose",
    "Material 3 Design",
    "State Management (remember + mutableStateOf)",
    "Dark / Light Theme Support",
    "Open Source on GitHub"
  ],
  badges: [
    { label:"Kotlin",    color:"#7F52FF" },
    { label:"Compose",   color:"#03DAC5" },
    { label:"Material 3",color:"#6750A4" },
    { label:"GitHub",    color:"#333333" }
  ],
  screenshots: [null, null, null],   // up to 3 slots
  currentTemplateId: 'classic-split',
  savedDesigns: [],
  zoom: 55,
  previewOffsetY: 0
};

/* ===== BOOT ===== */
document.addEventListener('DOMContentLoaded', () => {
  buildTemplateGrid();
  buildPresetButtons();
  buildScreenshotSlots();
  buildOverlayPanel();
  renderFeatureList();
  renderBadgeList();
  applyTemplate('classic-split');
  fitToScreen();

  // Enter-key shortcuts for add inputs
  document.getElementById('newFeature')
    .addEventListener('keydown', e => { if(e.key==='Enter') addFeature(); });
  document.getElementById('newBadge')
    .addEventListener('keydown', e => { if(e.key==='Enter') addBadge(); });
});

/* ===== KEYBOARD SHORTCUTS ===== */
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey) {
    if (e.key==='s') { e.preventDefault(); saveDesign(); }
    if (e.key==='d') { e.preventDefault(); downloadBanner(); }
    if (e.key==='='||e.key==='+') { e.preventDefault(); zoom(10); }
    if (e.key==='-') { e.preventDefault(); zoom(-10); }
    if (e.key==='0') { e.preventDefault(); fitToScreen(); }
  }
});

/* ===== RESET ===== */
function resetToDefault() {
  loadPreset('compose');
  document.getElementById('bgColor1').value      = '#1C1B1F';
  document.getElementById('bgColor1Hex').value   = '#1C1B1F';
  document.getElementById('bgColor2').value      = '#2D1B69';
  document.getElementById('bgColor2Hex').value   = '#2D1B69';
  document.getElementById('accentColor1').value  = '#6750A4';
  document.getElementById('accentColor1Hex').value='#6750A4';
  document.getElementById('accentColor2').value  = '#03DAC5';
  document.getElementById('accentColor2Hex').value='#03DAC5';
  document.getElementById('highlightColor').value= '#FFD700';
  document.getElementById('highlightColorHex').value='#FFD700';
  document.getElementById('headlineSize').value  = 42;
  document.getElementById('subtitleSize').value  = 16;
  document.getElementById('featureSize').value   = 13;
  document.getElementById('phoneTilt').value     = -3;
  document.getElementById('phoneSize').value     = 220;
  document.getElementById('glowIntensity').value = 30;
  ['showTopBar','showFooter','showBgCircles',
   'showSparkles','showPhoneFrame','showLifeStages'].forEach(id => {
    document.getElementById(id).checked = true;
  });
  updateDesign();
  updateBanner();
  showNotification('↺ Reset complete!');
}

/* ===== SAVE DESIGN ===== */
function saveDesign() {
  const s = AppState;
  const design = {
    id: Date.now(),
    name: `Design ${s.savedDesigns.length + 1}`,
    templateId: s.currentTemplateId,
    badge:    document.getElementById('badgeText').value,
    h1:       document.getElementById('headline1').value,
    h2:       document.getElementById('headline2').value,
    subtitle: document.getElementById('subtitle').value,
    features: [...s.features],
    badges:   JSON.parse(JSON.stringify(s.badges)),
    github:   document.getElementById('githubLink').value,
    author:   document.getElementById('authorName').value,
    time:     new Date().toLocaleTimeString()
  };
  s.savedDesigns.push(design);
  renderSavedDesigns();
  showNotification('💾 Design saved!');
}

function copyDesign() {
  saveDesign();
  showNotification('📋 Duplicated & saved!');
}

/* ===== LOAD SAVED ===== */
function loadSaved(i) {
  const d = AppState.savedDesigns[i];
  document.getElementById('badgeText').value  = d.badge;
  document.getElementById('headline1').value  = d.h1;
  document.getElementById('headline2').value  = d.h2;
  document.getElementById('subtitle').value   = d.subtitle;
  document.getElementById('githubLink').value = d.github;
  document.getElementById('authorName').value = d.author;
  AppState.features = [...d.features];
  AppState.badges   = JSON.parse(JSON.stringify(d.badges));
  renderFeatureList();
  renderBadgeList();
  applyTemplate(d.templateId || AppState.currentTemplateId);
  showNotification('📂 Design loaded!');
}

function deleteSaved(i) {
  AppState.savedDesigns.splice(i, 1);
  renderSavedDesigns();
  showNotification('🗑️ Design deleted');
}

function renderSavedDesigns() {
  const c = document.getElementById('savedDesigns');
  if (!AppState.savedDesigns.length) {
    c.innerHTML = '<p class="help-text">No saved designs yet.</p>';
    return;
  }
  c.innerHTML = AppState.savedDesigns.map((d,i) => `
    <div class="saved-design-card">
      <div class="saved-design-name">${d.name}</div>
      <div class="saved-design-meta">${d.h1} ${d.h2} · ${d.time}</div>
      <div class="saved-design-actions">
        <button class="btn btn-secondary sm-btn" onclick="loadSaved(${i})">Load</button>
        <button class="btn btn-danger sm-btn" onclick="deleteSaved(${i})">✕</button>
      </div>
    </div>
  `).join('');
}