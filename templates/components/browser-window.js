/* ============================================
   BROWSER-WINDOW.JS — Browser window mockup
   Usage in template render():
     ${browserWindow(screenshotSrc, width, url, glowColor)}
   ============================================ */
"use strict";

registerComponent({
  id: 'browser-window',
  name: 'Browser Window',
  description: 'Chrome/Safari style browser window with traffic lights and URL bar',
  cssClass: 'comp-browser',
  render: function browserWindow(src, width, url, glowColor) {
    const w = width || 500;
    const screenH = Math.round(w * 0.6);
    const gc = glowColor || '#6750A4';
    const displayUrl = url || 'https://example.com';

    const screenContent = src
      ? `<img src="${src}" class="comp-browser-content-img" alt="browser">`
      : `<div class="comp-browser-placeholder">
           <span style="font-size:24px;">🌐</span>
           <span>Upload content</span>
         </div>`;

    return `
      <div class="comp-browser-wrap" style="
        width:${w}px;
        box-shadow:0 20px 60px rgba(0,0,0,0.7), 0 0 30px ${gc}22;">
        <div class="comp-browser-chrome">
          <div class="comp-browser-dots">
            <span class="comp-browser-dot" style="background:#ff5f56;"></span>
            <span class="comp-browser-dot" style="background:#ffbd2e;"></span>
            <span class="comp-browser-dot" style="background:#27ca40;"></span>
          </div>
          <div class="comp-browser-url-bar">${displayUrl}</div>
        </div>
        <div class="comp-browser-content" style="height:${screenH}px;">
          ${screenContent}
        </div>
      </div>
    `;
  }
});
