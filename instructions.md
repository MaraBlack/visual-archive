# THE VISUAL ARCHIVE — DESIGN NOTES  
For Angular + Tailwind + Figma VSCode Plugin  
Last update: 2026

This document defines the layout rules, typography, spacing philosophy, and component architecture for implementing “The Visual Archive” based on the Figma design linked below.

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

Screens **should NOT be on the same Figma page**.  
Each page above contains **one frame = one Angular page**.

---

# 1. Technology Setup (Copilot should generate automatically)

- Angular standalone components  
- Tailwind CSS installed via `ng add @ngneat/tailwind` or manual setup  
- Global layout based on `/core/layout`  
- Routing based on `/features/*`  

Application folder structure:

src/app/
  core/
    layout/
      header/
      footer/
      app-shell/
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



Component naming must match features.

---

# 2. Global Design Language

## Typography

### 1. Space Grotesk  
Usage: hero titles, headings, body text  
- weights: 300–400  
- always lowercase for titles  
- fluid sizes:  
  - mobile: 6vw  
  - tablet: 4vw  
  - desktop: 2vw–3vw  

### 2. Inter  
Usage: navigation, labels, metadata  
- UPPERCASE ALWAYS  
- sizes: 10–14px equivalent, but in Tailwind use:
  - `text-[0.65rem]` to `text-xs`  
  - with tracking: `tracking-[0.25em]`  

No pixel typography in layout, only scale-based Tailwind classes.

---

# 3. Color System (from Figma Style Guide)

- White `#FFFFFF`  
- Black `#000000`  
- Accent Blue `#2563EB` (link hover, active nav)  
- Gray 50 `#F7F7F7` (background blocks)  
- Border lines `rgba(0,0,0,0.05–0.08)`  
- Muted text `rgba(0,0,0,0.40–0.60)`  

Tailwind equivalents:
## Tailwind equivalents
```css
text-black/40
text-black/50
text-black/60
border-black/5 
border-black/10
```

# 4. Spacing Philosophy
Do NOT use fixed pixel-based spacing or dimensions like:

w-[320px]

h-[400px]

Instead use:

% (e.g. w-[24%], w-1/3)

vw, vh

max-w-screen-*

px-4 md:px-10 lg:px-20

gap-8 gap-[5vw]

clamp() if absolutely needed

Spacing should follow proportions, not absolute px values from Figma.

# 5. Page Implementation Details
HOME
(see Figma: 0:1)

Hero title centered using Space Grotesk

Responsive grid for categories

Avoid px sizes — use % and screen units

COLLECTION
(see Figma: 7:2)

Grid should be responsive

Filters in Inter uppercase

Active filter = accent blue

No fixed pixel rows

ARTWORK DETAIL
(see Figma: 7:168)

Hero block uses min-h-[75vh]

3-column layout using %, not px

Navigation row stays inside hero

Footer appears ONLY after hero

ABOUT
(see Figma: 7:231)

Add portrait block

Social links

Information section

Contact form replaces footer

STYLE GUIDE
(see Figma: 7:291)

Typography examples

Color blocks

Components showcase

# 6. Component Rules
Header:

Inter uppercase small

Hover → accent blue

Route text “STYLE” links to /style

Page lives in features/style-guide/

Footer:

3-column layout

Appears on all pages except About and Artwork Detail hero

Cards:

grayscale → color hover

soft transitions

# 7. Responsive Layout
Breakpoints:

sm md lg xl 2xl

Rules:

Columns: w-full md:w-1/4 etc

Image max height: max-h-[70vh] object-contain

Vertical rhythm uses vh, not px

# 8. Interaction Rules
Links:

Inter uppercase small

Muted → accent blue on hover

Underlines subtle

Images:

Transition grayscale → color

transition-all duration-1000

# 9. Tailwind Setup Requirements
Tailwind config:

content: ["./src/**/*.{html,ts}"],
theme: {
  extend: {
    fontFamily: {
      space: ["Space Grotesk", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    }
  }
}
Global CSS:

:root { --accent: #2563EB; }
html { scroll-behavior: smooth; }
10. Routing Map
/             → home
/collection   → collection grid
/collection/:category/:id → artwork detail
/about        → about page
/style        → style guide page
UI label = STYLE
Actual route = /style

# 11. Notes for Copilot
Follow these notes strictly

Never use pixel widths/heights for layout

Match visual proportions from Figma, not numbers

Use Tailwind responsive utilities everywhere

Use fluid containers (max-w-screen-xl)


---




