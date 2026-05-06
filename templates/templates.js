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
        <div style="position:absolute;width:${d.phoneW+60}px;height:${d.phoneW*2+60}px;
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
              <span style="color:${c.a1};font-size:13px;">[${String(i+1).padStart(2,'0')}]</span>
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
        ${[0,1,2].map((i) => `
          <div class="grid-card" style="flex:1;
            background:rgba(255,255,255,0.06);
            backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
            border:1px solid rgba(255,255,255,0.12);border-radius:16px;
            display:flex;flex-direction:column;align-items:center;
            justify-content:center;gap:8px;padding:12px;position:relative;
            overflow:hidden;">
            <div style="position:absolute;top:0;left:0;right:0;height:2px;
              background:linear-gradient(90deg,${[c.a1,c.a2,c.hl][i]},transparent);"></div>
            ${phoneMockup(phones[i], smallPhone, 0, d.glowOpacity, [c.a1,c.a2,c.hl][i])}
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
          ${badges.slice(0,4).map(b => `
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
                border:1px solid ${[c.a1,c.a2,c.hl,c.a1][i]}33;border-radius:12px;
                padding:14px;text-align:center;">
                <div style="font-size:26px;font-weight:900;
                  color:${[c.a1,c.a2,c.hl,c.a1][i]};
                  text-shadow:0 0 16px ${[c.a1,c.a2,c.hl,c.a1][i]}44;">
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
          <div style="width:${pw + 10}px;height:${(pw+10) * 1.8}px;overflow:hidden;
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
      ${[0,1,2,3,4].map(i => `
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
        ${feats.slice(0,2).map(f => `
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
        ${feats.slice(2,4).map(f => `
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
      ${Array.from({length:20}, (_, i) => `
        <div style="position:absolute;width:2px;height:2px;border-radius:50%;
          background:rgba(255,255,255,${0.1 + Math.random()*0.3});
          top:${Math.random()*85}%;left:${Math.random()*100}%;"></div>
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
        const angle = (i / feats.length) * Math.PI * 2 - Math.PI/2;
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
    const cardEmojis = ['🚀','⚡','🛡️','🎯','💎','🔥'];
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