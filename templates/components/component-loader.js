/* ============================================
   COMPONENT-LOADER.JS
   Central loader for reusable template components.

   HOW THIS WORKS:
   ───────────────
   1. Each component file in this folder
      (e.g., polaroid-card.js, laptop-frame.js)
      calls registerComponent() to register itself.

   2. Components provide:
      - A JS helper function (returns HTML string)
      - A CSS class name (styles in matching .css file)

   3. Templates in TEMPLATES array use components
      by calling the registered helper function
      (e.g., polaroidCard(src, w, tilt, color))

   4. Component CSS files are loaded by adding
      <link> tags in index.html

   HOW TO ADD A NEW COMPONENT:
   ───────────────────────────
   Step 1: Create  templates/components/my-widget.js
   Step 2: Create  templates/components/my-widget.css
   Step 3: Add <link> and <script> tags in index.html
   Step 4: Use the helper function in your template's render()

   ============================================ */
"use strict";

/* ===== COMPONENT REGISTRY ===== */
const COMPONENTS = {};

/**
 * Register a reusable template component.
 *
 * @param {Object} component
 * @param {string}   component.id          — unique key (e.g. 'polaroid-card')
 * @param {string}   component.name        — display name
 * @param {string}   component.description — what it does
 * @param {string}   component.cssClass    — main CSS class (for documentation)
 * @param {Function} component.render      — helper function (assigned to window)
 *
 * Example:
 *   registerComponent({
 *     id: 'polaroid-card',
 *     name: 'Polaroid Card',
 *     description: 'Photo card with white border and shadow',
 *     cssClass: 'comp-polaroid',
 *     render: function polaroidCard(src, width, tilt, shadowColor) {
 *       return `<div class="comp-polaroid" ...>...</div>`;
 *     }
 *   });
 *
 * Then in templates.js:
 *   ${polaroidCard(ss, 160, -8, c.a1)}
 */
function registerComponent(component) {
  COMPONENTS[component.id] = component;

  // Expose the render function globally so templates can call it
  if (component.render && component.render.name) {
    window[component.render.name] = component.render;
  }
}

/**
 * Get a registered component by ID (for introspection).
 */
function getComponent(id) {
  return COMPONENTS[id] || null;
}

/**
 * List all registered components (for debugging / UI).
 */
function listComponents() {
  return Object.values(COMPONENTS).map(c => ({
    id: c.id,
    name: c.name,
    description: c.description,
    cssClass: c.cssClass
  }));
}
