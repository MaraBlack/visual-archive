# ARTWORK DETAIL PAGE — DESIGN INSTRUCTIONS (LONG VERSION)

## Purpose
The Artwork Detail page is the immersive, gallery-style view of a single artwork.  
It must feel premium, calm, and spacious — similar to museum digital archives.  
This page uses a **fixed-height hero section (75vh)** to keep navigation, image, and metadata visible at all times.

General rules live in `design-notes-general.md`.  
This file covers only the detail page.

---

# 1. Page Structure Overview

The page consists of two major vertical sections:

1. **Hero Section (min-h-[75vh])**  
   Contains:
   - Left metadata block  
   - Center artwork image  
   - Right description block  
   - Navigation row (prev / back / next)

2. **Footer Section**  
   Appears only *after* scrolling below the hero.

---

# 2. Hero Section (75vh)

The hero must occupy ~75% of the viewport height for consistent composition.

### Layout
```
flex justify-between items-center
min-h-[75vh]
px-4 md:px-10 lg:px-20
max-w-screen-xl mx-auto
relative
```

Columns:
- **Left metadata:** w-full md:w-1/4  
- **Center image:** w-full md:w-1/2  
- **Right description:** w-full md:w-1/4  

On mobile, stack vertically:
```
flex-col gap-8 items-start
```

---

# 3. Metadata (Left Column)

Includes:
- Title (Space Grotesk, lowercase)
- Medium (Inter uppercase tiny)
- Year (Inter uppercase tiny)
- Optional: dimensions or technique

Example:
```
NEON SOLITUDE
ARTWORK TITLE
DIGITAL ILLUSTRATION
2024
```

### Styling:
- Title: `text-xl md:text-2xl font-light`
- Labels: `uppercase tracking-[0.25em] text-[0.65rem] text-black/50`
- Spacing: `flex flex-col gap-4`

---

# 4. Artwork Image (Center Column)

### Rules:
- Image must remain centered  
- Must never overflow vertically  
- Must maintain aspect ratio  

Tailwind:
```
w-full h-auto object-contain mx-auto
max-h-[70vh]
```

### Behavior:
- No hover color transitions (not a card)  
- No borders, no background unless needed for contrast  
- Always visible on first load

---

# 5. Description (Right Column)

### Content examples:
- Conceptual details  
- Process notes  
- Series explanation  
- Behind-the-scenes info

### Typography:
- Space Grotesk  
- `text-sm md:text-base`  
- Muted tone: `text-black/60`

Alignment:
```
flex flex-col gap-4
justify-center
```

---

# 6. Navigation Row (Prev / Back / Next)

Must stay inside the 75vh hero, usually anchored bottom-left / center / bottom-right.

### Layout:
```
absolute bottom-4 left-0 right-0
flex justify-between text-[0.65rem] uppercase tracking-[0.25em]
```

### Links:
- ← previous  
- back to collection  
- next →  

### Interactions:
```
text-black/40 hover:text-[#2563EB] transition-colors duration-300
```

### Behavior:
- previous = go to previous artwork within same category  
- next = next artwork  
- back = `/collection?filter=<category>`

Add keyboard support via global keyboard-nav service:
- ← key = previous  
- → key = next  

---

# 7. Responsive Behavior

### Mobile
- Stack metadata → image → description → nav  
- Padding reduced to `px-4`
- Navigation centered

### Tablet
- Metadata left, description right, image centered  
- Navigation still bottom of hero

### Desktop
- True three-column layout  
- Navigation fixed inside hero  
- Footer only after scroll

---

# 8. Accessibility

- All images require `alt` attribute  
- Navigation controls must be `<button>` or `<a>`  
- Keyboard nav must include focus styles:
```
focus-visible:ring-2 ring-[#2563EB]
```

---

# 9. Angular Component Structure

Folder:
```
src/app/features/artwork-detail/
```

Files:
- `artwork-detail.page.ts`
- `artwork-detail.page.html`
- `artwork-detail.page.css`
- `artwork-detail.routes.ts` (optional)

### Data Input
Artwork model:
```ts
interface Artwork {
  id: string;
  title: string;
  category: string;
  year: number;
  description?: string;
  imageUrl: string;
}
```

### Navigation Logic
Must fetch:
- current artwork
- category list
- next/previous IDs based on current category

---

# 10. Tailwind Utilities Used

### Layout:
- `flex`, `items-center`, `justify-between`
- `min-h-[75vh]`
- `max-w-screen-xl mx-auto`
- `px-4 md:px-10 lg:px-20`

### Typography:
- `uppercase tracking-[0.25em] text-[0.65rem]`
- `text-black/40 hover:text-[#2563EB]`
- `font-light text-xl md:text-2xl`

### Image:
- `object-contain max-h-[70vh] mx-auto`

### Navigation:
- `absolute bottom-4`
- `transition-colors duration-300`

---

# 11. What Copilot Must Respect

- Hero must ALWAYS be 75vh (fluid, not px)  
- Navigation must be visible without scrolling  
- Image must scale proportionally  
- No px units for layout  
- Use only % / vw / vh / max-w / gap utilities  
- Maintain proportions shown in Figma, not pixel distances  
- Footer must NOT appear until after hero section  

---

# 12. Summary

The Artwork Detail page should feel:
- immersive  
- calm  
- premium  
- editorial  
- consistent  
- gallery-like  

It is the most important page for showcasing each piece, so it must follow these rules strictly.
