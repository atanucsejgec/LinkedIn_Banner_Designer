/* ============================================
   QR-CODE.JS — Renders a placeholder QR code
   Usage: ${qrCode(size, color, bgColor)}
   ============================================ */
"use strict";

registerComponent({
  id: 'qr-code',
  name: 'QR Code',
  description: 'Renders a generic QR code placeholder SVG.',
  cssClass: 'comp-qr-code',
  render: function qrCode(size, color, bgColor) {
    const s  = size    || 70;
    const c  = color   || '#ffffff';
    const bg = bgColor || '#121212';

    return `
      <div class="comp-qr-code" style="
        width: ${s}px;
        height: ${s}px;
        background: ${bg};
        padding: 6px;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.15);
        box-sizing: border-box;
        flex-shrink: 0;
      ">
        <svg
          viewBox="0 0 33 33"
          width="100%"
          height="100%"
          shape-rendering="crispEdges"
        >
          <!-- TOP LEFT POSITION SQUARE -->
          <rect fill="${c}" x="0"  y="0"  width="9" height="9"/>
          <rect fill="${bg}" x="1" y="1"  width="7" height="7"/>
          <rect fill="${c}" x="2"  y="2"  width="5" height="5"/>

          <!-- TOP RIGHT POSITION SQUARE -->
          <rect fill="${c}" x="24" y="0"  width="9" height="9"/>
          <rect fill="${bg}" x="25" y="1" width="7" height="7"/>
          <rect fill="${c}" x="26" y="2"  width="5" height="5"/>

          <!-- BOTTOM LEFT POSITION SQUARE -->
          <rect fill="${c}" x="0"  y="24" width="9" height="9"/>
          <rect fill="${bg}" x="1" y="25" width="7" height="7"/>
          <rect fill="${c}" x="2"  y="26" width="5" height="5"/>

          <!-- DATA DOTS — Row 1 -->
          <rect fill="${c}" x="11" y="0"  width="2" height="2"/>
          <rect fill="${c}" x="14" y="0"  width="2" height="2"/>
          <rect fill="${c}" x="17" y="0"  width="2" height="2"/>
          <rect fill="${c}" x="20" y="0"  width="2" height="2"/>

          <!-- DATA DOTS — Row 2 -->
          <rect fill="${c}" x="11" y="3"  width="2" height="2"/>
          <rect fill="${c}" x="15" y="3"  width="2" height="2"/>
          <rect fill="${c}" x="19" y="3"  width="2" height="2"/>

          <!-- DATA DOTS — Row 3 -->
          <rect fill="${c}" x="12" y="6"  width="2" height="2"/>
          <rect fill="${c}" x="16" y="6"  width="3" height="2"/>
          <rect fill="${c}" x="21" y="6"  width="2" height="2"/>

          <!-- DATA DOTS — Middle Rows -->
          <rect fill="${c}" x="0"  y="11" width="2" height="2"/>
          <rect fill="${c}" x="3"  y="11" width="3" height="2"/>
          <rect fill="${c}" x="7"  y="11" width="2" height="2"/>
          <rect fill="${c}" x="11" y="11" width="2" height="2"/>
          <rect fill="${c}" x="14" y="11" width="3" height="2"/>
          <rect fill="${c}" x="19" y="11" width="2" height="2"/>
          <rect fill="${c}" x="23" y="11" width="2" height="2"/>
          <rect fill="${c}" x="27" y="11" width="3" height="2"/>
          <rect fill="${c}" x="31" y="11" width="2" height="2"/>

          <rect fill="${c}" x="0"  y="14" width="3" height="2"/>
          <rect fill="${c}" x="5"  y="14" width="2" height="2"/>
          <rect fill="${c}" x="9"  y="14" width="3" height="2"/>
          <rect fill="${c}" x="13" y="14" width="2" height="2"/>
          <rect fill="${c}" x="17" y="14" width="3" height="2"/>
          <rect fill="${c}" x="22" y="14" width="2" height="2"/>
          <rect fill="${c}" x="26" y="14" width="3" height="2"/>
          <rect fill="${c}" x="30" y="14" width="3" height="2"/>

          <rect fill="${c}" x="1"  y="17" width="2" height="2"/>
          <rect fill="${c}" x="4"  y="17" width="3" height="2"/>
          <rect fill="${c}" x="8"  y="17" width="2" height="2"/>
          <rect fill="${c}" x="12" y="17" width="3" height="2"/>
          <rect fill="${c}" x="16" y="17" width="2" height="2"/>
          <rect fill="${c}" x="20" y="17" width="2" height="2"/>
          <rect fill="${c}" x="24" y="17" width="3" height="2"/>
          <rect fill="${c}" x="29" y="17" width="2" height="2"/>

          <rect fill="${c}" x="0"  y="20" width="2" height="2"/>
          <rect fill="${c}" x="3"  y="20" width="2" height="2"/>
          <rect fill="${c}" x="6"  y="20" width="3" height="2"/>
          <rect fill="${c}" x="11" y="20" width="2" height="2"/>
          <rect fill="${c}" x="15" y="20" width="3" height="2"/>
          <rect fill="${c}" x="20" y="20" width="2" height="2"/>
          <rect fill="${c}" x="24" y="20" width="2" height="2"/>
          <rect fill="${c}" x="28" y="20" width="3" height="2"/>

          <!-- DATA DOTS — Bottom Rows -->
          <rect fill="${c}" x="11" y="24" width="2" height="2"/>
          <rect fill="${c}" x="14" y="24" width="3" height="2"/>
          <rect fill="${c}" x="18" y="24" width="2" height="2"/>
          <rect fill="${c}" x="22" y="24" width="2" height="2"/>
          <rect fill="${c}" x="26" y="24" width="3" height="2"/>
          <rect fill="${c}" x="30" y="24" width="3" height="2"/>

          <rect fill="${c}" x="11" y="27" width="3" height="2"/>
          <rect fill="${c}" x="16" y="27" width="2" height="2"/>
          <rect fill="${c}" x="20" y="27" width="3" height="2"/>
          <rect fill="${c}" x="25" y="27" width="2" height="2"/>
          <rect fill="${c}" x="29" y="27" width="2" height="2"/>

          <rect fill="${c}" x="11" y="30" width="2" height="2"/>
          <rect fill="${c}" x="15" y="30" width="3" height="2"/>
          <rect fill="${c}" x="19" y="30" width="2" height="2"/>
          <rect fill="${c}" x="23" y="30" width="3" height="2"/>
          <rect fill="${c}" x="28" y="30" width="2" height="2"/>
          <rect fill="${c}" x="31" y="30" width="2" height="2"/>
        </svg>
      </div>
    `;
  }
});