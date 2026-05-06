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
      const feats = d.state.features.slice(0,5);
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
            ${feats.map(f=>`
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
            ${badges.map(b=>`
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
          <div style="font-size:${Math.min(d.hs+4,58)}px;font-weight:900;
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
            ${badges.map(b=>`
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
          ${phoneMockup(ss, Math.min(d.phoneW+10,300), d.phoneTilt, d.glowOpacity, c.a2)}
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
      const feats = d.state.features.slice(0,4);
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
            ${feats.map(f=>`
              <div class="feat-item">
                <span style="color:${c.a2};">✅</span>
                <span style="font-size:${d.fs}px;">${f}</span>
              </div>`).join('')}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
            ${d.state.badges.map(b=>`
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
      const [ss1,ss2,ss3] = d.screenshots;
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
            ${phoneMockup(ss2, pw+10, 0, d.glowOpacity*1.2, c.a2)}
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

          <div style="font-size:${Math.min(d.hs,38)}px;font-weight:900;
            color:#fff;margin-bottom:4px;">
            <span style="background:linear-gradient(135deg,${c.hl},${c.hl}cc);
              -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
              ${d.state.h1}</span>
            &nbsp;<span style="font-size:${Math.min(d.hs-4,32)}px;">${d.state.h2}</span>
          </div>

          <div style="display:flex;align-items:center;
            justify-content:space-between;flex-wrap:wrap;gap:8px;">
            <div style="font-size:13px;color:#CAC4D0;">${d.state.subtitle}</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              ${d.state.badges.slice(0,4).map(b=>`
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
      const feats = d.state.features.slice(0,4);
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
            ${d.state.h1.replace(/[^a-zA-Z0-9 ]/g,'').toLowerCase().replace(/ /g,'-')}.kt
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

          <div style="font-size:${d.hs-4}px;font-weight:900;color:#fff;
            margin-bottom:6px;">
            <span style="color:${c.a2};">fun </span>
            <span style="color:${c.hl};">${d.state.h1.replace(/[^a-zA-Z0-9 ]/g,'').trim().replace(/ (.)/g,(_,c)=>c.toUpperCase())}</span>
            <span style="color:#fff;">() {</span>
          </div>

          <div class="code-block" style="border-color:${c.a1}33;">
            ${feats.slice(0,3).map((f,i)=>`
              <div><span class="code-comment">// ${f}</span></div>
            `).join('')}
            <div style="margin-top:6px;">
              <span class="code-keyword">val </span>
              <span class="code-var">stack</span>
              <span style="color:#fff;"> = listOf(</span>
              ${d.state.badges.slice(0,3).map(b=>`
                <span class="code-string">"${b.label}"</span>
              `).join('<span style="color:#fff;">, </span>')}
              <span style="color:#fff;">)</span>
            </div>
            <div style="margin-top:4px;">
              <span class="code-keyword">return </span>
              <span class="code-string">"${d.state.subtitle}"</span>
            </div>
          </div>

          <div style="font-size:${d.hs-6}px;font-weight:900;color:#fff;">}</div>

          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
            ${d.state.badges.map(b=>`
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
      const feats = d.state.features.slice(0,3);
      const stats = [
        { n:'100%', l:'Kotlin' },
        { n:'MD3',  l:'Design' },
        { n:'∞',    l:'Compose' }
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
            ${stats.map((s,i)=>`
              <div class="stat-box">
                <div class="stat-number" style="color:${[c.a1,c.a2,c.hl][i]};">${s.n}</div>
                <div class="stat-label">${s.l}</div>
              </div>
            `).join('')}
          </div>

          <div style="height:2px;width:260px;border-radius:2px;
            background:linear-gradient(90deg,${c.a1},${c.a2});"></div>

          <div style="display:flex;flex-direction:column;gap:5px;">
            ${feats.map(f=>`
              <div class="feat-item">
                <span style="color:${c.a2};">✅</span>
                <span style="font-size:${d.fs}px;">${f}</span>
              </div>`).join('')}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${d.state.badges.map(b=>`
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
          ${phoneMockup(ss, Math.min(d.phoneW+10,260), d.phoneTilt, d.glowOpacity, c.a1)}
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
      const feats = d.state.features.slice(0,4);
      const icons = ['⚡','🎯','🔧','🚀'];
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
            <div style="font-size:${Math.min(d.hs,36)}px;font-weight:900;
              line-height:1.1;color:#fff;">
              <span style="background:linear-gradient(135deg,${c.hl},${c.hl}cc);
                -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
                ${d.state.h1}</span>
              <span style="font-size:${Math.min(d.hs-6,28)}px;"> ${d.state.h2}</span>
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
          ${feats.map((f,i)=>`
            <div class="grid-card">
              <div class="grid-card-icon">${icons[i]||'✅'}</div>
              <div class="grid-card-title">${f.split(' ').slice(0,3).join(' ')}</div>
              <div class="grid-card-sub">${f}</div>
            </div>
          `).join('')}
        </div>

        <!-- BADGES BOTTOM RIGHT -->
        <div style="position:absolute;right:30px;bottom:76px;
          width:190px;display:flex;flex-direction:column;gap:6px;">
          ${d.state.badges.map(b=>`
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
      const feats = d.state.features.slice(0,4);
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
            ${feats.map(f=>`
              <div class="feat-item">
                <span style="color:${c.a2};">▶</span>
                <span style="font-size:${d.fs}px;">${f}</span>
              </div>`).join('')}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${d.state.badges.map(b=>`
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
      const feats = d.state.features.slice(0,4);
      const textDark = '#1a1a2e';
      const textMid  = '#555577';
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
            ${feats.map(f=>`
              <div style="display:flex;align-items:center;gap:7px;
                font-size:${d.fs}px;color:${textDark};">
                <span style="color:${c.a1};font-size:15px;">✔</span> ${f}
              </div>`).join('')}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
            ${d.state.badges.map(b=>`
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
          ${phoneMockup(ss, d.phoneW, d.phoneTilt, d.glowOpacity*0.6, c.a1)}
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
      const feats = d.state.features.slice(0,4);
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
            ${feats.map(f=>`
              <div style="display:flex;align-items:center;gap:8px;
                font-size:${d.fs}px;color:#ccc;">
                <span style="color:${c.a2};
                  text-shadow:0 0 8px ${c.a2};">▶</span> ${f}
              </div>`).join('')}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:7px;margin-top:4px;">
            ${d.state.badges.map(b=>`
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
          ${phoneMockup(ss, d.phoneW, d.phoneTilt, d.glowOpacity*1.3, c.a1)}
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
      const feats = d.state.features.slice(0,6);
      const mid = Math.ceil(feats.length/2);
      const left = feats.slice(0,mid);
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
            <div style="font-size:${Math.min(d.hs+4,54)}px;font-weight:900;
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
            ${feats.map(f=>`
              <div style="display:flex;align-items:center;gap:7px;
                font-size:${d.fs}px;color:#e0e0e0;">
                <span style="color:${c.a2};">✅</span> ${f}
              </div>`).join('')}
          </div>

          <!-- BADGES ROW -->
          <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
            ${d.state.badges.map(b=>`
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
      const feats = d.state.features.slice(0,3);
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

          <div style="font-size:${Math.min(d.hs+6,56)}px;font-weight:900;
            line-height:1.0;color:#fff;letter-spacing:-1px;">
            ${d.state.h1}<br>
            <span style="color:${c.hl};">${d.state.h2}</span>
          </div>

          <div style="font-size:${d.ss+1}px;color:#ddd;max-width:440px;">
            ${d.state.subtitle}
          </div>

          <div style="display:flex;flex-direction:column;gap:5px;">
            ${feats.map(f=>`
              <div style="display:flex;align-items:center;gap:8px;
                font-size:${d.fs+1}px;color:#eee;">
                <span style="color:${c.hl};font-size:16px;">→</span> ${f}
              </div>`).join('')}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:7px;margin-top:4px;">
            ${d.state.badges.map(b=>`
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
          ${phoneMockup(ss, Math.min(d.phoneW+20,280), d.phoneTilt, d.glowOpacity, c.a1)}
        </div>

        <!-- FOOTER -->
        <div class="banner-footer-bar" style="height:62px;
          background:rgba(0,0,0,0.3);border-top:2px solid ${c.hl}55;">
          <span style="font-size:12px;color:#ddd;">${d.state.github}</span>
          <span style="font-size:11px;color:#aaa;">${d.state.author}</span>
        </div>
      `;
    }
  }

];

/* --------------------------------------------------
   SHARED HELPER — Phone Mockup HTML
   Called by any template
-------------------------------------------------- */
function phoneMockup(screenshotSrc, width, tiltDeg, glowOpacity, glowColor) {
  const w  = width  || 220;
  const h  = w * 2;
  const tilt = tiltDeg || 0;
  const gOpacity = Math.min((glowOpacity||30)/100, 1);

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
          0 0 40px ${glowColor||'#6750A4'}${Math.round(gOpacity*255).toString(16).padStart(2,'0')};
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
    const r = Math.min(255, parseInt(hex.slice(1,3),16)+40);
    const g = Math.max(0,   parseInt(hex.slice(3,5),16)-30);
    const b = Math.max(0,   parseInt(hex.slice(5,7),16)-60);
    return `rgb(${r},${g},${b})`;
  } catch { return hex; }
}