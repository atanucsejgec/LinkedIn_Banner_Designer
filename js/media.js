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