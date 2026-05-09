/* ============================================
   CAROUSEL-SLIDE-BADGE.JS — Slide number badge
   Usage: ${carouselSlideBadge(current, total, accentColor)}
   ============================================ */
"use strict";

registerComponent({
    id: 'carousel-slide-badge',
    name: 'Carousel Slide Badge',
    description: 'Slide number indicator pill for carousel posts',
    cssClass: 'comp-csb',
    render: function carouselSlideBadge(current, total, accentColor) {
        const ac = accentColor || '#7F52FF';
        return `
      <div class="comp-csb" style="--csb-ac:${ac};">
        <span class="comp-csb-num">${current}</span>
        <span class="comp-csb-sep">/</span>
        <span class="comp-csb-tot">${total}</span>
      </div>
    `;
    }
});