/* ============================================
   GRADE-FLOAT-CARD.JS — Floating grade UI cards
   Usage: ${gradeFloatCard(icon, label, value, badge, accentColor, bgColor)}
   ============================================ */
"use strict";

registerComponent({
  id: 'grade-float-card',
  name: 'Grade Float Card',
  description: 'Floating UI card showing subject grade info with emoji icon and badge',
  cssClass: 'comp-grade-float-card',
  render: function gradeFloatCard(icon, label, value, badge, accentColor, bgColor) {
    const ac  = accentColor || '#7F52FF';
    const bg  = bgColor     || 'rgba(255,255,255,0.07)';
    const ic  = icon        || '📊';
    const lbl = label       || 'Subject';
    const val = value       || '—';
    const bdg = badge       || '';

    const badgeHtml = bdg ? `
      <span class="comp-grade-float-card-badge" style="background:${ac}22;color:${ac};border:1px solid ${ac}55;">
        ${bdg}
      </span>` : '';

    return `
      <div class="comp-grade-float-card" style="background:${bg};border:1px solid ${ac}33;">
        <div class="comp-grade-float-card-top">
          <span class="comp-grade-float-card-icon">${ic}</span>
          ${badgeHtml}
        </div>
        <div class="comp-grade-float-card-label">${lbl}</div>
        <div class="comp-grade-float-card-value" style="color:${ac};">${val}</div>
      </div>
    `;
  }
});