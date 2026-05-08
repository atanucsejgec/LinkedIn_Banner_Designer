/* ============================================
   GRADIENT-TEXT.JS — SVG-based gradient text
   Works correctly in preview & download.
   Usage: ${gradientText(text, color1, color2, fontSize, fontWeight, direction, letterSpacing)}
   Usage: ${gradientTextLines(lines, color1, color2, fontSize, fontWeight, letterSpacing, lineGap)}
   ============================================ */
"use strict";

registerComponent({
  id: 'gradient-text',
  name: 'Gradient Text',
  description: 'SVG gradient text — works in preview and download',
  cssClass: 'comp-gradient-text',
  render: function gradientText(
    text, color1, color2, fontSize, fontWeight, direction, letterSpacing
  ) {
    text          = text          || 'Hello';
    color1        = color1        || '#FFFFFF';
    color2        = color2        || '#3DDC84';
    fontSize      = fontSize      || 48;
    fontWeight    = fontWeight    || 900;
    direction     = direction     || 'horizontal';
    letterSpacing = letterSpacing || 0;

    const uid = 'gg' + Math.random().toString(36).slice(2, 7);

    const dirs = {
      horizontal : { x1:'0%', y1:'0%', x2:'100%', y2:'0%'   },
      diagonal   : { x1:'0%', y1:'0%', x2:'100%', y2:'100%' },
      vertical   : { x1:'0%', y1:'0%', x2:'0%',   y2:'100%' },
    };
    const dir = dirs[direction] || dirs.horizontal;

    const charW = fontSize * 0.65;
    const svgW  = Math.ceil(text.length * charW + fontSize * 1.4);
    const svgH  = Math.ceil(fontSize * 1.4);
    const baseY = Math.ceil(fontSize * 1.05);

    return `<svg xmlns="http://www.w3.org/2000/svg"
        width="${svgW}" height="${svgH}"
        viewBox="0 0 ${svgW} ${svgH}"
        style="display:block;overflow:visible;">
        <defs>
          <linearGradient id="${uid}" x1="${dir.x1}" y1="${dir.y1}"
            x2="${dir.x2}" y2="${dir.y2}">
            <stop offset="0%"   stop-color="${color1}"/>
            <stop offset="100%" stop-color="${color2}"/>
          </linearGradient>
        </defs>
        <text x="0" y="${baseY}"
          fill="url(#${uid})"
          font-size="${fontSize}"
          font-weight="${fontWeight}"
          font-family="Inter,Segoe UI,Arial Black,Arial,sans-serif"
          letter-spacing="${letterSpacing}"
          text-anchor="start"
        >${text}</text>
      </svg>`;
  }
});

registerComponent({
  id: 'gradient-text-lines',
  name: 'Gradient Text Lines',
  description: 'Multi-line SVG gradient text for big headlines',
  cssClass: 'comp-gradient-text',
  render: function gradientTextLines(
    lines, color1, color2, fontSize, fontWeight, letterSpacing, lineGap
  ) {
    lines         = lines         || ['TEXT'];
    color1        = color1        || '#FFFFFF';
    color2        = color2        || '#3DDC84';
    fontSize      = fontSize      || 48;
    fontWeight    = fontWeight    || 900;
    letterSpacing = letterSpacing || -1;
    lineGap       = lineGap       || Math.round(fontSize * 0.18);

    const uid    = 'gl' + Math.random().toString(36).slice(2, 7);
    const maxLen = Math.max(...lines.map(l => l.length));
    const charW  = fontSize * 0.65;
    const svgW   = Math.ceil(maxLen * charW + fontSize * 1.4);
    const lineH  = fontSize + lineGap;
    const svgH   = Math.ceil(lineH * lines.length + fontSize * 0.35);

    const textEls = lines.map((line, i) => {
      const y = Math.ceil(fontSize + i * lineH);
      return `<text x="0" y="${y}"
          fill="url(#${uid})"
          font-size="${fontSize}"
          font-weight="${fontWeight}"
          font-family="Inter,Segoe UI,Arial Black,Arial,sans-serif"
          letter-spacing="${letterSpacing}"
          text-anchor="start"
        >${line}</text>`;
    }).join('');

    return `<svg xmlns="http://www.w3.org/2000/svg"
        width="${svgW}" height="${svgH}"
        viewBox="0 0 ${svgW} ${svgH}"
        style="display:block;overflow:visible;">
        <defs>
          <linearGradient id="${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stop-color="${color1}"/>
            <stop offset="100%" stop-color="${color2}"/>
          </linearGradient>
        </defs>
        ${textEls}
      </svg>`;
  }
});