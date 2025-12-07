# YS-Linktree Project Plan

## Project Overview

**Purpose**: Custom Linktree replacement for Yambo Studio
**Goal**: Git-based link management with automatic Vercel deployment
**Design**: Mobile-first, dark theme, matching existing Linktree aesthetics

---

## Current Linktree Analysis

### Header Section
- **Avatar**: Y logo in circle (white on dark)
- **Title**: "Yambo Studio"
- **Description**: "We create bespoke visuals for brands looking to distinguish themselves."

### Hero Banner
- Large 3D "YAMBO STUDIO" stylized image
- Full-width, prominent placement

### Link Types Identified

| Type | Example | Visual |
|------|---------|--------|
| Text only | "yambo-studio.com" | Simple button with text |
| Small thumbnail | "About Yambo (&Studio)" | Square image on left + text |
| Large banner | "ComfyUI Workshop" | Full-width image above text |

### Section Headers
- "Education"
- "Initiatives"

### Social Links (Footer)
- LinkedIn
- Email
- X (Twitter)

### Current Links Inventory

1. **yambo-studio.com** (text only, main section)
2. **About Yambo (&Studio)** (small thumbnail, main section)
3. **Join our Discord** (text only, main section)
4. **ComfyUI Workshop I** (large banner, Education section)
5. **Walls of Hope** (small thumbnail, Initiatives section)
6. **Never Again** (small thumbnail, Initiatives section)
7. **Dissrup 2021-2022** (small thumbnail, Initiatives section)

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.5.7 | React framework (patched for CVE-2025-55182) |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Utility-first styling |
| Zod | 3.x | Schema validation |
| js-yaml | 4.x | YAML parsing |

### Why This Stack?
- **Next.js**: Static generation, fast builds, Vercel integration
- **YAML content**: Simpler than MDX for pure data (no body content needed)
- **Zod validation**: Type-safe content parsing (pattern from patreon-studies)
- **Tailwind**: Rapid mobile-first styling with custom design tokens

---

## Project Structure

```
ys-linktree/
├── content/
│   └── links/                      # YAML link definitions
│       ├── 01-yambo-website.yml
│       ├── 02-about-yambo.yml
│       ├── 03-discord.yml
│       ├── 04-comfyui-workshop.yml
│       ├── 05-walls-of-hope.yml
│       ├── 06-never-again.yml
│       └── 07-dissrup.yml
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout + Basis Grotesque font
│   │   ├── page.tsx                # Main page (renders all links)
│   │   └── globals.css             # Design tokens + Tailwind
│   │
│   ├── components/
│   │   ├── Header.tsx              # Avatar + title + description
│   │   ├── HeroBanner.tsx          # Large hero image/video
│   │   ├── LinkCard.tsx            # Individual link button
│   │   ├── SectionHeader.tsx       # Section dividers
│   │   └── SocialLinks.tsx         # Footer social links
│   │
│   ├── lib/
│   │   └── content/
│   │       ├── schema.ts           # Zod schemas for links
│   │       └── loadLinks.ts        # YAML loader functions
│   │
│   └── config/
│       └── site-config.ts          # Global configuration
│
├── public/
│   ├── fonts/
│   │   └── Basis Grotesque/        # Font files (.ttf, .woff, .woff2)
│   ├── icons/
│   │   ├── studio-logo.png         # Y logo (circle)
│   │   └── ys-logo-256.png         # Alternative logo
│   └── thumbnails/                 # Link thumbnail images
│
├── tailwind.config.ts              # Tailwind + custom theme
├── next.config.mjs                 # Next.js configuration
├── tsconfig.json                   # TypeScript config
├── package.json                    # Dependencies
└── CLAUDE.md                       # AI assistant instructions
```

---

## Content Schema

### Link YAML Format

```yaml
# content/links/04-comfyui-workshop.yml
title: "ComfyUI Workshop I — DM for 50% Off"
url: "https://yamb0x.gumroad.com/l/bwjhy"
section: "Education"
order: 4
thumbnail: "/thumbnails/comfyui-workshop.jpg"
thumbnailSize: "large"    # "none" | "small" | "large"
animation: "glow"         # "none" | "glow" | "scale" | "bounce" | "shake"
```

### Zod Schema

```typescript
// src/lib/content/schema.ts
import { z } from 'zod';

export const ThumbnailSize = z.enum(['none', 'small', 'large']);
export const AnimationType = z.enum(['none', 'glow', 'scale', 'bounce', 'shake']);

export const LinkSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  section: z.string().default('main'),
  order: z.number().int().positive(),
  thumbnail: z.string().nullable().optional(),
  thumbnailSize: ThumbnailSize.default('none'),
  animation: AnimationType.default('none'),
});

export type Link = z.infer<typeof LinkSchema>;
```

---

## Global Configuration

```typescript
// src/config/site-config.ts
export const siteConfig = {
  // Header
  title: "Yambo Studio",
  description: "We create bespoke visuals for brands looking to distinguish themselves.",
  avatar: "/icons/studio-logo.png",

  // Hero banner
  hero: {
    src: "/thumbnails/yambo-studio-hero.png",
    type: "image" as const,  // "image" | "video"
  },

  // Social links (footer)
  socials: [
    { name: "LinkedIn", url: "https://linkedin.com/in/yam-ben-adiva-a931a632" },
    { name: "Email", url: "mailto:hello@yambo.me" },
    { name: "X", url: "https://x.com/dissrup1" },
  ],

  // Section display order
  sections: ["main", "Education", "Initiatives"],
};
```

---

## Design System

### Colors (Dark Theme)

```css
:root {
  --color-background: #121212;
  --color-surface: #1e1e1e;
  --color-surface-hover: #2a2a2a;
  --color-text: #ffffff;
  --color-text-muted: #a0a0a0;
  --color-border: #333333;
}
```

### Typography (Basis Grotesque)

```css
:root {
  --font-family: 'Basis Grotesque', system-ui, sans-serif;
  --font-title: 24px;
  --font-description: 14px;
  --font-link: 16px;
  --font-section: 12px;
}
```

### Spacing

```css
:root {
  --spacing-container: 16px;
  --spacing-link-gap: 12px;
  --link-radius: 8px;
  --link-padding: 16px;
}
```

### Animations

| Name | Effect | CSS |
|------|--------|-----|
| `glow` | Subtle shadow glow on hover | `box-shadow: 0 0 20px rgba(255,255,255,0.1)` |
| `scale` | Scale up 2% on hover | `transform: scale(1.02)` |
| `bounce` | Quick bounce on hover | Custom keyframe animation |
| `shake` | Subtle wiggle on hover | Custom keyframe animation |

---

## Component Specifications

### Header Component
- Avatar: 80px circle with logo
- Title: 24px, white, centered
- Description: 14px, muted gray, centered, max 2 lines

### HeroBanner Component
- Full container width
- Aspect ratio preserved
- Supports image or video
- Optional (can be disabled in config)

### LinkCard Component
- Full width button
- Three variants based on thumbnailSize:
  - `none`: Text only
  - `small`: 48px square thumbnail on left
  - `large`: Full-width image above text
- Hover animation based on animation property
- Opens link in new tab

### SectionHeader Component
- Uppercase text
- 12px, muted gray
- Margin top for separation

### SocialLinks Component
- Horizontal row, centered
- Text links with separator
- Subtle hover effect

---

## Workflow

### Adding a New Link

1. Create YAML file in `content/links/`:
```yaml
# content/links/08-new-link.yml
title: "My New Link"
url: "https://example.com"
section: "main"
order: 8
thumbnailSize: "none"
animation: "glow"
```

2. (Optional) Add thumbnail to `public/thumbnails/`

3. Push to GitHub

4. Vercel auto-deploys (~30 seconds)

### Modifying Global Config

1. Edit `src/config/site-config.ts`
2. Push to GitHub
3. Auto-deploy

---

## Mobile-First Design

- **Max width**: 680px (centered on larger screens)
- **Container padding**: 16px
- **Touch targets**: Minimum 44px height
- **No desktop-specific layouts**: Same design at all sizes

---

## Deployment

- **Platform**: Vercel
- **Trigger**: Git push to main branch
- **Build**: Static generation (no server required)
- **Domain**: To be configured

---

## Future Enhancements (Not in Scope)

- Analytics integration
- Custom domain setup
- A/B testing for links
- Click tracking
- QR code generation

---

## Dependencies

```json
{
  "dependencies": {
    "next": "15.5.7",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zod": "^3.24.0",
    "js-yaml": "^4.1.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/js-yaml": "^4.0.0"
  }
}
```
