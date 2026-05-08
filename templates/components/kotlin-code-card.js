/* ============================================
   KOTLIN-CODE-CARD.JS — Syntax highlighted Kotlin
   code block. All styles inline for renderer safety.
   Usage: ${kotlinCodeCard(lines, accentColor, width)}
   ============================================ */
"use strict";

registerComponent({
  id: 'kotlin-code-card',
  name: 'Kotlin Code Card',
  description: 'Syntax-highlighted Kotlin code block',
  cssClass: 'comp-kotlin-card',
  render: function kotlinCodeCard(lines, accentColor, width) {
    accentColor = accentColor || '#3DDC84';
    width       = width       || 320;

    const TOKEN = {
      keyword : '#FF7AB2',
      fn      : '#6BDFFF',
      var     : '#DABAFF',
      string  : '#CAFFB9',
      comment : '#7E8E9A',
      plain   : '#F0F0F0',
      number  : '#FFB347',
      type    : '#FFE066',
      punct   : '#A8B8C8',
    };

    const renderLine = (line, idx) => {
      const indentPx = (line.indent || 0) * 14;
      let inner = '';
      if (line.tokens && line.tokens.length) {
        inner = line.tokens.map(tok => {
          const col  = TOKEN[tok.type] || TOKEN.plain;
          const safe = (tok.text || '')
            .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
          return `<span style="color:${col};">${safe}</span>`;
        }).join('');
      } else {
        const col  = TOKEN[line.type] || TOKEN.plain;
        const safe = (line.text || '')
          .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        inner = `<span style="color:${col};">${safe}</span>`;
      }
      return `<div style="
          padding-left:${indentPx}px;
          font-size:11.5px;
          line-height:1.72;
          font-family:'Fira Code','Cascadia Code','JetBrains Mono','Courier New',monospace;
          white-space:pre;
          display:block;
        ">${inner}</div>`;
    };

    const gutterLines = (lines || []).map((_, i) => `
      <div style="
        font-size:10px;line-height:1.72;
        color:#3A4A56;
        font-family:'Fira Code','Courier New',monospace;
        text-align:right;user-select:none;
        padding-right:10px;">
        ${i + 1}
      </div>`).join('');

    return `
      <div style="
        width:${width}px;
        border-radius:10px;
        border:1px solid ${accentColor}55;
        background:#0D1117;
        overflow:hidden;
        box-shadow:0 0 24px ${accentColor}1A,0 4px 20px rgba(0,0,0,0.6);">

        <!-- Title bar -->
        <div style="
          display:flex;align-items:center;gap:6px;
          padding:7px 12px;
          background:#161B22;
          border-bottom:1px solid ${accentColor}33;">
          <span style="width:10px;height:10px;border-radius:50%;
            background:#FF5F57;display:inline-block;flex-shrink:0;"></span>
          <span style="width:10px;height:10px;border-radius:50%;
            background:#FFBD2E;display:inline-block;flex-shrink:0;"></span>
          <span style="width:10px;height:10px;border-radius:50%;
            background:#28CA41;display:inline-block;flex-shrink:0;"></span>
          <span style="
            font-size:9px;font-weight:700;letter-spacing:1.2px;
            text-transform:uppercase;color:${accentColor};
            border:1px solid ${accentColor}66;border-radius:4px;
            padding:1px 6px;margin-left:8px;background:${accentColor}11;">
            Kotlin
          </span>
          <span style="font-size:10px;color:#4A5568;margin-left:auto;font-style:italic;">
            GradeTracker.kt
          </span>
        </div>

        <!-- Code body -->
        <div style="display:flex;padding:10px 0 12px;background:#0D1117;">
          <div style="padding:0 4px 0 12px;border-right:1px solid #1E2A36;flex-shrink:0;">
            ${gutterLines}
          </div>
          <div style="padding:0 14px;flex:1;overflow:hidden;">
            ${(lines || []).map(renderLine).join('')}
          </div>
        </div>

        <!-- Bottom accent -->
        <div style="height:2px;
          background:linear-gradient(90deg,transparent,${accentColor},transparent);"></div>
      </div>`;
  }
});