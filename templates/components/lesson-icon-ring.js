/* ============================================
   LESSON-ICON-RING.JS — Glowing icon ring for carousel lessons
   Usage: ${lessonIconRing(emoji, accentColor, size)}
   ============================================ */
"use strict";

registerComponent({
    id: 'lesson-icon-ring',
    name: 'Lesson Icon Ring',
    description: 'Large glowing circular icon for carousel lesson slides',
    cssClass: 'comp-lir',
    render: function lessonIconRing(emoji, accentColor, size) {
        const ac = accentColor || '#FACC15';
        const sz = size || 110;
        const inner = Math.round(sz * 0.72);
        const font = Math.round(sz * 0.38);
        return `
      <div class="comp-lir" style="
        width:${sz}px;height:${sz}px;
        --lir-ac:${ac};
        box-shadow:0 0 ${Math.round(sz * 0.32)}px ${ac}55,
                   0 0 ${Math.round(sz * 0.6)}px ${ac}22;
        border:2.5px solid ${ac}88;
      ">
        <div class="comp-lir-inner" style="
          width:${inner}px;height:${inner}px;
          font-size:${font}px;
          background:radial-gradient(circle at 40% 35%,${ac}22,transparent 70%);
          border:1.5px solid ${ac}44;
        ">
          ${emoji}
        </div>
        <!-- rotating ring dashes -->
        <svg class="comp-lir-ring" viewBox="0 0 100 100"
          style="width:${sz}px;height:${sz}px;">
          <circle cx="50" cy="50" r="46"
            fill="none" stroke="${ac}" stroke-width="1"
            stroke-dasharray="4 8" stroke-linecap="round" opacity="0.5"/>
        </svg>
      </div>
    `;
    }
});