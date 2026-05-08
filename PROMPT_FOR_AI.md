# AI Prompt — Generate LinkedIn Banner Template + Components

> **Copy everything below this line and paste it to any AI (ChatGPT, Claude, Gemini, etc.)**

---

## SYSTEM CONTEXT

I have a **LinkedIn Banner Designer** web app. It uses vanilla HTML/CSS/JS (no framework). The banner canvas defaults to **1200×627 pixels** but users can choose different sizes, so if Size is not Mentioned in the prompt then ask the user (Square 1080×1080, Portrait 1080×1350, Story 1080×1920, Twitter 1500×500, LI Cover 1584×396, or fully custom W×H). Templates are defined in a `TEMPLATES` array and each template's `render(d)` function returns an HTML string that gets injected into the banner.

The project has a **component system**: reusable UI building blocks (cards, device frames, etc.) that live in `templates/components/`. Each component has a `.js` file (registers a global helper function) and a `.css` file (styles).

## YOUR TASK

I want you to create:
1. **One or more component files** (JS + CSS pair) for any unique design element in the template
2. **The template object** to paste into the `TEMPLATES` array in `templates.js`

## ARCHITECTURE REFERENCE

### Folder Structure
```
templates/
├── templates.js                    ← TEMPLATES array lives here
├── components/
│   ├── component-loader.js         ← registry (already exists, DO NOT recreate)
│   ├── my-component.js             ← YOUR JS component file
│   └── my-component.css            ← YOUR CSS component file
```

### Data Available Inside `render(d)`

The template's `render(d)` function receives this data object:

```js
d = {
  state: {
    badge: "🚀 JUST SHIPPED",       // top badge text
    h1: "App Name",                  // headline line 1
    h2: "Android App",              // headline line 2
    subtitle: "Built with ...",      // subtitle text
    description: "Long desc...",     // description text
    lifeStages: "👶 → 🧑 → 👔 → 👴", // life stages text
    showLifeStages: true,            // toggle
    github: "github.com/...",        // footer link
    author: "@username",             // footer author
    features: ["Feature 1", ...],    // array of feature strings
    badges: [                        // array of tech badges
      { label: "Kotlin", color: "#7F52FF" },
      { label: "Compose", color: "#03DAC5" }
    ]
  },
  colors: {
    bg1: "#1C1B1F",    // background color 1
    bg2: "#2D1B69",    // background color 2
    gradDir: "135deg", // gradient direction
    a1: "#6750A4",     // accent color 1 (primary)
    a2: "#03DAC5",     // accent color 2 (secondary)
    hl: "#FFD700"      // highlight color
  },
  screenshots: [dataURL|null, dataURL|null, dataURL|null], // up to 3 screenshots
  phoneW: 220,         // phone mockup width (px)
  phoneTilt: -3,       // phone tilt degrees
  glowOpacity: 30,     // glow intensity (0-100)
  hs: 42,              // headline font size (px)
  ss: 16,              // subtitle font size (px)
  fs: 13               // feature text font size (px)
  bannerW: 1200,       // current banner width (px) — may differ from 1200
  bannerH: 627         // current banner height (px) — may differ from 627
};
```

### Existing Global Helper Functions (already available)

```js
// Phone mockup — renders a phone frame with screenshot inside
phoneMockup(screenshotSrc, width, tiltDeg, glowOpacity, glowColor)

// Hue shift — shifts a hex color for gradient effects
shiftHue(hexColor)

// Component helpers (already loaded):
polaroidCard(src, width, tiltDeg, shadowColor, caption)
laptopFrame(src, width, tiltDeg, glowColor)
glassCard(title, body, accentColor, icon)
browserWindow(src, width, url, glowColor)
statCounterRow(stats, accentColor, hlColor)       // stats=[{icon,value,label}]
codeSnippetCard(lines, accentColor, width)         // lines=[{type,indent,text}]
githubActivityBar(values, accentColor, hlColor, n) // values=array of 0-1 floats
```

### Existing CSS Classes (already available in banner.css)

```
.glow-blob           — blurred gradient circle
.sparkle             — twinkling sparkle animation
.divider-line        — horizontal divider bar
.tech-badge          — rounded tech badge pill
.top-badge-pill      — top badge with gradient bg
.banner-footer-bar   — positioned footer bar
.feat-item           — feature item row (icon + text)
.feat-check          — feature checkmark icon
.grid-card           — glass card for grids
.grid-card-icon/title/sub
.stat-box            — stat metric box
.stat-number/label
.num-card / .num-circle — numbered step cards
.code-block          — terminal-style code block
.code-keyword/string/function/comment/var
.terminal-dot        — traffic light dot
.tag-pill            — scrolling tag pill
.b-abs .b-rel .b-flex .b-col .b-center .b-white .b-bold — utility classes
```

---

## COMPONENT FILE FORMAT

### JS File: `templates/components/my-widget.js`

```js
/* ============================================
   MY-WIDGET.JS — Brief description
   Usage: ${myWidget(param1, param2, ...)}
   ============================================ */
"use strict";

registerComponent({
  id: 'my-widget',
  name: 'My Widget',
  description: 'What this component renders',
  cssClass: 'comp-my-widget',
  render: function myWidget(param1, param2, param3) {
    // IMPORTANT: The function NAME must match what templates call!
    // It becomes a global function automatically.
    
    const w = param1 || 200; // always have defaults

    return `
      <div class="comp-my-widget" style="width:${w}px;">
        <!-- Use comp- prefix for all CSS classes -->
        <div class="comp-my-widget-inner">
          ${param2 || 'default content'}
        </div>
      </div>
    `;
  }
});
```

### CSS File: `templates/components/my-widget.css`

```css
/* ============================================
   MY-WIDGET.CSS — Styles for my widget
   ============================================ */

/* IMPORTANT: Use .comp- prefix for ALL classes */
/* The banner renders at 1200x627px with dark backgrounds */

.comp-my-widget {
    /* Base styling here */
    position: relative;
}

.comp-my-widget-inner {
    /* Child styling */
}
```

---

## TEMPLATE OBJECT FORMAT

Paste this into the `TEMPLATES` array in `templates.js`:

```js
/* ==== TEMPLATE — My Template Name ==== */
{
  id: 'my-template-id',        // unique kebab-case ID
  name: 'My Template Name',    // display name for UI
  tag: '1 Screenshot',         // "1 Screenshot", "2 Screenshots", "No Screenshot"
  screenshots: 1,              // how many screenshots (0, 1, 2, or 3)
  thumb: {
    bg: 'linear-gradient(135deg, #color1, #color2)',
    emoji: '🎯',
    label: 'Label'
  },
  render(d) {
    const c = d.colors;
    const ss = d.screenshots[0];
    const feats = d.state.features.slice(0, 4);
    const badges = d.state.badges;

    return `
      <!-- BACKGROUND -->
      <div style="position:absolute;inset:0;
        background:linear-gradient(${c.gradDir},${c.bg1},${c.bg2});"></div>

      <!-- GLOW -->
      <div class="glow-blob" style="width:400px;height:400px;
        top:-100px;right:-80px;
        background:radial-gradient(circle,${c.a1}33,transparent 65%);"></div>

      <!-- TOP BAR -->
      <div style="position:absolute;top:0;left:0;right:0;height:5px;
        background:linear-gradient(90deg,${c.a1},${c.a2});"></div>

      <!-- BADGE -->
      <div class="top-badge-pill b-abs" style="top:20px;left:36px;
        background:linear-gradient(135deg,${c.a1},${c.a2});">
        ${d.state.badge}
      </div>

      <!-- CONTENT -->
      <div style="position:absolute;left:36px;top:60px;right:420px;bottom:68px;
        display:flex;flex-direction:column;justify-content:center;gap:10px;">

        <div style="font-size:${d.hs}px;font-weight:900;line-height:1.12;color:#fff;">
          <span style="background:linear-gradient(135deg,${c.hl},${c.hl}bb);
            -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
            ${d.state.h1}</span><br>
          <span>${d.state.h2}</span>
        </div>

        <div style="font-size:${d.ss}px;color:#CAC4D0;">${d.state.subtitle}</div>

        <div class="divider-line"
          style="width:260px;background:linear-gradient(90deg,${c.a1},${c.a2});"></div>

        <div style="display:flex;flex-direction:column;gap:5px;">
          ${feats.map(f => `
            <div class="feat-item">
              <span style="color:${c.a2};">✅</span>
              <span style="font-size:${d.fs}px;">${f}</span>
            </div>`).join('')}
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${badges.map(b => `
            <span class="tech-badge" style="background:${b.color};">${b.label}</span>
          `).join('')}
        </div>
      </div>

      <!-- PHONE -->
      <div style="position:absolute;right:30px;top:30px;bottom:68px;
        width:380px;display:flex;align-items:center;justify-content:center;">
        ${phoneMockup(ss, d.phoneW, d.phoneTilt, d.glowOpacity, c.a1)}
      </div>

      <!-- FOOTER -->
      <div class="banner-footer-bar" style="height:62px;
        background:${c.a1}33;border-top:1px solid ${c.a1}55;">
        <span style="font-size:12px;color:#CAC4D0;">${d.state.github}</span>
        <span style="font-size:11px;color:#CAC4D0aa;">${d.state.author}</span>
      </div>
    `;
  }
}
```

---

## RULES

1. **Banner defaults to 1200×627px** but users can change size if Size is not Mentioned in the prompt then ask the user — use `d.bannerW` and `d.bannerH` if your template needs to adapt to different canvas sizes. For most templates, absolute positioning within 1200×627 is fine — the canvas will scale content.
2. **Footer is always 62px tall** at the bottom — account for it (bottom:68px for content)
3. **Always use `${c.bg1}`, `${c.a1}`, etc.** — NEVER hardcode colors for bg/accent/highlight
4. **CSS class prefix**: all component classes MUST start with `comp-`
5. **Component JS function name** = the global function name templates call
6. **Template strings use backticks** and `${}` interpolation
7. **Screenshots are data URLs or null** — always handle null with a placeholder
8. **Use inline styles for positioning** — CSS classes only for reusable visual effects
9. **Test with all 6 themes**: purple, blue, ocean, green, orange, pink
10. **Use `d.state.features.slice(0, N)`** — limit features to what fits
11. ⚠️ GRADIENT TEXT RULE:
Never use -webkit-background-clip:text or -webkit-text-fill-color:transparent.
For gradient-colored text use ONLY the SVG method:
  <svg><defs><linearGradient id="g1">...</linearGradient></defs>
  <text fill="url(#g1)" ...>TEXT</text></svg>
This is the ONLY method that works in both live preview AND html2canvas download.

## WHAT I WANT YOU TO CREATE

**[DESCRIBE YOUR TEMPLATE/COMPONENT IDEA HERE]**

Example: "Create a template called 'Developer Portfolio' with a laptop mockup on the right showing a screenshot, headline on top-left, and 4 glass cards in a 2×2 grid for features. Use glassmorphism style."

---

## AFTER THE AI GENERATES FILES — EXACT PLACEMENT GUIDE

### ⚠️ CRITICAL: Script loading order matters!

The app will **break completely** if scripts are loaded in the wrong order.
The correct order is:

```
1. component-loader.js     ← defines registerComponent() — MUST be first
2. All component .js files ← call registerComponent() — AFTER loader
3. templates.js            ← uses component functions in render() — AFTER components
4. overlay scripts         ← AFTER templates
5. app scripts             ← LAST
```

**NEVER put component scripts before `component-loader.js`.**
**NEVER put `templates.js` before the component scripts.**

---

### Step 1: Save component files

Save the AI-generated files to:
```
templates/components/my-component.js
templates/components/my-component.css
```

### Step 2: Add component CSS in `<head>` of `index.html`

Open `index.html` and find this block in `<head>` (around lines 12–19):

```html
    <!-- Component Styles (add new component CSS here) -->
    <link rel="stylesheet" href="templates/components/polaroid-card.css">
    <link rel="stylesheet" href="templates/components/laptop-frame.css">
    <link rel="stylesheet" href="templates/components/glass-card.css">
    <link rel="stylesheet" href="templates/components/browser-window.css">
    <link rel="stylesheet" href="templates/components/code-snippet-card.css">
    <link rel="stylesheet" href="templates/components/stat-counter-row.css">
    <link rel="stylesheet" href="templates/components/github-activity-bar.css">
    ◄◄◄ ADD YOUR NEW CSS HERE ◄◄◄
</head>
```

**Add your new `<link>` AFTER the last existing component CSS, BEFORE `</head>`.**

Example:
```html
    <link rel="stylesheet" href="templates/components/my-component.css">
```

### Step 3: Add component JS in `<body>` of `index.html`

Open `index.html` and find this block near the bottom (around lines 389–401):

```html
    <!-- SCRIPTS — ORDER MATTERS -->
    <!-- 1. Component loader MUST come first (defines registerComponent) -->
    <script src="templates/components/component-loader.js"></script>
    <!-- 2. All component JS files (call registerComponent) -->
    <script src="templates/components/polaroid-card.js"></script>
    <script src="templates/components/laptop-frame.js"></script>
    <script src="templates/components/glass-card.js"></script>
    <script src="templates/components/browser-window.js"></script>
    <script src="templates/components/stat-counter-row.js"></script>
    <script src="templates/components/code-snippet-card.js"></script>
    <script src="templates/components/github-activity-bar.js"></script>
    ◄◄◄ ADD YOUR NEW JS HERE ◄◄◄
    <!-- 3. Templates (uses component functions in render) -->
    <script src="templates/templates.js"></script>
```

**Add your new `<script>` AFTER the last existing component JS, BEFORE the `<!-- 3. Templates -->` comment.**

Example:
```html
    <script src="templates/components/my-component.js"></script>
```

### Step 4: Add template to `templates.js`

Open `templates/templates.js` and find the closing `];` of the `TEMPLATES` array.
It's at the end of the file, just before the helper functions (`phoneMockup`, `shiftHue`).

**Add a comma after the last template's `}`, then paste your new template object before `];`.**

```js
    // ... end of last template ...
    }
  },       ← add comma here if missing

  /* ==== TEMPLATE — My New Template ==== */
  {
    id: 'my-new-template',
    // ... paste your template here ...
  }

];   ← closing bracket of TEMPLATES array

/* Helper functions below — DO NOT paste template here */
function phoneMockup(...) { ... }
```

### Step 5: Test

1. Open `index.html` in browser
2. Open browser DevTools console (F12) — check for any red errors
3. Go to Templates tab → select your new template
4. Try changing colors, uploading screenshots
5. If you see errors like `registerComponent is not defined` or `myFunction is not defined`,
   your script loading order is wrong — go back to Step 3
