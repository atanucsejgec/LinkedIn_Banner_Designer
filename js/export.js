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
    showNotification(`✅ Downloaded! (${AppState.bannerW}×${AppState.bannerH} @2x)`);
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

  // Hide interaction UI for clean export
  const ciEls = banner.querySelectorAll('.ci-handles-container, .ci-grid-overlay, .ci-guide, .ci-dimension-tip, .ci-position-tip');
  ciEls.forEach(el => el.style.display = 'none');
  const selectedEl = banner.querySelector('.ci-selected');
  if (selectedEl) selectedEl.classList.remove('ci-selected');

  // Fix text clipping and standalone transforms (rotate/scale) for html2canvas
  const exportFixes = prepareForExport(banner);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      html2canvas(banner, {
        width:           AppState.bannerW,
        height:          AppState.bannerH,
        scale:           2,
        useCORS:         true,
        allowTaint:      true,
        backgroundColor: null,
        logging:         false,
        imageTimeout:    8000,
        ignoreElements:  (el) => {
          return el.classList && (
            el.classList.contains('ci-handles-container') ||
            el.classList.contains('ci-grid-overlay') ||
            el.classList.contains('ci-guide') ||
            el.classList.contains('ci-dimension-tip') ||
            el.classList.contains('ci-position-tip')
          );
        }
      }).then(canvas => {
        wrapper.style.transform = origTx;
        // Restore interaction UI
        ciEls.forEach(el => el.style.display = '');
        restoreAfterExport(exportFixes);
        resolve(canvas);
      }).catch(err => {
        wrapper.style.transform = origTx;
        ciEls.forEach(el => el.style.display = '');
        if (selectedEl) selectedEl.classList.add('ci-selected');
        restoreAfterExport(exportFixes);
        reject(err);
      });
    }, 120);
  });
}

/* ===== EXPORT LAYERS (separate PNGs for each element) ===== */
function exportLayers() {
  showNotification('⏳ Exporting layers...');

  const banner = document.getElementById('bannerCanvas');
  const wrapper = document.getElementById('canvasWrapper');
  if (!banner || !wrapper) return;

  const origTx = wrapper.style.transform;
  wrapper.style.transform = 'scale(1)';

  // Hide interaction UI
  const ciEls = banner.querySelectorAll('.ci-handles-container, .ci-grid-overlay, .ci-guide, .ci-dimension-tip, .ci-position-tip');
  ciEls.forEach(el => el.style.display = 'none');
  const selectedEl = banner.querySelector('.ci-selected');
  if (selectedEl) selectedEl.classList.remove('ci-selected');

  // Get all direct children that are actual content
  const children = Array.from(banner.children).filter(child => {
    return !child.classList.contains('ci-handles-container') &&
           !child.classList.contains('ci-grid-overlay') &&
           !child.classList.contains('ci-guide') &&
           !child.classList.contains('ci-dimension-tip') &&
           !child.classList.contains('ci-position-tip');
  }).sort((a, b) => {
    const za = parseInt(window.getComputedStyle(a).zIndex) || 0;
    const zb = parseInt(window.getComputedStyle(b).zIndex) || 0;
    if (za !== zb) return za - zb;
    return (+a.dataset.domIdx || 0) - (+b.dataset.domIdx || 0);
  }).reverse();

  const origDisplay = children.map(c => c.style.display);
  const h2cOpts = {
    width: AppState.bannerW,
    height: AppState.bannerH,
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
    ignoreElements: (el) => el.classList && (
      el.classList.contains('ci-handles-container') ||
      el.classList.contains('ci-grid-overlay') ||
      el.classList.contains('ci-guide')
    )
  };

  // Download full composite first
  const fullFixes = prepareForExport(banner);
  html2canvas(banner, h2cOpts).then(canvas => {
    restoreAfterExport(fullFixes);
    triggerDownload(canvas, 'banner-full.png');
    return exportNextLayer(banner, children, origDisplay, h2cOpts, 0, 1);
  }).then(count => {
    children.forEach((c, i) => c.style.display = origDisplay[i]);
    wrapper.style.transform = origTx;
    ciEls.forEach(el => el.style.display = '');
    if (selectedEl) selectedEl.classList.add('ci-selected');
    showNotification(`✅ Exported ${count} files! Import each layer into Canva.`);
  }).catch(err => {
    console.error(err);
    children.forEach((c, i) => c.style.display = origDisplay[i]);
    wrapper.style.transform = origTx;
    ciEls.forEach(el => el.style.display = '');
    if (selectedEl) selectedEl.classList.add('ci-selected');
    showNotification('⚠️ Layer export failed.');
  });
}

function exportNextLayer(banner, children, origDisplay, h2cOpts, index, count) {
  if (index >= children.length) return Promise.resolve(count);

  const child = children[index];
  if (child.offsetWidth < 5 || child.offsetHeight < 5) {
    return exportNextLayer(banner, children, origDisplay, h2cOpts, index + 1, count);
  }

  // Hide all others, show only current
  children.forEach((c, i) => c.style.display = i === index ? origDisplay[i] : 'none');

  // Fix text clipping & transforms for layer export
  const exportFixes = prepareForExport(banner);

  return new Promise(r => setTimeout(r, 80)).then(() => {
    return html2canvas(banner, h2cOpts);
  }).then(canvas => {
    restoreAfterExport(exportFixes);

    // Crop to actual non-transparent bounding box
    const cropped = cropToContent(canvas);
    if (cropped) {
      const name = getLayerName(child, index);
      triggerDownload(cropped, `layer-${(index+1).toString().padStart(2,'0')}-${name}.png`);
      count++;
    }
    children.forEach((c, i) => c.style.display = origDisplay[i]);
    return exportNextLayer(banner, children, origDisplay, h2cOpts, index + 1, count);
  });
}

function getLayerName(el, idx) {
  const text = (el.textContent || '').trim().slice(0, 20).replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/ +/g, '-').toLowerCase();
  if (text) return text;
  const style = el.getAttribute('style') || '';
  if (style.includes('inset:0') || style.includes('inset: 0')) return 'background';
  if (el.classList.contains('glow-blob')) return 'glow';
  if (el.classList.contains('sparkle')) return 'sparkle';
  if (el.classList.contains('banner-footer-bar')) return 'footer';
  return 'element-' + idx;
}

/* ===== CROP TO CONTENT — finds tight bounding box of non-transparent pixels ===== */
function cropToContent(canvas) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const data = ctx.getImageData(0, 0, w, h).data;

  let minX = w, minY = h, maxX = 0, maxY = 0;
  let hasPixels = false;

  // Scan every 4th pixel for speed (alpha channel check)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const alpha = data[(y * w + x) * 4 + 3];
      if (alpha > 10) {
        hasPixels = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!hasPixels) return null;

  // Add small padding (4px at 2x scale = 2px visual)
  const pad = 4;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  const croppedCanvas = document.createElement('canvas');
  croppedCanvas.width = cropW;
  croppedCanvas.height = cropH;
  const croppedCtx = croppedCanvas.getContext('2d');
  croppedCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

  return croppedCanvas;
}

/* ===== EXPORT FIXES — Prevent clipping & Support Transforms ===== */
function prepareForExport(banner) {
  const fixes = [];

  // Fix the banner canvas itself
  const origBannerOverflow = banner.style.overflow;
  banner.style.overflow = 'visible';
  fixes.push({ el: banner, prop: 'overflow', orig: origBannerOverflow });

  // Fix all inner elements that may clip text or have standalone transforms
  const allEls = banner.querySelectorAll('*');
  allEls.forEach(el => {
    const computed = window.getComputedStyle(el);
    const fix = { el, props: [] };
    let changed = false;

    // 1. Text clipping fix
    if (computed.overflow === 'hidden' || computed.textOverflow === 'ellipsis') {
      fix.props.push({ prop: 'overflow', orig: el.style.overflow });
      fix.props.push({ prop: 'textOverflow', orig: el.style.textOverflow });
      fix.props.push({ prop: 'whiteSpace', orig: el.style.whiteSpace });
      fix.props.push({ prop: 'wordWrap', orig: el.style.wordWrap });

      el.style.overflow = 'visible';
      el.style.textOverflow = 'clip';
      el.style.wordWrap = 'break-word';
      changed = true;
    }

    // 2. html2canvas standalone property support (rotate/scale -> transform)
    if (el.style.rotate || el.style.scale) {
      fix.props.push({ prop: 'transform', orig: el.style.transform });
      fix.props.push({ prop: 'rotate', orig: el.style.rotate });
      fix.props.push({ prop: 'scale', orig: el.style.scale });

      let newTx = el.style.transform || '';
      if (el.style.rotate) newTx += ` rotate(${el.style.rotate})`;
      if (el.style.scale) newTx += ` scale(${el.style.scale})`;
      
      el.style.transform = newTx.trim();
      el.style.rotate = '';
      el.style.scale = '';
      changed = true;
    }

    if (changed) fixes.push(fix);
  });

  return fixes;
}

function restoreAfterExport(fixes) {
  fixes.forEach(fix => {
    if (fix.prop) {
      fix.el.style[fix.prop] = fix.orig;
    }
    if (fix.props) {
      fix.props.forEach(p => {
        fix.el.style[p.prop] = p.orig;
      });
    }
  });
}

function triggerDownload(canvas, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
}

/* ===== COPY BANNER TO CLIPBOARD ===== */
function copyBannerToClipboard() {
  showNotification('⏳ Copying to clipboard...');
  generateCanvas().then(canvas => {
    canvas.toBlob(blob => {
      if (!blob) { showNotification('⚠️ Clipboard copy failed.'); return; }
      const item = new ClipboardItem({ 'image/png': blob });
      navigator.clipboard.write([item]).then(() => {
        showNotification('✅ Copied! Paste directly into Canva (Ctrl+V).');
      }).catch(() => {
        showNotification('⚠️ Clipboard access denied. Try downloading.');
      });
    }, 'image/png');
  }).catch(() => showNotification('⚠️ Failed to copy.'));
}

/* ===== OPEN CANVA ===== */
function openCanva() {
  window.open('https://www.canva.com/', '_blank');
  showNotification('🎨 Canva opened! Create a custom size design and import your layers.');
}

/* ===== SHOW CANVA EXPORT MODAL ===== */
function showCanvaExportModal() {
  document.getElementById('canvaExportModal').classList.add('show');
}