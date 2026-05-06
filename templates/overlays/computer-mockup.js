/* ============================================
   COMPUTER-MOCKUP.JS — Laptop / Monitor mockup
   Draws a laptop/monitor frame overlay that can
   show a screenshot or the banner itself
   ============================================ */
"use strict";

registerOverlay({
  id: 'computer-mockup',
  name: 'Computer Mockup',
  icon: '💻',
  category: 'mockup',
  controls: [
    { id: 'screenshot', type: 'file', label: 'Screen Content (optional)', value: '' },
    { id: 'width', type: 'range', label: 'Width', min: 200, max: 700, value: 400, suffix: 'px' },
    { id: 'opacity', type: 'range', label: 'Opacity', min: 30, max: 100, value: 95, suffix: '%' },
    {
      id: 'position', type: 'select', label: 'Position',
      value: 'right',
      options: [
        { value: 'left',   label: '← Left' },
        { value: 'center', label: '⊙ Center' },
        { value: 'right',  label: '→ Right' }
      ]
    },
    { id: 'offsetY', type: 'range', label: 'Vertical Offset', min: -100, max: 200, value: 40, suffix: 'px' },
    { id: 'tilt', type: 'range', label: 'Tilt', min: -15, max: 15, value: -3, suffix: '°' },
    {
      id: 'device', type: 'select', label: 'Device Type',
      value: 'laptop',
      options: [
        { value: 'laptop',  label: '💻 Laptop' },
        { value: 'monitor', label: '🖥️ Monitor' },
        { value: 'browser', label: '🌐 Browser Window' }
      ]
    }
  ],
  render(colors, state) {
    const w = state.width || 400;
    const op = (state.opacity || 95) / 100;
    const pos = state.position || 'right';
    const oy = state.offsetY || 40;
    const tilt = state.tilt || 0;
    const device = state.device || 'laptop';
    const screenSrc = state.screenshot || '';

    // Compute screen dimensions
    const screenW = w;
    const screenH = Math.round(w * 0.625); // 16:10 ratio
    const bezelT = device === 'browser' ? 36 : 10;
    const bezelS = 8;
    const totalH = screenH + bezelT + 10;

    // Position
    let posStyle = '';
    switch (pos) {
      case 'left':   posStyle = `left:30px;`; break;
      case 'center': posStyle = `left:50%;margin-left:-${w / 2}px;`; break;
      case 'right':  posStyle = `right:30px;`; break;
    }

    // Screen content
    const screenContent = screenSrc
      ? `<img src="${screenSrc}" style="width:100%;height:100%;object-fit:cover;">`
      : `<div style="width:100%;height:100%;
           background:linear-gradient(135deg,${colors.bg1},${colors.bg2});
           display:flex;align-items:center;justify-content:center;color:#666;font-size:12px;">
           Upload content →
         </div>`;

    // Browser chrome
    const browserBar = device === 'browser' ? `
      <div style="height:${bezelT}px;background:#1e1e2e;
        display:flex;align-items:center;padding:0 12px;gap:8px;
        border-bottom:1px solid rgba(255,255,255,0.1);">
        <div style="width:10px;height:10px;border-radius:50%;background:#ff5f56;"></div>
        <div style="width:10px;height:10px;border-radius:50%;background:#ffbd2e;"></div>
        <div style="width:10px;height:10px;border-radius:50%;background:#27ca40;"></div>
        <div style="flex:1;margin-left:10px;height:20px;
          background:rgba(255,255,255,0.08);border-radius:10px;"></div>
      </div>
    ` : '';

    // Laptop base
    const laptopBase = device === 'laptop' ? `
      <div style="width:${w + 40}px;height:14px;margin:-2px auto 0;
        background:linear-gradient(180deg,#2a2a3a,#1a1a28);
        border-radius:0 0 8px 8px;
        box-shadow:0 4px 12px rgba(0,0,0,0.5);"></div>
      <div style="width:${w + 80}px;height:6px;margin:0 auto;
        background:linear-gradient(180deg,#222230,#18182a);
        border-radius:0 0 4px 4px;"></div>
    ` : '';

    // Monitor stand
    const monitorStand = device === 'monitor' ? `
      <div style="width:40px;height:30px;margin:0 auto;
        background:linear-gradient(180deg,#2a2a3a,#1a1a28);"></div>
      <div style="width:80px;height:8px;margin:0 auto;
        background:#2a2a3a;border-radius:4px;"></div>
    ` : '';

    return `
      <div style="position:absolute;${posStyle}top:${oy}px;
        transform:rotate(${tilt}deg);opacity:${op};
        pointer-events:none;z-index:5;">
        <div style="width:${screenW}px;
          background:#1a1a28;border-radius:${device === 'browser' ? '10px' : '8px'};
          overflow:hidden;
          border:${bezelS}px solid #222233;
          box-shadow:0 20px 60px rgba(0,0,0,0.7),
            0 0 0 1px rgba(255,255,255,0.05),
            0 0 40px ${colors.a1}22;">
          ${browserBar}
          <div style="width:100%;height:${screenH}px;overflow:hidden;
            background:#0a0a12;">
            ${screenContent}
          </div>
        </div>
        ${laptopBase}
        ${monitorStand}
      </div>
    `;
  }
});
