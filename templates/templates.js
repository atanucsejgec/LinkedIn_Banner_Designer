/* ============================================
   TEMPLATES.JS
   To add more templates: paste new objects
   into the TEMPLATES array below and add
   their render function.
   ============================================ */

"use strict";

/* --------------------------------------------------
   TEMPLATE SCHEMA
   {
     id:          string  — unique key
     name:        string  — display name
     tag:         string  — short label e.g. "2 Screenshots"
     screenshots: number  — how many phone slots needed
     thumb: {
       bg:    CSS background string
       emoji: string
       label: string
     }
     render: function(data) → HTML string
             data = { state, screenshots[], colors }
   }
-------------------------------------------------- */

const TEMPLATES = [

  /* ══════════════════════════════════════════
     TEMPLATE 01 — Classic Split
     Left phone | Right text
  ══════════════════════════════════════════ */
  {
    id: 'classic-split',
    name: 'Classic Split',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg,#1C1B1F,#2D1B69)',
      emoji: '📱',
      label: 'Classic Split'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const feats = d.state.features.slice(0, 5);
      const badges = d.state.badges;
      return `
        <!-- BG -->
        <div style="position:absolute;inset:0;
          background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>

        <!-- BG CIRCLES -->
        <div class="glow-blob" style="width:380px;height:380px;
          top:-120px;right:-80px;
          background:radial-gradient(circle,${c.a1}44,transparent 70%);"></div>
        <div class="glow-blob" style="width:280px;height:280px;
          bottom:-80px;left:-60px;
          background:radial-gradient(circle,${c.a2}33,transparent 70%);"></div>

        <!-- TOP BAR -->
        <div style="position:absolute;top:0;left:0;right:0;height:5px;
          background:linear-gradient(90deg,${c.a1},${c.a2},${c.a1});"></div>

        <!-- BADGE -->
        <div class="top-badge-pill b-abs" style="top:20px;left:36px;
          background:linear-gradient(135deg,${c.a1},${c.a2});
          box-shadow:0 2px 12px ${c.a1}66;">
          ${d.state.badge}
        </div>

        <!-- SPARKLES -->
        <div class="sparkle" style="top:38px;right:190px;font-size:15px;">✦</div>
        <div class="sparkle" style="top:130px;right:110px;font-size:9px;animation-delay:.6s;">✦</div>
        <div class="sparkle" style="bottom:110px;right:55px;font-size:12px;animation-delay:1.2s;">★</div>

        <!-- PHONE -->
        <div style="position:absolute;left:36px;top:62px;bottom:68px;
          width:400px;display:flex;align-items:center;justify-content:center;">
          <div class="glow-blob" style="width:280px;height:280px;
            background:radial-gradient(circle,${c.a1}40,transparent 70%);
            top:50%;left:50%;transform:translate(-50%,-50%);"></div>
          ${phoneMockup(ss, d.phoneW, d.phoneTilt, d.glowOpacity, c.a1)}
        </div>

        <!-- TEXT RIGHT -->
        <div style="position:absolute;left:470px;top:58px;right:28px;bottom:68px;
          display:flex;flex-direction:column;justify-content:center;gap:9px;">

          <div style="font-size:${d.hs}px;font-weight:900;line-height:1.15;color:#fff;">
            <span style="background:linear-gradient(135deg,${c.hl},${c.hl}aa);
              -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
              ${d.state.h1}
            </span><br>
            <span>${d.state.h2}</span>
          </div>

          <div style="font-size:${d.ss}px;color:#CAC4D0;">${d.state.subtitle}</div>

          <div class="divider-line"
            style="width:280px;background:linear-gradient(90deg,${c.a1},${c.a2});"></div>

          <div style="display:flex;flex-direction:column;gap:5px;">
            ${feats.map(f => `
              <div class="feat-item">
                <span class="feat-check" style="color:${c.a2};">✅</span>
                <span style="font-size:${d.fs}px;">${f}</span>
              </div>`).join('')}
          </div>

          ${d.state.showLifeStages ? `
          <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);
            border-radius:8px;padding:7px 12px;font-size:12px;color:#CAC4D0;">
            ${d.state.lifeStages}
          </div>` : ''}

          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${badges.map(b => `
              <span class="tech-badge" style="background:${b.color};">${b.label}</span>
            `).join('')}
          </div>
        </div>

        <!-- FOOTER -->
        <div class="banner-footer-bar" style="height:62px;
          background:${c.a1}44;border-top:1px solid ${c.a1}55;">
          <span style="font-size:12px;color:#CAC4D0;">${d.state.github}</span>
          <span style="font-size:11px;color:#CAC4D0aa;">${d.state.author}</span>
        </div>
      `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE 02 — Hero Center
     Big headline center | Phone bottom right
  ══════════════════════════════════════════ */
  {
    id: 'hero-center',
    name: 'Hero Center',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg,#0d1117,#1f4068)',
      emoji: '🎯',
      label: 'Hero Center'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const badges = d.state.badges;
      return `
        <div style="position:absolute;inset:0;
          background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>

        <!-- Large glow -->
        <div class="glow-blob" style="width:500px;height:500px;
          top:50%;left:30%;transform:translate(-50%,-50%);
          background:radial-gradient(circle,${c.a1}33,transparent 65%);"></div>

        <!-- TOP BAR -->
        <div style="position:absolute;top:0;left:0;right:0;height:5px;
          background:linear-gradient(90deg,${c.a2},${c.a1});"></div>

        <!-- BADGE top center -->
        <div style="position:absolute;top:18px;left:50%;transform:translateX(-50%);">
          <div class="top-badge-pill"
            style="background:linear-gradient(135deg,${c.a1},${c.a2});">
            ${d.state.badge}
          </div>
        </div>

        <!-- HEADLINE LEFT -->
        <div style="position:absolute;left:44px;top:65px;width:560px;">
          <div style="font-size:${Math.min(d.hs + 4, 58)}px;font-weight:900;
            line-height:1.1;color:#fff;margin-bottom:12px;">
            <span style="background:linear-gradient(135deg,${c.hl},${shiftHue(c.hl)});
              -webkit-background-clip:text;-webkit-text-fill-color:transparent;
              display:block;">${d.state.h1}</span>
            <span>${d.state.h2}</span>
          </div>
          <div style="font-size:${d.ss}px;color:#CAC4D0;
            margin-bottom:16px;">${d.state.subtitle}</div>
          <div style="font-size:13px;color:#aaa;
            max-width:480px;line-height:1.6;margin-bottom:14px;">
            ${d.state.description}
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:14px;">
            ${badges.map(b => `
              <span class="tech-badge" style="background:${b.color};">${b.label}</span>
            `).join('')}
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="height:3px;width:180px;border-radius:2px;
              background:linear-gradient(90deg,${c.a1},${c.a2});"></div>
            <span style="font-size:11px;color:#CAC4D0;">${d.state.github}</span>
          </div>
        </div>

        <!-- PHONE RIGHT -->
        <div style="position:absolute;right:30px;top:40px;bottom:20px;
          width:340px;display:flex;align-items:center;justify-content:center;">
          <div class="glow-blob" style="width:260px;height:260px;
            background:radial-gradient(circle,${c.a2}44,transparent 70%);
            top:50%;left:50%;transform:translate(-50%,-50%);"></div>
          ${phoneMockup(ss, Math.min(d.phoneW + 10, 300), d.phoneTilt, d.glowOpacity, c.a2)}
        </div>

        <!-- Sparkles -->
        <div class="sparkle" style="top:50px;right:220px;font-size:16px;">✦</div>
        <div class="sparkle" style="bottom:80px;left:50px;font-size:10px;animation-delay:.8s;">✦</div>

        <!-- FOOTER -->
        <div class="banner-footer-bar" style="height:58px;
          background:${c.a2}22;border-top:1px solid ${c.a2}44;">
          <span style="font-size:11px;color:#CAC4D0;">${d.state.github}</span>
          <span style="font-size:10px;color:#CAC4D0aa;">${d.state.author}</span>
        </div>
      `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE 03 — Dual Screenshot
     2 phones side by side | Text left
  ══════════════════════════════════════════ */
  {
    id: 'dual-screen',
    name: 'Dual Screenshot',
    tag: '2 Screenshots',
    screenshots: 2,
    thumb: {
      bg: 'linear-gradient(135deg,#0f2027,#203a43)',
      emoji: '📱📱',
      label: 'Dual Screen'
    },
    render(d) {
      const c = d.colors;
      const ss1 = d.screenshots[0];
      const ss2 = d.screenshots[1];
      const feats = d.state.features.slice(0, 4);
      const smallW = Math.round(d.phoneW * 0.82);
      return `
        <div style="position:absolute;inset:0;
          background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>

        <div class="glow-blob" style="width:350px;height:350px;
          top:-80px;right:160px;
          background:radial-gradient(circle,${c.a1}3a,transparent 70%);"></div>
        <div class="glow-blob" style="width:250px;height:250px;
          bottom:-60px;right:-40px;
          background:radial-gradient(circle,${c.a2}33,transparent 70%);"></div>

        <div style="position:absolute;top:0;left:0;right:0;height:5px;
          background:linear-gradient(90deg,${c.a1},${c.a2});"></div>

        <div class="top-badge-pill b-abs" style="top:18px;left:34px;
          background:linear-gradient(135deg,${c.a1},${c.a2});">
          ${d.state.badge}
        </div>

        <!-- TEXT LEFT -->
        <div style="position:absolute;left:34px;top:62px;width:400px;bottom:68px;
          display:flex;flex-direction:column;justify-content:center;gap:8px;">

          <div style="font-size:${d.hs}px;font-weight:900;line-height:1.15;color:#fff;">
            <span style="background:linear-gradient(135deg,${c.hl},${c.hl}bb);
              -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
              ${d.state.h1}</span><br>
            <span>${d.state.h2}</span>
          </div>

          <div style="font-size:${d.ss}px;color:#CAC4D0;">${d.state.subtitle}</div>

          <div style="height:3px;width:240px;border-radius:2px;
            background:linear-gradient(90deg,${c.a1},${c.a2});"></div>

          <div style="display:flex;flex-direction:column;gap:5px;">
            ${feats.map(f => `
              <div class="feat-item">
                <span style="color:${c.a2};">✅</span>
                <span style="font-size:${d.fs}px;">${f}</span>
              </div>`).join('')}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
            ${d.state.badges.map(b => `
              <span class="tech-badge" style="background:${b.color};">${b.label}</span>
            `).join('')}
          </div>
        </div>

        <!-- DUAL PHONES RIGHT -->
        <div style="position:absolute;right:20px;top:30px;bottom:68px;
          width:520px;display:flex;align-items:center;
          justify-content:center;gap:20px;">
          <div style="transform:rotate(-6deg) translateY(20px);">
            ${phoneMockup(ss1, smallW, 0, d.glowOpacity, c.a1)}
          </div>
          <div style="transform:rotate(4deg);">
            ${phoneMockup(ss2, smallW, 0, d.glowOpacity, c.a2)}
          </div>
        </div>

        <!-- FOOTER -->
        <div class="banner-footer-bar" style="height:62px;
          background:${c.a1}33;border-top:1px solid ${c.a1}55;">
          <span style="font-size:12px;color:#CAC4D0;">${d.state.github}</span>
          <span style="font-size:11px;color:#CAC4D0aa;">${d.state.author}</span>
        </div>
      `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE 04 — Triple Screenshot
     3 phones cascaded | Text overlay bottom
  ══════════════════════════════════════════ */
  {
    id: 'triple-screen',
    name: 'Triple Showcase',
    tag: '3 Screenshots',
    screenshots: 3,
    thumb: {
      bg: 'linear-gradient(135deg,#1a0533,#4a0080)',
      emoji: '📱📱📱',
      label: 'Triple'
    },
    render(d) {
      const c = d.colors;
      const [ss1, ss2, ss3] = d.screenshots;
      const pw = Math.round(d.phoneW * 0.68);
      return `
        <div style="position:absolute;inset:0;
          background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>

        <div class="glow-blob" style="width:400px;height:400px;top:-100px;left:50%;
          transform:translateX(-50%);
          background:radial-gradient(circle,${c.a1}44,transparent 65%);"></div>

        <div style="position:absolute;top:0;left:0;right:0;height:5px;
          background:linear-gradient(90deg,${c.a1},${c.a2},${c.a1});"></div>

        <!-- 3 PHONES CENTER-TOP -->
        <div style="position:absolute;top:18px;left:0;right:0;bottom:190px;
          display:flex;align-items:center;justify-content:center;gap:18px;">
          <div style="transform:rotate(-8deg) translateY(30px);">
            ${phoneMockup(ss1, pw, 0, d.glowOpacity, c.a1)}
          </div>
          <div style="transform:translateY(-10px);">
            ${phoneMockup(ss2, pw + 10, 0, d.glowOpacity * 1.2, c.a2)}
          </div>
          <div style="transform:rotate(8deg) translateY(30px);">
            ${phoneMockup(ss3, pw, 0, d.glowOpacity, c.hl)}
          </div>
        </div>

        <!-- BOTTOM TEXT BAND -->
        <div style="position:absolute;bottom:0;left:0;right:0;height:200px;
          background:linear-gradient(0deg,${c.bg1}ee 60%,transparent);
          display:flex;flex-direction:column;justify-content:flex-end;
          padding:0 40px 16px;">

          <div class="top-badge-pill" style="margin-bottom:8px;width:fit-content;
            background:linear-gradient(135deg,${c.a1},${c.a2});">
            ${d.state.badge}
          </div>

          <div style="font-size:${Math.min(d.hs, 38)}px;font-weight:900;
            color:#fff;margin-bottom:4px;">
            <span style="background:linear-gradient(135deg,${c.hl},${c.hl}cc);
              -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
              ${d.state.h1}</span>
            &nbsp;<span style="font-size:${Math.min(d.hs - 4, 32)}px;">${d.state.h2}</span>
          </div>

          <div style="display:flex;align-items:center;
            justify-content:space-between;flex-wrap:wrap;gap:8px;">
            <div style="font-size:13px;color:#CAC4D0;">${d.state.subtitle}</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              ${d.state.badges.slice(0, 4).map(b => `
                <span class="tech-badge" style="background:${b.color};">${b.label}</span>
              `).join('')}
            </div>
          </div>

          <div style="margin-top:6px;font-size:11px;color:#CAC4D0aa;">
            ${d.state.github} &nbsp;·&nbsp; ${d.state.author}
          </div>
        </div>
      `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE 05 — Terminal / Code Style
     Dark code block left | Phone right
  ══════════════════════════════════════════ */
  {
    id: 'terminal',
    name: 'Terminal Code',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg,#0d0d0d,#1a1a2e)',
      emoji: '💻',
      label: 'Terminal'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const feats = d.state.features.slice(0, 4);
      return `
        <div style="position:absolute;inset:0;
          background:linear-gradient(${c.gradDir},${c.bg1},#0a0a0f);"></div>

        <!-- Scanlines overlay -->
        <div style="position:absolute;inset:0;opacity:0.04;
          background:repeating-linear-gradient(0deg,
            rgba(255,255,255,0.1) 0px,rgba(255,255,255,0.1) 1px,
            transparent 1px,transparent 4px);
          pointer-events:none;"></div>

        <div class="glow-blob" style="width:300px;height:300px;
          top:-60px;left:100px;
          background:radial-gradient(circle,${c.a1}33,transparent 70%);"></div>

        <!-- TOP TERMINAL BAR -->
        <div style="position:absolute;top:0;left:0;right:0;height:36px;
          background:rgba(0,0,0,0.6);border-bottom:1px solid ${c.a1}44;
          display:flex;align-items:center;padding:0 16px;gap:8px;">
          <div class="terminal-dot" style="background:#ff5f57;"></div>
          <div class="terminal-dot" style="background:#febc2e;"></div>
          <div class="terminal-dot" style="background:#28c840;"></div>
          <span style="font-size:11px;color:#666;margin-left:8px;font-family:monospace;">
            ${d.state.h1.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase().replace(/ /g, '-')}.kt
          </span>
          <div style="margin-left:auto;">
            <span class="top-badge-pill" style="font-size:10px;padding:3px 10px;
              background:linear-gradient(135deg,${c.a1},${c.a2});">
              ${d.state.badge}
            </span>
          </div>
        </div>

        <!-- CODE BLOCK LEFT -->
        <div style="position:absolute;left:28px;top:52px;width:520px;bottom:60px;
          display:flex;flex-direction:column;justify-content:center;gap:8px;">

          <div style="font-size:${d.hs - 4}px;font-weight:900;color:#fff;
            margin-bottom:6px;">
            <span style="color:${c.a2};">fun </span>
            <span style="color:${c.hl};">${d.state.h1.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/ (.)/g, (_, c) => c.toUpperCase())}</span>
            <span style="color:#fff;">() {</span>
          </div>

          <div class="code-block" style="border-color:${c.a1}33;">
            ${feats.slice(0, 3).map((f, i) => `
              <div><span class="code-comment">// ${f}</span></div>
            `).join('')}
            <div style="margin-top:6px;">
              <span class="code-keyword">val </span>
              <span class="code-var">stack</span>
              <span style="color:#fff;"> = listOf(</span>
              ${d.state.badges.slice(0, 3).map(b => `
                <span class="code-string">"${b.label}"</span>
              `).join('<span style="color:#fff;">, </span>')}
              <span style="color:#fff;">)</span>
            </div>
            <div style="margin-top:4px;">
              <span class="code-keyword">return </span>
              <span class="code-string">"${d.state.subtitle}"</span>
            </div>
          </div>

          <div style="font-size:${d.hs - 6}px;font-weight:900;color:#fff;">}</div>

          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
            ${d.state.badges.map(b => `
              <span class="tech-badge" style="background:${b.color};">${b.label}</span>
            `).join('')}
          </div>

          <div style="font-size:11px;color:${c.a2};font-family:monospace;">
            ▶ ${d.state.github}
          </div>
        </div>

        <!-- PHONE RIGHT -->
        <div style="position:absolute;right:24px;top:40px;bottom:60px;
          width:300px;display:flex;align-items:center;justify-content:center;">
          <div class="glow-blob" style="width:220px;height:220px;
            background:radial-gradient(circle,${c.a2}44,transparent 70%);
            top:50%;left:50%;transform:translate(-50%,-50%);"></div>
          ${phoneMockup(ss, Math.min(d.phoneW, 190), d.phoneTilt, d.glowOpacity, c.a2)}
        </div>

        <!-- FOOTER -->
        <div class="banner-footer-bar" style="height:58px;
          background:rgba(0,0,0,0.5);border-top:1px solid ${c.a1}44;">
          <span style="font-size:11px;color:${c.a2};font-family:monospace;">
            // ${d.state.author}
          </span>
          <span style="font-size:10px;color:#444;font-family:monospace;">
            Build ✓ &nbsp; Tests ✓ &nbsp; Shipped ✓
          </span>
        </div>
      `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE 06 — Stats Cards
     Metric boxes | Phone | Text
  ══════════════════════════════════════════ */
  {
    id: 'stats-cards',
    name: 'Stats Cards',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg,#0f2027,#2c5364)',
      emoji: '📊',
      label: 'Stats'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const feats = d.state.features.slice(0, 3);
      const stats = [
        { n: '100%', l: 'Kotlin' },
        { n: 'MD3', l: 'Design' },
        { n: '∞', l: 'Compose' }
      ];
      return `
        <div style="position:absolute;inset:0;
          background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>
        <div class="glow-blob" style="width:420px;height:420px;
          top:-100px;right:-100px;
          background:radial-gradient(circle,${c.a2}2a,transparent 65%);"></div>

        <div style="position:absolute;top:0;left:0;right:0;height:5px;
          background:linear-gradient(90deg,${c.a2},${c.a1});"></div>

        <!-- LEFT: BADGE + HEADLINE + FEATURES -->
        <div style="position:absolute;left:34px;top:22px;width:420px;bottom:68px;
          display:flex;flex-direction:column;justify-content:flex-start;gap:10px;">

          <div class="top-badge-pill" style="width:fit-content;
            background:linear-gradient(135deg,${c.a1},${c.a2});">
            ${d.state.badge}
          </div>

          <div style="font-size:${d.hs}px;font-weight:900;line-height:1.1;color:#fff;">
            <span style="background:linear-gradient(135deg,${c.hl},${c.hl}cc);
              -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
              ${d.state.h1}</span><br>
            <span>${d.state.h2}</span>
          </div>

          <div style="font-size:${d.ss}px;color:#CAC4D0;">${d.state.subtitle}</div>

          <!-- STAT BOXES -->
          <div style="display:flex;gap:10px;margin-top:2px;">
            ${stats.map((s, i) => `
              <div class="stat-box">
                <div class="stat-number" style="color:${[c.a1, c.a2, c.hl][i]};">${s.n}</div>
                <div class="stat-label">${s.l}</div>
              </div>
            `).join('')}
          </div>

          <div style="height:2px;width:260px;border-radius:2px;
            background:linear-gradient(90deg,${c.a1},${c.a2});"></div>

          <div style="display:flex;flex-direction:column;gap:5px;">
            ${feats.map(f => `
              <div class="feat-item">
                <span style="color:${c.a2};">✅</span>
                <span style="font-size:${d.fs}px;">${f}</span>
              </div>`).join('')}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${d.state.badges.map(b => `
              <span class="tech-badge" style="background:${b.color};">${b.label}</span>
            `).join('')}
          </div>
        </div>

        <!-- PHONE RIGHT -->
        <div style="position:absolute;right:30px;top:30px;bottom:68px;
          width:360px;display:flex;align-items:center;justify-content:center;">
          <div class="glow-blob" style="width:240px;height:240px;
            background:radial-gradient(circle,${c.a1}44,transparent 70%);
            top:50%;left:50%;transform:translate(-50%,-50%);"></div>
          ${phoneMockup(ss, Math.min(d.phoneW + 10, 260), d.phoneTilt, d.glowOpacity, c.a1)}
        </div>

        <!-- FOOTER -->
        <div class="banner-footer-bar" style="height:62px;
          background:${c.a1}33;border-top:1px solid ${c.a1}55;">
          <span style="font-size:12px;color:#CAC4D0;">${d.state.github}</span>
          <span style="font-size:11px;color:#CAC4D0aa;">${d.state.author}</span>
        </div>
      `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE 07 — Feature Grid
     2×2 grid cards | Phone center
  ══════════════════════════════════════════ */
  {
    id: 'feature-grid',
    name: 'Feature Grid',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg,#2d1b00,#3e2000)',
      emoji: '⚡',
      label: 'Grid'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const feats = d.state.features.slice(0, 4);
      const icons = ['⚡', '🎯', '🔧', '🚀'];
      return `
        <div style="position:absolute;inset:0;
          background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>
        <div class="glow-blob" style="width:350px;height:350px;
          top:50%;left:50%;transform:translate(-50%,-50%);
          background:radial-gradient(circle,${c.a1}33,transparent 65%);"></div>

        <div style="position:absolute;top:0;left:0;right:0;height:5px;
          background:linear-gradient(90deg,${c.a1},${c.hl},${c.a2});"></div>

        <!-- TOP: BADGE + HEADLINE CENTERED-LEFT -->
        <div style="position:absolute;top:16px;left:34px;right:34px;
          display:flex;align-items:center;justify-content:space-between;">
          <div>
            <div class="top-badge-pill" style="margin-bottom:6px;
              background:linear-gradient(135deg,${c.a1},${c.a2});">
              ${d.state.badge}
            </div>
            <div style="font-size:${Math.min(d.hs, 36)}px;font-weight:900;
              line-height:1.1;color:#fff;">
              <span style="background:linear-gradient(135deg,${c.hl},${c.hl}cc);
                -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
                ${d.state.h1}</span>
              <span style="font-size:${Math.min(d.hs - 6, 28)}px;"> ${d.state.h2}</span>
            </div>
            <div style="font-size:${d.ss}px;color:#CAC4D0;margin-top:4px;">
              ${d.state.subtitle}</div>
          </div>
          <!-- PHONE top right -->
          <div style="position:relative;width:180px;height:320px;
            display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <div class="glow-blob" style="width:180px;height:180px;
              background:radial-gradient(circle,${c.a2}44,transparent 70%);
              top:50%;left:50%;transform:translate(-50%,-50%);"></div>
            ${phoneMockup(ss, 155, d.phoneTilt, d.glowOpacity, c.a2)}
          </div>
        </div>

        <!-- GRID CARDS -->
        <div style="position:absolute;left:34px;bottom:68px;
          right:230px;display:grid;grid-template-columns:1fr 1fr;
          gap:10px;align-content:end;padding-bottom:10px;">
          ${feats.map((f, i) => `
            <div class="grid-card">
              <div class="grid-card-icon">${icons[i] || '✅'}</div>
              <div class="grid-card-title">${f.split(' ').slice(0, 3).join(' ')}</div>
              <div class="grid-card-sub">${f}</div>
            </div>
          `).join('')}
        </div>

        <!-- BADGES BOTTOM RIGHT -->
        <div style="position:absolute;right:30px;bottom:76px;
          width:190px;display:flex;flex-direction:column;gap:6px;">
          ${d.state.badges.map(b => `
            <span class="tech-badge" style="background:${b.color};
              display:block;text-align:center;">${b.label}</span>
          `).join('')}
        </div>

        <!-- FOOTER -->
        <div class="banner-footer-bar" style="height:62px;
          background:${c.a1}33;border-top:1px solid ${c.a1}55;">
          <span style="font-size:12px;color:#CAC4D0;">${d.state.github}</span>
          <span style="font-size:11px;color:#CAC4D0aa;">${d.state.author}</span>
        </div>
      `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE 08 — Diagonal Split
     Diagonal bg split | Phone | Text
  ══════════════════════════════════════════ */
  {
    id: 'diagonal-split',
    name: 'Diagonal Split',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg,#1a0533,#e040fb44)',
      emoji: '⬡',
      label: 'Diagonal'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const feats = d.state.features.slice(0, 4);
      return `
        <!-- LEFT PANEL -->
        <div style="position:absolute;inset:0;background:${c.bg1};"></div>
        <!-- RIGHT DIAGONAL -->
        <div style="position:absolute;inset:0;
          background:linear-gradient(135deg,${c.bg2},${c.a1}88);
          clip-path:polygon(42% 0,100% 0,100% 100%,28% 100%);"></div>

        <div class="glow-blob" style="width:350px;height:350px;
          top:-80px;right:-60px;
          background:radial-gradient(circle,${c.a2}33,transparent 65%);"></div>

        <div style="position:absolute;top:0;left:0;right:0;height:5px;
          background:linear-gradient(90deg,${c.a2},${c.a1});"></div>

        <!-- TEXT LEFT -->
        <div style="position:absolute;left:34px;top:24px;width:430px;bottom:66px;
          display:flex;flex-direction:column;justify-content:center;gap:10px;">

          <div class="top-badge-pill" style="width:fit-content;
            background:linear-gradient(135deg,${c.a1},${c.a2});">
            ${d.state.badge}
          </div>

          <div style="font-size:${d.hs}px;font-weight:900;line-height:1.15;color:#fff;">
            <span style="background:linear-gradient(135deg,${c.hl},${c.hl}bb);
              -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
              ${d.state.h1}</span><br>
            <span>${d.state.h2}</span>
          </div>

          <div style="font-size:${d.ss}px;color:#CAC4D0;">${d.state.subtitle}</div>

          <div style="height:3px;width:260px;border-radius:2px;
            background:linear-gradient(90deg,${c.a2},${c.a1});"></div>

          <div style="display:flex;flex-direction:column;gap:5px;">
            ${feats.map(f => `
              <div class="feat-item">
                <span style="color:${c.a2};">▶</span>
                <span style="font-size:${d.fs}px;">${f}</span>
              </div>`).join('')}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${d.state.badges.map(b => `
              <span class="tech-badge" style="background:${b.color};">${b.label}</span>
            `).join('')}
          </div>
        </div>

        <!-- PHONE RIGHT (on diagonal) -->
        <div style="position:absolute;right:20px;top:20px;bottom:66px;
          width:460px;display:flex;align-items:center;justify-content:center;">
          <div class="glow-blob" style="width:260px;height:260px;
            background:radial-gradient(circle,${c.a2}55,transparent 70%);
            top:50%;left:50%;transform:translate(-50%,-50%);"></div>
          ${phoneMockup(ss, d.phoneW, d.phoneTilt, d.glowOpacity, c.a2)}
        </div>

        <div class="sparkle" style="top:50px;right:100px;font-size:18px;">✦</div>
        <div class="sparkle" style="bottom:120px;left:420px;font-size:12px;animation-delay:.7s;">✦</div>

        <!-- FOOTER -->
        <div class="banner-footer-bar" style="height:60px;
          background:rgba(0,0,0,0.4);border-top:1px solid ${c.a1}55;">
          <span style="font-size:12px;color:#CAC4D0;">${d.state.github}</span>
          <span style="font-size:11px;color:#CAC4D0aa;">${d.state.author}</span>
        </div>
      `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE 09 — Minimal Light
     Clean white-ish light theme
  ══════════════════════════════════════════ */
  {
    id: 'minimal-light',
    name: 'Minimal Light',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg,#e8eaf6,#f3e5f5)',
      emoji: '☀️',
      label: 'Light'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const feats = d.state.features.slice(0, 4);
      const textDark = '#1a1a2e';
      const textMid = '#555577';
      return `
        <div style="position:absolute;inset:0;
          background:linear-gradient(${c.gradDir},#f0f0ff,#e8e0ff);"></div>

        <!-- Soft circles -->
        <div class="glow-blob" style="width:400px;height:400px;
          top:-80px;right:-80px;filter:blur(60px);
          background:radial-gradient(circle,${c.a1}33,transparent 70%);"></div>
        <div class="glow-blob" style="width:300px;height:300px;
          bottom:-60px;left:-40px;filter:blur(50px);
          background:radial-gradient(circle,${c.a2}22,transparent 70%);"></div>

        <!-- TOP BAR -->
        <div style="position:absolute;top:0;left:0;right:0;height:5px;
          background:linear-gradient(90deg,${c.a1},${c.a2});"></div>

        <!-- BADGE -->
        <div class="top-badge-pill b-abs" style="top:18px;left:34px;
          background:linear-gradient(135deg,${c.a1},${c.a2});color:#fff;">
          ${d.state.badge}
        </div>

        <!-- LEFT TEXT -->
        <div style="position:absolute;left:34px;top:62px;width:480px;
          bottom:68px;display:flex;flex-direction:column;
          justify-content:center;gap:9px;">

          <div style="font-size:${d.hs}px;font-weight:900;line-height:1.15;
            color:${textDark};">
            <span style="background:linear-gradient(135deg,${c.a1},${c.a2});
              -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
              ${d.state.h1}</span><br>
            <span>${d.state.h2}</span>
          </div>

          <div style="font-size:${d.ss}px;color:${textMid};">${d.state.subtitle}</div>

          <div style="height:3px;width:260px;border-radius:2px;
            background:linear-gradient(90deg,${c.a1},${c.a2});"></div>

          <div style="display:flex;flex-direction:column;gap:5px;">
            ${feats.map(f => `
              <div style="display:flex;align-items:center;gap:7px;
                font-size:${d.fs}px;color:${textDark};">
                <span style="color:${c.a1};font-size:15px;">✔</span> ${f}
              </div>`).join('')}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
            ${d.state.badges.map(b => `
              <span style="padding:4px 12px;border-radius:20px;
                font-size:11px;font-weight:700;
                background:${b.color}22;color:${b.color};
                border:1px solid ${b.color}55;">${b.label}</span>
            `).join('')}
          </div>
        </div>

        <!-- PHONE RIGHT -->
        <div style="position:absolute;right:28px;top:28px;bottom:68px;
          width:360px;display:flex;align-items:center;justify-content:center;">
          ${phoneMockup(ss, d.phoneW, d.phoneTilt, d.glowOpacity * 0.6, c.a1)}
        </div>

        <!-- FOOTER -->
        <div class="banner-footer-bar" style="height:62px;
          background:${c.a1}18;border-top:1px solid ${c.a1}33;">
          <span style="font-size:12px;color:${textMid};">${d.state.github}</span>
          <span style="font-size:11px;color:${textMid}aa;">${d.state.author}</span>
        </div>
      `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE 10 — Neon Glow
     Vibrant neon glow, cyberpunk style
  ══════════════════════════════════════════ */
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg,#050510,#0a0a2e)',
      emoji: '⚡',
      label: 'Neon'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const feats = d.state.features.slice(0, 4);
      return `
        <div style="position:absolute;inset:0;background:#050510;"></div>

        <!-- Neon glows -->
        <div class="glow-blob" style="width:500px;height:300px;
          top:-100px;left:-100px;filter:blur(60px);
          background:${c.a1}55;"></div>
        <div class="glow-blob" style="width:400px;height:300px;
          bottom:-80px;right:-80px;filter:blur(60px);
          background:${c.a2}44;"></div>
        <div class="glow-blob" style="width:200px;height:200px;
          top:40%;left:40%;filter:blur(40px);
          background:${c.hl}22;"></div>

        <!-- Grid overlay -->
        <div style="position:absolute;inset:0;opacity:0.06;
          background-image:
            linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px);
          background-size:40px 40px;pointer-events:none;"></div>

        <!-- TOP NEON LINE -->
        <div style="position:absolute;top:0;left:0;right:0;height:3px;
          background:${c.a2};box-shadow:0 0 10px ${c.a2},0 0 20px ${c.a2};"></div>

        <!-- BADGE neon -->
        <div class="top-badge-pill b-abs" style="top:18px;left:34px;
          background:transparent;border:1px solid ${c.a2};color:${c.a2};
          box-shadow:0 0 10px ${c.a2}88,inset 0 0 10px ${c.a2}22;">
          ${d.state.badge}
        </div>

        <!-- LEFT TEXT -->
        <div style="position:absolute;left:34px;top:62px;width:500px;
          bottom:66px;display:flex;flex-direction:column;
          justify-content:center;gap:10px;">

          <div style="font-size:${d.hs}px;font-weight:900;line-height:1.1;">
            <span style="color:${c.a2};
              text-shadow:0 0 20px ${c.a2},0 0 40px ${c.a2}88;
              display:block;">${d.state.h1}</span>
            <span style="color:#fff;
              text-shadow:0 0 10px rgba(255,255,255,0.3);">${d.state.h2}</span>
          </div>

          <div style="font-size:${d.ss}px;color:#aaa;">${d.state.subtitle}</div>

          <div style="height:2px;width:300px;background:${c.a2};
            box-shadow:0 0 8px ${c.a2};border-radius:2px;"></div>

          <div style="display:flex;flex-direction:column;gap:6px;">
            ${feats.map(f => `
              <div style="display:flex;align-items:center;gap:8px;
                font-size:${d.fs}px;color:#ccc;">
                <span style="color:${c.a2};
                  text-shadow:0 0 8px ${c.a2};">▶</span> ${f}
              </div>`).join('')}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:7px;margin-top:4px;">
            ${d.state.badges.map(b => `
              <span style="padding:4px 14px;border-radius:20px;
                font-size:11px;font-weight:700;color:${b.color};
                border:1px solid ${b.color};
                box-shadow:0 0 8px ${b.color}66;">${b.label}</span>
            `).join('')}
          </div>
        </div>

        <!-- PHONE RIGHT -->
        <div style="position:absolute;right:24px;top:24px;bottom:66px;
          width:380px;display:flex;align-items:center;justify-content:center;">
          <div class="glow-blob" style="width:280px;height:280px;
            background:radial-gradient(circle,${c.a1}55,transparent 65%);
            top:50%;left:50%;transform:translate(-50%,-50%);"></div>
          ${phoneMockup(ss, d.phoneW, d.phoneTilt, d.glowOpacity * 1.3, c.a1)}
        </div>

        <!-- Sparkles -->
        <div class="sparkle" style="top:44px;right:160px;font-size:20px;
          color:${c.a2};text-shadow:0 0 10px ${c.a2};">✦</div>
        <div class="sparkle" style="bottom:120px;left:490px;font-size:12px;
          animation-delay:.8s;color:${c.a1};text-shadow:0 0 8px ${c.a1};">✦</div>

        <!-- FOOTER -->
        <div class="banner-footer-bar" style="height:60px;
          background:rgba(0,0,0,0.7);
          border-top:1px solid ${c.a2}55;
          box-shadow:0 -4px 20px ${c.a2}22;">
          <span style="font-size:12px;color:${c.a2};">${d.state.github}</span>
          <span style="font-size:11px;color:#666;">${d.state.author}</span>
        </div>
      `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE 11 — Side by Side (No Phone)
     Pure text layout, 2 columns
  ══════════════════════════════════════════ */
  {
    id: 'text-only',
    name: 'Text Only',
    tag: 'No Screenshot',
    screenshots: 0,
    thumb: {
      bg: 'linear-gradient(135deg,#1a1a1a,#2d2d2d)',
      emoji: '📄',
      label: 'Text Only'
    },
    render(d) {
      const c = d.colors;
      const feats = d.state.features.slice(0, 6);
      const mid = Math.ceil(feats.length / 2);
      const left = feats.slice(0, mid);
      const right = feats.slice(mid);
      return `
        <div style="position:absolute;inset:0;
          background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>
        <div class="glow-blob" style="width:500px;height:500px;
          top:50%;left:50%;transform:translate(-50%,-50%);
          background:radial-gradient(circle,${c.a1}22,transparent 60%);"></div>

        <div style="position:absolute;top:0;left:0;right:0;height:5px;
          background:linear-gradient(90deg,${c.a1},${c.a2},${c.hl});"></div>

        <!-- CENTER CONTENT -->
        <div style="position:absolute;inset:0;
          display:flex;flex-direction:column;
          align-items:center;justify-content:center;
          padding:20px 50px;gap:14px;">

          <div class="top-badge-pill"
            style="background:linear-gradient(135deg,${c.a1},${c.a2});">
            ${d.state.badge}
          </div>

          <div style="text-align:center;">
            <div style="font-size:${Math.min(d.hs + 4, 54)}px;font-weight:900;
              line-height:1.1;margin-bottom:6px;">
              <span style="background:linear-gradient(135deg,${c.hl},${c.hl}bb);
                -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
                ${d.state.h1}</span>
              <span style="color:#fff;"> ${d.state.h2}</span>
            </div>
            <div style="font-size:${d.ss}px;color:#CAC4D0;">${d.state.subtitle}</div>
          </div>

          <div style="display:flex;gap:10px;align-items:center;width:100%;">
            <div style="height:2px;flex:1;background:linear-gradient(90deg,transparent,${c.a1});"></div>
            <div style="height:2px;flex:1;background:linear-gradient(90deg,${c.a2},transparent);"></div>
          </div>

          <!-- TWO COL FEATURES -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 30px;width:100%;">
            ${feats.map(f => `
              <div style="display:flex;align-items:center;gap:7px;
                font-size:${d.fs}px;color:#e0e0e0;">
                <span style="color:${c.a2};">✅</span> ${f}
              </div>`).join('')}
          </div>

          <!-- BADGES ROW -->
          <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
            ${d.state.badges.map(b => `
              <span class="tech-badge" style="background:${b.color};">${b.label}</span>
            `).join('')}
          </div>

          ${d.state.showLifeStages ? `
          <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);
            border-radius:8px;padding:7px 20px;font-size:13px;color:#CAC4D0;text-align:center;">
            ${d.state.lifeStages}
          </div>` : ''}
        </div>

        <!-- FOOTER -->
        <div class="banner-footer-bar" style="height:58px;
          background:${c.a1}33;border-top:1px solid ${c.a1}55;">
          <span style="font-size:12px;color:#CAC4D0;">${d.state.github}</span>
          <span style="font-size:11px;color:#CAC4D0aa;">${d.state.author}</span>
        </div>
      `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE 12 — Announcement Card
     Big centered announcement style
  ══════════════════════════════════════════ */
  {
    id: 'announcement',
    name: 'Announcement',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg,#FF6F00,#e53935)',
      emoji: '📢',
      label: 'Announce'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const feats = d.state.features.slice(0, 3);
      return `
        <div style="position:absolute;inset:0;
          background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>
        <div class="glow-blob" style="width:600px;height:400px;
          top:-100px;left:-100px;filter:blur(80px);
          background:${c.a1}44;"></div>
        <div class="glow-blob" style="width:400px;height:400px;
          bottom:-100px;right:-50px;filter:blur(70px);
          background:${c.a2}33;"></div>

        <!-- THICK TOP BAR -->
        <div style="position:absolute;top:0;left:0;right:0;height:10px;
          background:linear-gradient(90deg,${c.a1},${c.hl},${c.a2});"></div>

        <!-- MEGA HEADLINE CENTERED -->
        <div style="position:absolute;top:22px;left:34px;right:420px;bottom:68px;
          display:flex;flex-direction:column;justify-content:center;gap:12px;">

          <div class="top-badge-pill" style="width:fit-content;
            background:linear-gradient(135deg,${c.hl},${c.a1});">
            ${d.state.badge}
          </div>

          <div style="font-size:${Math.min(d.hs + 6, 56)}px;font-weight:900;
            line-height:1.0;color:#fff;letter-spacing:-1px;">
            ${d.state.h1}<br>
            <span style="color:${c.hl};">${d.state.h2}</span>
          </div>

          <div style="font-size:${d.ss + 1}px;color:#ddd;max-width:440px;">
            ${d.state.subtitle}
          </div>

          <div style="display:flex;flex-direction:column;gap:5px;">
            ${feats.map(f => `
              <div style="display:flex;align-items:center;gap:8px;
                font-size:${d.fs + 1}px;color:#eee;">
                <span style="color:${c.hl};font-size:16px;">→</span> ${f}
              </div>`).join('')}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:7px;margin-top:4px;">
            ${d.state.badges.map(b => `
              <span class="tech-badge" style="background:${b.color};">${b.label}</span>
            `).join('')}
          </div>
        </div>

        <!-- PHONE RIGHT -->
        <div style="position:absolute;right:20px;top:16px;bottom:68px;
          width:400px;display:flex;align-items:center;justify-content:center;">
          <div class="glow-blob" style="width:300px;height:300px;
            background:radial-gradient(circle,${c.hl}33,transparent 65%);
            top:50%;left:50%;transform:translate(-50%,-50%);"></div>
          ${phoneMockup(ss, Math.min(d.phoneW + 20, 280), d.phoneTilt, d.glowOpacity, c.a1)}
        </div>

        <!-- FOOTER -->
        <div class="banner-footer-bar" style="height:62px;
          background:rgba(0,0,0,0.3);border-top:2px solid ${c.hl}55;">
          <span style="font-size:12px;color:#ddd;">${d.state.github}</span>
          <span style="font-size:11px;color:#aaa;">${d.state.author}</span>
        </div>
      `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE — Neon Wireframe
     Blueprint / wireframe aesthetic with neon grid
  ══════════════════════════════════════════ */
  {
    id: 'neon-wireframe',
    name: 'Neon Wireframe',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg,#0a0a2e,#1a0a3e)',
      emoji: '📐',
      label: 'Wireframe'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const feats = d.state.features.slice(0, 4);
      const badges = d.state.badges;
      return `
      <div style="position:absolute;inset:0;
        background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>

      <!-- GRID OVERLAY -->
      <div style="position:absolute;inset:0;
        background-image:
          linear-gradient(${c.a1}15 1px, transparent 1px),
          linear-gradient(90deg, ${c.a1}15 1px, transparent 1px);
        background-size:40px 40px;"></div>

      <!-- CORNER BRACKETS -->
      <div style="position:absolute;top:16px;left:16px;width:60px;height:60px;
        border-top:2px solid ${c.a1};border-left:2px solid ${c.a1};opacity:0.7;"></div>
      <div style="position:absolute;top:16px;right:16px;width:60px;height:60px;
        border-top:2px solid ${c.a2};border-right:2px solid ${c.a2};opacity:0.7;"></div>
      <div style="position:absolute;bottom:76px;left:16px;width:60px;height:60px;
        border-bottom:2px solid ${c.a2};border-left:2px solid ${c.a2};opacity:0.7;"></div>
      <div style="position:absolute;bottom:76px;right:16px;width:60px;height:60px;
        border-bottom:2px solid ${c.a1};border-right:2px solid ${c.a1};opacity:0.7;"></div>

      <!-- DIAGONAL NEON LINE -->
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;">
        <div style="position:absolute;width:200%;height:2px;
          background:linear-gradient(90deg,transparent,${c.a1}88,${c.a2}88,transparent);
          top:45%;left:-50%;transform:rotate(-15deg);"></div>
      </div>

      <div class="glow-blob" style="width:300px;height:300px;
        top:50%;left:25%;transform:translate(-50%,-50%);
        background:radial-gradient(circle,${c.a1}22,transparent 70%);"></div>

      <!-- BADGE -->
      <div class="top-badge-pill b-abs" style="top:28px;left:48px;
        background:transparent;border:1px solid ${c.a1};color:${c.a1};
        box-shadow:0 0 12px ${c.a1}44;">
        ${d.state.badge}
      </div>

      <!-- PHONE LEFT -->
      <div style="position:absolute;left:36px;top:70px;bottom:76px;
        width:380px;display:flex;align-items:center;justify-content:center;">
        <div style="position:absolute;width:${d.phoneW + 60}px;height:${d.phoneW * 2 + 60}px;
          border:1px dashed ${c.a1}44;border-radius:28px;"></div>
        ${phoneMockup(ss, d.phoneW, d.phoneTilt, d.glowOpacity, c.a1)}
      </div>

      <!-- TEXT RIGHT -->
      <div style="position:absolute;left:440px;top:60px;right:36px;bottom:76px;
        display:flex;flex-direction:column;justify-content:center;gap:10px;">

        <div style="font-family:monospace;font-size:11px;color:${c.a1};opacity:0.6;">
          &lt;!-- v1.0.0 --&gt;
        </div>

        <div style="font-size:${d.hs}px;font-weight:900;line-height:1.12;color:#fff;">
          <span style="color:${c.hl};text-shadow:0 0 20px ${c.hl}66;">${d.state.h1}</span><br>
          <span style="color:#e0e0e0;">${d.state.h2}</span>
        </div>

        <div style="font-size:${d.ss}px;color:#999;font-family:monospace;">
          // ${d.state.subtitle}
        </div>

        <div style="width:200px;height:1px;
          background:linear-gradient(90deg,${c.a1},transparent);"></div>

        <div style="display:flex;flex-direction:column;gap:6px;">
          ${feats.map((f, i) => `
            <div class="feat-item" style="font-family:monospace;">
              <span style="color:${c.a1};font-size:13px;">[${String(i + 1).padStart(2, '0')}]</span>
              <span style="font-size:${d.fs}px;">${f}</span>
            </div>`).join('')}
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
          ${badges.map(b => `
            <span class="tech-badge" style="background:transparent;
              border:1px solid ${b.color};color:${b.color};
              box-shadow:0 0 8px ${b.color}33;">${b.label}</span>
          `).join('')}
        </div>
      </div>

      <!-- FOOTER -->
      <div class="banner-footer-bar" style="height:62px;
        background:rgba(0,0,0,0.5);border-top:1px solid ${c.a1}33;">
        <span style="font-size:12px;color:${c.a1};font-family:monospace;">
          ${d.state.github}
        </span>
        <span style="font-size:11px;color:#666;font-family:monospace;">
          ${d.state.author}
        </span>
      </div>
    `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE — Retro Terminal
     Green-on-black terminal / hacker aesthetic
  ══════════════════════════════════════════ */
  {
    id: 'retro-terminal',
    name: 'Retro Terminal',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg,#0d1117,#001a00)',
      emoji: '💻',
      label: 'Terminal'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const feats = d.state.features.slice(0, 4);
      const badges = d.state.badges;
      return `
      <div style="position:absolute;inset:0;background:#0d1117;"></div>

      <!-- SCANLINES -->
      <div style="position:absolute;inset:0;
        background:repeating-linear-gradient(
          0deg, transparent, transparent 2px,
          rgba(0,255,0,0.015) 2px, rgba(0,255,0,0.015) 4px
        );pointer-events:none;"></div>

      <!-- CRT GLOW -->
      <div class="glow-blob" style="width:800px;height:400px;
        top:50%;left:50%;transform:translate(-50%,-50%);
        background:radial-gradient(ellipse,${c.a1}08,transparent 70%);"></div>

      <!-- TERMINAL WINDOW -->
      <div style="position:absolute;top:16px;left:24px;right:24px;bottom:74px;
        border:1px solid ${c.a1}44;border-radius:10px;overflow:hidden;">

        <!-- TITLE BAR -->
        <div style="height:32px;background:${c.a1}18;
          display:flex;align-items:center;padding:0 12px;gap:8px;
          border-bottom:1px solid ${c.a1}33;">
          <div class="terminal-dot" style="background:#ff5f56;"></div>
          <div class="terminal-dot" style="background:#ffbd2e;"></div>
          <div class="terminal-dot" style="background:#27ca40;"></div>
          <span style="font-family:monospace;font-size:12px;color:${c.a1}aa;
            margin-left:12px;">
            ${d.state.badge} — bash
          </span>
        </div>

        <!-- TERMINAL BODY -->
        <div style="display:flex;height:calc(100% - 32px);">

          <!-- LEFT: CODE -->
          <div style="flex:1;padding:18px 24px;display:flex;flex-direction:column;
            justify-content:center;gap:8px;font-family:monospace;">

            <div style="font-size:11px;color:${c.a1}66;">
              $ cat README.md
            </div>

            <div style="font-size:${d.hs - 4}px;font-weight:900;line-height:1.15;color:${c.hl};
              text-shadow:0 0 16px ${c.hl}44;">
              # ${d.state.h1}<br>
              <span style="color:#fff;">## ${d.state.h2}</span>
            </div>

            <div style="font-size:${d.ss}px;color:#8b949e;">
              > ${d.state.subtitle}
            </div>

            <div class="divider-line"
              style="width:250px;background:${c.a1}44;height:1px;"></div>

            <div style="display:flex;flex-direction:column;gap:5px;">
              ${feats.map(f => `
                <div style="display:flex;align-items:center;gap:8px;
                  font-size:${d.fs}px;color:#c9d1d9;">
                  <span style="color:${c.a1};">$</span> ${f}
                </div>`).join('')}
            </div>

            ${d.state.showLifeStages ? `
            <div class="code-block" style="background:${c.a1}11;
              border:1px solid ${c.a1}22;padding:8px 12px;
              font-size:11px;color:${c.a1}cc;border-radius:6px;">
              lifecycle: ${d.state.lifeStages}
            </div>` : ''}

            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:2px;">
              ${badges.map(b => `
                <span class="tag-pill" style="background:${b.color}22;
                  color:${b.color};border:1px solid ${b.color}44;
                  font-family:monospace;">${b.label}</span>
              `).join('')}
            </div>
          </div>

          <!-- RIGHT: PHONE -->
          <div style="width:380px;display:flex;align-items:center;
            justify-content:center;position:relative;
            border-left:1px solid ${c.a1}22;">
            <div class="glow-blob" style="width:240px;height:240px;
              background:radial-gradient(circle,${c.a1}25,transparent 70%);
              top:50%;left:50%;transform:translate(-50%,-50%);"></div>
            ${phoneMockup(ss, d.phoneW - 10, d.phoneTilt, d.glowOpacity, c.a1)}
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="banner-footer-bar" style="height:62px;
        background:rgba(0,0,0,0.6);border-top:1px solid ${c.a1}22;">
        <span style="font-size:12px;color:${c.a1}aa;font-family:monospace;">
          ${d.state.github}
        </span>
        <span style="font-size:11px;color:#484f58;font-family:monospace;">
          ${d.state.author}
        </span>
      </div>
    `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE — Glassmorphism Trio
     Three frosted-glass cards with phones
  ══════════════════════════════════════════ */
  {
    id: 'glass-trio',
    name: 'Glassmorphism Trio',
    tag: '3 Screenshots',
    screenshots: 3,
    thumb: {
      bg: 'linear-gradient(135deg,#1a1a2e,#16213e)',
      emoji: '🪟',
      label: 'Glass Trio'
    },
    render(d) {
      const c = d.colors;
      const phones = d.screenshots;
      const feats = d.state.features.slice(0, 3);
      const smallPhone = Math.max(d.phoneW - 60, 120);
      return `
      <div style="position:absolute;inset:0;
        background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>

      <!-- AMBIENT BLOBS -->
      <div class="glow-blob" style="width:500px;height:500px;
        top:-150px;left:20%;
        background:radial-gradient(circle,${c.a1}33,transparent 65%);"></div>
      <div class="glow-blob" style="width:400px;height:400px;
        bottom:-100px;right:10%;
        background:radial-gradient(circle,${c.a2}28,transparent 65%);"></div>
      <div class="glow-blob" style="width:300px;height:300px;
        top:30%;left:50%;transform:translateX(-50%);
        background:radial-gradient(circle,${c.hl}18,transparent 70%);"></div>

      <!-- CENTER HEADING -->
      <div style="position:absolute;top:16px;left:0;right:0;text-align:center;">
        <div class="top-badge-pill" style="display:inline-flex;
          background:linear-gradient(135deg,${c.a1},${c.a2});
          box-shadow:0 4px 16px ${c.a1}44;">
          ${d.state.badge}
        </div>
      </div>

      <div style="position:absolute;top:46px;left:0;right:0;text-align:center;">
        <div style="font-size:${d.hs - 2}px;font-weight:900;line-height:1.1;color:#fff;">
          ${d.state.h1}
          <span style="color:${c.hl};"> ${d.state.h2}</span>
        </div>
        <div style="font-size:${d.ss}px;color:#aaa;margin-top:4px;">
          ${d.state.subtitle}
        </div>
      </div>

      <!-- THREE GLASS CARDS -->
      <div style="position:absolute;top:115px;left:28px;right:28px;bottom:74px;
        display:flex;gap:16px;align-items:stretch;">
        ${[0, 1, 2].map((i) => `
          <div class="grid-card" style="flex:1;
            background:rgba(255,255,255,0.06);
            backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
            border:1px solid rgba(255,255,255,0.12);border-radius:16px;
            display:flex;flex-direction:column;align-items:center;
            justify-content:center;gap:8px;padding:12px;position:relative;
            overflow:hidden;">
            <div style="position:absolute;top:0;left:0;right:0;height:2px;
              background:linear-gradient(90deg,${[c.a1, c.a2, c.hl][i]},transparent);"></div>
            ${phoneMockup(phones[i], smallPhone, 0, d.glowOpacity, [c.a1, c.a2, c.hl][i])}
            <div style="font-size:${d.fs + 1}px;color:#fff;font-weight:600;
              text-align:center;margin-top:4px;">
              ${feats[i] || ''}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- BADGES ROW -->
      <div style="position:absolute;bottom:78px;left:0;right:0;
        display:flex;justify-content:center;gap:8px;">
        ${d.state.badges.map(b => `
          <span class="tech-badge" style="background:${b.color}33;
            border:1px solid ${b.color}55;color:${b.color};">${b.label}</span>
        `).join('')}
      </div>

      <!-- FOOTER -->
      <div class="banner-footer-bar" style="height:62px;
        background:rgba(0,0,0,0.35);
        border-top:1px solid rgba(255,255,255,0.08);">
        <span style="font-size:12px;color:#ccc;">${d.state.github}</span>
        <span style="font-size:11px;color:#888;">${d.state.author}</span>
      </div>
    `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE — Isometric Showcase
     Tilted phones in isometric-like perspective
  ══════════════════════════════════════════ */
  {
    id: 'isometric-showcase',
    name: 'Isometric Showcase',
    tag: '2 Screenshots',
    screenshots: 2,
    thumb: {
      bg: 'linear-gradient(135deg,#0f0c29,#302b63)',
      emoji: '🔷',
      label: 'Isometric'
    },
    render(d) {
      const c = d.colors;
      const feats = d.state.features.slice(0, 4);
      const badges = d.state.badges;
      const pw = Math.max(d.phoneW - 30, 140);
      return `
      <div style="position:absolute;inset:0;
        background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>

      <!-- ISOMETRIC GRID -->
      <div style="position:absolute;inset:0;overflow:hidden;">
        <div style="position:absolute;width:150%;height:150%;
          top:-25%;left:-25%;
          background:
            linear-gradient(30deg, ${c.a1}08 1px, transparent 1px),
            linear-gradient(-30deg, ${c.a2}08 1px, transparent 1px);
          background-size:60px 35px;
          transform:perspective(600px) rotateX(30deg);"></div>
      </div>

      <div class="glow-blob" style="width:500px;height:300px;
        bottom:60px;right:100px;
        background:radial-gradient(ellipse,${c.a1}22,transparent 65%);"></div>

      <!-- TEXT LEFT -->
      <div style="position:absolute;left:40px;top:40px;right:500px;bottom:76px;
        display:flex;flex-direction:column;justify-content:center;gap:10px;">

        <div class="top-badge-pill" style="width:fit-content;
          background:linear-gradient(135deg,${c.a1},${c.a2});
          box-shadow:0 2px 12px ${c.a1}55;">
          ${d.state.badge}
        </div>

        <div style="font-size:${d.hs + 2}px;font-weight:900;line-height:1.08;color:#fff;">
          ${d.state.h1}<br>
          <span style="background:linear-gradient(90deg,${c.hl},${c.a2});
            -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
            ${d.state.h2}
          </span>
        </div>

        <div style="font-size:${d.ss}px;color:#aab;">${d.state.subtitle}</div>

        <div class="divider-line" style="width:200px;
          background:linear-gradient(90deg,${c.a1},${c.a2});"></div>

        <div style="display:flex;flex-direction:column;gap:5px;">
          ${feats.map(f => `
            <div class="feat-item">
              <span style="color:${c.hl};font-size:14px;">◆</span>
              <span style="font-size:${d.fs}px;">${f}</span>
            </div>`).join('')}
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
          ${badges.map(b => `
            <span class="tech-badge" style="background:${b.color};">${b.label}</span>
          `).join('')}
        </div>
      </div>

      <!-- ISOMETRIC PHONES -->
      <div style="position:absolute;right:30px;top:30px;bottom:76px;width:470px;
        display:flex;align-items:center;justify-content:center;">

        <!-- PHONE 1 — back -->
        <div style="position:absolute;right:180px;top:50%;
          transform:translateY(-55%) perspective(800px) rotateY(-18deg) rotateX(5deg);
          opacity:0.85;">
          <div class="glow-blob" style="width:200px;height:200px;
            background:radial-gradient(circle,${c.a2}30,transparent 70%);
            top:50%;left:50%;transform:translate(-50%,-50%);"></div>
          ${phoneMockup(d.screenshots[1], pw - 15, 0, d.glowOpacity * 0.6, c.a2)}
        </div>

        <!-- PHONE 2 — front -->
        <div style="position:absolute;right:40px;top:50%;
          transform:translateY(-45%) perspective(800px) rotateY(-18deg) rotateX(5deg);
          z-index:2;">
          <div class="glow-blob" style="width:250px;height:250px;
            background:radial-gradient(circle,${c.a1}35,transparent 70%);
            top:50%;left:50%;transform:translate(-50%,-50%);"></div>
          ${phoneMockup(d.screenshots[0], pw, 0, d.glowOpacity, c.a1)}
        </div>
      </div>

      <!-- SPARKLES -->
      <div class="sparkle" style="top:60px;right:200px;font-size:14px;">✦</div>
      <div class="sparkle" style="bottom:120px;right:80px;font-size:10px;
        animation-delay:.8s;">✦</div>

      <!-- FOOTER -->
      <div class="banner-footer-bar" style="height:62px;
        background:${c.bg1}cc;border-top:1px solid ${c.a1}33;">
        <span style="font-size:12px;color:#ccc;">${d.state.github}</span>
        <span style="font-size:11px;color:#888;">${d.state.author}</span>
      </div>
    `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE — Stats Dashboard
     No phone, pure stats & metrics showcase
  ══════════════════════════════════════════ */
  {
    id: 'stats-dashboard',
    name: 'Stats Dashboard',
    tag: '0 Screenshots',
    screenshots: 0,
    thumb: {
      bg: 'linear-gradient(135deg,#1a1a2e,#0f3460)',
      emoji: '📊',
      label: 'Dashboard'
    },
    render(d) {
      const c = d.colors;
      const feats = d.state.features.slice(0, 6);
      const badges = d.state.badges;
      const stats = [
        { num: '99%', label: 'Uptime' },
        { num: '4.9★', label: 'Rating' },
        { num: '50K+', label: 'Users' },
        { num: '<1s', label: 'Response' }
      ];
      return `
      <div style="position:absolute;inset:0;
        background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>

      <!-- DOT PATTERN -->
      <div style="position:absolute;inset:0;
        background:radial-gradient(${c.a1}12 1px, transparent 1px);
        background-size:24px 24px;"></div>

      <div class="glow-blob" style="width:600px;height:400px;
        top:-100px;right:-100px;
        background:radial-gradient(circle,${c.a1}20,transparent 65%);"></div>
      <div class="glow-blob" style="width:400px;height:400px;
        bottom:-150px;left:-50px;
        background:radial-gradient(circle,${c.a2}18,transparent 65%);"></div>

      <!-- TOP BAR -->
      <div style="position:absolute;top:0;left:0;right:0;height:4px;
        background:linear-gradient(90deg,${c.a1},${c.hl},${c.a2});"></div>

      <!-- HEADER ROW -->
      <div style="position:absolute;top:18px;left:36px;right:36px;
        display:flex;align-items:center;justify-content:space-between;">
        <div class="top-badge-pill" style="
          background:linear-gradient(135deg,${c.a1},${c.a2});">
          ${d.state.badge}
        </div>
        <div style="display:flex;gap:6px;">
          ${badges.slice(0, 4).map(b => `
            <span class="tech-badge" style="background:${b.color};">${b.label}</span>
          `).join('')}
        </div>
      </div>

      <!-- MAIN CONTENT -->
      <div style="position:absolute;top:58px;left:36px;right:36px;bottom:74px;
        display:flex;gap:24px;">

        <!-- LEFT: HEADLINE -->
        <div style="flex:1.2;display:flex;flex-direction:column;justify-content:center;gap:12px;">
          <div style="font-size:${d.hs + 6}px;font-weight:900;line-height:1.05;color:#fff;">
            ${d.state.h1}<br>
            <span style="background:linear-gradient(90deg,${c.a1},${c.hl});
              -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
              ${d.state.h2}
            </span>
          </div>

          <div style="font-size:${d.ss + 1}px;color:#999;max-width:400px;">
            ${d.state.subtitle}
          </div>

          ${d.state.description ? `
          <div style="font-size:${d.fs}px;color:#777;max-width:380px;line-height:1.5;">
            ${d.state.description}
          </div>` : ''}

          ${d.state.showLifeStages ? `
          <div style="background:rgba(255,255,255,0.05);border:1px solid ${c.a1}33;
            border-radius:8px;padding:8px 14px;font-size:12px;color:#aaa;max-width:380px;">
            📋 ${d.state.lifeStages}
          </div>` : ''}
        </div>

        <!-- RIGHT: STATS & FEATURES -->
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:14px;">

          <!-- STATS GRID -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            ${stats.map((s, i) => `
              <div class="stat-box" style="background:rgba(255,255,255,0.06);
                border:1px solid ${[c.a1, c.a2, c.hl, c.a1][i]}33;border-radius:12px;
                padding:14px;text-align:center;">
                <div style="font-size:26px;font-weight:900;
                  color:${[c.a1, c.a2, c.hl, c.a1][i]};
                  text-shadow:0 0 16px ${[c.a1, c.a2, c.hl, c.a1][i]}44;">
                  ${s.num}
                </div>
                <div style="font-size:11px;color:#888;margin-top:2px;">${s.label}</div>
              </div>
            `).join('')}
          </div>

          <!-- FEATURE LIST -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">
            ${feats.map(f => `
              <div class="feat-item">
                <span class="feat-check" style="color:${c.hl};">✅</span>
                <span style="font-size:${d.fs}px;">${f}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="banner-footer-bar" style="height:62px;
        background:rgba(0,0,0,0.4);border-top:1px solid ${c.a1}33;">
        <span style="font-size:12px;color:#ccc;">${d.state.github}</span>
        <span style="font-size:11px;color:#888;">${d.state.author}</span>
      </div>
    `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE — Polaroid Stack
     Photos scattered like polaroid snapshots
  ══════════════════════════════════════════ */
  {
    id: 'polaroid-stack',
    name: 'Polaroid Stack',
    tag: '2 Screenshots',
    screenshots: 2,
    thumb: {
      bg: 'linear-gradient(135deg,#2c1810,#1a0a2e)',
      emoji: '📸',
      label: 'Polaroid'
    },
    render(d) {
      const c = d.colors;
      const feats = d.state.features.slice(0, 4);
      const badges = d.state.badges;
      const pw = Math.max(d.phoneW - 40, 130);
      return `
      <div style="position:absolute;inset:0;
        background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>

      <!-- SUBTLE TEXTURE -->
      <div style="position:absolute;inset:0;
        background:url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%224%22 height=%224%22><rect width=%224%22 height=%224%22 fill=%22transparent%22/><rect width=%221%22 height=%221%22 fill=%22rgba(255,255,255,0.02)%22/></svg>');"></div>

      <div class="glow-blob" style="width:400px;height:400px;
        top:50%;right:200px;transform:translateY(-50%);
        background:radial-gradient(circle,${c.a1}18,transparent 70%);"></div>

      <!-- TEXT LEFT -->
      <div style="position:absolute;left:44px;top:34px;right:520px;bottom:72px;
        display:flex;flex-direction:column;justify-content:center;gap:10px;">

        <div class="top-badge-pill" style="width:fit-content;
          background:linear-gradient(135deg,${c.a1},${c.a2});
          box-shadow:0 2px 12px ${c.a1}55;">
          ${d.state.badge}
        </div>

        <div style="font-size:${d.hs + 2}px;font-weight:900;line-height:1.1;color:#fff;">
          ${d.state.h1}<br>
          <span style="color:${c.hl};">${d.state.h2}</span>
        </div>

        <div style="font-size:${d.ss}px;color:#aaa;">${d.state.subtitle}</div>

        <div style="width:180px;height:2px;
          background:linear-gradient(90deg,${c.a1},${c.a2});border-radius:1px;"></div>

        <div style="display:flex;flex-direction:column;gap:5px;">
          ${feats.map(f => `
            <div class="feat-item">
              <span style="color:${c.hl};">→</span>
              <span style="font-size:${d.fs}px;">${f}</span>
            </div>`).join('')}
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
          ${badges.map(b => `
            <span class="tech-badge" style="background:${b.color};">${b.label}</span>
          `).join('')}
        </div>
      </div>

      <!-- POLAROID CARDS -->
      <div style="position:absolute;right:20px;top:20px;bottom:72px;width:500px;
        display:flex;align-items:center;justify-content:center;">

        <!-- POLAROID 1 -->
        <div style="position:absolute;
          transform:rotate(-8deg) translate(-60px, 10px);
          background:#fefefe;border-radius:4px;padding:12px 12px 40px 12px;
          box-shadow:0 8px 32px rgba(0,0,0,0.5),0 0 20px ${c.a2}22;
          z-index:1;">
          <div style="width:${pw}px;height:${pw * 1.8}px;overflow:hidden;
            border-radius:2px;background:#111;">
            ${d.screenshots[1]
          ? `<img src="${d.screenshots[1]}" style="width:100%;height:100%;object-fit:cover;">`
          : `<div style="width:100%;height:100%;display:flex;align-items:center;
                  justify-content:center;color:#555;font-size:24px;">📱</div>`}
          </div>
          <div style="text-align:center;margin-top:8px;font-family:cursive;
            font-size:11px;color:#666;">Screen 2</div>
        </div>

        <!-- POLAROID 2 (front) -->
        <div style="position:absolute;
          transform:rotate(5deg) translate(60px, -5px);
          background:#fefefe;border-radius:4px;padding:12px 12px 40px 12px;
          box-shadow:0 8px 32px rgba(0,0,0,0.5),0 0 20px ${c.a1}22;
          z-index:2;">
          <div style="width:${pw + 10}px;height:${(pw + 10) * 1.8}px;overflow:hidden;
            border-radius:2px;background:#111;">
            ${d.screenshots[0]
          ? `<img src="${d.screenshots[0]}" style="width:100%;height:100%;object-fit:cover;">`
          : `<div style="width:100%;height:100%;display:flex;align-items:center;
                  justify-content:center;color:#555;font-size:24px;">📱</div>`}
          </div>
          <div style="text-align:center;margin-top:8px;font-family:cursive;
            font-size:11px;color:#666;">Screen 1</div>
        </div>
      </div>

      <!-- SPARKLE -->
      <div class="sparkle" style="top:50px;right:140px;font-size:18px;">✦</div>

      <!-- FOOTER -->
      <div class="banner-footer-bar" style="height:62px;
        background:rgba(0,0,0,0.45);border-top:1px solid ${c.a1}33;">
        <span style="font-size:12px;color:#ccc;">${d.state.github}</span>
        <span style="font-size:11px;color:#888;">${d.state.author}</span>
      </div>
    `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE — Sunrise Horizon
     Warm gradient with a radial sunrise behind phone
  ══════════════════════════════════════════ */
  {
    id: 'sunrise-horizon',
    name: 'Sunrise Horizon',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(180deg,#0a0a2e,#ff6b35,#ffd93d)',
      emoji: '🌅',
      label: 'Sunrise'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const feats = d.state.features.slice(0, 4);
      const badges = d.state.badges;
      return `
      <div style="position:absolute;inset:0;
        background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>

      <!-- SUNRISE RADIAL -->
      <div style="position:absolute;bottom:-60px;left:50%;
        transform:translateX(-50%);width:900px;height:450px;
        background:radial-gradient(ellipse at bottom center,
          ${c.hl}44 0%, ${c.a1}22 35%, transparent 70%);"></div>

      <!-- HORIZON LINE -->
      <div style="position:absolute;bottom:140px;left:0;right:0;height:1px;
        background:linear-gradient(90deg,
          transparent 5%,${c.hl}55 30%,${c.a1}55 70%,transparent 95%);"></div>

      <!-- HORIZONTAL RAYS -->
      ${[0, 1, 2, 3, 4].map(i => `
        <div style="position:absolute;bottom:140px;left:50%;
          width:${300 + i * 160}px;height:1px;opacity:${0.12 - i * 0.02};
          transform:translateX(-50%) translateY(-${i * 18}px);
          background:linear-gradient(90deg,transparent,${c.hl}66,transparent);"></div>
      `).join('')}

      <!-- BADGE TOP CENTER -->
      <div style="position:absolute;top:20px;left:50%;transform:translateX(-50%);">
        <div class="top-badge-pill" style="
          background:linear-gradient(135deg,${c.a1},${c.hl});
          box-shadow:0 2px 16px ${c.hl}66;">
          ${d.state.badge}
        </div>
      </div>

      <!-- CENTER PHONE -->
      <div style="position:absolute;left:50%;top:55px;bottom:120px;
        transform:translateX(-50%);
        display:flex;align-items:center;justify-content:center;">
        <div class="glow-blob" style="width:320px;height:320px;
          background:radial-gradient(circle,${c.hl}35,transparent 65%);
          top:50%;left:50%;transform:translate(-50%,-50%);"></div>
        ${phoneMockup(ss, d.phoneW + 10, 0, d.glowOpacity, c.hl)}
      </div>

      <!-- LEFT FEATURES -->
      <div style="position:absolute;left:30px;top:70px;bottom:140px;width:280px;
        display:flex;flex-direction:column;justify-content:center;gap:8px;">
        <div style="font-size:${d.hs - 4}px;font-weight:900;line-height:1.15;color:#fff;">
          ${d.state.h1}
        </div>
        <div style="font-size:${d.ss}px;color:#ccc;">${d.state.subtitle}</div>
        ${feats.slice(0, 2).map(f => `
          <div class="feat-item">
            <span style="color:${c.hl};">☀</span>
            <span style="font-size:${d.fs}px;">${f}</span>
          </div>`).join('')}
      </div>

      <!-- RIGHT FEATURES -->
      <div style="position:absolute;right:30px;top:70px;bottom:140px;width:280px;
        display:flex;flex-direction:column;justify-content:center;align-items:flex-end;
        text-align:right;gap:8px;">
        <div style="font-size:${d.hs - 4}px;font-weight:900;line-height:1.15;">
          <span style="color:${c.hl};">${d.state.h2}</span>
        </div>
        ${feats.slice(2, 4).map(f => `
          <div class="feat-item" style="flex-direction:row-reverse;">
            <span style="color:${c.hl};">☀</span>
            <span style="font-size:${d.fs}px;">${f}</span>
          </div>`).join('')}
        <div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:flex-end;">
          ${badges.map(b => `
            <span class="tech-badge" style="background:${b.color};">${b.label}</span>
          `).join('')}
        </div>
      </div>

      <!-- FOOTER -->
      <div class="banner-footer-bar" style="height:62px;
        background:linear-gradient(180deg,transparent,${c.bg1}ee);
        border-top:1px solid ${c.hl}33;">
        <span style="font-size:12px;color:#ddd;">${d.state.github}</span>
        <span style="font-size:11px;color:#999;">${d.state.author}</span>
      </div>
    `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE — Magazine Cover
     Editorial / magazine-style layout
  ══════════════════════════════════════════ */
  {
    id: 'magazine-cover',
    name: 'Magazine Cover',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg,#1a1a1a,#333)',
      emoji: '📰',
      label: 'Magazine'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const feats = d.state.features.slice(0, 3);
      const badges = d.state.badges;
      return `
      <div style="position:absolute;inset:0;
        background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>

      <!-- LARGE WATERMARK LETTER -->
      <div style="position:absolute;top:-30px;right:-20px;
        font-size:320px;font-weight:900;color:rgba(255,255,255,0.02);
        line-height:1;pointer-events:none;font-family:serif;">
        ${d.state.h1.charAt(0)}
      </div>

      <!-- VERTICAL RULE LEFT -->
      <div style="position:absolute;left:380px;top:24px;bottom:74px;width:2px;
        background:linear-gradient(180deg,${c.a1},${c.a2});"></div>

      <!-- LEFT COLUMN -->
      <div style="position:absolute;left:30px;top:20px;width:340px;bottom:74px;
        display:flex;flex-direction:column;justify-content:center;gap:10px;">

        <!-- ISSUE LABEL -->
        <div style="font-size:10px;letter-spacing:4px;text-transform:uppercase;
          color:${c.a1};font-weight:700;">
          ★ FEATURED PROJECT
        </div>

        <div style="font-size:${d.hs + 8}px;font-weight:900;line-height:1.0;
          color:#fff;font-family:Georgia,serif;">
          ${d.state.h1}
        </div>

        <div style="width:80px;height:3px;background:${c.hl};border-radius:2px;"></div>

        <div style="font-size:${d.hs - 6}px;font-weight:300;color:${c.hl};
          font-style:italic;font-family:Georgia,serif;">
          ${d.state.h2}
        </div>

        <div style="font-size:${d.ss}px;color:#999;line-height:1.6;
          font-family:Georgia,serif;">
          ${d.state.subtitle}
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${badges.map(b => `
            <span class="tech-badge" style="background:transparent;
              border:1px solid ${b.color};color:${b.color};
              font-size:10px;">${b.label}</span>
          `).join('')}
        </div>

        ${d.state.showLifeStages ? `
        <div style="font-size:11px;color:#777;font-style:italic;
          font-family:Georgia,serif;">
          "${d.state.lifeStages}"
        </div>` : ''}
      </div>

      <!-- RIGHT COLUMN -->
      <div style="position:absolute;left:400px;top:20px;right:30px;bottom:74px;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        gap:14px;">

        <!-- PHONE -->
        <div style="position:relative;">
          <div class="glow-blob" style="width:260px;height:260px;
            background:radial-gradient(circle,${c.a1}30,transparent 70%);
            top:50%;left:50%;transform:translate(-50%,-50%);"></div>
          ${phoneMockup(ss, d.phoneW, d.phoneTilt, d.glowOpacity, c.a1)}
        </div>

        <!-- FEATURE QUOTES -->
        <div style="display:flex;gap:12px;">
          ${feats.map(f => `
            <div style="background:rgba(255,255,255,0.05);
              border-left:2px solid ${c.hl};padding:8px 12px;
              border-radius:0 6px 6px 0;">
              <div style="font-size:${d.fs}px;color:#ddd;
                font-family:Georgia,serif;font-style:italic;">
                ${f}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- FOOTER -->
      <div class="banner-footer-bar" style="height:62px;
        background:rgba(0,0,0,0.5);border-top:1px solid rgba(255,255,255,0.1);">
        <span style="font-size:12px;color:#ccc;font-family:Georgia,serif;">
          ${d.state.github}
        </span>
        <span style="font-size:11px;color:#777;font-family:Georgia,serif;">
          ${d.state.author}
        </span>
      </div>
    `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE — Orbit
     Phone in center with orbiting feature rings
  ══════════════════════════════════════════ */
  {
    id: 'orbit-rings',
    name: 'Orbit',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg,#0a0020,#1a0040)',
      emoji: '🪐',
      label: 'Orbit'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const feats = d.state.features.slice(0, 6);
      const badges = d.state.badges;
      const cx = 580; // orbit center X
      const cy = 160; // orbit center Y
      return `
      <div style="position:absolute;inset:0;
        background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>

      <!-- STARS -->
      ${Array.from({ length: 20 }, (_, i) => `
        <div style="position:absolute;width:2px;height:2px;border-radius:50%;
          background:rgba(255,255,255,${0.1 + Math.random() * 0.3});
          top:${Math.random() * 85}%;left:${Math.random() * 100}%;"></div>
      `).join('')}

      <!-- ORBIT RINGS -->
      <div style="position:absolute;left:${cx}px;top:${cy}px;
        width:320px;height:320px;transform:translate(-50%,-50%);
        border:1px solid ${c.a1}18;border-radius:50%;"></div>
      <div style="position:absolute;left:${cx}px;top:${cy}px;
        width:440px;height:440px;transform:translate(-50%,-50%);
        border:1px dashed ${c.a2}15;border-radius:50%;"></div>

      <!-- ORBIT DOTS (features) -->
      ${feats.map((f, i) => {
        const angle = (i / feats.length) * Math.PI * 2 - Math.PI / 2;
        const rx = 210, ry = 210;
        const x = cx + Math.cos(angle) * rx;
        const y = cy + Math.sin(angle) * ry;
        return `
          <div style="position:absolute;left:${x}px;top:${y}px;
            transform:translate(-50%,-50%);z-index:3;">
            <div style="background:rgba(255,255,255,0.08);
              backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
              border:1px solid ${c.a1}33;border-radius:20px;
              padding:5px 12px;white-space:nowrap;">
              <span style="font-size:${d.fs - 1}px;color:#ddd;">${f}</span>
            </div>
          </div>`;
      }).join('')}

      <!-- CENTER PHONE -->
      <div style="position:absolute;left:${cx}px;top:${cy}px;
        transform:translate(-50%,-50%);z-index:4;">
        <div class="glow-blob" style="width:280px;height:280px;
          background:radial-gradient(circle,${c.a1}35,transparent 65%);
          top:50%;left:50%;transform:translate(-50%,-50%);"></div>
        ${phoneMockup(ss, d.phoneW - 20, 0, d.glowOpacity, c.a1)}
      </div>

      <!-- TEXT LEFT -->
      <div style="position:absolute;left:36px;top:40px;width:280px;
        display:flex;flex-direction:column;gap:8px;">

        <div class="top-badge-pill" style="width:fit-content;
          background:linear-gradient(135deg,${c.a1},${c.a2});">
          ${d.state.badge}
        </div>

        <div style="font-size:${d.hs - 2}px;font-weight:900;line-height:1.12;color:#fff;">
          ${d.state.h1}<br>
          <span style="color:${c.hl};">${d.state.h2}</span>
        </div>

        <div style="font-size:${d.ss}px;color:#aaa;">${d.state.subtitle}</div>
      </div>

      <!-- BADGES BOTTOM LEFT -->
      <div style="position:absolute;left:36px;bottom:80px;
        display:flex;flex-wrap:wrap;gap:6px;">
        ${badges.map(b => `
          <span class="tech-badge" style="background:${b.color};">${b.label}</span>
        `).join('')}
      </div>

      <!-- SPARKLES -->
      <div class="sparkle" style="top:30px;right:60px;font-size:16px;">✦</div>
      <div class="sparkle" style="bottom:100px;right:120px;font-size:10px;
        animation-delay:.5s;">★</div>
      <div class="sparkle" style="top:180px;left:320px;font-size:8px;
        animation-delay:1s;">✦</div>

      <!-- FOOTER -->
      <div class="banner-footer-bar" style="height:62px;
        background:rgba(0,0,0,0.4);border-top:1px solid ${c.a1}22;">
        <span style="font-size:12px;color:#ccc;">${d.state.github}</span>
        <span style="font-size:11px;color:#888;">${d.state.author}</span>
      </div>
    `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE — Split Diagonal
     Diagonal split with contrasting halves
  ══════════════════════════════════════════ */
  {
    id: 'split-diagonal',
    name: 'Split Diagonal',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg,#1a1a2e 50%,#e94560 50%)',
      emoji: '📐',
      label: 'Diagonal'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const feats = d.state.features.slice(0, 4);
      const badges = d.state.badges;
      return `
      <!-- BASE BG -->
      <div style="position:absolute;inset:0;
        background:${c.bg1};"></div>

      <!-- DIAGONAL ACCENT HALF -->
      <div style="position:absolute;inset:0;
        clip-path:polygon(55% 0, 100% 0, 100% 100%, 35% 100%);
        background:linear-gradient(160deg,${c.a1},${c.a2});"></div>

      <!-- DIAGONAL EDGE GLOW -->
      <div style="position:absolute;top:0;bottom:0;left:0;right:0;">
        <div style="position:absolute;width:4px;height:150%;
          background:linear-gradient(180deg,${c.hl},${c.a1},${c.hl});
          top:-25%;left:44%;transform:rotate(10deg);
          box-shadow:0 0 20px ${c.hl}55;"></div>
      </div>

      <!-- PATTERN ON ACCENT SIDE -->
      <div style="position:absolute;inset:0;
        clip-path:polygon(55% 0, 100% 0, 100% 100%, 35% 100%);
        background:radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size:20px 20px;"></div>

      <!-- TEXT LEFT SIDE -->
      <div style="position:absolute;left:36px;top:30px;width:420px;bottom:72px;
        display:flex;flex-direction:column;justify-content:center;gap:10px;">

        <div class="top-badge-pill" style="width:fit-content;
          background:${c.hl};color:#000;font-weight:700;
          box-shadow:0 2px 12px ${c.hl}55;">
          ${d.state.badge}
        </div>

        <div style="font-size:${d.hs + 4}px;font-weight:900;line-height:1.05;color:#fff;">
          ${d.state.h1}<br>
          <span style="color:${c.hl};">${d.state.h2}</span>
        </div>

        <div style="font-size:${d.ss}px;color:#aaa;max-width:360px;">
          ${d.state.subtitle}
        </div>

        <div class="divider-line"
          style="width:200px;background:${c.hl};"></div>

        <div style="display:flex;flex-direction:column;gap:5px;">
          ${feats.map(f => `
            <div class="feat-item">
              <span style="color:${c.hl};font-size:14px;">▸</span>
              <span style="font-size:${d.fs}px;">${f}</span>
            </div>`).join('')}
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
          ${badges.map(b => `
            <span class="tech-badge" style="background:${b.color};">${b.label}</span>
          `).join('')}
        </div>
      </div>

      <!-- PHONE ON ACCENT SIDE -->
      <div style="position:absolute;right:60px;top:30px;bottom:72px;width:350px;
        display:flex;align-items:center;justify-content:center;z-index:2;">
        <div class="glow-blob" style="width:280px;height:280px;
          background:radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%);
          top:50%;left:50%;transform:translate(-50%,-50%);"></div>
        ${phoneMockup(ss, d.phoneW, d.phoneTilt, d.glowOpacity, '#ffffff')}
      </div>

      <!-- SPARKLES -->
      <div class="sparkle" style="top:40px;right:100px;font-size:14px;color:${c.bg1};">✦</div>
      <div class="sparkle" style="bottom:100px;right:50px;font-size:10px;
        animation-delay:.7s;color:${c.bg1};">★</div>

      <!-- FOOTER -->
      <div class="banner-footer-bar" style="height:62px;
        background:rgba(0,0,0,0.5);border-top:2px solid ${c.hl}55;">
        <span style="font-size:12px;color:#ddd;">${d.state.github}</span>
        <span style="font-size:11px;color:#999;">${d.state.author}</span>
      </div>
    `;
    }
  },

  /* ══════════════════════════════════════════
     TEMPLATE — Floating Cards
     No phone — content displayed as floating cards
  ══════════════════════════════════════════ */
  {
    id: 'floating-cards',
    name: 'Floating Cards',
    tag: '0 Screenshots',
    screenshots: 0,
    thumb: {
      bg: 'linear-gradient(135deg,#0f172a,#1e293b)',
      emoji: '🃏',
      label: 'Cards'
    },
    render(d) {
      const c = d.colors;
      const feats = d.state.features.slice(0, 6);
      const badges = d.state.badges;
      const cardEmojis = ['🚀', '⚡', '🛡️', '🎯', '💎', '🔥'];
      return `
      <div style="position:absolute;inset:0;
        background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>

      <!-- MESH GRADIENT -->
      <div class="glow-blob" style="width:500px;height:400px;
        top:-100px;left:-50px;
        background:radial-gradient(circle,${c.a1}20,transparent 65%);"></div>
      <div class="glow-blob" style="width:400px;height:400px;
        bottom:-80px;right:-30px;
        background:radial-gradient(circle,${c.a2}18,transparent 65%);"></div>
      <div class="glow-blob" style="width:300px;height:300px;
        top:40%;left:50%;transform:translate(-50%,-50%);
        background:radial-gradient(circle,${c.hl}12,transparent 70%);"></div>

      <!-- TOP BAR -->
      <div style="position:absolute;top:0;left:0;right:0;height:3px;
        background:linear-gradient(90deg,${c.a1},${c.hl},${c.a2});"></div>

      <!-- HEADER -->
      <div style="position:absolute;top:18px;left:36px;right:36px;
        display:flex;align-items:flex-start;justify-content:space-between;">

        <div style="display:flex;flex-direction:column;gap:4px;">
          <div class="top-badge-pill" style="width:fit-content;
            background:linear-gradient(135deg,${c.a1},${c.a2});
            box-shadow:0 2px 10px ${c.a1}44;">
            ${d.state.badge}
          </div>
          <div style="font-size:${d.hs + 4}px;font-weight:900;line-height:1.05;color:#fff;">
            ${d.state.h1}
            <span style="background:linear-gradient(90deg,${c.hl},${c.a2});
              -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
              ${d.state.h2}
            </span>
          </div>
          <div style="font-size:${d.ss}px;color:#888;">${d.state.subtitle}</div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:5px;max-width:260px;
          justify-content:flex-end;margin-top:8px;">
          ${badges.map(b => `
            <span class="tech-badge" style="background:${b.color};">${b.label}</span>
          `).join('')}
        </div>
      </div>

      <!-- FLOATING CARDS GRID -->
      <div style="position:absolute;top:120px;left:36px;right:36px;bottom:74px;
        display:grid;grid-template-columns:repeat(3, 1fr);gap:14px;
        align-content:center;">
        ${feats.map((f, i) => {
        const rotation = (i % 2 === 0 ? -1 : 1) * (1 + i * 0.3);
        const colors3 = [c.a1, c.a2, c.hl, c.a1, c.a2, c.hl];
        return `
            <div class="grid-card" style="
              background:rgba(255,255,255,0.05);
              backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
              border:1px solid ${colors3[i]}33;border-radius:14px;
              padding:18px;display:flex;flex-direction:column;gap:8px;
              transform:rotate(${rotation}deg);
              transition:transform 0.3s;
              box-shadow:0 8px 32px rgba(0,0,0,0.2),
                0 0 0 1px rgba(255,255,255,0.05);
              position:relative;overflow:hidden;">
              <div style="position:absolute;top:0;left:0;right:0;height:2px;
                background:linear-gradient(90deg,${colors3[i]},transparent);"></div>
              <div style="display:flex;align-items:center;gap:8px;">
                <div class="num-circle" style="width:36px;height:36px;
                  background:${colors3[i]}22;border:1px solid ${colors3[i]}44;
                  font-size:16px;display:flex;align-items:center;justify-content:center;
                  border-radius:50%;">
                  ${cardEmojis[i] || '✦'}
                </div>
                <span style="font-size:${d.fs + 2}px;font-weight:700;
                  color:#fff;">${f}</span>
              </div>
            </div>`;
      }).join('')}
      </div>

      ${d.state.showLifeStages ? `
      <div style="position:absolute;bottom:80px;left:50%;transform:translateX(-50%);
        background:rgba(255,255,255,0.05);border:1px solid ${c.a1}22;
        border-radius:20px;padding:6px 18px;font-size:11px;color:#888;">
        ${d.state.lifeStages}
      </div>` : ''}

      <!-- SPARKLES -->
      <div class="sparkle" style="top:100px;right:80px;font-size:14px;">✦</div>
      <div class="sparkle" style="bottom:120px;left:60px;font-size:10px;
        animation-delay:.6s;">★</div>
      <div class="sparkle" style="top:200px;left:400px;font-size:8px;
        animation-delay:1.1s;">✦</div>

      <!-- FOOTER -->
      <div class="banner-footer-bar" style="height:62px;
        background:rgba(0,0,0,0.35);border-top:1px solid rgba(255,255,255,0.08);">
        <span style="font-size:12px;color:#ccc;">${d.state.github}</span>
        <span style="font-size:11px;color:#888;">${d.state.author}</span>
      </div>
    `;
    }
  },

  /* ==== TEMPLATE — GitHub Project Showcase ==== */
  {
    id: 'github-project-showcase',
    name: 'GitHub Project Showcase',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg, #0D1117, #161B22, #1f2a3c)',
      emoji: '🐙',
      label: 'GitHub Showcase'
    },

    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const st = d.state;

      /* ── Derived values ── */
      const feats = st.features.slice(0, 5);
      const badges = st.badges.slice(0, 6);

      /* ── GitHub-flavoured stat cards ── */
      const ghStats = [
        { icon: '⭐', value: '2.4k', label: 'Stars' },
        { icon: '🍴', value: '318', label: 'Forks' },
        { icon: '👁️', value: '12k', label: 'Views' },
        { icon: '🔀', value: '94', label: 'PRs' },
      ];

      /* ── Code snippet lines ── */
      const codeLines = [
        { type: 'comment', indent: 0, text: '// Initialize project' },
        { type: 'keyword', indent: 0, text: 'fun <span style="color:#82AAFF">main</span>() {' },
        { type: 'var', indent: 1, text: 'val project = Project(' },
        { type: 'string', indent: 2, text: `name = "${st.h1}",` },
        { type: 'string', indent: 2, text: `version = "1.0.0"` },
        { type: 'plain', indent: 1, text: ')' },
        { type: 'fn', indent: 1, text: 'project.launch()' },
        { type: 'keyword', indent: 0, text: '}' },
      ];

      /* ── Activity bar values (commit-surge shape) ── */
      const actVals = [
        .2, .3, .2, .5, .4, .3, .6, .4, .2, .3,
        .5, .7, .6, .9, .8, 1, .9, .7, .8, .6,
        .9, 1, .8, .7, .5, .6, .4, .3
      ];

      /* ── Accent-tinted panel bg ── */
      const panelBg = `${c.a1}18`;
      const panelBdr = `${c.a1}30`;

      return `
      <!-- ===================== BACKGROUND ===================== -->
      <div style="
        position:absolute;inset:0;
        background:linear-gradient(${c.gradDir}, ${c.bg1} 0%, ${c.bg2} 100%);
      "></div>

      <!-- Subtle grid overlay -->
      <div style="
        position:absolute;inset:0;
        background-image:
          linear-gradient(${c.a1}0a 1px, transparent 1px),
          linear-gradient(90deg, ${c.a1}0a 1px, transparent 1px);
        background-size: 40px 40px;
        opacity:0.6;
      "></div>

      <!-- ===================== GLOW BLOBS ===================== -->
      <!-- Top-right glow -->
      <div class="glow-blob" style="
        width:520px;height:520px;
        top:-180px;right:-60px;
        background:radial-gradient(circle, ${c.a1}2a 0%, transparent 68%);
      "></div>

      <!-- Bottom-left glow -->
      <div class="glow-blob" style="
        width:380px;height:380px;
        bottom:-140px;left:80px;
        background:radial-gradient(circle, ${c.a2}22 0%, transparent 68%);
      "></div>

      <!-- Highlight glow near code card -->
      <div class="glow-blob" style="
        width:260px;height:260px;
        top:160px;right:330px;
        background:radial-gradient(circle, ${c.hl}15 0%, transparent 68%);
      "></div>

      <!-- ===================== TOP ACCENT BAR ===================== -->
      <div style="
        position:absolute;top:0;left:0;right:0;height:4px;
        background:linear-gradient(90deg, ${c.a1}, ${c.a2}, ${c.hl});
      "></div>

      <!-- ===================== GITHUB OCTOCAT WATERMARK ===================== -->
      <div style="
        position:absolute;right:36px;top:14px;
        font-size:13px;font-weight:700;letter-spacing:1px;
        color:${c.a1};opacity:0.7;
        font-family:'Courier New',monospace;
      ">⬡ github</div>

      <!-- ===================== LEFT COLUMN ===================== -->
      <div style="
        position:absolute;
        left:0;top:4px;bottom:62px;width:46px;
        display:flex;flex-direction:column;align-items:center;
        padding-top:28px;gap:0;
        border-right:1px solid ${c.a1}22;
      ">
        <!-- Vertical repo label -->
        <div style="
          writing-mode:vertical-rl;
          text-orientation:mixed;
          transform:rotate(180deg);
          font-size:9px;
          font-weight:700;
          letter-spacing:2.5px;
          color:${c.a1};
          opacity:0.5;
          text-transform:uppercase;
          font-family:'Courier New',monospace;
          white-space:nowrap;
        ">repository</div>

        <!-- Decorative dots -->
        <div style="margin-top:auto;margin-bottom:24px;display:flex;flex-direction:column;gap:5px;align-items:center;">
          <div style="width:5px;height:5px;border-radius:50%;background:${c.a1};opacity:0.6;"></div>
          <div style="width:5px;height:5px;border-radius:50%;background:${c.a2};opacity:0.4;"></div>
          <div style="width:5px;height:5px;border-radius:50%;background:${c.hl};opacity:0.35;"></div>
        </div>
      </div>

      <!-- ===================== MAIN CONTENT AREA ===================== -->
      <div style="
        position:absolute;
        left:56px;top:14px;right:460px;bottom:68px;
        display:flex;flex-direction:column;justify-content:center;
        gap:14px;
        padding-right:8px;
      ">

        <!-- Badge pill -->
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="top-badge-pill" style="
            position:static;
            background:linear-gradient(135deg,${c.a1},${c.a2});
            font-size:10px;font-weight:800;letter-spacing:1.2px;
          ">${st.badge}</div>
          <!-- Branch chip -->
          <div style="
            display:inline-flex;align-items:center;gap:5px;
            background:${panelBg};
            border:1px solid ${panelBdr};
            border-radius:20px;
            padding:3px 10px 3px 8px;
            font-size:10px;font-weight:600;
            color:${c.a2};
            font-family:'Courier New',monospace;
          ">
            <span style="color:${c.hl};font-size:11px;">⎇</span> main
          </div>
        </div>

        <!-- ── Headline ── -->
<div style="line-height:1.08;margin-bottom:2px;">

  <div style="
    font-size:${d.hs + 2}px;
    font-weight:900;
    letter-spacing:-1.5px;
    color:#FFFFFF;
    display:inline;
  ">
    <!-- First word with marker-style background box -->
    <span style="
      background:${c.hl};
      color:${c.bg1};
      padding:0 8px 2px 4px;
      border-radius:4px;
      margin-right:6px;
    ">${st.h1.split(' ')[0]}</span>
    <span>${st.h1.split(' ').slice(1).join(' ')}</span>
  </div>

  <div style="
    font-size:${Math.round(d.hs * 0.62)}px;
    font-weight:700;
    color:${c.a2};
    letter-spacing:-0.3px;
    margin-top:8px;
  ">${st.h2}</div>

</div>

        <!-- Subtitle -->
        <div style="
          font-size:${d.ss - 1}px;
          color:#9E9CA8;
          line-height:1.5;
          max-width:380px;
        ">${st.subtitle}</div>

        <!-- Divider with language dots -->
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="divider-line" style="
            width:180px;
            background:linear-gradient(90deg,${c.a1},${c.a2}55);
          "></div>
          ${badges.slice(0, 3).map(b => `
            <div style="
              width:8px;height:8px;border-radius:50%;
              background:${b.color};
              box-shadow:0 0 6px ${b.color}88;
            "></div>
          `).join('')}
        </div>

        <!-- Features list -->
        <div style="
          display:flex;flex-direction:column;gap:6px;
        ">
          ${feats.map(f => `
            <div class="feat-item" style="gap:8px;">
              <span style="
                color:${c.a2};
                font-size:12px;
                flex-shrink:0;
              ">▸</span>
              <span style="
                font-size:${d.fs}px;
                color:#CDD3DE;
                font-family:'Courier New',monospace;
                letter-spacing:0.2px;
              ">${f}</span>
            </div>
          `).join('')}
        </div>

        <!-- Tech badge pills -->
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:2px;">
          ${badges.map(b => `
            <span class="tech-badge" style="
              background:${b.color}22;
              border:1px solid ${b.color}55;
              color:${b.color};
              font-size:10px;
              font-weight:700;
            ">${b.label}</span>
          `).join('')}
        </div>

        <!-- Stat counters row -->
        <div style="margin-top:2px;">
          ${statCounterRow(ghStats, c.a1, c.hl)}
        </div>

      </div>

      <!-- ===================== RIGHT PANEL ===================== -->
      <div style="
        position:absolute;
        right:0;top:4px;bottom:62px;width:450px;
        display:flex;flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:16px;
        padding:24px 28px 20px 20px;
      ">

        <!-- Code snippet card -->
        <div style="width:100%;">
          ${codeSnippetCard(codeLines, c.a1, 394)}
        </div>

        <!-- Phone mockup (smaller, below code) OR screenshot panel -->
        ${ss ? `
          <div style="
            width:100%;
            display:flex;align-items:center;justify-content:center;
            flex:1;
          ">
            ${phoneMockup(ss, Math.min(d.phoneW, 148), d.phoneTilt, d.glowOpacity, c.a1)}
          </div>
        ` : `
          <!-- Activity graph when no screenshot -->
          <div style="
            width:100%;
            background:${panelBg};
            border:1px solid ${panelBdr};
            border-radius:10px;
            padding:14px 16px 10px;
          ">
            <div style="
              font-size:10px;font-weight:700;
              color:${c.a2};letter-spacing:1px;
              text-transform:uppercase;
              margin-bottom:8px;
              font-family:'Courier New',monospace;
            ">⬡ Commit activity</div>
            <div style="height:48px;width:100%;">
              ${githubActivityBar(actVals, c.a1, c.hl, 28)}
            </div>
            <div style="
              display:flex;justify-content:space-between;
              margin-top:5px;
              font-size:9px;color:#4A4A5A;
              font-family:'Courier New',monospace;
            ">
              <span>Jan</span><span>Apr</span><span>Jul</span><span>Now</span>
            </div>
          </div>
        `}

      </div>

      <!-- ===================== CENTER DIVIDER (vertical) ===================== -->
      <div style="
        position:absolute;
        left:742px;top:24px;bottom:80px;width:1px;
        background:linear-gradient(180deg,
          transparent,
          ${c.a1}33 20%,
          ${c.a1}33 80%,
          transparent);
      "></div>

      <!-- ===================== SPARKLES ===================== -->
      <div class="sparkle" style="top:42px;left:520px;width:6px;height:6px;background:${c.hl};"></div>
      <div class="sparkle" style="top:180px;left:600px;width:4px;height:4px;background:${c.a2};animation-delay:0.4s;"></div>
      <div class="sparkle" style="top:520px;right:220px;width:5px;height:5px;background:${c.a1};animation-delay:0.8s;"></div>

      <!-- ===================== FOOTER BAR ===================== -->
      <div class="banner-footer-bar" style="
        height:62px;
        background:${c.bg1}ee;
        border-top:1px solid ${c.a1}28;
        backdrop-filter:blur(8px);
      ">

        <!-- Left: repo path -->
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="
            font-size:11px;font-weight:700;
            color:${c.a1};
            font-family:'Courier New',monospace;
            letter-spacing:0.3px;
          ">🐙</span>
          <span style="
            font-size:12px;font-weight:600;
            color:#9E9CA8;
            font-family:'Courier New',monospace;
          ">${st.github}</span>
        </div>

        <!-- Center: activity bar mini -->
        <div style="
          display:flex;align-items:center;gap:4px;
          height:22px;width:120px;
        ">
          ${githubActivityBar(actVals.slice(18), c.a1, c.hl, 10)}
        </div>

        <!-- Right: license + author -->
        <div style="display:flex;align-items:center;gap:14px;">
          <span style="
            font-size:10px;font-weight:600;
            color:${c.a2};opacity:0.7;
            letter-spacing:0.5px;
            border:1px solid ${c.a2}33;
            border-radius:4px;
            padding:2px 7px;
          ">MIT</span>
          <span style="
            font-size:12px;font-weight:700;
            color:#CDD3DE;
          ">${st.author}</span>
        </div>

      </div>
    `;
    }
  },

  /* ==== TEMPLATE — Recruiter Spotlight Dark ==== */
  {
    id: 'recruiter-spotlight-dark',
    name: '🔦 Recruiter Spotlight',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg, #121212, #1a1a2e)',
      emoji: '🔦',
      label: 'Spotlight'
    },

    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];

      /* ── Fixed dark theme colors ── */
      const BG = '#0d0d0d';
      const BG2 = '#111827';
      const ACCENT = c.a1 || '#985EFF';
      const ACCENT2 = c.a2 || '#03DAC5';
      const TEXT_MAIN = '#F0F0F0';
      const TEXT_SUB = '#9CA3AF';
      const TEXT_MUTED = '#4B5563';
      const GLOW_COLOR = ACCENT;

      /* ── Tech chips ── */
      const techTags = [
        '[Kotlin]',
        '[Jetpack Compose]',
        '[Material 3]',
        '[Single Activity]',
      ];

      /* ── Scan CTA arrow SVG ── */
      const arrowSVG = `
      <svg
        width="48" height="16"
        viewBox="0 0 48 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 8 H42 M34 2 L42 8 L34 14"
          stroke="${TEXT_SUB}"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `;

      return `

      <!-- ════════════════════════════════════════ -->
      <!-- BACKGROUND                               -->
      <!-- ════════════════════════════════════════ -->
      <div style="
        position: absolute;
        inset:    0;
        background: linear-gradient(160deg, ${BG} 60%, ${BG2} 100%);
      "></div>

      <!-- ════════════════════════════════════════ -->
      <!-- SUBTLE GRID OVERLAY                      -->
      <!-- ════════════════════════════════════════ -->
      <div style="
        position:   absolute;
        inset:      0;
        background-image:
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
        background-size: 40px 40px;
        pointer-events: none;
      "></div>

      <!-- ════════════════════════════════════════ -->
      <!-- GLOW BEHIND PHONE                        -->
      <!-- ════════════════════════════════════════ -->
      <div class="glow-blob" style="
        width:      420px;
        height:     420px;
        top:        -80px;
        right:      -60px;
        background: radial-gradient(
          circle,
          ${GLOW_COLOR}55 0%,
          ${GLOW_COLOR}22 40%,
          transparent 70%
        );
        filter: blur(30px);
      "></div>

      <!-- SECONDARY GLOW (bottom left) -->
      <div class="glow-blob" style="
        width:      300px;
        height:     300px;
        bottom:     -80px;
        left:       80px;
        background: radial-gradient(
          circle,
          ${ACCENT2}22 0%,
          transparent 70%
        );
        filter: blur(25px);
      "></div>

      <!-- ════════════════════════════════════════ -->
      <!-- TOP ACCENT LINE                          -->
      <!-- ════════════════════════════════════════ -->
      <div style="
        position:   absolute;
        top:        0;
        left:       0;
        right:      0;
        height:     3px;
        background: linear-gradient(
          90deg,
          transparent 0%,
          ${ACCENT}  30%,
          ${ACCENT2} 70%,
          transparent 100%
        );
      "></div>

      <!-- ════════════════════════════════════════ -->
      <!-- LEFT LABEL — VERTICAL TEXT               -->
      <!-- ════════════════════════════════════════ -->
      <div style="
        position:    absolute;
        left:        20px;
        top:         50%;
        transform:   translateY(-50%) rotate(-90deg);
        transform-origin: center center;
        font-size:   10px;
        font-weight: 600;
        letter-spacing: 3px;
        color:       ${TEXT_MUTED};
        text-transform: uppercase;
        font-family: monospace;
        white-space: nowrap;
      "></div>

      <!-- ════════════════════════════════════════ -->
      <!-- CENTER CONTENT BLOCK                     -->
      <!-- ════════════════════════════════════════ -->
      <div style="
        position:        absolute;
        left:            70px;
        right:           370px;
        top:             0;
        bottom:          62px;
        display:         flex;
        flex-direction:  column;
        justify-content: center;
        align-items:     flex-start;
        gap:             20px;
        padding-left:    20px;
      ">

        <!-- TOP EYEBROW LABEL -->
        <div style="
          display:       flex;
          align-items:   center;
          gap:           10px;
        ">
          <div style="
            width:        28px;
            height:       2px;
            background:   ${ACCENT};
            border-radius: 2px;
          "></div>
          <span style="
            font-size:    11px;
            font-weight:  700;
            letter-spacing: 3px;
            color:        ${ACCENT};
            text-transform: uppercase;
            font-family:  monospace;
          ">Portfolio Project</span>
        </div>

        <!-- MAIN HEADLINE -->
        <div style="
          display:        flex;
          flex-direction: column;
          gap:            6px;
        ">
          <div style="
            font-size:   13px;
            font-weight: 500;
            color:       ${TEXT_SUB};
            letter-spacing: 1px;
            text-transform: uppercase;
            font-family: monospace;
          ">Android Project Spotlight</div>

          <div style="
            font-size:   ${d.hs || 42}px;
            font-weight: 900;
            line-height: 1.05;
            color:       ${TEXT_MAIN};
            letter-spacing: -1px;
          ">
            Tip
            <span style="
              color: ${ACCENT};
              position: relative;
            ">Calculator</span>
          </div>
        </div>

        <!-- SUB HEADLINE -->
        <div style="
          font-size:   15px;
          color:       ${TEXT_SUB};
          line-height: 1.7;
          max-width:   420px;
          font-weight: 400;
        ">
          Seamlessly calculate tips, split bills among friends,
          and round up — all with a clean, reactive Compose UI.
        </div>

        <!-- THIN DIVIDER -->
        <div style="
          width:        60px;
          height:       2px;
          background:   linear-gradient(90deg, ${ACCENT}, transparent);
          border-radius: 2px;
        "></div>

        <!-- CODE CHIPS -->
        <div style="
          display:     flex;
          flex-wrap:   wrap;
          gap:         10px;
          align-items: center;
        ">
          ${techTags.map(tag => `
            <div style="
              font-family:   'Fira Code', 'Courier New', monospace;
              font-size:     12px;
              font-weight:   600;
              color:         ${ACCENT};
              border:        1px solid ${ACCENT}50;
              background:    ${ACCENT}12;
              padding:       5px 14px;
              border-radius: 6px;
              letter-spacing: 0.3px;
              white-space:   nowrap;
            ">${tag}</div>
          `).join('')}
        </div>

        <!-- FEATURE BULLETS -->
        <div style="
          display:        flex;
          flex-direction: column;
          gap:            8px;
          margin-top:     4px;
        ">
          ${[
          '🎚️  Smooth tip slider — 0% to 30%',
          '👥  Bill splitting for any group size',
          '⬆️  One-tap round up toggle',
        ].map(f => `
            <div style="
              display:     flex;
              align-items: center;
              gap:         10px;
              font-size:   13px;
              color:       ${TEXT_SUB};
            ">${f}</div>
          `).join('')}
        </div>

      </div>

      <!-- ════════════════════════════════════════ -->
      <!-- RIGHT SIDE — PHONE MOCKUP                -->
      <!-- ════════════════════════════════════════ -->
      <div style="
        position:        absolute;
        right:           20px;
        top:             0;
        bottom:          62px;
        width:           340px;
        display:         flex;
        align-items:     center;
        justify-content: center;
      ">
        ${ss
          ? phoneMockup(ss, d.phoneW || 230, d.phoneTilt || 5, 80, GLOW_COLOR)
          : `
            <!-- PLACEHOLDER WHEN NO SCREENSHOT -->
            <div style="
              width:           200px;
              height:          380px;
              border:          2px solid ${ACCENT}40;
              border-radius:   32px;
              background:      ${ACCENT}08;
              display:         flex;
              align-items:     center;
              justify-content: center;
              flex-direction:  column;
              gap:             12px;
              box-shadow:
                0 0 40px ${ACCENT}30,
                inset 0 0 30px ${ACCENT}10;
            ">
              <span style="font-size:36px;">📱</span>
              <span style="
                font-size:  11px;
                color:      ${TEXT_MUTED};
                font-family: monospace;
                text-align: center;
                padding: 0 20px;
              ">Upload a screenshot<br>to preview</span>
            </div>
          `
        }
      </div>

      <!-- ════════════════════════════════════════ -->
      <!-- FOOTER BAR                               -->
      <!-- ════════════════════════════════════════ -->
      <div style="
        position:        absolute;
        bottom:          0;
        left:            0;
        right:           0;
        height:          62px;
        background:      rgba(255,255,255,0.03);
        border-top:      1px solid rgba(255,255,255,0.06);
        display:         flex;
        align-items:     center;
        justify-content: space-between;
        padding:         0 38px 0 90px;
      ">

        <!-- LEFT — AUTHOR -->
        <div style="
          display:     flex;
          align-items: center;
          gap:         10px;
        ">
          <div style="
            width:           32px;
            height:          32px;
            border-radius:   50%;
            background:      linear-gradient(135deg, ${ACCENT}, ${ACCENT2});
            display:         flex;
            align-items:     center;
            justify-content: center;
            font-size:       15px;
            flex-shrink:     0;
          ">👤</div>
          <div style="
            display:        flex;
            flex-direction: column;
            gap:            1px;
          ">
            <span style="
              font-size:   12px;
              font-weight: 700;
              color:       ${TEXT_MAIN};
            ">${d.state.author || '@atanucsejgec'}</span>
            <span style="
              font-size: 10px;
              color:     ${TEXT_MUTED};
              font-family: monospace;
            ">Android Developer</span>
          </div>
        </div>

        <!-- CENTER — GITHUB LINK -->
        <div style="
          display:     flex;
          align-items: center;
          gap:         8px;
        ">
          <span style="font-size:14px;">🔗</span>
          <span style="
            font-size:   11px;
            color:       ${TEXT_SUB};
            font-family: monospace;
          ">${d.state.github || 'https://github.com/atanucsejgec/Tip_Calculator'}</span>
        </div>

        <!-- RIGHT — SCAN QR CTA -->
        <div style="
          display:     flex;
          align-items: center;
          gap:         10px;
        ">
          <!-- CTA TEXT -->
          <div style="
            text-align:  right;
            line-height: 1.5;
          ">
            <div style="
              font-size:   10px;
              color:       ${TEXT_MUTED};
              font-family: monospace;
              letter-spacing: 1px;
              text-transform: uppercase;
            ">Scan to view</div>
            <div style="
              font-size:   11px;
              font-weight: 700;
              color:       ${TEXT_SUB};
            ">Source Code</div>
          </div>

          <!-- ARROW -->
          <svg width="36" height="14" viewBox="0 0 36 14" fill="none">
            <path
              d="M0 7 H30 M24 2 L30 7 L24 12"
              stroke="${TEXT_MUTED}"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <!-- QR CODE — small size 62px to fit footer -->
          ${qrCode(62, '#ffffff', '#1a1a1a')}
        </div>

      </div>

    `;
    }
  },

  /* ==== TEMPLATE — Android Developer · Square ==== */
  {
    id: 'android-dev-square',
    name: 'Android Developer · Square',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg, #0A0F1E, #1A237E)',
      emoji: '🤖',
      label: 'Android Dev'
    },

    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];

      /* ── Canvas size ───────────────────────────────────────────── */
      const W = d.bannerW || 1080;
      const H = d.bannerH || 1080;
      const sf = Math.min(W / 1080, H / 1080);

      /* ── Layout zones ──────────────────────────────────────────── */
      const PAD = Math.round(44 * sf);
      const LEFT_W = Math.round(300 * sf);
      const MID_W = Math.round(360 * sf);
      const RIGHT_W = W - LEFT_W - MID_W - PAD * 2;
      const TOPBAR = Math.round(6 * sf);
      const FOOTER = Math.round(72 * sf);
      const INNER_T = Math.round(16 * sf);

      /* Mid column start x */
      const MID_START = PAD + LEFT_W;

      /* Tag columns */
      const TAG_W = Math.round(188 * sf);
      const LT_X = MID_START - TAG_W - Math.round(6 * sf);
      const RT_X = MID_START + MID_W + Math.round(6 * sf);

      /* ── Font sizes ────────────────────────────────────────────── */
      const FS_SUPER = Math.round(11 * sf);
      const FS_ROLE = Math.round(36 * sf);
      const FS_KOTLIN = Math.round(22 * sf);
      const FS_SUB = Math.round(13 * sf);
      const FS_APP = Math.round(15 * sf);
      const FS_BADGE = Math.round(11 * sf);
      const FS_FOOT = Math.round(11 * sf);
      const FS_INTERN = Math.round(12 * sf);
      const FS_TAG = Math.round(10 * sf);

      /* ── Phone ─────────────────────────────────────────────────── */
      const phoneWidth = Math.round((d.phoneW || 200) * sf * 1.1);

      /* ── Data ──────────────────────────────────────────────────── */
      const appName = d.state.subtitle || '📊 Student Grade Tracker App';
      const githubUrl = d.state.github || 'github.com/atanucsejgec/Student_Grade_Tracker';
      const author = d.state.author || '@atanucsejgec';
      const bottomLine = d.state.description
        || 'Passionate about Clean Code • Scalable Architecture • Modern Android';

      const featList = d.state.features.length
        ? d.state.features.slice(0, 6)
        : [
          'State Management',
          'Kotlin Data Classes',
          'Functional Programming',
          'Material 3 UI',
          'Real-Time Filtering',
          'Clean Architecture',
        ];

      const techBadges = d.state.badges.length
        ? d.state.badges.slice(0, 6)
        : [
          { label: 'Kotlin', color: '#7F52FF' },
          { label: 'Jetpack Compose', color: '#3DDC84' },
          { label: 'Material 3', color: '#6750A4' },
          { label: 'State Mgmt', color: '#03A9F4' },
          { label: 'Collection APIs', color: '#FF6D00' },
          { label: 'MVVM', color: '#E91E63' },
        ];

      /* ── Accent colours ────────────────────────────────────────── */
      const androidGreen = '#3DDC84';
      const accentMain = c.a1 || '#6750A4';
      const accentSec = c.a2 || androidGreen;
      const hlCol = c.hl || '#FFD700';

      /* ── Helpers ───────────────────────────────────────────────── */

      /* Floating feature tag pill — solid colours, no gradient on text */
      const tagPill = (text, accent, delay) => `
      <div style="
        display:inline-flex;align-items:center;gap:${Math.round(5 * sf)}px;
        background:rgba(10,15,30,0.82);
        border:1px solid ${accent}66;
        border-radius:${Math.round(20 * sf)}px;
        padding:${Math.round(4 * sf)}px ${Math.round(10 * sf)}px ${Math.round(4 * sf)}px ${Math.round(8 * sf)}px;
        box-shadow:0 2px 12px rgba(0,0,0,0.45),0 0 0 0.5px rgba(255,255,255,0.04) inset;
        white-space:nowrap;
        animation:androidTagBob 3.4s ease-in-out ${delay}s infinite alternate;">
        <span style="color:${accent};font-size:${FS_TAG}px;line-height:1;">✅</span>
        <span style="
          font-size:${FS_TAG}px;font-weight:600;
          color:#E8EAF6;letter-spacing:0.2px;line-height:1;">${text}</span>
      </div>`;

      /* Left / right tag sets */
      const leftTags = featList.slice(0, 3);
      const rightTags = featList.slice(3, 6);

      /* Android ghost SVG (background watermark) */
      const ghostSize = Math.round(320 * sf);
      const androidGhost = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 128"
        width="${ghostSize}" height="${ghostSize}"
        style="position:absolute;
          left:50%;bottom:${FOOTER + Math.round(10 * sf)}px;
          transform:translateX(-50%);
          opacity:0.04;pointer-events:none;z-index:0;">
        <g fill="${accentSec}">
          <line x1="34" y1="20" x2="24" y2="6"
            stroke="${accentSec}" stroke-width="4" stroke-linecap="round"/>
          <line x1="66" y1="20" x2="76" y2="6"
            stroke="${accentSec}" stroke-width="4" stroke-linecap="round"/>
          <path d="M18,22 Q18,8 50,8 Q82,8 82,22 L82,56
            Q82,68 70,68 L30,68 Q18,68 18,56 Z"/>
          <circle cx="36" cy="36" r="5" fill="${c.bg1 || '#070B18'}"/>
          <circle cx="64" cy="36" r="5" fill="${c.bg1 || '#070B18'}"/>
          <rect x="13" y="70" width="74" height="42" rx="8"/>
          <rect x="2"  y="70" width="9"  height="32" rx="4.5"/>
          <rect x="89" y="70" width="9"  height="32" rx="4.5"/>
          <rect x="22" y="113" width="13" height="22" rx="6.5"/>
          <rect x="65" y="113" width="13" height="22" rx="6.5"/>
        </g>
      </svg>`;

      /* Grid background SVG */
      const gridSpacing = Math.round(48 * sf);
      const gridBg = `
      <div style="position:absolute;inset:0;overflow:hidden;
        pointer-events:none;opacity:0.06;z-index:0;">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="androidGrid" width="${gridSpacing}" height="${gridSpacing}"
              patternUnits="userSpaceOnUse">
              <path d="M ${gridSpacing} 0 L 0 0 0 ${gridSpacing}"
                fill="none" stroke="${accentSec}" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#androidGrid)"/>
        </svg>
      </div>`;

      /* GitHub SVG icon */
      const ghIconSize = Math.round(16 * sf);
      const githubIcon = `
      <svg width="${ghIconSize}" height="${ghIconSize}" viewBox="0 0 24 24"
        fill="${accentSec}" style="flex-shrink:0;">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205
          11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235
          -3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695
          -.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23
          1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605
          -2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225
          -.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27
          1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23
          .66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225
          0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22
          0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57
          A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>`;

      /* ── Kotlin code lines ─────────────────────────────────────── */
      const codeLines = [
        { indent: 0, tokens: [{ type: 'comment', text: '// Filter & sort students' }] },
        {
          indent: 0, tokens: [
            { type: 'keyword', text: 'val ' },
            { type: 'var', text: 'displayedStudents' },
            { type: 'plain', text: ' =' },
          ]
        },
        { indent: 1, tokens: [{ type: 'var', text: 'students' }] },
        {
          indent: 2, tokens: [
            { type: 'punct', text: '.' },
            { type: 'fn', text: 'filter' },
            { type: 'plain', text: ' { ' },
            { type: 'keyword', text: 'it' },
            { type: 'punct', text: '.' },
            { type: 'var', text: 'isPassing' },
            { type: 'plain', text: ' }' },
          ]
        },
        {
          indent: 2, tokens: [
            { type: 'punct', text: '.' },
            { type: 'fn', text: 'sortedByDescending' },
            { type: 'plain', text: ' {' },
          ]
        },
        {
          indent: 3, tokens: [
            { type: 'keyword', text: 'it' },
            { type: 'punct', text: '.' },
            { type: 'var', text: 'grade' },
          ]
        },
        { indent: 2, tokens: [{ type: 'plain', text: '}' }] },
      ];

      /* ══════════════════════════════════════════════════════════════
         RENDER
         ══════════════════════════════════════════════════════════════ */
      return `

      <!-- ── Bob animation keyframes ──────────────────────────── -->
      <style>
        @keyframes androidTagBob {
          0%   { transform:translateY(0px);  }
          100% { transform:translateY(-5px); }
        }
        @keyframes androidPulse {
          0%,100% { opacity:0.55; }
          50%     { opacity:1;    }
        }
      </style>

      <!-- ── BACKGROUND ──────────────────────────────────────── -->
      <div style="position:absolute;inset:0;z-index:0;
        background:linear-gradient(${c.gradDir || '150deg'},
          ${c.bg1 || '#070B18'} 0%,
          ${c.bg2 || '#0D1B4B'} 55%,
          ${c.bg1 || '#070B18'} 100%);"></div>

      <!-- Grid texture -->
      ${gridBg}

      <!-- Android ghost watermark -->
      ${androidGhost}

      <!-- Glow blobs -->
      <div style="position:absolute;
        width:${Math.round(500 * sf)}px;height:${Math.round(500 * sf)}px;
        top:${Math.round(-160 * sf)}px;left:${Math.round(-100 * sf)}px;
        background:radial-gradient(circle,${accentMain}28,transparent 65%);
        border-radius:50%;pointer-events:none;z-index:0;"></div>
      <div style="position:absolute;
        width:${Math.round(400 * sf)}px;height:${Math.round(400 * sf)}px;
        bottom:${Math.round(20 * sf)}px;right:${Math.round(-80 * sf)}px;
        background:radial-gradient(circle,${accentSec}20,transparent 65%);
        border-radius:50%;pointer-events:none;z-index:0;"></div>
      <div style="position:absolute;
        width:${Math.round(300 * sf)}px;height:${Math.round(300 * sf)}px;
        top:50%;left:50%;transform:translate(-50%,-50%);
        background:radial-gradient(circle,${accentSec}14,transparent 65%);
        border-radius:50%;pointer-events:none;z-index:0;"></div>

      <!-- ── TOP ACCENT BAR ───────────────────────────────────── -->
      <div style="position:absolute;top:0;left:0;right:0;
        height:${TOPBAR}px;z-index:20;
        background:linear-gradient(90deg,${accentMain},${accentSec},${hlCol});"></div>

      <!-- Sparkles -->
      <div style="position:absolute;
        top:${Math.round(88 * sf)}px;left:${Math.round(255 * sf)}px;
        color:${accentSec};font-size:${Math.round(13 * sf)}px;
        opacity:0.65;z-index:5;
        animation:androidPulse 2.5s ease-in-out infinite;">✦</div>
      <div style="position:absolute;
        top:${Math.round(195 * sf)}px;right:${Math.round(108 * sf)}px;
        color:${hlCol};font-size:${Math.round(9 * sf)}px;
        opacity:0.55;z-index:5;
        animation:androidPulse 3.1s ease-in-out 0.7s infinite;">✦</div>
      <div style="position:absolute;
        bottom:${Math.round(138 * sf)}px;left:${Math.round(195 * sf)}px;
        color:${accentMain};font-size:${Math.round(11 * sf)}px;
        opacity:0.45;z-index:5;
        animation:androidPulse 2.8s ease-in-out 1.3s infinite;">✦</div>

      <!-- ══════════════════════════════════════════════════════
           LEFT COLUMN
           ══════════════════════════════════════════════════════ -->
      <div style="
        position:absolute;
        top:${TOPBAR + INNER_T}px;
        left:${PAD}px;
        width:${LEFT_W}px;
        bottom:${FOOTER + Math.round(8 * sf)}px;
        display:flex;flex-direction:column;
        justify-content:center;
        gap:${Math.round(12 * sf)}px;
        z-index:10;">

        <!-- Super label -->
        <div style="
          display:flex;align-items:center;
          gap:${Math.round(7 * sf)}px;">
          <div style="
            width:${Math.round(3 * sf)}px;
            height:${Math.round(20 * sf)}px;
            background:${accentSec};
            border-radius:2px;
            flex-shrink:0;"></div>
          <span style="
            font-size:${FS_SUPER}px;
            font-weight:700;
            letter-spacing:${Math.round(2.5 * sf)}px;
            text-transform:uppercase;
            color:${accentSec};">
            OPEN TO OPPORTUNITIES
          </span>
        </div>

        <!-- ANDROID gradient SVG text -->
        ${gradientTextLines(
        ['ANDROID', 'DEVELOPER'],
        '#FFFFFF',
        accentSec,
        FS_ROLE,
        900,
        -1,
        Math.round(6 * sf)
      )}

        <!-- (KOTLIN) label — plain solid colour, no gradient clip -->
        <div style="
          font-size:${FS_KOTLIN}px;
          font-weight:800;
          color:${accentSec};
          text-transform:uppercase;
          letter-spacing:${Math.round(2 * sf)}px;
          margin-top:${Math.round(-6 * sf)}px;">
          (KOTLIN)
        </div>

        <!-- Divider -->
        <div style="
          width:${Math.round(170 * sf)}px;
          height:${Math.round(2 * sf)}px;
          background:linear-gradient(90deg,${accentSec},${accentMain},transparent);
          border-radius:2px;"></div>

        <!-- Sub role — solid colours only -->
        <div style="
          font-size:${FS_SUB}px;
          font-weight:500;
          color:#B0BEC5;
          line-height:1.5;">
          Building Real&#8209;World Apps with
          <span style="color:${accentSec};font-weight:700;">Jetpack Compose</span>
        </div>

        <!-- App name highlight box -->
        <div style="
          background:linear-gradient(135deg,${accentMain}1E,${accentSec}16);
          border:1px solid ${accentSec}44;
          border-radius:${Math.round(10 * sf)}px;
          padding:${Math.round(10 * sf)}px ${Math.round(13 * sf)}px;">
          <div style="
            font-size:${FS_APP}px;
            font-weight:800;
            color:#FFFFFF;
            margin-bottom:${Math.round(4 * sf)}px;">
            ${appName}
          </div>
          <div style="
            font-size:${Math.round(FS_SUB * 0.88)}px;
            color:#78909C;
            line-height:1.4;">
            Track · Filter · Sort<br>Modern Android Architecture
          </div>
        </div>

        <!-- Internship CTA -->
        <div style="
          display:inline-flex;align-items:center;
          gap:${Math.round(7 * sf)}px;
          background:linear-gradient(135deg,${accentSec}1E,${hlCol}14);
          border:1.5px solid ${accentSec}77;
          border-radius:${Math.round(24 * sf)}px;
          padding:${Math.round(7 * sf)}px ${Math.round(14 * sf)}px;
          width:fit-content;
          box-shadow:0 0 18px ${accentSec}2A;
          animation:androidTagBob 2.8s ease-in-out 0.3s infinite alternate;">
          <span style="font-size:${Math.round(FS_INTERN * 1.1)}px;">🚀</span>
          <span style="
            font-size:${FS_INTERN}px;
            font-weight:800;
            color:${accentSec};">
            Seeking Android Internship
          </span>
        </div>

      </div>

      <!-- ══════════════════════════════════════════════════════
           LEFT FEATURE TAGS (beside phone, left side)
           ══════════════════════════════════════════════════════ -->
      <div style="
        position:absolute;
        left:${LT_X}px;
        width:${TAG_W}px;
        top:${TOPBAR + Math.round(70 * sf)}px;
        bottom:${FOOTER + Math.round(20 * sf)}px;
        display:flex;flex-direction:column;
        justify-content:space-evenly;
        align-items:flex-end;
        z-index:12;
        gap:${Math.round(6 * sf)}px;">
        ${leftTags.map((t, i) => tagPill(t, accentSec, i * 0.22)).join('')}
      </div>

      <!-- ══════════════════════════════════════════════════════
           CENTER — Phone Mockup
           ══════════════════════════════════════════════════════ -->
      <div style="
        position:absolute;
        left:${MID_START}px;
        width:${MID_W}px;
        top:${TOPBAR + INNER_T}px;
        bottom:${FOOTER}px;
        display:flex;align-items:center;justify-content:center;
        z-index:11;">

        <!-- Phone glow -->
        <div style="
          position:absolute;
          width:${Math.round(280 * sf)}px;
          height:${Math.round(280 * sf)}px;
          background:radial-gradient(circle,${accentSec}24,transparent 65%);
          border-radius:50%;pointer-events:none;"></div>

        ${phoneMockup(ss, phoneWidth, d.phoneTilt || -2, d.glowOpacity || 40, accentSec)}
      </div>

      <!-- ══════════════════════════════════════════════════════
           RIGHT FEATURE TAGS (beside phone, right side)
           ══════════════════════════════════════════════════════ -->
      <div style="
        position:absolute;
        left:${RT_X}px;
        width:${TAG_W}px;
        top:${TOPBAR + Math.round(70 * sf)}px;
        bottom:${FOOTER + Math.round(20 * sf)}px;
        display:flex;flex-direction:column;
        justify-content:space-evenly;
        align-items:flex-start;
        z-index:12;
        gap:${Math.round(6 * sf)}px;">
        ${rightTags.map((t, i) => tagPill(t, accentSec, (i + 3) * 0.22)).join('')}
      </div>

      <!-- ══════════════════════════════════════════════════════
           RIGHT COLUMN — Tech Stack + Code + GitHub
           ══════════════════════════════════════════════════════ -->
      <div style="
        position:absolute;
        top:${TOPBAR + INNER_T}px;
        right:${PAD}px;
        width:${RIGHT_W}px;
        bottom:${FOOTER + Math.round(8 * sf)}px;
        display:flex;flex-direction:column;
        justify-content:center;
        gap:${Math.round(13 * sf)}px;
        z-index:10;">

        <!-- Tech Stack heading — solid colour, no gradient clip -->
        <div style="
          display:flex;align-items:center;
          gap:${Math.round(8 * sf)}px;">
          <div style="
            width:${Math.round(18 * sf)}px;height:${Math.round(2 * sf)}px;
            background:${accentSec};border-radius:2px;flex-shrink:0;"></div>
          <span style="
            font-size:${Math.round(FS_SUPER * 1.15)}px;
            font-weight:800;
            letter-spacing:${Math.round(2 * sf)}px;
            text-transform:uppercase;
            color:${accentSec};">
            Tech Stack
          </span>
        </div>

        <!-- Badge grid -->
        <div style="display:flex;flex-wrap:wrap;gap:${Math.round(6 * sf)}px;">
          ${techBadges.map(b => `
            <span style="
              display:inline-block;
              background:${b.color}20;
              border:1px solid ${b.color}88;
              color:#FFFFFF;
              font-size:${FS_BADGE}px;
              font-weight:700;
              padding:${Math.round(4 * sf)}px ${Math.round(10 * sf)}px;
              border-radius:${Math.round(14 * sf)}px;
              white-space:nowrap;
              box-shadow:0 0 8px ${b.color}28;
              letter-spacing:0.2px;">
              ${b.label}
            </span>`).join('')}
        </div>

        <!-- Thin divider -->
        <div style="
          height:1px;
          background:linear-gradient(90deg,${accentSec}44,${accentMain}22,transparent);"></div>

        <!-- Kotlin code card -->
        ${kotlinCodeCard(codeLines, accentSec, RIGHT_W)}

        <!-- GitHub block -->
        <div style="
          background:rgba(255,255,255,0.03);
          border:1px solid ${accentSec}33;
          border-radius:${Math.round(10 * sf)}px;
          padding:${Math.round(10 * sf)}px ${Math.round(13 * sf)}px;
          display:flex;flex-direction:column;
          gap:${Math.round(5 * sf)}px;">

          <div style="display:flex;align-items:center;gap:${Math.round(8 * sf)}px;">
            ${githubIcon}
            <span style="
              font-size:${Math.round(FS_SUB * 0.95)}px;
              font-weight:800;
              color:${accentSec};">
              GitHub Repository
            </span>
          </div>

          <div style="
            font-size:${Math.round(FS_BADGE * 1.05)}px;
            font-weight:500;
            color:#78909C;
            line-height:1.45;
            word-break:break-all;">
            🔗 ${githubUrl}
          </div>
        </div>

      </div>

      <!-- ══════════════════════════════════════════════════════
           FOOTER
           ══════════════════════════════════════════════════════ -->
      <div style="
        position:absolute;left:0;right:0;bottom:0;
        height:${FOOTER}px;
        background:linear-gradient(90deg,
          ${accentMain}20,${accentSec}16,${accentMain}20);
        border-top:1px solid ${accentSec}2A;
        display:flex;align-items:center;justify-content:space-between;
        padding:0 ${PAD}px;
        z-index:15;">

        <!-- Passion tagline — plain colour, no gradient clip -->
        <span style="
          font-size:${FS_FOOT}px;
          font-weight:500;
          color:#607D8B;
          font-style:italic;
          letter-spacing:0.3px;">
          ${bottomLine}
        </span>

        <!-- Author + badge -->
        <div style="display:flex;align-items:center;gap:${Math.round(10 * sf)}px;flex-shrink:0;">
          <span style="
            font-size:${FS_FOOT}px;
            font-weight:700;
            color:#ECEFF1;">
            ${author}
          </span>
          <span style="
            background:${androidGreen}1E;
            border:1px solid ${androidGreen}77;
            border-radius:${Math.round(12 * sf)}px;
            padding:${Math.round(3 * sf)}px ${Math.round(9 * sf)}px;
            font-size:${Math.round(FS_BADGE * 0.95)}px;
            font-weight:700;
            color:${androidGreen};
            white-space:nowrap;">
            🤖 Android Dev
          </span>
        </div>

      </div>

    `;
    }
  },


  /* ==== TEMPLATE — Student Grade Tracker (Square) ==== */
  {
    id: 'student-grade-tracker-square',
    name: 'Student Grade Tracker',
    tag: 'No Screenshot',
    screenshots: 0,
    thumb: {
      bg: 'linear-gradient(135deg, #1C1B1F, #2D1B69)',
      emoji: '🎓',
      label: 'Grade Tracker'
    },

    render(d) {
      const c = d.colors;
      const W = d.bannerW || 1080;
      const H = d.bannerH || 1080;

      const feats = (d.state.features && d.state.features.length)
        ? d.state.features.slice(0, 6)
        : [
          'Grade Tracking',
          'Subject-wise Analytics',
          'Filtering System',
          'Compose UI',
          'Collection Operations',
          'Reactive State Management'
        ];

      const techStack = (d.state.badges && d.state.badges.length)
        ? d.state.badges
        : [
          { label: 'Kotlin', color: '#7F52FF' },
          { label: 'Jetpack Compose', color: '#03DAC5' },
          { label: 'Material 3', color: '#6750A4' },
          { label: 'LazyColumn', color: '#BB86FC' },
          { label: 'Data Classes', color: '#03DAC5' },
          { label: 'Enums', color: '#CF6679' }
        ];

      const badge = d.state.badge || '🚀 JUST SHIPPED';
      const h1 = d.state.h1 || 'Student Grade';
      const h2 = d.state.h2 || 'Tracker';
      const sub = d.state.subtitle || 'Smart Grade Management App';
      const desc = d.state.description || 'Built with Kotlin & Jetpack Compose';
      const github = d.state.github || 'github.com/atanucsejgec/Student_Grade_Tracker';
      const author = d.state.author || '@atanucsejgec';

      /* ── screenshot (may be null) ───────────────────────── */
      const ss = d.screenshots[0] || null;

      /* ── scale factor ───────────────────────────────────── */
      const scale = W / 1080;

      /* ── font sizes ─────────────────────────────────────── */
      const hs = Math.round((d.hs || 48) * scale);
      const sss = Math.round((d.ss || 15) * scale);
      const fs = Math.round((d.fs || 12) * scale);

      /* ── layout constants ───────────────────────────────── */
      const PAD = Math.round(36 * scale);
      const FOOTER = Math.round(72 * scale);
      const TOPBAR = Math.round(5 * scale);
      const DIVH = Math.round(3 * scale);

      /* ── column widths ──────────────────────────────────── */
      // Three columns: LEFT | PHONE | RIGHT
      const LEFT_W = Math.round(310 * scale);   // text + features
      const PHONE_W = Math.round(240 * scale);   // phone mockup column
      const RIGHT_W = Math.round(330 * scale);   // UI cards
      const GAP = Math.round(
        (W - PAD * 2 - LEFT_W - PHONE_W - RIGHT_W) / 2
      );

      const LEFT_X = PAD;
      const PHONE_X = LEFT_X + LEFT_W + GAP;
      const RIGHT_X = PHONE_X + PHONE_W + GAP;

      /* ── phone dimensions ───────────────────────────────── */
      const phoneFrameW = PHONE_W;                          // frame outer width
      const phoneTilt = d.phoneTilt || 0;                 // keep upright in center
      const glowOp = d.glowOpacity || 35;

      /* ── content top / bottom ───────────────────────────── */
      const CONTENT_TOP = Math.round(82 * scale);
      const CONTENT_BOTTOM = FOOTER + Math.round(14 * scale);

      /* ═══════════════════════════════════════════════════════
         INLINE PHONE SCREEN — rendered inside the phone mockup
         when no screenshot is uploaded.
         We build a tiny HTML snapshot as a data-URI SVG so
         phoneMockup() always has something to show.
         ═══════════════════════════════════════════════════════ */
      const buildFallbackScreen = () => {
        // Pixel dims of the phone's inner screen at our scale
        const SW = Math.round(200 * scale);
        const SH = Math.round(400 * scale);
        const bg1 = c.bg1;
        const bg2 = c.bg2;
        const ac1 = c.a1;
        const ac2 = c.a2;
        const hl = c.hl;

        // We embed a tiny SVG-based screen design
        // (avoids any external image dependency)
        const svgScreen = `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="${SW}" height="${SH}" viewBox="0 0 ${SW} ${SH}">
          <defs>
            <linearGradient id="sbg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stop-color="${bg1}"/>
              <stop offset="100%" stop-color="${bg2}"/>
            </linearGradient>
            <linearGradient id="sbar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stop-color="${ac1}"/>
              <stop offset="100%" stop-color="${ac2}"/>
            </linearGradient>
            <linearGradient id="spb1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stop-color="${ac1}"/>
              <stop offset="100%" stop-color="${ac2}"/>
            </linearGradient>
            <clipPath id="sclip">
              <rect width="${SW}" height="${SH}" rx="0" ry="0"/>
            </clipPath>
          </defs>

          <!-- BG -->
          <rect width="${SW}" height="${SH}" fill="url(#sbg)"/>

          <!-- grid lines -->
          ${Array.from({ length: 10 }, (_, i) => `
            <line x1="0" y1="${i * SH / 10}" x2="${SW}" y2="${i * SH / 10}"
                  stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
            <line x1="${i * SW / 10}" y1="0" x2="${i * SW / 10}" y2="${SH}"
                  stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
          `).join('')}

          <!-- top accent bar -->
          <rect x="0" y="0" width="${SW}" height="${Math.round(3 * scale)}"
                fill="url(#sbar)"/>

          <!-- app header -->
          <rect x="${Math.round(10 * scale)}" y="${Math.round(14 * scale)}"
                width="${SW - Math.round(20 * scale)}"
                height="${Math.round(36 * scale)}"
                rx="${Math.round(8 * scale)}"
                fill="rgba(255,255,255,0.07)"/>
          <!-- app icon circle -->
          <circle cx="${Math.round(26 * scale)}"
                  cy="${Math.round(14 * scale) + Math.round(18 * scale)}"
                  r="${Math.round(11 * scale)}"
                  fill="${ac1}"/>
          <text x="${Math.round(26 * scale)}"
                y="${Math.round(14 * scale) + Math.round(23 * scale)}"
                font-size="${Math.round(12 * scale)}"
                text-anchor="middle" fill="#fff">🎓</text>
          <text x="${Math.round(44 * scale)}"
                y="${Math.round(14 * scale) + Math.round(15 * scale)}"
                font-size="${Math.round(9 * scale)}"
                font-weight="bold" fill="#fff"
                font-family="sans-serif">Grade Tracker</text>
          <text x="${Math.round(44 * scale)}"
                y="${Math.round(14 * scale) + Math.round(27 * scale)}"
                font-size="${Math.round(7 * scale)}"
                fill="rgba(255,255,255,0.45)"
                font-family="sans-serif">5 Students</text>

          <!-- stats row -->
          ${[
            { lbl: 'Avg', val: '87%', x: Math.round(10 * scale), col: ac1 },
            { lbl: 'Top', val: 'A+', x: Math.round(80 * scale), col: hl },
            { lbl: 'Subj', val: '4', x: Math.round(150 * scale), col: ac2 },
          ].map(s => `
            <rect x="${s.x}" y="${Math.round(60 * scale)}"
                  width="${Math.round(56 * scale)}"
                  height="${Math.round(38 * scale)}"
                  rx="${Math.round(6 * scale)}"
                  fill="rgba(255,255,255,0.07)"/>
            <text x="${s.x + Math.round(28 * scale)}"
                  y="${Math.round(82 * scale)}"
                  font-size="${Math.round(11 * scale)}"
                  font-weight="bold" text-anchor="middle"
                  fill="${s.col}"
                  font-family="sans-serif">${s.val}</text>
            <text x="${s.x + Math.round(28 * scale)}"
                  y="${Math.round(91 * scale)}"
                  font-size="${Math.round(6 * scale)}"
                  text-anchor="middle"
                  fill="rgba(255,255,255,0.4)"
                  font-family="sans-serif">${s.lbl}</text>
          `).join('')}

          <!-- section label -->
          <text x="${Math.round(10 * scale)}"
                y="${Math.round(114 * scale)}"
                font-size="${Math.round(7 * scale)}"
                font-weight="800"
                letter-spacing="1"
                fill="rgba(255,255,255,0.35)"
                font-family="sans-serif">STUDENT RANKINGS</text>

          <!-- student rows -->
          ${[
            { name: 'Alice Johnson', grade: 'A', pct: 0.94, col: ac2 },
            { name: 'Bob Smith', grade: 'B+', pct: 0.81, col: ac1 },
            { name: 'Carol Davis', grade: 'A-', pct: 0.88, col: hl },
            { name: 'David Lee', grade: 'B', pct: 0.75, col: '#CF6679' },
            { name: 'Eva Martin', grade: 'C+', pct: 0.65, col: '#888888' },
          ].map((st, i) => {
            const ry = Math.round(120 * scale) + i * Math.round(42 * scale);
            const rh = Math.round(34 * scale);
            const rw = SW - Math.round(20 * scale);
            const barW = Math.round((rw - Math.round(64 * scale)) * st.pct);
            return `
              <rect x="${Math.round(10 * scale)}" y="${ry}"
                    width="${rw}" height="${rh}"
                    rx="${Math.round(7 * scale)}"
                    fill="rgba(255,255,255,0.05)"/>
              <!-- avatar circle -->
              <circle cx="${Math.round(10 * scale) + Math.round(17 * scale)}"
                      cy="${ry + Math.round(17 * scale)}"
                      r="${Math.round(11 * scale)}"
                      fill="${st.col}"/>
              <text x="${Math.round(10 * scale) + Math.round(17 * scale)}"
                    y="${ry + Math.round(22 * scale)}"
                    font-size="${Math.round(9 * scale)}"
                    font-weight="bold" text-anchor="middle"
                    fill="#fff" font-family="sans-serif">
                    ${st.name.charAt(0)}</text>
              <!-- name -->
              <text x="${Math.round(10 * scale) + Math.round(33 * scale)}"
                    y="${ry + Math.round(13 * scale)}"
                    font-size="${Math.round(8 * scale)}"
                    font-weight="600" fill="#fff"
                    font-family="sans-serif">${st.name}</text>
              <!-- progress bar bg -->
              <rect x="${Math.round(10 * scale) + Math.round(33 * scale)}"
                    y="${ry + Math.round(20 * scale)}"
                    width="${rw - Math.round(64 * scale)}"
                    height="${Math.round(3 * scale)}"
                    rx="${Math.round(2 * scale)}"
                    fill="rgba(255,255,255,0.1)"/>
              <!-- progress bar fill -->
              <rect x="${Math.round(10 * scale) + Math.round(33 * scale)}"
                    y="${ry + Math.round(20 * scale)}"
                    width="${barW}"
                    height="${Math.round(3 * scale)}"
                    rx="${Math.round(2 * scale)}"
                    fill="${st.col}"/>
              <!-- grade badge -->
              <rect x="${rw - Math.round(18 * scale)}"
                    y="${ry + Math.round(9 * scale)}"
                    width="${Math.round(22 * scale)}"
                    height="${Math.round(16 * scale)}"
                    rx="${Math.round(4 * scale)}"
                    fill="${st.col}22"/>
              <text x="${rw - Math.round(7 * scale)}"
                    y="${ry + Math.round(21 * scale)}"
                    font-size="${Math.round(8 * scale)}"
                    font-weight="800" text-anchor="middle"
                    fill="${st.col}" font-family="sans-serif">${st.grade}</text>
            `;
          }).join('')}

          <!-- subject cards row -->
          <text x="${Math.round(10 * scale)}"
                y="${Math.round(338 * scale)}"
                font-size="${Math.round(7 * scale)}"
                font-weight="800"
                letter-spacing="1"
                fill="rgba(255,255,255,0.35)"
                font-family="sans-serif">SUBJECTS</text>

          ${[
            { icon: '🔬', sub: 'Sci', val: '92', col: ac2 },
            { icon: '📐', sub: 'Math', val: '78', col: ac1 },
            { icon: '📖', sub: 'Eng', val: '88', col: hl },
            { icon: '🌍', sub: 'Hist', val: '81', col: '#CF6679' },
          ].map((sj, i) => {
            const cardW = Math.round(40 * scale);
            const cardX = Math.round(10 * scale) + i * (cardW + Math.round(6 * scale));
            return `
              <rect x="${cardX}" y="${Math.round(344 * scale)}"
                    width="${cardW}" height="${Math.round(42 * scale)}"
                    rx="${Math.round(7 * scale)}"
                    fill="rgba(255,255,255,0.06)"
                    stroke="${sj.col}" stroke-opacity="0.25" stroke-width="1"/>
              <text x="${cardX + Math.round(20 * scale)}"
                    y="${Math.round(360 * scale)}"
                    font-size="${Math.round(11 * scale)}"
                    text-anchor="middle">${sj.icon}</text>
              <text x="${cardX + Math.round(20 * scale)}"
                    y="${Math.round(373 * scale)}"
                    font-size="${Math.round(8 * scale)}"
                    font-weight="700" text-anchor="middle"
                    fill="${sj.col}" font-family="sans-serif">${sj.val}</text>
              <text x="${cardX + Math.round(20 * scale)}"
                    y="${Math.round(382 * scale)}"
                    font-size="${Math.round(6 * scale)}"
                    text-anchor="middle"
                    fill="rgba(255,255,255,0.4)"
                    font-family="sans-serif">${sj.sub}</text>
            `;
          }).join('')}
        </svg>
      `;

        // Convert SVG to data URI
        const encoded = 'data:image/svg+xml;charset=utf-8,' +
          encodeURIComponent(svgScreen.trim());
        return encoded;
      };

      /* ── choose screen source ───────────────────────────── */
      const screenSrc = ss || buildFallbackScreen();

      /* ═══════════════════════════════════════════════════════
         TAGLINE
         ═══════════════════════════════════════════════════════ */
      const tagline = `
      <div style="
        font-size:${Math.round(9 * scale)}px;
        font-weight:700;
        letter-spacing:${Math.round(2.5 * scale)}px;
        color:${c.a2};
        text-transform:uppercase;
        margin-bottom:${Math.round(8 * scale)}px;
      ">ANDROID &nbsp;•&nbsp; KOTLIN &nbsp;•&nbsp; JETPACK COMPOSE</div>
    `;

      /* ═══════════════════════════════════════════════════════
         HEADLINE — SVG gradient text
         ═══════════════════════════════════════════════════════ */
      const headSvgW = LEFT_W;
      const headSvgH = Math.round(120 * scale);
      const hLine1Y = Math.round(hs * 1.0);
      const hLine2Y = Math.round(hLine1Y + hs * 1.2);
      const headlineSvg = `
      <svg width="${headSvgW}" height="${headSvgH}"
           viewBox="0 0 ${headSvgW} ${headSvgH}"
           xmlns="http://www.w3.org/2000/svg"
           style="overflow:visible;display:block;flex-shrink:0;">
        <defs>
          <linearGradient id="hg1sq" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color="${c.hl}"/>
            <stop offset="100%" stop-color="${c.a2}"/>
          </linearGradient>
        </defs>
        <text x="0" y="${hLine1Y}"
              font-family="'Segoe UI',system-ui,sans-serif"
              font-size="${hs}" font-weight="900"
              fill="url(#hg1sq)">${h1}</text>
        <text x="0" y="${hLine2Y}"
              font-family="'Segoe UI',system-ui,sans-serif"
              font-size="${hs}" font-weight="900"
              fill="#FFFFFF">${h2}</text>
      </svg>
    `;

      /* ═══════════════════════════════════════════════════════
         FEATURE LIST
         ═══════════════════════════════════════════════════════ */
      const featList = feats.map(f => `
      <div style="
        display:flex;align-items:center;
        gap:${Math.round(7 * scale)}px;
        margin-bottom:${Math.round(4 * scale)}px;
      ">
        <span style="
          background:${c.a1}33;
          color:${c.a2};
          border:1px solid ${c.a2}55;
          font-size:${Math.round(9 * scale)}px;
          width:${Math.round(17 * scale)}px;
          height:${Math.round(17 * scale)}px;
          border-radius:50%;
          display:inline-flex;align-items:center;justify-content:center;
          flex-shrink:0;font-weight:700;
        ">✓</span>
        <span style="
          font-size:${fs}px;
          color:rgba(255,255,255,0.85);
          font-weight:500;
        ">${f}</span>
      </div>
    `).join('');

      /* ═══════════════════════════════════════════════════════
         TECH PILLS
         ═══════════════════════════════════════════════════════ */
      const techPills = techStack.map(b => `
      <span style="
        background:${b.color}22;
        color:${b.color};
        border:1px solid ${b.color}55;
        font-size:${Math.round(9 * scale)}px;
        padding:${Math.round(3 * scale)}px ${Math.round(9 * scale)}px;
        border-radius:20px;
        font-weight:700;
        letter-spacing:0.3px;
        white-space:nowrap;
      ">${b.label}</span>
    `).join('');

      /* ═══════════════════════════════════════════════════════
         RIGHT PANEL HELPERS
         ═══════════════════════════════════════════════════════ */
      const statItem = (icon, val, lbl, ac) => `
      <div style="
        flex:1;
        background:rgba(255,255,255,0.05);
        border:1px solid ${ac}33;
        border-radius:${Math.round(9 * scale)}px;
        padding:${Math.round(8 * scale)}px ${Math.round(4 * scale)}px;
        text-align:center;
      ">
        <div style="font-size:${Math.round(14 * scale)}px;line-height:1;">${icon}</div>
        <div style="font-size:${Math.round(13 * scale)}px;font-weight:800;
          color:${ac};margin-top:${Math.round(3 * scale)}px;">${val}</div>
        <div style="font-size:${Math.round(7 * scale)}px;color:rgba(255,255,255,0.4);
          letter-spacing:0.4px;text-transform:uppercase;
          margin-top:${Math.round(2 * scale)}px;">${lbl}</div>
      </div>
    `;

      const studentRow = (name, grade, color, pct) => `
      <div style="
        display:flex;align-items:center;
        gap:${Math.round(7 * scale)}px;
        padding:${Math.round(6 * scale)}px ${Math.round(9 * scale)}px;
        background:rgba(255,255,255,0.04);
        border-radius:${Math.round(7 * scale)}px;
        border:1px solid rgba(255,255,255,0.07);
        margin-bottom:${Math.round(4 * scale)}px;
      ">
        <div style="
          width:${Math.round(22 * scale)}px;height:${Math.round(22 * scale)}px;
          border-radius:50%;
          background:linear-gradient(135deg,${color},${color}99);
          display:flex;align-items:center;justify-content:center;
          font-size:${Math.round(9 * scale)}px;font-weight:800;color:#fff;
          flex-shrink:0;
        ">${name.charAt(0)}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:${Math.round(9 * scale)}px;color:#fff;font-weight:600;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${name}</div>
          <div style="
            margin-top:${Math.round(3 * scale)}px;
            height:${Math.round(3 * scale)}px;
            border-radius:99px;background:rgba(255,255,255,0.1);overflow:hidden;">
            <div style="width:${pct}%;height:100%;
              background:linear-gradient(90deg,${color},${color}cc);
              border-radius:99px;"></div>
          </div>
        </div>
        <div style="
          font-size:${Math.round(12 * scale)}px;font-weight:800;
          color:${color};flex-shrink:0;
        ">${grade}</div>
      </div>
    `;

      /* ── thin divider line helper ──────────────────────── */
      const vDivider = (x, top, bottom, fromColor, toColor) => `
      <div style="
        position:absolute;
        left:${x}px;
        top:${top}px;
        bottom:${bottom}px;
        width:1px;
        background:linear-gradient(
          to bottom,
          transparent,
          ${fromColor}55 25%,
          ${toColor}55 75%,
          transparent
        );
      "></div>
    `;

      /* ═══════════════════════════════════════════════════════
         RENDER
         ═══════════════════════════════════════════════════════ */
      return `
      <!-- ══ BACKGROUND ══════════════════════════════════ -->
      <div style="position:absolute;inset:0;
        background:linear-gradient(${c.gradDir},${c.bg1} 0%,${c.bg2} 100%);"></div>

      <!-- ══ GRID OVERLAY ════════════════════════════════ -->
      <div style="position:absolute;inset:0;opacity:0.035;
        background-image:
          linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),
          linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px);
        background-size:${Math.round(38 * scale)}px ${Math.round(38 * scale)}px;">
      </div>

      <!-- ══ GLOW BLOBS ═══════════════════════════════════ -->
      <div class="glow-blob" style="
        width:${Math.round(460 * scale)}px;height:${Math.round(460 * scale)}px;
        top:${Math.round(-180 * scale)}px;right:${Math.round(-100 * scale)}px;
        background:radial-gradient(circle,${c.a1}44,transparent 65%);"></div>

      <div class="glow-blob" style="
        width:${Math.round(360 * scale)}px;height:${Math.round(360 * scale)}px;
        bottom:${Math.round(-120 * scale)}px;left:${Math.round(-80 * scale)}px;
        background:radial-gradient(circle,${c.a2}33,transparent 65%);"></div>

      <!-- phone center glow -->
      <div class="glow-blob" style="
        width:${Math.round(320 * scale)}px;height:${Math.round(500 * scale)}px;
        top:50%;left:50%;
        transform:translate(-50%,-50%);
        background:radial-gradient(ellipse,${c.a1}28,transparent 68%);
        pointer-events:none;"></div>

      <!-- ══ TOP ACCENT BAR ═══════════════════════════════ -->
      <div style="position:absolute;top:0;left:0;right:0;height:${TOPBAR}px;
        background:linear-gradient(90deg,${c.a1},${c.a2},${c.hl});"></div>

      <!-- ══ TOP BADGE ════════════════════════════════════ -->
      <div style="
        position:absolute;
        top:${Math.round(20 * scale)}px;
        left:${PAD}px;
        background:linear-gradient(135deg,${c.a1},${c.a2});
        font-size:${Math.round(9 * scale)}px;
        padding:${Math.round(5 * scale)}px ${Math.round(14 * scale)}px;
        border-radius:20px;
        font-weight:700;letter-spacing:1px;color:#fff;
        box-shadow:0 4px 14px ${c.a1}55;
      ">${badge}</div>

      <!-- ══════════════════════════════════════════════════
           LEFT COLUMN — text panel
           ══════════════════════════════════════════════════ -->
      <div style="
        position:absolute;
        left:${LEFT_X}px;
        top:${CONTENT_TOP}px;
        width:${LEFT_W}px;
        bottom:${CONTENT_BOTTOM}px;
        display:flex;flex-direction:column;
        justify-content:center;
      ">
        ${tagline}
        ${headlineSvg}

        <div style="
          font-size:${sss}px;color:rgba(202,196,208,0.9);
          margin-top:${Math.round(10 * scale)}px;font-weight:400;letter-spacing:0.2px;
        ">${sub}</div>

        <div style="
          font-size:${Math.round(10 * scale)}px;color:${c.a2};
          margin-top:${Math.round(3 * scale)}px;font-weight:600;letter-spacing:0.5px;
        ">${desc}</div>

        <!-- divider 1 -->
        <div style="
          width:${Math.round(180 * scale)}px;height:${DIVH}px;
          background:linear-gradient(90deg,${c.a1},${c.a2},transparent);
          margin:${Math.round(14 * scale)}px 0 ${Math.round(10 * scale)}px;
          border-radius:99px;
        "></div>

        <!-- FEATURES heading -->
        <div style="
          font-size:${Math.round(8 * scale)}px;font-weight:800;
          letter-spacing:${Math.round(2 * scale)}px;
          color:${c.a1};text-transform:uppercase;
          margin-bottom:${Math.round(7 * scale)}px;
        ">FEATURES</div>

        ${featList}

        <!-- divider 2 -->
        <div style="
          width:${Math.round(180 * scale)}px;height:${DIVH}px;
          background:linear-gradient(90deg,${c.a2},${c.a1},transparent);
          margin:${Math.round(12 * scale)}px 0 ${Math.round(8 * scale)}px;
          border-radius:99px;
        "></div>

        <!-- TECH STACK heading -->
        <div style="
          font-size:${Math.round(8 * scale)}px;font-weight:800;
          letter-spacing:${Math.round(2 * scale)}px;
          color:${c.a2};text-transform:uppercase;
          margin-bottom:${Math.round(7 * scale)}px;
        ">TECH STACK</div>

        <div style="display:flex;flex-wrap:wrap;gap:${Math.round(4 * scale)}px;">
          ${techPills}
        </div>
      </div>

      <!-- ══ LEFT VERTICAL DIVIDER ════════════════════════ -->
      ${vDivider(
        PHONE_X - Math.round(GAP * 0.5),
        Math.round(110 * scale),
        FOOTER + Math.round(20 * scale),
        c.a1, c.a2
      )}

      <!-- ══════════════════════════════════════════════════
           CENTER COLUMN — phone mockup
           ══════════════════════════════════════════════════ -->
      <div style="
        position:absolute;
        left:${PHONE_X}px;
        top:${Math.round(70 * scale)}px;
        width:${PHONE_W}px;
        bottom:${FOOTER + Math.round(10 * scale)}px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:${Math.round(12 * scale)}px;
      ">
        <!-- small label above phone -->
        <div style="
          font-size:${Math.round(8 * scale)}px;
          font-weight:700;
          letter-spacing:${Math.round(2 * scale)}px;
          color:rgba(255,255,255,0.3);
          text-transform:uppercase;
        ">APP PREVIEW</div>

        <!-- phone mockup -->
        <div style="
          filter:drop-shadow(0 ${Math.round(20 * scale)}px ${Math.round(40 * scale)}px ${c.a1}55)
                 drop-shadow(0 ${Math.round(6 * scale)}px  ${Math.round(20 * scale)}px rgba(0,0,0,0.5));
        ">
          ${phoneMockup(
        screenSrc,
        phoneFrameW,
        phoneTilt,
        glowOp,
        c.a1
      )}
        </div>

        <!-- small label below phone -->
        <div style="
          font-size:${Math.round(8 * scale)}px;
          color:${c.a2};
          font-weight:600;
          letter-spacing:0.5px;
          opacity:0.8;
        ">Kotlin &amp; Jetpack Compose</div>
      </div>

      <!-- ══ RIGHT VERTICAL DIVIDER ═══════════════════════ -->
      ${vDivider(
        RIGHT_X - Math.round(GAP * 0.5),
        Math.round(110 * scale),
        FOOTER + Math.round(20 * scale),
        c.a2, c.a1
      )}

      <!-- ══════════════════════════════════════════════════
           RIGHT COLUMN — floating UI cards
           ══════════════════════════════════════════════════ -->
      <div style="
        position:absolute;
        right:${PAD}px;
        top:${CONTENT_TOP}px;
        width:${RIGHT_W}px;
        bottom:${CONTENT_BOTTOM}px;
        display:flex;flex-direction:column;
        justify-content:center;
        gap:${Math.round(9 * scale)}px;
      ">

        <!-- ── APP HEADER CARD ──────────────────────────── -->
        <div style="
          background:rgba(255,255,255,0.06);
          border:1px solid ${c.a1}44;
          border-radius:${Math.round(14 * scale)}px;
          padding:${Math.round(12 * scale)}px ${Math.round(14 * scale)}px;
          backdrop-filter:blur(10px);
          box-shadow:0 8px 28px rgba(0,0,0,0.3);
        ">
          <div style="display:flex;align-items:center;
            gap:${Math.round(9 * scale)}px;margin-bottom:${Math.round(9 * scale)}px;">
            <div style="
              width:${Math.round(32 * scale)}px;height:${Math.round(32 * scale)}px;
              border-radius:${Math.round(9 * scale)}px;
              background:linear-gradient(135deg,${c.a1},${c.a2});
              display:flex;align-items:center;justify-content:center;
              font-size:${Math.round(16 * scale)}px;flex-shrink:0;
            ">🎓</div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:${Math.round(11 * scale)}px;font-weight:700;color:#fff;">
                Grade Tracker</div>
              <div style="font-size:${Math.round(8 * scale)}px;color:rgba(255,255,255,0.4);">
                5 Students • 4 Subjects</div>
            </div>
            <div style="
              background:${c.a2}22;border:1px solid ${c.a2}55;
              color:${c.a2};font-size:${Math.round(8 * scale)}px;font-weight:700;
              padding:${Math.round(2 * scale)}px ${Math.round(8 * scale)}px;
              border-radius:20px;letter-spacing:0.5px;flex-shrink:0;
            ">LIVE</div>
          </div>
          <!-- stats -->
          <div style="display:flex;gap:${Math.round(6 * scale)}px;">
            ${statItem('📊', '87.4%', 'Avg Grade', c.a1)}
            ${statItem('🏆', 'Alice', 'Top Student', c.hl)}
            ${statItem('📚', '4', 'Subjects', c.a2)}
          </div>
        </div>

        <!-- ── STUDENT RANKINGS ─────────────────────────── -->
        <div style="
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.09);
          border-radius:${Math.round(14 * scale)}px;
          padding:${Math.round(11 * scale)}px ${Math.round(13 * scale)}px;
          backdrop-filter:blur(10px);
          box-shadow:0 8px 28px rgba(0,0,0,0.22);
        ">
          <div style="
            font-size:${Math.round(8 * scale)}px;font-weight:800;letter-spacing:2px;
            color:rgba(255,255,255,0.35);text-transform:uppercase;
            margin-bottom:${Math.round(8 * scale)}px;
          ">STUDENT RANKINGS</div>
          ${studentRow('Alice Johnson', 'A', c.a2, 94)}
          ${studentRow('Bob Smith', 'B+', c.a1, 81)}
          ${studentRow('Carol Davis', 'A-', c.hl, 88)}
          ${studentRow('David Lee', 'B', '#CF6679', 75)}
        </div>

        <!-- ── SUBJECT CARDS ────────────────────────────── -->
        <div style="display:flex;gap:${Math.round(6 * scale)}px;">
          ${gradeFloatCard('🔬', 'Science', '92.1', 'A', c.a2, 'rgba(255,255,255,0.06)')}
          ${gradeFloatCard('📐', 'Math', '78.5', 'B+', c.a1, 'rgba(255,255,255,0.06)')}
          ${gradeFloatCard('📖', 'English', '88.0', 'A-', c.hl, 'rgba(255,255,255,0.06)')}
          ${gradeFloatCard('🌍', 'History', '81.3', 'B+', '#CF6679', 'rgba(255,255,255,0.06)')}
        </div>

        <!-- ── FILTER CHIPS ──────────────────────────────── -->
        <div style="
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:${Math.round(11 * scale)}px;
          padding:${Math.round(9 * scale)}px ${Math.round(13 * scale)}px;
          display:flex;align-items:center;
          gap:${Math.round(6 * scale)}px;
          flex-wrap:wrap;
          backdrop-filter:blur(6px);
        ">
          <span style="font-size:${Math.round(8 * scale)}px;color:rgba(255,255,255,0.35);
            font-weight:700;letter-spacing:1px;text-transform:uppercase;
            flex-shrink:0;">Filter:</span>
          ${['All', 'Grade A', 'Grade B', 'Grade C'].map((lbl, i) => `
            <span style="
              font-size:${Math.round(9 * scale)}px;font-weight:700;
              padding:${Math.round(3 * scale)}px ${Math.round(9 * scale)}px;
              border-radius:20px;
              ${i === 0
          ? `background:linear-gradient(135deg,${c.a1},${c.a2});color:#fff;`
          : `background:rgba(255,255,255,0.06);
                   color:rgba(255,255,255,0.45);
                   border:1px solid rgba(255,255,255,0.1);`
        }
            ">${lbl}</span>
          `).join('')}
        </div>

      </div>

      <!-- ══ FOOTER ════════════════════════════════════════ -->
      <div style="
        position:absolute;bottom:0;left:0;right:0;
        height:${FOOTER}px;
        background:${c.a1}18;
        border-top:1px solid ${c.a1}44;
        display:flex;align-items:center;justify-content:space-between;
        padding:0 ${PAD}px;
        gap:${Math.round(10 * scale)}px;
      ">
        <!-- GitHub icon + text -->
        <div style="display:flex;align-items:center;gap:${Math.round(9 * scale)}px;
          min-width:0;flex-shrink:1;">
          <svg width="${Math.round(18 * scale)}" height="${Math.round(18 * scale)}"
               viewBox="0 0 24 24"
               fill="rgba(255,255,255,0.65)" style="flex-shrink:0;">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205
              11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235
              -3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695
              -.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23
              1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605
              -2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225
              -.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27
              1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23
              3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905
              1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81
              1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0
              .315.225.69.825.57A12.02 12.02 0 0 0 24 12
              c0-6.63-5.37-12-12-12z"/>
          </svg>
          <div style="min-width:0;">
            <div style="font-size:${Math.round(10 * scale)}px;color:${c.a2};
              font-weight:700;letter-spacing:0.5px;white-space:nowrap;">
              GitHub Repo Available
            </div>
            <div style="font-size:${Math.round(9 * scale)}px;
              color:rgba(255,255,255,0.35);margin-top:${Math.round(1 * scale)}px;
              white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              ${github}
            </div>
          </div>
        </div>

        <!-- CTA button -->
        <div style="
          display:flex;align-items:center;gap:${Math.round(6 * scale)}px;
          background:linear-gradient(135deg,${c.a1},${c.a2});
          padding:${Math.round(7 * scale)}px ${Math.round(16 * scale)}px;
          border-radius:${Math.round(22 * scale)}px;
          font-size:${Math.round(10 * scale)}px;font-weight:700;color:#fff;
          letter-spacing:0.3px;
          box-shadow:0 4px 16px ${c.a1}55;
          white-space:nowrap;flex-shrink:0;
        ">
          Explore Full Source Code
          <span style="font-size:${Math.round(12 * scale)}px;">→</span>
        </div>

        <!-- author -->
        <div style="
          font-size:${Math.round(10 * scale)}px;color:rgba(255,255,255,0.3);
          font-weight:500;letter-spacing:0.3px;white-space:nowrap;flex-shrink:0;
        ">${author}</div>
      </div>
    `;
    }
  },

  /* ==== TEMPLATE — Shape Calculator App · All-In-One Square ==== */
  {
    id: 'shape-calc-all-in-one',
    name: 'Shape Calc · All In One',
    tag: '1 Screenshot',
    screenshots: 1,
    thumb: {
      bg: 'linear-gradient(135deg, #0D0D1A, #001A33)',
      emoji: '📐',
      label: 'Shape Calc'
    },
    render(d) {
      const c = d.colors;
      const ss = d.screenshots[0];
      const W = d.bannerW || 1080;
      const H = d.bannerH || 1080;

      // ── Neon palette (overrides theme for this poster) ──────────────
      const RED = '#FF3355';
      const BLUE = '#3399FF';
      const GRN = '#33FF99';
      const PURP = '#AA55FF';
      const YELL = '#FFD700';
      const CYAN = '#00DDFF';

      // ── Layout zones (proportional to canvas size) ──────────────────
      const PAD = Math.round(W * 0.038);   // 41px @ 1080
      const TOP_H = Math.round(H * 0.215);   // top hero zone
      const MID_H = Math.round(H * 0.285);   // middle features zone
      const OOP_H = Math.round(H * 0.265);   // oop concepts zone
      const CTA_H = H - TOP_H - MID_H - OOP_H; // bottom CTA zone

      // ── Feature list (middle section) ───────────────────────────────
      const features = [
        { icon: '⭕', color: RED, text: 'Area & Perimeter — Circle' },
        { icon: '▭', color: BLUE, text: 'Area & Perimeter — Rectangle' },
        { icon: '△', color: GRN, text: 'Area & Perimeter — Triangle' },
        { icon: '🏆', color: YELL, text: 'Auto Largest Shape Detection' },
        { icon: '🎨', color: CYAN, text: 'Dynamic Canvas Shape Drawing' },
        { icon: '📊', color: PURP, text: 'Real-Time Shape Analysis' },
      ];

      // ── OOP concepts (3rd zone) ──────────────────────────────────────
      const oopConcepts = [
        { name: 'Interface', icon: '🧩', color: BLUE },
        { name: 'Sealed Class', icon: '🔒', color: PURP },
        { name: 'Data Class', icon: '📦', color: GRN },
        { name: 'Companion Object', icon: '🏭', color: YELL },
        { name: 'Singleton', icon: '☝️', color: RED },
        { name: 'Polymorphism', icon: '🔄', color: CYAN },
      ];

      // ── Tech stack chips ─────────────────────────────────────────────
      const techStack = [
        { label: '💻 Kotlin', color: '#7F52FF' },
        { label: '🎨 Jetpack Compose', color: CYAN },
        { label: '🧩 Sealed Classes', color: PURP },
        { label: '🔄 Polymorphism', color: BLUE },
        { label: '📦 Companion Obj', color: YELL },
        { label: '🔒 Singleton', color: RED },
      ];

      // ── Font sizes (proportional) ────────────────────────────────────
      const FS_HERO = Math.round(W * 0.075);  // 81px  — main title
      const FS_SECTION = Math.round(W * 0.028);  // 30px  — section headings
      const FS_FEAT = Math.round(W * 0.021);  // 23px  — feature text
      const FS_CHIP = Math.round(W * 0.018);  // 19px  — tech chips
      const FS_OOP = Math.round(W * 0.019);  // 21px  — oop card label
      const FS_CTA = Math.round(W * 0.048);  // 52px  — CTA headline
      const FS_SMALL = Math.round(W * 0.014);  // 15px  — fine print

      // ── Shape icon size ──────────────────────────────────────────────
      const ICON_SZ = Math.round(W * 0.065);     // 70px

      return `
      <!-- ════════════════════════════════════════════════════
           BACKGROUND LAYER
           ════════════════════════════════════════════════════ -->
      <div style="position:absolute;inset:0;
        background:linear-gradient(150deg,
          #08080F 0%,
          #0D0A1A 30%,
          #050D14 65%,
          #080810 100%);"></div>

      <!-- scanline texture -->
      <div style="position:absolute;inset:0;pointer-events:none;opacity:0.035;
        background:repeating-linear-gradient(
          0deg,transparent,transparent 3px,#FFFFFF 3px,#FFFFFF 4px);"></div>

      <!-- circuit grid -->
      <div style="position:absolute;inset:0;pointer-events:none;opacity:0.04;
        background-image:
          linear-gradient(${BLUE}66 1px, transparent 1px),
          linear-gradient(90deg, ${BLUE}66 1px, transparent 1px);
        background-size:54px 54px;"></div>


      <!-- ════════════════════════════════════════════════════
           AMBIENT GLOW BLOBS
           ════════════════════════════════════════════════════ -->
      <!-- top-left red glow -->
      <div class="glow-blob" style="
        width:${W * 0.55}px;height:${W * 0.55}px;
        top:-${W * 0.14}px;left:-${W * 0.1}px;
        background:radial-gradient(circle,${RED}20,transparent 65%);"></div>

      <!-- top-right blue glow -->
      <div class="glow-blob" style="
        width:${W * 0.5}px;height:${W * 0.5}px;
        top:-${W * 0.1}px;right:-${W * 0.08}px;
        background:radial-gradient(circle,${BLUE}20,transparent 65%);"></div>

      <!-- center green glow -->
      <div class="glow-blob" style="
        width:${W * 0.6}px;height:${W * 0.4}px;
        top:${TOP_H + MID_H * 0.3}px;
        left:50%;transform:translateX(-50%);
        background:radial-gradient(circle,${GRN}14,transparent 65%);"></div>

      <!-- bottom purple glow -->
      <div class="glow-blob" style="
        width:${W * 0.55}px;height:${W * 0.35}px;
        bottom:-${W * 0.06}px;left:50%;transform:translateX(-50%);
        background:radial-gradient(circle,${PURP}18,transparent 65%);"></div>


      <!-- ════════════════════════════════════════════════════
           TOP ACCENT BAR  (RGB gradient stripe)
           ════════════════════════════════════════════════════ -->
      <div style="position:absolute;top:0;left:0;right:0;height:5px;
        background:linear-gradient(90deg,${RED},${BLUE},${GRN});
        box-shadow:0 0 14px ${BLUE}88;z-index:10;"></div>


      <!-- ════════════════════════════════════════════════════
           ZONE 1 — HERO  (top ${Math.round(TOP_H / H * 100)}% of canvas)
           Left: Title + badge + subtitle
           Right: Neon shape row
           ════════════════════════════════════════════════════ -->
      <div style="position:absolute;
        top:5px;left:0;right:0;
        height:${TOP_H}px;
        display:flex;align-items:center;
        padding:0 ${PAD}px;
        gap:${PAD}px;">

        <!-- LEFT: headline block -->
        <div style="flex:1.15;display:flex;flex-direction:column;
          justify-content:center;gap:${Math.round(H * 0.012)}px;">

          <!-- eyebrow badge -->
          <div style="
            display:inline-flex;align-items:center;gap:7px;
            background:linear-gradient(135deg,${RED}33,${BLUE}33);
            border:1.5px solid ${BLUE}55;
            border-radius:30px;padding:6px 16px;
            width:fit-content;
            box-shadow:0 0 16px ${BLUE}33;">
            <span style="font-size:14px;">🚀</span>
            <span style="font-size:${FS_SMALL}px;font-weight:700;
              color:#FFFFFFCC;letter-spacing:2px;
              font-family:'Poppins','Montserrat',sans-serif;
              text-transform:uppercase;">
              Android Dev Project
            </span>
          </div>

          <!-- main title: SHAPE CALCULATOR APP -->
          ${gradientTextLines(
        ['SHAPE', 'CALCULATOR', 'APP'],
        '#FFFFFF', c.a2,
        FS_HERO, 900, -1, Math.round(H * 0.003)
      )}

          <!-- subtitle row -->
          <div style="display:flex;align-items:center;gap:12px;
            flex-wrap:wrap;">
            <span style="font-size:${FS_CHIP}px;font-weight:700;
              color:${RED};font-family:'Poppins','Montserrat',sans-serif;
              text-shadow:0 0 12px ${RED}88;">
              Kotlin
            </span>
            <span style="color:#FFFFFF33;font-size:14px;">+</span>
            <span style="font-size:${FS_CHIP}px;font-weight:700;
              color:${BLUE};font-family:'Poppins','Montserrat',sans-serif;
              text-shadow:0 0 12px ${BLUE}88;">
              Jetpack Compose
            </span>
            <span style="color:#FFFFFF33;font-size:14px;">·</span>
            <span style="font-size:${FS_CHIP - 2}px;font-weight:600;
              color:${GRN};font-family:'Poppins','Montserrat',sans-serif;
              text-shadow:0 0 10px ${GRN}66;">
              Pure OOP
            </span>
          </div>
        </div>

        <!-- RIGHT: neon shape icons -->
        <div style="flex:0.85;display:flex;flex-direction:column;
          align-items:center;justify-content:center;gap:0;">
          ${neonShapeRow(ICON_SZ, [RED, BLUE, GRN], ['Circle', 'Rectangle', 'Triangle'])}
        </div>
      </div>


      <!-- ════════════════════════════════════════════════════
           ZONE DIVIDER — RGB tri-color rule
           ════════════════════════════════════════════════════ -->
      <div style="position:absolute;
        top:${TOP_H + 5}px;left:${PAD}px;right:${PAD}px;
        height:1.5px;
        background:linear-gradient(90deg,
          ${RED},${BLUE} 50%,${GRN});
        opacity:0.45;"></div>


      <!-- ════════════════════════════════════════════════════
           ZONE 2 — FEATURES  (middle section)
           Left column: feature list  ·  Right column: phone or shape stack
           ════════════════════════════════════════════════════ -->
      <div style="position:absolute;
        top:${TOP_H + 5 + 2}px;
        left:0;right:0;
        height:${MID_H}px;
        display:flex;
        padding:${Math.round(H * 0.018)}px ${PAD}px;
        gap:${PAD}px;">

        <!-- LEFT: feature items in 2-column micro-grid -->
        <div style="flex:1.4;display:flex;flex-direction:column;
          justify-content:space-between;">

          <!-- section label -->
          <div style="display:flex;align-items:center;gap:10px;
            margin-bottom:${Math.round(H * 0.012)}px;">
            <div style="width:4px;height:${FS_SECTION}px;border-radius:3px;
              background:linear-gradient(180deg,${RED},${BLUE});
              box-shadow:0 0 8px ${BLUE}88;"></div>
            ${gradientText('Features', '#FFFFFF', GRN, FS_SECTION, 800, 'horizontal', 0)}
          </div>

          <!-- 2-column feature grid -->
          <div style="display:grid;grid-template-columns:1fr 1fr;
            gap:${Math.round(H * 0.011)}px;flex:1;">
            ${features.map((f, i) => `
              <div style="
                display:flex;align-items:center;gap:9px;
                background:${f.color}0E;
                border:1px solid ${f.color}40;
                border-left:3px solid ${f.color};
                border-radius:9px;
                padding:${Math.round(H * 0.011)}px 12px;
                box-shadow:0 0 14px ${f.color}14;">
                <span style="font-size:${Math.round(W * 0.024)}px;flex-shrink:0;
                  filter:drop-shadow(0 0 5px ${f.color}99);">${f.icon}</span>
                <span style="font-size:${FS_FEAT - 3}px;color:#FFFFFFCC;
                  font-weight:600;line-height:1.25;
                  font-family:'Poppins','Montserrat',sans-serif;">${f.text}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- RIGHT: phone mockup or shape showcase -->
        <div style="flex:0.6;display:flex;align-items:center;
          justify-content:center;position:relative;">

          ${ss ? `
            <!-- Phone mockup with screenshot -->
            <div style="transform:perspective(800px) rotateY(-6deg);
              filter:drop-shadow(0 0 22px ${BLUE}55);">
              ${phoneMockup(ss, Math.round(W * 0.26), -3, d.glowOpacity, BLUE)}
            </div>
          ` : `
            <!-- No screenshot: stacked shape icons -->
            <div style="display:flex;flex-direction:column;
              align-items:center;gap:14px;justify-content:center;
              width:100%;height:100%;">
              ${neonShapeIcon('circle', RED, Math.round(W * 0.08), 'Circle')}
              ${neonShapeIcon('rect', BLUE, Math.round(W * 0.08), 'Rectangle')}
              ${neonShapeIcon('triangle', GRN, Math.round(W * 0.08), 'Triangle')}
            </div>
          `}
        </div>
      </div>


      <!-- ════════════════════════════════════════════════════
           ZONE DIVIDER
           ════════════════════════════════════════════════════ -->
      <div style="position:absolute;
        top:${TOP_H + 5 + 2 + MID_H}px;
        left:${PAD}px;right:${PAD}px;
        height:1.5px;
        background:linear-gradient(90deg,${PURP},${CYAN});
        opacity:0.45;"></div>


      <!-- ════════════════════════════════════════════════════
           ZONE 3 — OOP CONCEPTS  (concepts grid + tech chips)
           ════════════════════════════════════════════════════ -->
      <div style="position:absolute;
        top:${TOP_H + 5 + 2 + MID_H + 2}px;
        left:0;right:0;
        height:${OOP_H}px;
        display:flex;
        padding:${Math.round(H * 0.016)}px ${PAD}px;
        gap:${PAD}px;
        align-items:flex-start;">

        <!-- LEFT: OOP concepts grid (2 × 3) -->
        <div style="flex:1;display:flex;flex-direction:column;
          gap:${Math.round(H * 0.012)}px;">

          <!-- section label -->
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:4px;height:${FS_SECTION}px;border-radius:3px;
              background:linear-gradient(180deg,${PURP},${CYAN});
              box-shadow:0 0 8px ${PURP}88;"></div>
            ${gradientText('OOP Concepts', PURP, CYAN, FS_SECTION, 800, 'horizontal', 0)}
          </div>

          <!-- 3-col concept chips -->
          <div style="display:grid;grid-template-columns:repeat(3,1fr);
            gap:${Math.round(H * 0.009)}px;">
            ${oopConcepts.map(oc => `
              <div style="
                display:flex;flex-direction:column;align-items:center;
                gap:5px;text-align:center;
                background:${oc.color}10;
                border:1.5px solid ${oc.color}44;
                border-radius:12px;
                padding:${Math.round(H * 0.012)}px 8px;
                box-shadow:0 0 14px ${oc.color}18;">
                <span style="font-size:${Math.round(W * 0.028)}px;
                  filter:drop-shadow(0 0 6px ${oc.color}88);">${oc.icon}</span>
                <span style="font-size:${FS_OOP - 2}px;font-weight:700;
                  color:${oc.color};letter-spacing:0.3px;line-height:1.2;
                  font-family:'Poppins','Montserrat',sans-serif;">${oc.name}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- VERTICAL DIVIDER -->
        <div style="width:1.5px;align-self:stretch;
          background:linear-gradient(180deg,transparent,${PURP}66,transparent);
          flex-shrink:0;"></div>

        <!-- RIGHT: Tech stack + Kotlin code snippet -->
        <div style="flex:0.75;display:flex;flex-direction:column;
          gap:${Math.round(H * 0.012)}px;">

          <!-- section label -->
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:4px;height:${FS_SECTION}px;border-radius:3px;
              background:linear-gradient(180deg,${YELL},${RED});
              box-shadow:0 0 8px ${YELL}88;"></div>
            ${gradientText('Tech Stack', YELL, RED, FS_SECTION, 800, 'horizontal', 0)}
          </div>

          <!-- tech chips wrap -->
          <div style="display:flex;flex-wrap:wrap;gap:7px;">
            ${techStack.map(t => `
              <span style="
                background:${t.color}18;
                border:1.5px solid ${t.color}55;
                border-radius:20px;
                padding:5px 12px;
                font-size:${FS_SMALL + 1}px;
                color:${t.color};font-weight:700;
                font-family:'Poppins','Montserrat',sans-serif;
                box-shadow:0 0 10px ${t.color}22;
                white-space:nowrap;">
                ${t.label}
              </span>
            `).join('')}
          </div>

          <!-- mini kotlin code snippet -->
          <div style="
            background:#0A0A14;
            border:1.5px solid ${PURP}44;
            border-radius:10px;
            padding:10px 14px;
            font-family:'JetBrains Mono','Fira Code','Courier New',monospace;
            font-size:${FS_SMALL}px;
            line-height:1.65;
            box-shadow:0 0 16px ${PURP}22;
            overflow:hidden;flex:1;">
            <!-- terminal dots -->
            <div style="display:flex;gap:5px;margin-bottom:8px;">
              <div style="width:8px;height:8px;border-radius:50%;background:#FF5F57;"></div>
              <div style="width:8px;height:8px;border-radius:50%;background:#FFBD2E;"></div>
              <div style="width:8px;height:8px;border-radius:50%;background:#28CA41;"></div>
            </div>
            <div>
              <span style="color:${PURP};">sealed class </span>
              <span style="color:${CYAN};">Shape</span>
              <span style="color:#FFFFFF88;"> : </span>
              <span style="color:${GRN};">Calculable</span>
            </div>
            <div>
              <span style="color:${PURP};">  data class </span>
              <span style="color:${CYAN};">Circle</span>
              <span style="color:#FFFFFF88;">(</span>
              <span style="color:${YELL};">r</span>
              <span style="color:#FFFFFF88;">: </span>
              <span style="color:${GRN};">Double</span>
              <span style="color:#FFFFFF88;">)</span>
            </div>
            <div>
              <span style="color:${PURP};">  override fun </span>
              <span style="color:${BLUE};">area</span>
              <span style="color:#FFFFFF88;">() = Math.PI * </span>
              <span style="color:${YELL};">r</span>
              <span style="color:#FFFFFF88;"> * </span>
              <span style="color:${YELL};">r</span>
            </div>
          </div>
        </div>
      </div>


      <!-- ════════════════════════════════════════════════════
           ZONE DIVIDER
           ════════════════════════════════════════════════════ -->
      <div style="position:absolute;
        top:${TOP_H + 5 + 2 + MID_H + 2 + OOP_H}px;
        left:${PAD}px;right:${PAD}px;
        height:1.5px;
        background:linear-gradient(90deg,${GRN},${YELL},${RED});
        opacity:0.5;"></div>


      <!-- ════════════════════════════════════════════════════
           ZONE 4 — CTA  (bottom strip)
           ════════════════════════════════════════════════════ -->
      <div style="position:absolute;
        top:${TOP_H + 5 + 2 + MID_H + 2 + OOP_H + 2}px;
        left:0;right:0;
        bottom:5px;
        display:flex;align-items:center;
        padding:0 ${PAD}px;
        gap:${Math.round(W * 0.025)}px;
        background:linear-gradient(90deg,
          ${GRN}0C 0%,
          ${BLUE}0C 50%,
          ${RED}0C 100%);
        border-top:1px solid #FFFFFF0A;">

        <!-- comment CTA block -->
        <div style="display:flex;align-items:center;gap:12px;flex-shrink:0;">
          <span style="font-size:${Math.round(W * 0.038)}px;
            filter:drop-shadow(0 0 12px ${GRN}AA);">💬</span>
          <div style="display:flex;flex-direction:column;gap:1px;">
            <span style="font-size:${FS_SMALL}px;color:#FFFFFF66;
              font-family:'Poppins','Montserrat',sans-serif;
              letter-spacing:1px;text-transform:uppercase;">
              Comment
            </span>
            ${gradientText('"SHAPE"', GRN, CYAN, Math.round(W * 0.034), 900, 'horizontal', 0)}
          </div>
          <span style="font-size:${Math.round(W * 0.03)}px;">👇</span>
        </div>

        <!-- vertical micro-divider -->
        <div style="width:1.5px;height:${Math.round(CTA_H * 0.55)}px;
          background:linear-gradient(180deg,transparent,#FFFFFF33,transparent);
          flex-shrink:0;"></div>

        <!-- save + follow row -->
        <div style="display:flex;align-items:center;gap:${Math.round(W * 0.022)}px;flex:1;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:${Math.round(W * 0.026)}px;
              filter:drop-shadow(0 0 8px ${YELL}AA);">🔖</span>
            <span style="font-size:${FS_SMALL + 1}px;color:#FFFFFFAA;
              font-weight:600;font-family:'Poppins','Montserrat',sans-serif;">
              Save this post
            </span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:${Math.round(W * 0.026)}px;
              filter:drop-shadow(0 0 8px ${BLUE}AA);">👥</span>
            <span style="font-size:${FS_SMALL + 1}px;color:#FFFFFFAA;
              font-weight:600;font-family:'Poppins','Montserrat',sans-serif;">
              Follow for more
            </span>
          </div>
        </div>

        <!-- author tag (right-aligned) -->
        <div style="flex-shrink:0;text-align:right;
          display:flex;flex-direction:column;gap:2px;">
          <span style="font-size:${FS_SMALL + 2}px;font-weight:700;
            color:${GRN};font-family:'Poppins','Montserrat',sans-serif;
            text-shadow:0 0 10px ${GRN}66;">
            ${d.state.author || '@yourhandle'}
          </span>
          <span style="font-size:${FS_SMALL - 1}px;color:#FFFFFF44;
            font-family:'Poppins','Montserrat',sans-serif;">
            ${d.state.github || 'github.com/you'}
          </span>
        </div>
      </div>


      <!-- ════════════════════════════════════════════════════
           BOTTOM ACCENT BAR
           ════════════════════════════════════════════════════ -->
      <div style="position:absolute;bottom:0;left:0;right:0;height:5px;
        background:linear-gradient(90deg,${GRN},${BLUE},${RED});
        box-shadow:0 0 12px ${GRN}66;z-index:10;"></div>


      <!-- ════════════════════════════════════════════════════
           SPARKLE ACCENTS
           ════════════════════════════════════════════════════ -->
      <div class="sparkle" style="width:7px;height:7px;
        top:${H * 0.08}px;right:${W * 0.06}px;
        background:${RED};animation-delay:0.0s;"></div>
      <div class="sparkle" style="width:5px;height:5px;
        top:${H * 0.19}px;left:${W * 0.04}px;
        background:${GRN};animation-delay:0.6s;"></div>
      <div class="sparkle" style="width:6px;height:6px;
        top:${H * 0.51}px;right:${W * 0.03}px;
        background:${BLUE};animation-delay:1.2s;"></div>
      <div class="sparkle" style="width:5px;height:5px;
        top:${H * 0.64}px;left:${W * 0.03}px;
        background:${PURP};animation-delay:1.8s;"></div>
      <div class="sparkle" style="width:7px;height:7px;
        top:${H * 0.78}px;right:${W * 0.05}px;
        background:${YELL};animation-delay:0.4s;"></div>

      <!-- suppress default footer bar -->
      <div class="banner-footer-bar" style="height:0;display:none;"></div>
    `;
    }
  },



];

/* --------------------------------------------------
   SHARED HELPER — Phone Mockup HTML
   Called by any template
-------------------------------------------------- */
function phoneMockup(screenshotSrc, width, tiltDeg, glowOpacity, glowColor) {
  const w = width || 220;
  const h = w * 2;
  const tilt = tiltDeg || 0;
  const gOpacity = Math.min((glowOpacity || 30) / 100, 1);

  const screenContent = screenshotSrc
    ? `<img class="phone-ss" src="${screenshotSrc}" alt="screenshot">`
    : `<div class="phone-placeholder-inner">
         <span style="font-size:32px;">📱</span>
         <span>Upload screenshot<br>from Media tab</span>
       </div>`;

  return `
    <div class="phone-mockup-wrap" style="
      width:${w}px;height:${h}px;
      transform:rotate(${tilt}deg);
      flex-shrink:0;">
      <div class="phone-frame-outer" style="
        width:${w}px;height:${h}px;
        box-shadow:
          0 0 0 1px rgba(255,255,255,0.05),
          0 20px 60px rgba(0,0,0,0.7),
          0 0 40px ${glowColor || '#6750A4'}${Math.round(gOpacity * 255).toString(16).padStart(2, '0')};
      ">
        <div class="phone-screen-inner">
          <div class="phone-notch"></div>
          ${screenContent}
        </div>
      </div>
    </div>
  `;
}

/* --------------------------------------------------
   HELPER — hue shift for gradient text
-------------------------------------------------- */
function shiftHue(hex) {
  try {
    const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + 40);
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 30);
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 60);
    return `rgb(${r},${g},${b})`;
  } catch { return hex; }
}