/* ============================================
   EDITOR.JS — Content editing, features,
               badges, design controls,
               theme application, banner render
   ============================================ */
"use strict";

/* ===== GET CURRENT STATE FROM INPUTS ===== */
function collectState() {
  return {
    badge:        document.getElementById('badgeText').value   || '',
    h1:           document.getElementById('headline1').value   || '',
    h2:           document.getElementById('headline2').value   || '',
    subtitle:     document.getElementById('subtitle').value    || '',
    description:  document.getElementById('description').value || '',
    lifeStages:   document.getElementById('lifeStages').value  || '',
    showLifeStages: document.getElementById('showLifeStages').checked,
    github:       document.getElementById('githubLink').value  || '',
    author:       document.getElementById('authorName').value  || '',
    features:     [...AppState.features],
    badges:       [...AppState.badges],
  };
}

/* ===== GET CURRENT COLORS FROM INPUTS ===== */
function collectColors() {
  return {
    bg1:     document.getElementById('bgColor1').value,
    bg2:     document.getElementById('bgColor2').value,
    gradDir: document.getElementById('gradientDir').value,
    a1:      document.getElementById('accentColor1').value,
    a2:      document.getElementById('accentColor2').value,
    hl:      document.getElementById('highlightColor').value,
  };
}

/* ===== RENDER BANNER ===== */
function renderBanner() {
  const tmpl = TEMPLATES.find(t => t.id === AppState.currentTemplateId);
  if (!tmpl) return;

  const phoneW = parseInt(document.getElementById('phoneSize').value) || 220;
  const tilt   = parseFloat(document.getElementById('phoneTilt').value) || -3;
  const glow   = parseInt(document.getElementById('glowIntensity').value) || 30;

  const data = {
    state:       collectState(),
    colors:      collectColors(),
    screenshots: AppState.screenshots,
    phoneW,
    phoneTilt: tilt,
    glowOpacity: glow,
    hs: parseInt(document.getElementById('headlineSize').value) || 42,
    ss: parseInt(document.getElementById('subtitleSize').value) || 16,
    fs: parseInt(document.getElementById('featureSize').value)  || 13,
    bannerW: AppState.bannerW,
    bannerH: AppState.bannerH,
  };

  let bannerHtml = tmpl.render(data);

  // Append active overlay layers
  if (typeof renderOverlays === 'function') {
    bannerHtml += renderOverlays(data.colors);
  }

  // ADD CUSTOM IMAGES HERE
  if (AppState.customImages && AppState.customImages.length > 0) {
    AppState.customImages.forEach((img, idx) => {
       bannerHtml += `<img src="${img.src}" class="ci-custom-image" data-ci-idx="custom-img-${idx}" style="position:absolute; left:${img.x}px; top:${img.y}px; width:${img.w}px; height:auto; z-index:100; user-select:none; -webkit-user-drag:none;">`;
    });
  }

  // ADD CUSTOM TEXTS HERE
  if (AppState.customTexts && AppState.customTexts.length > 0) {
    AppState.customTexts.forEach((ct, idx) => {
       const style = `position:absolute; left:${ct.x}px; top:${ct.y}px; font-size:${ct.s}px; z-index:101; font-weight:bold; white-space:nowrap;`;
       let colorStyle = `color: ${ct.color};`;
       if (ct.isGrad) {
           const c2 = ct.color2 || '#FFFFFF';
           const dir = ct.dir || 'to right';
           colorStyle = `background: linear-gradient(${dir}, ${ct.color}, ${c2}); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`;
       }
       bannerHtml += `<div class="ci-custom-text" data-ci-idx="custom-text-${idx}" style="${style} ${colorStyle}">${escHtml(ct.text)}</div>`;
    });
  }

  document.getElementById('bannerCanvas').innerHTML = bannerHtml;
  if (typeof applyDeletions === 'function') applyDeletions();
  setStatus('Banner rendered ✓');

  // Initialize canvas interaction (select, move, resize, guides)
  if (typeof initCanvasInteraction === 'function') {
    setTimeout(() => initCanvasInteraction(), 0);
  }
}

/* ===== UPDATE BANNER (called by content inputs) ===== */
function updateBanner() {
  renderBanner();
}

/* ===== UPDATE DESIGN (called by design inputs) ===== */
function updateDesign() {
  // Sync hex text fields
  ['bgColor1','bgColor2','accentColor1','accentColor2','highlightColor'].forEach(id => {
    document.getElementById(id+'Hex').value = document.getElementById(id).value;
  });
  // Update range labels
  const rv = (id,sfx) => {
    const v = document.getElementById(id).value;
    document.getElementById(id+'Val').textContent = v+sfx;
    return v;
  };
  rv('headlineSize','px'); rv('subtitleSize','px'); rv('featureSize','px');
  rv('phoneTilt','°'); rv('phoneSize',''); rv('glowIntensity','%');

  renderBanner();
}

/* ===== SYNC HEX COLOR INPUT ===== */
function syncColor(id) {
  const hexEl   = document.getElementById(id+'Hex');
  const colorEl = document.getElementById(id);
  if (/^#[0-9A-Fa-f]{6}$/.test(hexEl.value)) {
    colorEl.value = hexEl.value;
    updateDesign();
  }
}

/* ===== FEATURES ===== */
function renderFeatureList() {
  const list = document.getElementById('featureList');
  list.innerHTML = AppState.features.map((f,i) => `
    <div class="feature-item">
      <span style="color:#03DAC5;font-size:14px;">✅</span>
      <input type="text" value="${escHtml(f)}"
             oninput="AppState.features[${i}]=this.value;renderBanner()">
      <button class="remove-feature" onclick="removeFeature(${i})">×</button>
    </div>
  `).join('');
}

function addFeature() {
  const inp = document.getElementById('newFeature');
  if (!inp.value.trim()) return;
  AppState.features.push(inp.value.trim());
  inp.value = '';
  renderFeatureList();
  renderBanner();
  showNotification('✅ Feature added!');
}

function removeFeature(i) {
  AppState.features.splice(i,1);
  renderFeatureList();
  renderBanner();
}

/* ===== BADGES ===== */
function renderBadgeList() {
  const list = document.getElementById('badgeList');
  list.innerHTML = AppState.badges.map((b,i) => `
    <div class="badge-item">
      <span style="width:8px;height:8px;border-radius:50%;
        background:${b.color};display:inline-block;flex-shrink:0;"></span>
      ${escHtml(b.label)}
      <button class="remove-badge" onclick="removeBadge(${i})">×</button>
    </div>
  `).join('');
}

function addBadge() {
  const inp   = document.getElementById('newBadge');
  const color = document.getElementById('newBadgeColor').value;
  if (!inp.value.trim()) return;
  AppState.badges.push({ label: inp.value.trim(), color });
  inp.value = '';
  renderBadgeList();
  renderBanner();
  showNotification('🏷️ Badge added!');
}

function removeBadge(i) {
  AppState.badges.splice(i,1);
  renderBadgeList();
  renderBanner();
}

/* ===== THEMES ===== */
const THEMES = {
  purple: { bg1:'#1C1B1F',bg2:'#2D1B69',a1:'#6750A4',a2:'#03DAC5',hl:'#FFD700' },
  blue:   { bg1:'#0d1117',bg2:'#1f4068',a1:'#1f6feb',a2:'#58a6ff',hl:'#ffa657' },
  ocean:  { bg1:'#0f2027',bg2:'#2c5364',a1:'#20B2AA',a2:'#00CED1',hl:'#7FFFD4' },
  green:  { bg1:'#1a1a1a',bg2:'#1b5e20',a1:'#4CAF50',a2:'#3DDC84',hl:'#B2FF59' },
  orange: { bg1:'#2d1b00',bg2:'#3e2000',a1:'#FF6F00',a2:'#FFA000',hl:'#FFD54F' },
  pink:   { bg1:'#1a0533',bg2:'#4a0080',a1:'#e040fb',a2:'#f48fb1',hl:'#ff80ab' },
};

function applyTheme(name, card) {
  const t = THEMES[name];
  if (!t) return;
  const set = (id,v) => {
    document.getElementById(id).value = v;
    document.getElementById(id+'Hex').value = v;
  };
  set('bgColor1',bg1=t.bg1); set('bgColor2',t.bg2);
  set('accentColor1',t.a1); set('accentColor2',t.a2);
  set('highlightColor',t.hl);

  // Simpler inline assignment
  document.getElementById('bgColor1').value = t.bg1;
  document.getElementById('bgColor1Hex').value = t.bg1;
  document.getElementById('bgColor2').value = t.bg2;
  document.getElementById('bgColor2Hex').value = t.bg2;
  document.getElementById('accentColor1').value = t.a1;
  document.getElementById('accentColor1Hex').value = t.a1;
  document.getElementById('accentColor2').value = t.a2;
  document.getElementById('accentColor2Hex').value = t.a2;
  document.getElementById('highlightColor').value = t.hl;
  document.getElementById('highlightColorHex').value = t.hl;

  document.querySelectorAll('.template-card').forEach(c => {
    c.classList.toggle('selected', c.dataset && c.dataset.theme===name);
  });
  updateDesign();
  showNotification('🎨 Theme: ' + name);
}

/* ===== HELPER ===== */
function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}