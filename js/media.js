/* ============================================
   MEDIA.JS — Screenshot upload slots,
              slot management, slot UI
   ============================================ */
"use strict";

/* ===== BUILD SCREENSHOT SLOTS ===== */
function buildScreenshotSlots() {
  const container = document.getElementById('screenshotSlots');
  container.innerHTML = [1,2,3].map((n,i) => `
    <div class="screenshot-slot" id="slot-${i}">
      <div class="slot-label">📱 Screenshot ${n}
        ${i===0?'<span style="color:#03DAC5;">(Primary)</span>':'(Optional)'}
      </div>
      <div class="slot-drop-zone" onclick="triggerSlot(${i})">
        <input type="file" accept="image/*" id="slotInput-${i}"
               onchange="handleSlotUpload(event,${i})">
        <div class="slot-icon">🖼️</div>
        <div class="slot-text">Click to upload<br>
          <small>PNG / JPG</small></div>
      </div>
      <img class="slot-preview-img" id="slotPreview-${i}" alt="Preview ${n}">
      <div class="slot-actions">
        <button class="btn btn-secondary" onclick="removeSlot(${i})">✕ Remove</button>
        <button class="btn btn-secondary" onclick="triggerSlot(${i})">↑ Change</button>
      </div>
    </div>
  `).join('');
}

/* ===== UPDATE HOW MANY SLOTS ARE VISIBLE ===== */
function updateScreenshotSlots(count) {
  [0,1,2].forEach(i => {
    const slot = document.getElementById('slot-'+i);
    if (!slot) return;
    slot.style.display = (count === 0 || i < count) ? 'block' : 'none';
  });
}

/* ===== TRIGGER FILE INPUT ===== */
function triggerSlot(i) {
  document.getElementById('slotInput-'+i).click();
}

/* ===== HANDLE UPLOAD ===== */
function handleSlotUpload(event, index) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    AppState.screenshots[index] = e.target.result;

    const slot    = document.getElementById('slot-'+index);
    const preview = document.getElementById('slotPreview-'+index);
    preview.src   = e.target.result;
    slot.classList.add('has-image');

    renderBanner();
    showNotification(`📸 Screenshot ${index+1} uploaded!`);
  };
  reader.readAsDataURL(file);
}

/* ===== REMOVE SLOT ===== */
function removeSlot(index) {
  AppState.screenshots[index] = null;

  const slot    = document.getElementById('slot-'+index);
  const preview = document.getElementById('slotPreview-'+index);
  const input   = document.getElementById('slotInput-'+index);

  preview.src = '';
  if (input) input.value = '';
  slot.classList.remove('has-image');

  renderBanner();
  showNotification(`🗑️ Screenshot ${index+1} removed`);
}

/* ===== CUSTOM IMAGES ===== */
function handleCustomImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    if (!AppState.customImages) AppState.customImages = [];
    AppState.customImages.push({
      src: e.target.result,
      w: 200,
      x: AppState.bannerW/2 - 100,
      y: AppState.bannerH/2 - 100
    });
    event.target.value = ''; 
    renderCustomImageThumbs();
    renderBanner();
    showNotification('🖼️ Custom image layer added!');
  };
  reader.readAsDataURL(file);
}

function removeCustomImage(index) {
  AppState.customImages.splice(index, 1);
  renderCustomImageThumbs();
  renderBanner();
  showNotification('🗑️ Image layer removed');
}

function renderCustomImageThumbs() {
  const c = document.getElementById('customImageThumbs');
  if (!c) return;
  if (!AppState.customImages || !AppState.customImages.length) {
    c.innerHTML = '';
    return;
  }
  c.innerHTML = AppState.customImages.map((img, i) => `
    <div style="position:relative; width:48px; height:48px; border-radius:4px; overflow:hidden; border:1px solid rgba(255,255,255,0.1); background:#000;">
      <img src="${img.src}" style="width:100%; height:100%; object-fit:contain;">
      <button onclick="removeCustomImage(${i})" style="position:absolute; top:2px; right:2px; background:rgba(220,53,69,0.9); color:#fff; border:none; border-radius:50%; width:18px; height:18px; font-size:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; line-height:1;">×</button>
    </div>
  `).join('');
}

/* ===== CUSTOM TEXT ===== */
function toggleTextGrad() {
  const isGrad = document.getElementById('customTextGradient').checked;
  document.getElementById('customTextColor2').style.display = isGrad ? 'block' : 'none';
  document.getElementById('customTextDir').style.display = isGrad ? 'block' : 'none';
}

function addCustomText() {
  const text = document.getElementById('customTextInput').value;
  if (!text.trim()) return;
  const color = document.getElementById('customTextColor').value;
  const color2 = document.getElementById('customTextColor2').value;
  const dir = document.getElementById('customTextDir').value;
  const isGrad = document.getElementById('customTextGradient').checked;
  if (!AppState.customTexts) AppState.customTexts = [];
  AppState.customTexts.push({
    text: text,
    color: color,
    color2: color2,
    dir: dir,
    isGrad: isGrad,
    x: AppState.bannerW/2 - 50,
    y: AppState.bannerH/2 - 20,
    s: 42
  });
  document.getElementById('customTextInput').value = '';
  renderBanner();
  showNotification('📝 Text layer added!');
}