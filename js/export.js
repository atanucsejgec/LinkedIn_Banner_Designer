/* ============================================
   EXPORT.JS — PNG download, preview modal
   ============================================ */
"use strict";

/* ===== SHOW PREVIEW ===== */
function showPreview() {
  generateCanvas().then(canvas => {
    document.getElementById('previewImg').src = canvas.toDataURL('image/png');
    document.getElementById('previewModal').classList.add('show');
  }).catch(() => showNotification('⚠️ Preview failed'));
}

/* ===== DOWNLOAD PNG ===== */
function downloadBanner() {
  showNotification('⏳ Generating PNG...');

  generateCanvas().then(canvas => {
    const link      = document.createElement('a');
    link.download   = `linkedin-banner-${Date.now()}.png`;
    link.href       = canvas.toDataURL('image/png', 1.0);
    link.click();
    showNotification('✅ Downloaded! (1200×627 @2x)');
  }).catch(err => {
    console.error(err);
    showNotification('⚠️ Download failed. Try again.');
  });
}

/* ===== GENERATE CANVAS ===== */
function generateCanvas() {
  const banner   = document.getElementById('bannerCanvas');
  const wrapper  = document.getElementById('canvasWrapper');
  const origTx   = wrapper.style.transform;

  wrapper.style.transform = 'scale(1)';

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      html2canvas(banner, {
        width:           1200,
        height:          627,
        scale:           2,
        useCORS:         true,
        allowTaint:      true,
        backgroundColor: null,
        logging:         false,
        imageTimeout:    8000
      }).then(canvas => {
        wrapper.style.transform = origTx;
        resolve(canvas);
      }).catch(err => {
        wrapper.style.transform = origTx;
        reject(err);
      });
    }, 120);
  });
}