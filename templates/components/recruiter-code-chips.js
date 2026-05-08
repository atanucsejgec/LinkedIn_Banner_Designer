/* ============================================
   CODE-CHIP-STRIP.JS — Renders tech tag chips
   Usage: ${codeChipStrip(tags, accentColor)}
   ============================================ */
"use strict";

registerComponent({
  id: 'code-chip-strip',
  name: 'Code Chip Strip',
  description: 'Renders an array of strings as styled code tag chips.',
  cssClass: 'comp-code-chip-strip',
  render: function codeChipStrip(tags, accentColor) {

    const ac      = accentColor || '#03DAC5';
    const tagList = tags        || ['[Kotlin]', '[Compose]'];

    return `
      <div class="comp-code-chip-strip">
        ${tagList.map(tag => `
          <div
            class="comp-code-chip"
            style="
              color:        ${ac};
              border-color: ${ac}55;
              background:   ${ac}15;
            "
          >${tag}</div>
        `).join('')}
      </div>
    `;
  }
});