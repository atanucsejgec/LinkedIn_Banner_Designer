/* ============================================
   VIGNETTE.JS — Vignette effect overlay
   Adds a dark vignette around the edges
   ============================================ */
"use strict";

registerOverlay({
  id: 'vignette',
  name: 'Vignette',
  icon: '🔲',
  category: 'style',
  controls: [
    { id: 'intensity', type: 'range', label: 'Intensity', min: 10, max: 100, value: 50, suffix: '%' },
    { id: 'spread', type: 'range', label: 'Spread', min: 20, max: 90, value: 60, suffix: '%' },
    { id: 'color', type: 'color', label: 'Color', value: '#000000' }
  ],
  render(colors, state) {
    const intensity = (state.intensity || 50) / 100;
    const spread = state.spread || 60;
    const col = state.color || '#000000';

    return `
      <div style="position:absolute;inset:0;pointer-events:none;
        background:radial-gradient(ellipse at center,
          transparent ${spread - 20}%,
          ${col}${Math.round(intensity * 180).toString(16).padStart(2, '0')} ${spread}%,
          ${col}${Math.round(intensity * 255).toString(16).padStart(2, '0')} 100%);"></div>
    `;
  }
});
