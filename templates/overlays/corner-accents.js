/* ============================================
   CORNER-ACCENTS.JS — Corner accent decorations
   Adds decorative corner brackets / accents
   ============================================ */
"use strict";

registerOverlay({
  id: 'corner-accents',
  name: 'Corner Accents',
  icon: '◰',
  category: 'decoration',
  controls: [
    { id: 'size', type: 'range', label: 'Size', min: 20, max: 120, value: 50, suffix: 'px' },
    { id: 'thickness', type: 'range', label: 'Thickness', min: 1, max: 6, value: 2, suffix: 'px' },
    { id: 'opacity', type: 'range', label: 'Opacity', min: 10, max: 100, value: 60, suffix: '%' },
    { id: 'color', type: 'color', label: 'Color', value: '#FFD700' },
    {
      id: 'style', type: 'select', label: 'Style',
      value: 'brackets',
      options: [
        { value: 'brackets', label: '┌ Brackets' },
        { value: 'rounded',  label: '╭ Rounded' },
        { value: 'dots',     label: '● Dot Corners' },
        { value: 'crosses',  label: '✚ Cross Corners' }
      ]
    }
  ],
  render(colors, state) {
    const s = state.size || 50;
    const t = state.thickness || 2;
    const op = (state.opacity || 60) / 100;
    const col = state.color || colors.hl;
    const style = state.style || 'brackets';
    const margin = 14;
    const br = style === 'rounded' ? '12px' : '0';

    if (style === 'dots') {
      const dotSize = Math.max(6, s / 5);
      return `
        <div style="position:absolute;top:${margin}px;left:${margin}px;width:${dotSize}px;height:${dotSize}px;background:${col};border-radius:50%;opacity:${op};"></div>
        <div style="position:absolute;top:${margin}px;right:${margin}px;width:${dotSize}px;height:${dotSize}px;background:${col};border-radius:50%;opacity:${op};"></div>
        <div style="position:absolute;bottom:${margin + 62}px;left:${margin}px;width:${dotSize}px;height:${dotSize}px;background:${col};border-radius:50%;opacity:${op};"></div>
        <div style="position:absolute;bottom:${margin + 62}px;right:${margin}px;width:${dotSize}px;height:${dotSize}px;background:${col};border-radius:50%;opacity:${op};"></div>
      `;
    }

    if (style === 'crosses') {
      const cs = s / 2;
      const half = cs / 2;
      return `
        <div style="position:absolute;top:${margin}px;left:${margin}px;width:${cs}px;height:${t}px;background:${col};opacity:${op};"></div>
        <div style="position:absolute;top:${margin}px;left:${margin}px;width:${t}px;height:${cs}px;background:${col};opacity:${op};"></div>

        <div style="position:absolute;top:${margin}px;right:${margin}px;width:${cs}px;height:${t}px;background:${col};opacity:${op};"></div>
        <div style="position:absolute;top:${margin}px;right:${margin}px;width:${t}px;height:${cs}px;background:${col};opacity:${op};"></div>

        <div style="position:absolute;bottom:${margin + 62}px;left:${margin}px;width:${cs}px;height:${t}px;background:${col};opacity:${op};"></div>
        <div style="position:absolute;bottom:${margin + 62}px;left:${margin}px;width:${t}px;height:${cs}px;background:${col};opacity:${op};"></div>

        <div style="position:absolute;bottom:${margin + 62}px;right:${margin}px;width:${cs}px;height:${t}px;background:${col};opacity:${op};"></div>
        <div style="position:absolute;bottom:${margin + 62}px;right:${margin}px;width:${t}px;height:${cs}px;background:${col};opacity:${op};"></div>
      `;
    }

    // brackets or rounded
    return `
      <div style="position:absolute;top:${margin}px;left:${margin}px;width:${s}px;height:${s}px;
        border-top:${t}px solid ${col};border-left:${t}px solid ${col};
        border-top-left-radius:${br};opacity:${op};pointer-events:none;"></div>
      <div style="position:absolute;top:${margin}px;right:${margin}px;width:${s}px;height:${s}px;
        border-top:${t}px solid ${col};border-right:${t}px solid ${col};
        border-top-right-radius:${br};opacity:${op};pointer-events:none;"></div>
      <div style="position:absolute;bottom:${margin + 62}px;left:${margin}px;width:${s}px;height:${s}px;
        border-bottom:${t}px solid ${col};border-left:${t}px solid ${col};
        border-bottom-left-radius:${br};opacity:${op};pointer-events:none;"></div>
      <div style="position:absolute;bottom:${margin + 62}px;right:${margin}px;width:${s}px;height:${s}px;
        border-bottom:${t}px solid ${col};border-right:${t}px solid ${col};
        border-bottom-right-radius:${br};opacity:${op};pointer-events:none;"></div>
    `;
  }
});
