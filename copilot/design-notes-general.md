# THE VISUAL ARCHIVE — GENERAL DESIGN INSTRUCTIONS (MEDIUM VERSION)

## Overview
These guidelines define the global design language, layout philosophy, responsive behavior, and implementation rules for “The Visual Archive” Angular + Tailwind project. These instructions apply to every page and component.

---

# Figma Pages

Home  
https://www.figma.com/design/hb6JXWUjcKru92COBw8ZJy/the-visual-archive?node-id=0-1  

Collection (Archive Grid)  
https://www.figma.com/design/hb6JXWUjcKru92COBw8ZJy/the-visual-archive?node-id=7-2  

Artwork Detail  
https://www.figma.com/design/hb6JXWUjcKru92COBw8ZJy/the-visual-archive?node-id=7-168  

About  
https://www.figma.com/design/hb6JXWUjcKru92COBw8ZJy/the-visual-archive?node-id=7-231  

Style Guide  
https://www.figma.com/design/hb6JXWUjcKru92COBw8ZJy/the-visual-archive?node-id=7-291  


---

## 1. Technology & Architecture
- Angular Standalone Components
- TailwindCSS (fluid, responsive, utility-first)
- Component-based structure:

```
src/app/
  core/
    layout/
      app-shell/
      header/
      footer/
    services/
  shared/
    components/
    directives/
    pipes/
  models/
  utils/
  features/
    home/
    collection/
    artwork-detail/
    about/
    style-guide/
```

- `app-shell` wraps header → router-outlet → footer.
- Use OnPush and simple inputs where possible.

---

## 2. Typography System

### Space Grotesk
- Primary font for titles, headings, body text.
- Lowercase for main titles.
- Weights: 300–400.
- Fluid sizes:
  - Mobile: 6vw
  - Tablet: 4vw
  - Desktop: 2.5–3vw for hero titles

### Inter
- Used for navigation, labels, metadata.
- ALWAYS uppercase.
- Tailwind sizes: `text-[0.65rem]` → `text-xs`.
- Tracking: `tracking-[0.2em]` or `tracking-[0.3em]`.

---

## 3. Color System

- White: #FFFFFF  
- Black: #000000  
- Accent Blue: #2563EB  
- Gray-50: #F7F7F7  
- Borders: rgba(0,0,0,0.05–0.08)  
- Text-muted: rgba(0,0,0,0.40–0.60)

### Tailwind equivalents
```
text-black/40
text-black/50
text-black/60
border-black/5
border-black/10
```

---

## 4. Spacing Philosophy (No Pixel Layout)

Avoid:
- `w-[320px]`
- `h-[400px]`
- fixed px paddings or margins

Use:
- `%` widths (e.g., `w-1/3`, `w-[24%]`)
- `vw`, `vh` for hero areas
- `px-4 md:px-10 lg:px-20`
- `gap-8`, `gap-[4vw]`
- `max-w-screen-xl mx-auto`

Images:
- `w-full h-auto`
- `object-contain`

---

## 5. Layout Rules

### Header
- Left: “maria lichi”
- Right nav: COLLECTION / ABOUT / STYLE
- Inter uppercase small
- Hover → accent blue
- Route for STYLE = `/style`

### Footer
- 3-column layout (LOCATION / SOCIAL / LEGAL)
- Tiny Inter uppercase
- Present on all pages except:
  - About (form replaces footer)
  - Artwork Detail hero (footer after scroll)

### Cards & Images
- grayscale initial
- hover → remove grayscale + fade (transition ~1000ms)
- Title: Space Grotesk
- Meta: Inter

---

## 6. Responsive Rules

Breakpoints:
- sm, md, lg, xl, 2xl (Tailwind defaults)

Columns:
- Desktop: 3-column grid
- Tablet: 2 columns
- Mobile: 1 column

Hero sections:
- Use `min-h-[70vh]` or `min-h-[75vh]`
- Artwork detail image:
  - `max-h-[70vh]`
  - `object-contain`

About page:
- Mobile → stacked layout
- Desktop → split layout with portrait block

---

## 7. Interaction Rules

Links:
- Inter uppercase tiny
- Muted → accent on hover
- Underline subtle variant

Images:
- Transition from grayscale:
```
transition-all duration-1000 ease-out hover:grayscale-0
```

Navigation:
- Artwork detail: ← previous | back to collection | next →
- Must remain visible inside hero block.

Keyboard:
- Left arrow → previous artwork
- Right arrow → next artwork

---

## 8. Tailwind Setup Requirements

`tailwind.config.js`:
```js
content: ["./src/**/*.{html,ts}"],
theme: {
  extend: {
    fontFamily: {
      space: ["Space Grotesk", "sans-serif"],
      inter: ["Inter", "sans-serif"]
    }
  }
}
```

Global CSS:
```css
:root { --accent: #2563EB; }
html { scroll-behavior: smooth; }
```

---

## 9. Routing Map

```
/                 → home
/collection       → collection grid page
/collection/:category/:id → artwork detail
/about            → about page
/style            → style guide page
```

UI label: **STYLE**  
Route: **/style**

---

## 10. Copilot Guidelines

- Do NOT convert Figma px → px in Tailwind.
- Use fluid units: %, vw/vh, max-w.
- Follow typography and color system exactly.
- Use standalone components in `/features`.
- Maintain proportions from Figma, not pixel numbers.
- All pages follow these general rules; specific pages have their own md files.
