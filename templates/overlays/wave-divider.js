/* ============================================
   WAVE-DIVIDER.JS — Wave / curved shape divider
   Adds a decorative wave or curve to the banner
   ============================================ */
"use strict";

registerOverlay({
  id: 'wave-divider',
  name: 'Wave Divider',
  icon: '🌊',
  category: 'style',
  controls: [
    { id: 'height', type: 'range', label: 'Wave Height', min: 20, max: 150, value: 60, suffix: 'px' },
    { id: 'opacity', type: 'range', label: 'Opacity', min: 10, max: 100, value: 40, suffix: '%' },
    { id: 'color', type: 'color', label: 'Wave Color', value: '#6750A4' },
    {
      id: 'position', type: 'select', label: 'Position',
      value: 'bottom',
      options: [
        { value: 'top',    label: '↑ Top' },
        { value: 'middle', label: '↔ Middle' },
        { value: 'bottom', label: '↓ Bottom (above footer)' }
      ]
    },
    {
      id: 'shape', type: 'select', label: 'Shape',
      value: 'wave',
      options: [
        { value: 'wave',   label: '〰 Wave' },
        { value: 'curve',  label: '⌒ Curve' },
        { value: 'zigzag', label: '⩘ Zigzag' },
        { value: 'slant',  label: '╲ Slant' }
      ]
    }
  ],
  render(colors, state) {
    const h = state.height || 60;
    const op = (state.opacity || 40) / 100;
    const col = state.color || colors.a1;
    const pos = state.position || 'bottom';
    const shape = state.shape || 'wave';

    // Calculate vertical position
    let topPx;
    switch (pos) {
      case 'top':    topPx = 5; break;
      case 'middle': topPx = Math.round((627 - 62) / 2 - h / 2); break;
      case 'bottom': topPx = 627 - 62 - h; break;
    }

    // SVG paths
    let svgContent;
    switch (shape) {
      case 'wave':
        svgContent = `<path d="M0,${h * 0.6} C240,0 480,${h} 720,${h * 0.4} C960,0 1080,${h * 0.8} 1200,${h * 0.3} L1200,${h} L0,${h} Z" fill="${col}"/>`;
        break;
      case 'curve':
        svgContent = `<path d="M0,${h} C300,0 900,0 1200,${h} Z" fill="${col}"/>`;
        break;
      case 'zigzag':
        const pts = [];
        const segments = 12;
        const segW = 1200 / segments;
        for (let i = 0; i <= segments; i++) {
          pts.push(`${i * segW},${i % 2 === 0 ? 0 : h}`);
        }
        svgContent = `<polygon points="${pts.join(' ')} 1200,${h} 0,${h}" fill="${col}"/>`;
        break;
      case 'slant':
        svgContent = `<polygon points="0,${h} 1200,0 1200,${h}" fill="${col}"/>`;
        break;
    }

    return `
      <div style="position:absolute;left:0;right:0;top:${topPx}px;
        height:${h}px;opacity:${op};pointer-events:none;overflow:hidden;">
        <svg viewBox="0 0 1200 ${h}" preserveAspectRatio="none"
             style="width:100%;height:100%;">
          ${svgContent}
        </svg>
      </div>
    `;
  }
});
