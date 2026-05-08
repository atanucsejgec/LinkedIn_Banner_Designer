# AI Prompt — Generate LinkedIn Banner Template + Components

> **Copy everything below this line and paste it to any AI (ChatGPT, Claude, Gemini, etc.)**

---

## SYSTEM CONTEXT

I have a **LinkedIn Banner Designer** web app. It uses vanilla HTML/CSS/JS (no framework). The banner canvas defaults to **1200×627 pixels** but users can choose different sizes, so if Size is not Mentioned in the prompt then ask the user (Square 1080×1080, Portrait 1080×1350, Story 1080×1920, Twitter 1500×500, LI Cover 1584×396, or fully custom W×H). Templates are defined in a `TEMPLATES` array and each template's `render(d)` function returns an HTML string that gets injected into the banner.

The project has a **component system**: reusable UI building blocks (cards, device frames, code blocks, gradient text, etc.) that live in `templates/components/`. Each component has a `.js` file (registers a global helper function) and a `.css` file (styles).

The app also has:
- **Canvas Interaction**: Drag-to-reposition, per-element resize handles, tilt/rotation controls, alignment tools, grid snapping
- **Layers Panel**: Click-to-select, show/hide toggle, z-index numerical ordering, delete individual layers
- **Media Ingestion**: Users can inject their own custom images and gradient text dynamically over any template
- **Overlay System**: 6 stackable overlays (corner accents, dot grid, photo frame, computer mockup, wave divider, vignette)
- **Export System**: Download PNG (2×), copy to clipboard, export individual layers as transparent PNGs for Canva (supports tilt/scale export flawlessly)

## YOUR TASK

I want you to create:
1. **One or more component files** (JS + CSS pair) for any unique design element in the template
2. **The template object** to paste into the `TEMPLATES` array in `templates.js`

## ARCHITECTURE REFERENCE

### Folder Structure
```
templates/
├── templates.js                    ← TEMPLATES array lives here (28 templates)
├── components/
│   ├── component-loader.js         ← registry (already exists, DO NOT recreate)
│   ├── polaroid-card.js / .css     ← polaroid photo card
│   ├── laptop-frame.js / .css      ← laptop device mockup
│   ├── glass-card.js / .css        ← glassmorphism card
│   ├── browser-window.js / .css    ← browser window frame
│   ├── stat-counter-row.js / .css  ← row of stat counters
│   ├── code-snippet-card.js / .css ← terminal-style code block
│   ├── github-activity-bar.js/.css ← GitHub contribution graph bar
│   ├── recruiter-code-chips.js/.css← code-style tag chips
│   ├── source-qr-card.js / .css    ← QR code placeholder SVG
│   ├── internship-badge.js / .css  ← bold CTA badge with shine
│   ├── floating-feat-tag.js / .css ← stacked floating feature tags
│   ├── kotlin-code-card.js / .css  ← syntax-highlighted Kotlin code card
│   ├── gradient-text.js / .css     ← SVG gradient text (single + multi-line)
│   ├── grade-float-card.js / .css  ← floating grade UI card with icon + badge
│   ├── oop-concept-card.js / .css  ← object-oriented programming concept card
│   ├── neon-shape-icons.js / .css  ← glowing geometric shape icons
│   └── my-new-component.js / .css  ← YOUR new component(s)
├── overlays/
│   ├── overlay-manager.js          ← overlay registry & toggle logic
│   ├── corner-accents.js           ← decorative corner brackets
│   ├── dot-grid.js                 ← repeating dot pattern
│   ├── photo-frame.js              ← polaroid-style overlay frame
│   ├── computer-mockup.js          ← laptop overlay mockup
│   ├── wave-divider.js             ← SVG wave section divider
│   └── vignette.js                 ← edge darkening vignette
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
  fs: 13,              // feature text font size (px)
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

// ─── Component helpers (all globally available): ───

// Polaroid photo card with tape effect
polaroidCard(src, width, tiltDeg, shadowColor, caption)

// Laptop device frame with screenshot
laptopFrame(src, width, tiltDeg, glowColor)

// Glassmorphism card with frosted glass effect
glassCard(title, body, accentColor, icon)

// Browser window frame with URL bar
browserWindow(src, width, url, glowColor)

// Row of stat counters with icons
statCounterRow(stats, accentColor, hlColor)       // stats=[{icon,value,label}]

// Terminal-style code block with syntax colors
codeSnippetCard(lines, accentColor, width)         // lines=[{type,indent,text}]

// GitHub contribution activity bar
githubActivityBar(values, accentColor, hlColor, n) // values=array of 0-1 floats

// Code-style tag chip strip
codeChipStrip(tags, accentColor)                   // tags=["[Kotlin]","[Compose]"]

// QR code placeholder SVG
qrCode(size, color, bgColor)

// Bold CTA badge with gradient + shine animation
internshipBadge(text, bgColor, textColor, accentColor)

// Floating feature tags that stack beside elements
floatingFeatTags(tags, accentColor, hlColor, side) // side='left'|'right'

// Syntax-highlighted Kotlin code card with line numbers
kotlinCodeCard(lines, accentColor, width)
  // lines = [{ indent:0, type:'keyword', text:'fun' },
  //          { indent:0, tokens:[{type:'keyword',text:'val '},{type:'var',text:'x'}] }]
  // Token types: keyword, fn, var, string, comment, plain, number, type, punct

// ⚠️ SVG gradient text — THE ONLY way to do gradient text that works in export
gradientText(text, color1, color2, fontSize, fontWeight, direction, letterSpacing)
  // direction: 'horizontal' | 'diagonal' | 'vertical'

// Multi-line SVG gradient text for big headlines
gradientTextLines(lines, color1, color2, fontSize, fontWeight, letterSpacing, lineGap)
  // lines = ['Line 1', 'Line 2']

// Floating grade/stat UI card with icon and optional badge
gradeFloatCard(icon, label, value, badge, accentColor, bgColor)

// Object-oriented programming concept card
oopConceptCard(title, body, accentColor, icon)

// Glowing geometric shape icons
neonShapeIcon(shape, color, size)
```

### Existing CSS Classes (already available in banner.css)

```
.glow-blob           — blurred gradient circle (position:absolute)
.sparkle             — twinkling sparkle animation
.divider-line        — horizontal divider bar (height:3px)
.divider-dots        — row of dots (children: <span> with bg)
.tech-badge          — rounded tech badge pill
.top-badge-pill      — top badge with gradient bg
.banner-footer-bar   — positioned footer bar (bottom:0)
.feat-item           — feature item row (icon + text)
.feat-check          — feature checkmark icon
.grid-card           — glass card for grids
.grid-card-icon/title/sub
.stat-box            — stat metric box
.stat-number/label
.num-card / .num-circle — numbered step cards
.num-card-text
.code-block          — terminal-style code block
.code-keyword/string/function/comment/var
.terminal-bar        — terminal top bar
.terminal-dot        — traffic light dot
.tag-strip           — horizontal tag strip (no-wrap, overflow hidden)
.tag-pill            — scrolling tag pill
.diagonal-clip-left / .diagonal-clip-right — diagonal clip paths
.b-abs .b-rel .b-flex .b-col .b-center .b-white .b-bold — utility classes
```

### Existing Templates (28 total)

| #  | ID                           | Name                         | Screenshots | Size    |
|----|------------------------------|------------------------------|-------------|---------|
| 01 | classic-split                | Classic Split                | 1           | 1200×627|
| 02 | hero-center                  | Hero Center                  | 1           | 1200×627|
| 03 | dual-screen                  | Dual Screenshot              | 2           | 1200×627|
| 04 | triple-screen                | Triple Showcase              | 3           | 1200×627|
| 05 | terminal                     | Terminal Code                | 1           | 1200×627|
| 06 | stats-cards                  | Stats Cards                  | 1           | 1200×627|
| 07 | feature-grid                 | Feature Grid                 | 1           | 1200×627|
| 08 | diagonal-split               | Diagonal Split               | 1           | 1200×627|
| 09 | minimal-light                | Minimal Light                | 1           | 1200×627|
| 10 | neon-glow                    | Neon Glow                    | 1           | 1200×627|
| 11 | text-only                    | Text Only                    | 0           | 1200×627|
| 12 | announcement                 | Announcement                 | 0           | 1200×627|
| 13 | neon-wireframe               | Neon Wireframe               | 1           | 1200×627|
| 14 | retro-terminal               | Retro Terminal               | 1           | 1200×627|
| 15 | glass-trio                   | Glass Trio                   | 1           | 1200×627|
| 16 | isometric-showcase           | Isometric Showcase           | 1           | 1200×627|
| 17 | stats-dashboard              | Stats Dashboard              | 1           | 1200×627|
| 18 | polaroid-stack               | Polaroid Stack               | 2           | 1200×627|
| 19 | sunrise-horizon              | Sunrise Horizon              | 1           | 1200×627|
| 20 | magazine-cover               | Magazine Cover               | 1           | 1200×627|
| 21 | orbit-rings                  | Orbit Rings                  | 1           | 1200×627|
| 22 | split-diagonal               | Split Diagonal               | 1           | 1200×627|
| 23 | floating-cards               | Floating Cards               | 1           | 1200×627|
| 24 | github-project-showcase      | GitHub Project Showcase       | 0           | 1200×627|
| 25 | recruiter-spotlight-dark     | Recruiter Spotlight Dark     | 1           | 1200×627|
| 26 | android-dev-square           | Android Developer · Square   | 1           | 1080×1080|
| 27 | student-grade-tracker-square | Student Grade Tracker        | 0           | 1080×1080|

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

      <!-- HEADLINE — using SVG gradient text -->
      <div style="position:absolute;left:36px;top:60px;right:420px;bottom:68px;
        display:flex;flex-direction:column;justify-content:center;gap:10px;">

        ${gradientTextLines([d.state.h1, d.state.h2], c.hl, c.a2, d.hs, 900)}

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

1. **Banner defaults to 1200×627px** but users can change size — use `d.bannerW` and `d.bannerH` if your template needs to adapt to different canvas sizes (especially for square/portrait templates). For standard LinkedIn templates, absolute positioning within 1200×627 is fine.
2. **Footer is always 62px tall** at the bottom — account for it (bottom:68px for content)
3. **Always use `${c.bg1}`, `${c.a1}`, etc.** — NEVER hardcode colors for bg/accent/highlight
4. **CSS class prefix**: all component classes MUST start with `comp-`
5. **Component JS function name** = the global function name templates call
6. **Template strings use backticks** and `${}` interpolation
7. **Screenshots are data URLs or null** — always handle null with a placeholder
8. **Use inline styles for positioning** — favor `position:absolute` for distinct widgets so they can be easily dragged, resized, and rotated by the user!
9. **Test with all 6 themes**: purple, blue, ocean, green, orange, pink
10. **Use `d.state.features.slice(0, N)`** — limit features to what fits
11. ⚠️ **GRADIENT TEXT RULE** (CRITICAL):
    Never use `-webkit-background-clip:text` or `-webkit-text-fill-color:transparent`.
    For gradient-colored text use ONLY the SVG method via `gradientText()` or `gradientTextLines()`:
    ```js
    ${gradientText(d.state.h1, c.hl, c.a2, d.hs, 900, 'diagonal')}
    // or for multi-line:
    ${gradientTextLines([d.state.h1, d.state.h2], c.hl, c.a2, d.hs, 900)}
    ```
    This is the ONLY method that works in both live preview AND html2canvas download.
    If you need raw SVG instead:
    ```html
    <svg><defs><linearGradient id="g1">...</linearGradient></defs>
    <text fill="url(#g1)" ...>TEXT</text></svg>
    ```
12. **For square/portrait templates** (1080×1080, 1080×1350), use `d.bannerW` and `d.bannerH` for positioning and scale your layout proportionally.
13. **Component token types** for `kotlinCodeCard`: keyword, fn, var, string, comment, plain, number, type, punct
14. **Pre-tilting Elements**: You can safely use the modern CSS `rotate: -5deg;` or `scale: 1.2;` on your template elements. The export engine automatically handles translating these for the downloaded image.
15. **Layer Separation**: Avoid wrapping the entire design in one massive `display:flex` container if possible. Break widgets into distinct absolute layers so the user can manage them effortlessly in the new Layers panel.

## DESIGN TIPS FOR BEAUTIFUL TEMPLATES

- **Layer glow blobs** at different positions with varying opacity for depth
- **Use sparkle elements** for visual polish (`.sparkle` class with `animation-delay`)
- **Add a top accent bar** (5px gradient bar at top of banner)
- **Use glassmorphism** via `rgba(255,255,255,0.06)` backgrounds with `backdrop-filter:blur`
- **Combine components**: e.g. `kotlinCodeCard` + `floatingFeatTags` + `phoneMockup`
- **Use `gradientText()`** for headlines — it exports perfectly
- **Add subtle scanline/grid overlays** for texture (repeating-linear-gradient with low opacity)
- **Stagger animations** with `animation-delay` on sparkles and floating tags
- **Use `clip-path: polygon()`** for dramatic diagonal/angular splits
- **Layer multiple glow colors** (a1 + a2 + hl) for rich color depth
- **Pre-tilt dynamic components**: Give elements a slight `rotate: -3deg;` to make the layout feel organic and dynamic.

## WHAT I WANT YOU TO CREATE

**[DESCRIBE YOUR TEMPLATE/COMPONENT IDEA HERE]**

Example prompts:
- "Create a template called 'Developer Portfolio' with a laptop mockup on the right showing a screenshot, headline on top-left, and 4 glass cards in a 2×2 grid for features. Use glassmorphism style."
- "Create a square (1080×1080) template called 'Open Source Hero' with a GitHub activity bar, code snippet, and floating feature tags around a centered phone mockup."
- "Create a 'Minimal Resume' template with no screenshots, using gradientTextLines for a big name, stat counters for experience, and code chip strips for skills."

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

Open `index.html` and find this block in `<head>` (around lines 13–27):

```html
    <!-- Component Styles (add new component CSS here) -->
    <link rel="stylesheet" href="templates/components/polaroid-card.css">
    <link rel="stylesheet" href="templates/components/laptop-frame.css">
    <link rel="stylesheet" href="templates/components/glass-card.css">
    <link rel="stylesheet" href="templates/components/browser-window.css">
    <link rel="stylesheet" href="templates/components/code-snippet-card.css">
    <link rel="stylesheet" href="templates/components/stat-counter-row.css">
    <link rel="stylesheet" href="templates/components/github-activity-bar.css">
    <link rel="stylesheet" href="templates/components/recruiter-code-chips.css">
    <link rel="stylesheet" href="templates/components/source-qr-card.css">
    <link rel="stylesheet" href="templates/components/internship-badge.css">
    <link rel="stylesheet" href="templates/components/floating-feat-tag.css">
    <link rel="stylesheet" href="templates/components/kotlin-code-card.css">
    <link rel="stylesheet" href="templates/components/gradient-text.css">
    <link rel="stylesheet" href="templates/components/grade-float-card.css">
    <link rel="stylesheet" href="templates/components/oop-concept-card.css">
    <link rel="stylesheet" href="templates/components/neon-shape-icons.css">
    ◄◄◄ ADD YOUR NEW CSS HERE ◄◄◄
</head>
```

**Add your new `<link>` AFTER the last existing component CSS, BEFORE `</head>`.**

### Step 3: Add component JS in `<body>` of `index.html`

Open `index.html` and find this block near the bottom (around lines 540–560):

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
    <script src="templates/components/recruiter-code-chips.js"></script>
    <script src="templates/components/source-qr-card.js"></script>
    <script src="templates/components/internship-badge.js"></script>
    <script src="templates/components/floating-feat-tag.js"></script>
    <script src="templates/components/kotlin-code-card.js"></script>
    <script src="templates/components/gradient-text.js"></script>
    <script src="templates/components/grade-float-card.js"></script>
    <script src="templates/components/oop-concept-card.js"></script>
    <script src="templates/components/neon-shape-icons.js"></script>
    ◄◄◄ ADD YOUR NEW JS HERE ◄◄◄
    <!-- 3. Templates (uses component functions in render) -->
    <script src="templates/templates.js"></script>
```

**Add your new `<script>` AFTER the last existing component JS, BEFORE the `<!-- 3. Templates -->` comment.**

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
5. Click Download PNG — verify gradient text exports correctly
6. If you see errors like `registerComponent is not defined` or `myFunction is not defined`,
   your script loading order is wrong — go back to Step 3
