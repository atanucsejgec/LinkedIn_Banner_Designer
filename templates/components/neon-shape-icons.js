/* ============================================
   NEON-SHAPE-ICONS.JS — Animated neon SVG shapes
   Usage: ${neonShapeIcon(shape, color, size, glowColor)}
          ${neonShapeRow(shapes, accentColor)}
   ============================================ */
"use strict";

registerComponent({
    id: 'neon-shape-icons',
    name: 'Neon Shape Icons',
    description: 'Animated neon circle, rectangle, triangle with glow',
    cssClass: 'comp-neon-shape',
    render: function neonShapeIcon(shape, color, size, label) {
        size = size || 90;
        color = color || '#FF4466';
        label = label || shape;
        const glow = color;
        const id = `nsh_${shape}_${Math.random().toString(36).slice(2, 7)}`;

        let svgInner = '';
        if (shape === 'circle') {
            const r = size * 0.38;
            const cx = size / 2;
            svgInner = `
        <circle cx="${cx}" cy="${cx}" r="${r}"
          fill="none" stroke="${color}" stroke-width="3.5"
          filter="url(#${id}_glow)" opacity="0.95"/>
        <circle cx="${cx}" cy="${cx}" r="${r * 0.55}"
          fill="${color}22"/>
      `;
        } else if (shape === 'rect') {
            const pad = size * 0.14;
            const w = size - pad * 2;
            const h = (size - pad * 2) * 0.65;
            const y = (size - h) / 2;
            svgInner = `
        <rect x="${pad}" y="${y}" width="${w}" height="${h}" rx="6"
          fill="none" stroke="${color}" stroke-width="3.5"
          filter="url(#${id}_glow)" opacity="0.95"/>
        <rect x="${pad + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" rx="3"
          fill="${color}18"/>
      `;
        } else if (shape === 'triangle') {
            const pad = size * 0.1;
            const bx = pad, by = size - pad;
            const tx = size / 2, ty = pad;
            const rx2 = size - pad;
            svgInner = `
        <polygon points="${tx},${ty} ${rx2},${by} ${bx},${by}"
          fill="none" stroke="${color}" stroke-width="3.5"
          stroke-linejoin="round"
          filter="url(#${id}_glow)" opacity="0.95"/>
        <polygon points="${tx},${ty + 14} ${rx2 - 12},${by - 10} ${bx + 12},${by - 10}"
          fill="${color}18"/>
      `;
        }

        return `
      <div class="comp-neon-shape" style="
        display:flex;flex-direction:column;align-items:center;gap:10px;">
        <div class="comp-neon-shape-wrap" style="
          width:${size + 20}px;height:${size + 20}px;
          display:flex;align-items:center;justify-content:center;
          border-radius:${shape === 'circle' ? '50%' : '18px'};
          background:${color}12;
          border:1.5px solid ${color}44;
          box-shadow:0 0 18px ${color}33, 0 0 40px ${color}18;
          position:relative;">
          <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"
            xmlns="http://www.w3.org/2000/svg"
            class="comp-neon-shape-svg">
            <defs>
              <filter id="${id}_glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3.5" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            ${svgInner}
          </svg>
        </div>
        <span class="comp-neon-shape-label" style="
          color:${color};
          font-size:13px;font-weight:700;
          letter-spacing:1.5px;text-transform:uppercase;
          text-shadow:0 0 10px ${color}88;">
          ${label}
        </span>
      </div>
    `;
    }
});

// ─── Row of 3 shapes ───────────────────────────────────────────────
registerComponent({
    id: 'neon-shape-row',
    name: 'Neon Shape Row',
    description: 'Three neon shapes in a row: circle, rect, triangle',
    cssClass: 'comp-neon-shape-row',
    render: function neonShapeRow(size, colors, labels) {
        size = size || 88;
        colors = colors || ['#FF4455', '#4488FF', '#44FF88'];
        labels = labels || ['Circle', 'Rectangle', 'Triangle'];
        const shapes = ['circle', 'rect', 'triangle'];

        return `
      <div class="comp-neon-shape-row" style="
        display:flex;align-items:flex-start;
        justify-content:center;gap:32px;">
        ${shapes.map((s, i) =>
            neonShapeIcon(s, colors[i], size, labels[i])
        ).join('')}
      </div>
    `;
    }
});