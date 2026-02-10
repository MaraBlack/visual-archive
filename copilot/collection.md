# COLLECTION PAGE — DESIGN INSTRUCTIONS (LONG VERSION)

## Purpose
The Collection page ("Selected Archive") displays all artworks in a clean, grid‑based, editorial layout.  
It supports filtering by category and serves as the main index of the visual archive.

This file includes *page‑specific* rules for the Collection screen.  
General rules live in `design-notes-general.md`.

---

# 1. Page Layout Structure

## 1.1 Header
Reuse the global header from `/core/layout/header`:
- Left: “maria lichi”
- Right nav: COLLECTION / ABOUT / STYLE
- Inter uppercase tiny
- Hover → accent blue (#2563EB)
- Active link: COLLECTION

No shadows, borders, or background colors.

---

## 1.2 Page Title
Displayed at the top of the Collection page:

```
Selected Archive
```

### Style:
- Font: Space Grotesk
- lowercase or title-case (per your Figma)
- Weight: 300
- Responsive sizes:
  - mobile: ~6vw
  - tablet: ~4vw
  - desktop: ~2vw
- Left-aligned on desktop, centered on mobile

Spacing:
- Vertical margin ≈ `mt-[6vh] mb-[4vh]`
- No px units.

---

# 2. Filter Bar

Filters:
- ALL  
- DIGITAL  
- PHOTOGRAPHY  
- SKETCHBOOK  

### Typography:
- Inter uppercase
- `tracking-[0.25em]`
- `text-[0.65rem]` → `text-xs`
- muted by default (`text-black/40`)

### Layout:
```
flex flex-wrap items-center gap-6
```

### Active State:
- text color → accent blue `#2563EB`
- underline: subtle, ≈ 12–16% of text width  
- OR using Tailwind:
```
border-b-2 border-[#2563EB]
pb-1
```

### Hover:
```
transition-colors duration-300
hover:text-[#2563EB]
```

### Behavior:
When clicked, navigates to:
```
/collection?filter=<category>
```

---

# 3. Grid Layout

The grid is the core of the page. Must be fully fluid.

### Grid rules:
```
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-12
```

- No fixed px column widths.
- The grid must breathe vertically: `gap-y-[8vh]` recommended.

### Container:
```
max-w-screen-xl mx-auto px-4 md:px-10 lg:px-20
```

---

# 4. Artwork Card Component

Each artwork in the grid uses the same structure.

### 4.1 Card Layout
```
flex flex-col gap-2 group cursor-pointer
```

### 4.2 Image
Rules:
- grayscale (default)
- fade to full color on hover
- image must scale proportionally
- no cropping unless intentional
- rounded corners optional (but Figma shows sharp edges)

Tailwind:
```
w-full h-auto object-cover
grayscale opacity-90
transition-all duration-1000
group-hover:grayscale-0 group-hover:opacity-100
```

### 4.3 Metadata
Below the image:

**Title**
- Space Grotesk  
- weight 300  
- `text-base md:text-lg`  
- lowercase  
- color: black

**Category + Year**
- Inter uppercase tiny  
- `text-[0.65rem] tracking-[0.25em]`  
- muted: `text-black/50`

Spacing:
```
flex flex-col mt-1
```

---

# 5. Artwork Interaction & Routing

### Clicking a card navigates to:
```
/collection/<category>/<id>
```

Where:
- category = digital | photography | sketchbook
- id = unique generated id (not the title)

IDs must not be the artwork names.

### Keyboard Navigation (Optional)
Not required at grid level, but global service may exist.  
Primarily used in artwork detail page.

---

# 6. Responsive Behavior

### Mobile (≤ 640px)
- 1 column grid
- Filters wrap into 2 rows
- Title centered
- Padding left-right minimal (`px-4`)

### Tablet (≥ 768px)
- 2 columns
- Filters on a single row if possible
- Title left-aligned

### Desktop (≥ 1024px)
- 3 columns
- Large spacing: `gap-y-[10vh]`
- Full layout width inside `max-w-screen-xl`

### Ultra-wide (≥ 1600px)
- Limit grid width to prevent overly large cards  
- Keep `max-w-screen-xl`

### NEVER:
- do not use hard-coded pixel-based card widths
- do not use `w-[320px]`, etc.

---

# 7. Filter Behavior (Optional Angular Logic)

Recommended:
- Filtering should not re-render entire DOM; use trackBy
- Filters should update using query params
- On filter change:
  - scroll to top of grid
  - maintain hero/header intact

Query param example:
```
/collection?filter=digital
```

Angular suggestion:
```ts
this.route.queryParamMap.subscribe(params => {
  const filter = params.get('filter') ?? 'all';
});
```

---

# 8. Accessibility

- Images must include `alt=""` text  
- Filter options should be `<button>` elements  
- Keyboard focus states:
```
focus-visible:ring-2 ring-[#2563EB]
```

---

# 9. Angular Component Structure

Folder:
```
src/app/features/collection/
```

Files:
- `collection.page.ts` (standalone component)
- `collection.page.html`
- `collection.page.css` or `.scss`
- `collection.routes.ts` (optional)
- Optional shared components:
  - `filter-bar.component.ts`
  - `artwork-card.component.ts`
  - `gallery-grid.component.ts`

---

# 10. Tailwind Utilities Used

### Layout:
- `grid`, `flex`, `gap-*`, `max-w-screen-xl`
- `px-4 md:px-10 lg:px-20`
- `mt-[6vh] mb-[4vh]`

### Typography:
- `uppercase tracking-[0.25em] text-[0.65rem]`
- `text-black/40`, `text-black/50`, `text-[#2563EB]`

### Images:
- `grayscale`
- `transition-all duration-1000`
- `object-cover` / `object-contain`

### Hover:
- `group-hover:grayscale-0`
- `hover:text-[#2563EB]`

---

# 11. What Copilot Must Respect

- DO NOT use pixel values from Figma.
- DO use fluid units: %, vh, vw, em.
- Maintain spacing proportions from Figma, not px distances.
- Cards must adapt to all screen sizes.
- Filters must behave like documented.
- Use the general typography & color rules.

---

# 12. Summary

The Collection page should feel:
- spacious  
- balanced  
- editorial  
- responsive  
- minimalist  
- soft & fluid  

It is the core browsing experience of “The Visual Archive,” so it must maintain perfect consistency across devices.

Follow these rules exactly when implementing the Collection page UI in Angular + Tailwind.

