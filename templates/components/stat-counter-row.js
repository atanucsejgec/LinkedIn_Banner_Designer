/* ============================================
   STAT-COUNTER-ROW.JS — GitHub stat metrics row
   Usage: ${statCounterRow(stats, accentColor, hlColor)}
   stats = [{icon, value, label}, ...]
   ============================================ */
"use strict";

registerComponent({
    id: 'stat-counter-row',
    name: 'Stat Counter Row',
    description: 'A row of GitHub-style stat counters (stars, forks, etc.)',
    cssClass: 'comp-stat-counter-row',
    render: function statCounterRow(stats, accentColor, hlColor) {
        const ac = accentColor || '#6750A4';
        const hl = hlColor || '#FFD700';
        const items = Array.isArray(stats) ? stats.slice(0, 4) : [];

        return `
      <div class="comp-stat-counter-row">
        ${items.map((s, i) => `
          <div class="comp-stat-counter-item" style="
            border-left: 2px solid ${i === 0 ? hl : ac}55;
          ">
            <span class="comp-stat-icon">${s.icon || '⭐'}</span>
            <span class="comp-stat-value" style="color:${i === 0 ? hl : '#fff'};">
              ${s.value || '0'}
            </span>
            <span class="comp-stat-label">${s.label || ''}</span>
          </div>
        `).join('')}
      </div>
    `;
    }
});