/* ============================================
   GLASS-CARD.JS — Frosted glass card component
   Usage in template render():
     ${glassCard(title, body, accentColor, icon)}
   ============================================ */
"use strict";

registerComponent({
  id: 'glass-card',
  name: 'Glass Card',
  description: 'Frosted glass / glassmorphism card with accent top-border',
  cssClass: 'comp-glass-card',
  render: function glassCard(title, body, accentColor, icon) {
    const ac = accentColor || '#6750A4';
    const ic = icon || '✦';

    return `
      <div class="comp-glass-card" style="
        border-top:2px solid ${ac};
        box-shadow:0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05);">
        <div class="comp-glass-card-icon" style="
          background:${ac}22;border:1px solid ${ac}44;">
          ${ic}
        </div>
        <div class="comp-glass-card-title">${title || ''}</div>
        ${body ? `<div class="comp-glass-card-body">${body}</div>` : ''}
      </div>
    `;
  }
});
