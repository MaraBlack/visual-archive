# HOME PAGE — DESIGN INSTRUCTIONS (MEDIUM VERSION)

## Purpose
The Home page introduces “The Visual Archive” with a minimalist, editorial layout.
It highlights:
- the project title
- clean navigation
- three category cards that route to the Collection page with filters.

This file includes only HOME-specific rules. Global rules are defined in `design-notes-general.md`.

---

## 1. Page Layout Structure

### Header
- Left: “maria lichi”
- Right nav: COLLECTION / ABOUT / STYLE
- Inter font, uppercase, very small, muted by default.
- Hover → accent blue (#2563EB).

### Hero Section
- Full-width block with centered title:
  ```
  maria / the visual archive
  ```
- Font: Space Grotesk, lowercase.
- Responsive sizes:
  - Mobile: ~6vw
  - Tablet: ~4vw
  - Desktop: ~2.5–3vw

Center content using:
```
flex flex-col items-center justify-center text-center
min-h-[40vh]
```

Spacing uses responsive padding (`px-4 md:px-10 lg:px-20`), no px units.

---

## 2. Category Cards Section

### Layout
3-card grid:
```
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[10vh]
max-w-screen-xl mx-auto
```

### Card Content
Each card contains:
- an image (grayscale by default)
- a category label (Inter uppercase tiny)
- a small description (optional)
- click behavior → routes to `/collection?filter=<category>`

### Card Behavior
Images:
```
grayscale opacity-80
transition-all duration-1000 ease-out
hover:grayscale-0 hover:opacity-100
```

Labels:
- Inter uppercase, `text-black/40`
- Hover → accent blue

Routes:
- DIGITAL → /collection?filter=digital
- PHOTOGRAPHY → /collection?filter=photography
- SKETCHBOOK → /collection?filter=sketchbook

---

## 3. Responsive Behavior

Mobile:
- Stack cards vertically.
- Title remains centered.
- Padding reduced to `px-4`.

Tablet:
- 2 columns for cards.
- Adjust title size via vw units.

Desktop:
- 3 columns.
- Large breathing room: `lg:px-20`.

Always use:
- `%` widths
- `vw/vh` for hero
- `max-w-screen-xl` for main content width

Never use fixed sizes like `w-[320px]`.

---

## 4. Typography Rules (home page)

Hero title:
- Space Grotesk
- lowercase
- weight 300
- fluid size (vw-based)

Category labels:
- Inter uppercase
- size: `text-[0.65rem]` to `text-xs`
- tracking: `tracking-[0.2em]`

Descriptions:
- Space Grotesk 14–16px equivalent using Tailwind utilities
- muted: `text-black/50`

---

## 5. Interaction Rules (home page)

Links:
```
transition-colors duration-300
hover:text-[#2563EB]
```

Card hover:
```
group-hover:grayscale-0 group-hover:opacity-100
```

Click → navigates to Collection with the correct filter applied.

---

## 6. Angular Component Structure

Folder:
```
src/app/features/home/
```

Files:
- `home.page.ts`
- `home.page.html`
- `home.page.css` (or `.scss`)
- Optional: `home.routes.ts`

### Recommended Components:
- `header` (from core)
- `category-card` (from shared, optional)

### Routing:
Home is mapped to `/`.

---

## 7. Tailwind Utilities Used

Essential utilities for this page:
- `grid`, `flex`, `min-h-[40vh]`, `text-center`
- `grayscale`, `transition-all`, `duration-1000`
- `tracking-[0.2em]`, `uppercase`
- `gap-y-[10vh]`
- `max-w-screen-xl`, `mx-auto`
- `px-4 md:px-10 lg:px-20`
- `hover:text-[#2563EB]`

---

## 8. What Copilot Must Respect

- No px-based layout values.
- Hero must use vw-based typography.
- Images must remain fluid (`object-contain`, `w-full`, `h-auto`).
- Category cards must match the Figma spacing proportionally, not by pixel values.
- Navigation must reuse global header styles.

---

## 9. Summary

The Home page is a clean, minimal introduction with:
- a centered hero title
- a responsive 3-card filter section
- muted Inter for navigation and labels
- soft hover transitions
- fully fluid layout with no px dependencies

Follow this guide when implementing the Home page UI in Angular + Tailwind.
