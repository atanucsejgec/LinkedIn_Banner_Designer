/* ============================================
   INTERNSHIP-BADGE.JS — Bold internship CTA badge
   Usage: ${internshipBadge(text, bgColor, textColor, accentColor)}
   ============================================ */
"use strict";

registerComponent({
  id: 'internship-badge',
  name: 'Internship Badge',
  description: 'Bold highlighted rectangle badge for internship/CTA signals',
  cssClass: 'comp-internship-badge',
  render: function internshipBadge(text, bgColor, textColor, accentColor) {
    const bg   = bgColor    || '#3DDC84';
    const tc   = textColor  || '#FFFFFF';
    const ac   = accentColor|| '#00C853';

    return `
      <div class="comp-internship-badge" style="
        background: linear-gradient(135deg, ${bg}, ${ac});
        color: ${tc};
      ">
        <span class="comp-internship-badge-icon">🚀</span>
        <span class="comp-internship-badge-text">${text || 'Seeking Internship'}</span>
        <div class="comp-internship-badge-shine"></div>
      </div>
    `;
  }
});