/* ============================================
   POLAROID-CARD.JS — Reusable polaroid photo card
   Usage in template render():
     ${polaroidCard(screenshotSrc, width, tiltDeg, shadowColor)}
   ============================================ */
"use strict";

registerComponent({
  id: 'polaroid-card',
  name: 'Polaroid Card',
  description: 'White-bordered photo card with shadow, tilt, and optional caption',
  cssClass: 'comp-polaroid',
  render: function polaroidCard(src, width, tiltDeg, shadowColor, caption) {
    const w = width || 160;
    const h = Math.round(w * 1.8);
    const tilt = tiltDeg || 0;
    const sc = shadowColor || 'rgba(0,0,0,0.5)';

    const imgContent = src
      ? `<img src="${src}" class="comp-polaroid-img" alt="screenshot">`
      : `<div class="comp-polaroid-placeholder">📱</div>`;

    return `
      <div class="comp-polaroid" style="
        width:${w + 24}px;
        transform:rotate(${tilt}deg);
        box-shadow:0 8px 32px ${sc}, 0 0 20px ${sc}33;">
        <div class="comp-polaroid-frame" style="width:${w}px;height:${h}px;">
          ${imgContent}
        </div>
        ${caption ? `<div class="comp-polaroid-caption">${caption}</div>` : ''}
      </div>
    `;
  }
});
