/* ============================================
   GITHUB-ACTIVITY-BAR.JS — Contribution-style bar chart
   Usage: ${githubActivityBar(values, accentColor, hlColor, barCount)}
   values = array of 0–1 floats (intensity)
   ============================================ */
"use strict";

registerComponent({
    id: 'github-activity-bar',
    name: 'GitHub Activity Bar',
    description: 'A mini contribution-graph style bar chart',
    cssClass: 'comp-github-activity-bar',
    render: function githubActivityBar(values, accentColor, hlColor, barCount) {
        const ac = accentColor || '#6750A4';
        const hl = hlColor || '#FFD700';
        const n = barCount || 28;

        // Generate values if not supplied
        const raw = Array.isArray(values) && values.length > 0 ? values : [];
        const bars = [];
        for (let i = 0; i < n; i++) {
            // Use provided value or pseudo-random-looking fallback
            const v = raw[i] !== undefined
                ? raw[i]
                : (Math.sin(i * 0.7) * 0.5 + 0.5) * (i % 3 === 0 ? 1 : 0.6);
            bars.push(Math.max(0.08, Math.min(1, v)));
        }

        // Pick up to 4 "spike" bars to highlight in hl color
        const maxVal = Math.max(...bars);

        return `
      <div class="comp-github-activity-bar">
        ${bars.map((v, i) => {
            const isTop = v >= maxVal * 0.9;
            const color = isTop ? hl : ac;
            const opacity = 0.25 + v * 0.75;
            return `
            <div class="comp-gab-bar-wrap">
              <div class="comp-gab-bar" style="
                height: ${Math.round(v * 100)}%;
                background: ${color};
                opacity: ${opacity.toFixed(2)};
                box-shadow: ${isTop ? `0 0 8px ${hl}88` : 'none'};
              "></div>
            </div>
          `;
        }).join('')}
      </div>
    `;
    }
});