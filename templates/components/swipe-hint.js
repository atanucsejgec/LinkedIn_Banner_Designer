/* ============================================
   SWIPE-HINT.JS — "Swipe for more" animated hint arrow
   Usage: ${swipeHint(label, accentColor)}
   ============================================ */
"use strict";

registerComponent({
    id: 'swipe-hint',
    name: 'Swipe Hint',
    description: 'Animated swipe-right hint for carousel slides',
    cssClass: 'comp-swipe',
    render: function swipeHint(label, accentColor) {
        const ac = accentColor || '#03DAC5';
        const txt = label || 'Swipe →';
        return `
      <div class="comp-swipe" style="--swipe-ac:${ac};">
        <span class="comp-swipe-label">${txt}</span>
        <span class="comp-swipe-arrow">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <path d="M1 8h18M13 2l7 6-7 6" stroke="${ac}"
              stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    `;
    }
});