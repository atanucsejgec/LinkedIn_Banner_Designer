/* ============================================
   CODE-SNIPPET-CARD.JS — Animated terminal code card
   Usage: ${codeSnippetCard(lines, accentColor, width)}
   lines = [{type:'keyword'|'fn'|'string'|'comment'|'plain', text}]
   ============================================ */
"use strict";

registerComponent({
    id: 'code-snippet-card',
    name: 'Code Snippet Card',
    description: 'A styled terminal window showing syntax-highlighted code',
    cssClass: 'comp-code-snippet-card',
    render: function codeSnippetCard(lines, accentColor, width) {
        const ac = accentColor || '#6750A4';
        const w = width || 420;

        const colorMap = {
            keyword: '#C792EA',
            fn: '#82AAFF',
            string: '#C3E88D',
            comment: '#546E7A',
            var: '#F78C6C',
            plain: '#CDD3DE',
            accent: ac,
        };

        const safeLines = Array.isArray(lines) ? lines : [];

        return `
      <div class="comp-code-snippet-card" style="width:${w}px;">

        <!-- Title bar -->
        <div class="comp-csc-titlebar" style="border-bottom:1px solid ${ac}33;">
          <span class="terminal-dot" style="background:#FF5F57;"></span>
          <span class="terminal-dot" style="background:#FEBC2E;"></span>
          <span class="terminal-dot" style="background:#28C840;"></span>
          <span class="comp-csc-filename" style="color:${ac};">main.kt</span>
        </div>

        <!-- Code lines -->
        <div class="comp-csc-body">
          ${safeLines.map((line, i) => {
            // Support indent via leading spaces encoded as level
            const indent = '  '.repeat(line.indent || 0);
            const col = colorMap[line.type] || colorMap.plain;
            return `
              <div class="comp-csc-line">
                <span class="comp-csc-linenum">${String(i + 1).padStart(2, ' ')}</span>
                <span class="comp-csc-code" style="color:${col};">
                  ${indent}${line.text}
                </span>
              </div>
            `;
        }).join('')}
          <!-- blinking cursor line -->
          <div class="comp-csc-line">
            <span class="comp-csc-linenum">${safeLines.length + 1}</span>
            <span class="comp-csc-cursor" style="background:${ac};"></span>
          </div>
        </div>

      </div>
    `;
    }
});