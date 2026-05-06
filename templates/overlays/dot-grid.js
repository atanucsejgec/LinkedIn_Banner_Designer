/* ============================================
   DOT-GRID.JS — Dot grid pattern overlay
   Adds a subtle dot pattern across the banner
   ============================================ */
"use strict";

registerOverlay({
  id: 'dot-grid',
  name: 'Dot Grid',
  icon: '⊞',
  category: 'style',
  controls: [
    { id: 'spacing', type: 'range', label: 'Spacing', min: 10, max: 80, value: 30, suffix: 'px' },
    { id: 'dotSize', type: 'range', label: 'Dot Size', min: 1, max: 6, value: 2, suffix: 'px' },
    { id: 'opacity', type: 'range', label: 'Opacity', min: 3, max: 50, value: 10, suffix: '%' },
    { id: 'color', type: 'color', label: 'Dot Color', value: '#ffffff' }
  ],
  render(colors, state) {
    const sp = state.spacing || 30;
    const ds = state.dotSize || 2;
    const op = (state.opacity || 10) / 100;
    const col = state.color || '#ffffff';

    return `
      <div style="position:absolute;inset:0;pointer-events:none;opacity:${op};
        background-image:radial-gradient(circle, ${col} ${ds}px, transparent ${ds}px);
        background-size:${sp}px ${sp}px;
        background-position:${sp / 2}px ${sp / 2}px;"></div>
    `;
  }
});
