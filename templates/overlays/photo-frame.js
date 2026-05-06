/* ============================================
   PHOTO-FRAME.JS — Photo / Logo overlay
   Adds a user-uploaded photo with frame styling
   (e.g., profile picture, company logo)
   ============================================ */
"use strict";

registerOverlay({
  id: 'photo-frame',
  name: 'Photo / Logo',
  icon: '📷',
  category: 'photo',
  controls: [
    { id: 'image', type: 'file', label: 'Upload Photo / Logo', value: '' },
    { id: 'size', type: 'range', label: 'Size', min: 30, max: 200, value: 80, suffix: 'px' },
    { id: 'borderRadius', type: 'range', label: 'Roundness', min: 0, max: 50, value: 50, suffix: '%' },
    { id: 'borderWidth', type: 'range', label: 'Border Width', min: 0, max: 6, value: 3, suffix: 'px' },
    { id: 'borderColor', type: 'color', label: 'Border Color', value: '#FFD700' },
    { id: 'opacity', type: 'range', label: 'Opacity', min: 20, max: 100, value: 100, suffix: '%' },
    {
      id: 'position', type: 'select', label: 'Position',
      value: 'top-right',
      options: [
        { value: 'top-left',     label: '↖ Top Left' },
        { value: 'top-right',    label: '↗ Top Right' },
        { value: 'bottom-left',  label: '↙ Bottom Left' },
        { value: 'bottom-right', label: '↘ Bottom Right' },
        { value: 'center-left',  label: '← Center Left' },
        { value: 'center-right', label: '→ Center Right' }
      ]
    },
    { id: 'offsetX', type: 'range', label: 'Offset X', min: -100, max: 200, value: 20, suffix: 'px' },
    { id: 'offsetY', type: 'range', label: 'Offset Y', min: -100, max: 200, value: 20, suffix: 'px' }
  ],
  render(colors, state) {
    if (!state.image) {
      return `<div style="position:absolute;top:16px;right:16px;
        width:60px;height:60px;border-radius:50%;
        border:2px dashed rgba(255,255,255,0.3);
        display:flex;align-items:center;justify-content:center;
        font-size:20px;pointer-events:none;opacity:0.4;">📷</div>`;
    }

    const sz = state.size || 80;
    const br = state.borderRadius || 50;
    const bw = state.borderWidth || 3;
    const bc = state.borderColor || colors.hl;
    const op = (state.opacity || 100) / 100;
    const pos = state.position || 'top-right';
    const ox = state.offsetX || 20;
    const oy = state.offsetY || 20;

    // Position mapping
    let posStyle = '';
    switch (pos) {
      case 'top-left':     posStyle = `top:${oy}px;left:${ox}px;`; break;
      case 'top-right':    posStyle = `top:${oy}px;right:${ox}px;`; break;
      case 'bottom-left':  posStyle = `bottom:${oy + 62}px;left:${ox}px;`; break;
      case 'bottom-right': posStyle = `bottom:${oy + 62}px;right:${ox}px;`; break;
      case 'center-left':  posStyle = `top:50%;left:${ox}px;transform:translateY(-50%);`; break;
      case 'center-right': posStyle = `top:50%;right:${ox}px;transform:translateY(-50%);`; break;
    }

    return `
      <div style="position:absolute;${posStyle}
        width:${sz}px;height:${sz}px;border-radius:${br}%;
        border:${bw}px solid ${bc};overflow:hidden;
        box-shadow:0 4px 20px rgba(0,0,0,0.5);
        opacity:${op};pointer-events:none;">
        <img src="${state.image}" alt="overlay"
             style="width:100%;height:100%;object-fit:cover;">
      </div>
    `;
  }
});
