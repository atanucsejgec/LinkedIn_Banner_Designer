/* ============================================
   FLOATING-FEAT-TAGS.JS — Floating feature tags
   that orbit around a central element.
   Usage: ${floatingFeatTags(tags, accentColor, hlColor, side)}
   side: 'left' | 'right' (which side to stack)
   ============================================ */
"use strict";

registerComponent({
  id: 'floating-feat-tags',
  name: 'Floating Feature Tags',
  description: 'Stacked floating checkmark feature tags for phone mockup surrounds',
  cssClass: 'comp-float-tags',
  render: function floatingFeatTags(tags, accentColor, hlColor, side) {
    side = side || 'left';
    accentColor = accentColor || '#3DDC84';
    hlColor = hlColor || '#FFD700';

    const items = (tags || []).slice(0, 6);

    /* Stagger each tag slightly so they feel hand-placed */
    const offsets = [
      { top: '6%', shift: side === 'left' ? '-6px' : '6px' },
      { top: '20%', shift: side === 'left' ? '4px' : '-4px' },
      { top: '35%', shift: side === 'left' ? '-2px' : '2px' },
      { top: '50%', shift: side === 'left' ? '6px' : '-6px' },
      { top: '65%', shift: side === 'left' ? '-4px' : '4px' },
      { top: '79%', shift: side === 'left' ? '2px' : '-2px' },
    ];

    const alignStyle = side === 'left'
      ? 'align-items:flex-end; right:0;'
      : 'align-items:flex-start; left:0;';

    return `
      <div class="comp-float-tags" style="${alignStyle}">
        ${items.map((tag, i) => {
      const off = offsets[i] || { top: `${i * 16}%`, shift: '0px' };
      return `
            <div class="comp-float-tag-pill"
              style="
                top:${off.top};
                transform:translateX(${off.shift});
                border-color:${accentColor}55;
                animation-delay:${i * 0.18}s;
              ">
              <span class="comp-float-tag-check"
                style="color:${accentColor};text-shadow:0 0 8px ${accentColor}88;">✅</span>
              <span class="comp-float-tag-text">${tag}</span>
            </div>
          `;
    }).join('')}
      </div>
    `;
  }
});