/* ============================================
   LAPTOP-FRAME.JS — Reusable laptop mockup frame
   Usage in template render():
     ${laptopFrame(screenshotSrc, width, tiltDeg, glowColor)}
   ============================================ */
"use strict";

registerComponent({
  id: 'laptop-frame',
  name: 'Laptop Frame',
  description: 'Laptop/MacBook style device mockup with screen content',
  cssClass: 'comp-laptop',
  render: function laptopFrame(src, width, tiltDeg, glowColor) {
    const w = width || 400;
    const screenH = Math.round(w * 0.625);
    const tilt = tiltDeg || 0;
    const gc = glowColor || '#6750A4';

    const screenContent = src
      ? `<img src="${src}" class="comp-laptop-screen-img" alt="screen">`
      : `<div class="comp-laptop-placeholder">
           <span style="font-size:24px;">💻</span>
           <span>Upload content</span>
         </div>`;

    return `
      <div class="comp-laptop-wrap" style="transform:rotate(${tilt}deg);">
        <div class="comp-laptop-body" style="
          width:${w}px;
          box-shadow:0 20px 60px rgba(0,0,0,0.7), 0 0 40px ${gc}22;">
          <div class="comp-laptop-bezel">
            <div class="comp-laptop-camera"></div>
          </div>
          <div class="comp-laptop-screen" style="height:${screenH}px;">
            ${screenContent}
          </div>
        </div>
        <div class="comp-laptop-base" style="width:${w + 40}px;"></div>
        <div class="comp-laptop-base-edge" style="width:${w + 80}px;"></div>
      </div>
    `;
  }
});
