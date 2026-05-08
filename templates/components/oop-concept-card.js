/* ============================================
   OOP-CONCEPT-CARD.JS — OOP concept badge cards
   Usage: ${oopConceptCard(concept, icon, color, desc)}
          ${oopConceptGrid(concepts, accentColor, hlColor)}
   ============================================ */
"use strict";

registerComponent({
    id: 'oop-concept-card',
    name: 'OOP Concept Card',
    description: 'Small glass card showing an OOP concept with icon + description',
    cssClass: 'comp-oop-card',
    render: function oopConceptCard(concept, icon, color, desc, small) {
        concept = concept || 'Interface';
        icon = icon || '🧩';
        color = color || '#7F52FF';
        desc = desc || '';
        small = small || false;

        const pad = small ? '10px 14px' : '13px 18px';
        const fs = small ? '12px' : '13.5px';
        const iconF = small ? '18px' : '22px';

        return `
      <div class="comp-oop-card" style="
        background:${color}14;
        border:1.5px solid ${color}50;
        border-radius:12px;
        padding:${pad};
        display:flex;align-items:center;gap:10px;
        box-shadow:0 0 16px ${color}22, inset 0 1px 0 ${color}30;
        backdrop-filter:blur(8px);
        position:relative;overflow:hidden;">
        <!-- top-left corner accent -->
        <div style="
          position:absolute;top:0;left:0;
          width:30px;height:2px;
          background:linear-gradient(90deg,${color},transparent);
          border-radius:0 0 4px 0;"></div>
        <span style="font-size:${iconF};line-height:1;flex-shrink:0;">${icon}</span>
        <div style="display:flex;flex-direction:column;gap:1px;min-width:0;">
          <span style="
            font-size:${fs};font-weight:800;
            color:${color};letter-spacing:0.5px;
            font-family:'Poppins','Montserrat',sans-serif;
            white-space:nowrap;">
            ${concept}
          </span>
          ${desc ? `<span style="font-size:10.5px;color:#AAA;line-height:1.3;">${desc}</span>` : ''}
        </div>
      </div>
    `;
    }
});

// ─── Grid of OOP concept cards ─────────────────────────────────────
registerComponent({
    id: 'oop-concept-grid',
    name: 'OOP Concept Grid',
    description: 'Responsive 2-column grid of OOP concept cards',
    cssClass: 'comp-oop-grid',
    render: function oopConceptGrid(concepts, accentColor, hlColor, cols, small) {
        // concepts = [{name, icon, color, desc}, ...]
        concepts = concepts || [];
        accentColor = accentColor || '#7F52FF';
        hlColor = hlColor || '#03DAC5';
        cols = cols || 2;
        small = small || false;

        const gap = small ? '8px' : '10px';

        return `
      <div class="comp-oop-grid" style="
        display:grid;
        grid-template-columns:repeat(${cols}, 1fr);
        gap:${gap};
        width:100%;">
        ${concepts.map(c =>
            oopConceptCard(c.name, c.icon, c.color || accentColor, c.desc || '', small)
        ).join('')}
      </div>
    `;
    }
});