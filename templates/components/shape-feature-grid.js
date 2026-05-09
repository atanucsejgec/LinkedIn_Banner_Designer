/* ============================================
   SHAPE-FEATURE-GRID.JS — 3-column mini feature grid
   Usage: ${shapeFeatureGrid(items, accentColor, bgColor)}
   items = [{ icon, title, sub }]
   ============================================ */
"use strict";

registerComponent({
    id: 'shape-feature-grid',
    name: 'Shape Feature Grid',
    description: '3-column mini feature blocks with icon, title, subtitle',
    cssClass: 'comp-sfg',
    render: function shapeFeatureGrid(items, accentColor, bgColor) {
        const acc = accentColor || '#2962FF';
        const bg = bgColor || 'rgba(255,255,255,0.06)';

        const cells = (items || []).slice(0, 3).map(item => `
      <div class="comp-sfg-cell" style="background:${bg};">
        <div class="comp-sfg-icon" style="color:${acc};">${item.icon || '📌'}</div>
        <div class="comp-sfg-title">${item.title || ''}</div>
        <div class="comp-sfg-sub">${item.sub || ''}</div>
      </div>
    `).join('');

        return `
      <div class="comp-sfg-wrap">
        ${cells}
      </div>
    `;
    }
});