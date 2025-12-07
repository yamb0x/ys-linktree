# Project Overview

**Purpose**: Custom Linktree replacement for Yambo Studio
**Tech Stack**: Next.js 15.5.7, TypeScript, Tailwind CSS, Zod, YAML
**Design**: Mobile-first, dark theme only
**Dev Port**: 3500 (not 3000)

## Important Development Notes

1. **Port Configuration**: This project runs on port **3500**, not the default 3000
   - Development URL: `http://localhost:3500`
   - Run with: `npm run dev` (configured in package.json)

2. **Documentation Location**: All documentation and planning files go in `docs/` folder
   - Project plan: `docs/PLAN.md`
   - Never create `.md` files in project root (except this CLAUDE.md)

3. **Single Page App**: This is a single-page application - do not create additional routes

---

## Architecture Principles

### Content as Code
- All links live in `content/links/` as YAML files
- Git is the CMS - version control for all content
- Push to GitHub triggers Vercel deployment

### Type Safety First
- Zod schemas validate all YAML content
- TypeScript strict mode enabled
- Type definitions in `src/lib/content/schema.ts`

### Simple by Design
- Single page application
- No authentication required
- No database required
- Static generation only

---

## Key Files & Their Purpose

### Link Schema (`src/lib/content/schema.ts`)
Defines link structure with Zod validation. **DO NOT** modify field names without updating all YAML files.

### Content Loader (`src/lib/content/loadLinks.ts`)
Functions to read and parse YAML link files. Groups by section, sorts by order.

### Site Config (`src/config/site-config.ts`)
Global settings: title, description, avatar, hero banner, social links, section order.

### Components (`src/components/`)
- `Header.tsx` - Avatar, title, description
- `HeroBanner.tsx` - Large hero image/video
- `LinkCard.tsx` - Individual link button (3 variants)
- `SectionHeader.tsx` - Section dividers
- `SocialLinks.tsx` - Footer social links

---

## Common Tasks

### Adding a New Link

```yaml
# content/links/NN-descriptive-name.yml
title: "Link Title"
url: "https://example.com"
section: "main"        # or "Education", "Initiatives"
order: 1               # determines position
thumbnail: null        # or "/thumbnails/image.jpg"
thumbnailSize: "none"  # "none" | "small" | "large"
animation: "glow"      # "none" | "glow" | "scale" | "bounce" | "shake"
```

### Updating Global Config

Edit `src/config/site-config.ts`:
- Change title/description
- Update hero banner path
- Modify social links
- Reorder sections

### Modifying Content Schema

**CAUTION**: Schema changes affect all existing content

1. Update schema in `src/lib/content/schema.ts`
2. Update all existing YAML files to match
3. Test thoroughly with `npm run typecheck`

---

## Do's and Don'ts

### DO:
- Use existing components when possible
- Follow TypeScript types strictly
- Keep YAML frontmatter keys consistent
- Store thumbnails in `public/thumbnails/`
- Test locally before pushing (`npm run dev`)
- Implement loading states for async operations
- Put documentation in `docs/` folder

### DON'T:
- Change schema field names without migration
- Create `.md` files in project root
- Use absolute URLs for local assets (use /thumbnails/...)
- Add desktop-specific layouts (mobile-first only)
- Create new pages (single page app)
- Use inline styles (use Tailwind classes)
- Fetch data in client components

---

## Component Patterns

### Server Component Pattern
```tsx
// src/app/page.tsx
import { loadLinks } from '../lib/content/loadLinks';

export default async function Page() {
  const links = await loadLinks();
  return <LinkList links={links} />;
}
```

### Client Component Pattern
```tsx
'use client';
// src/components/LinkCard.tsx
import { useState } from 'react';

export default function LinkCard({ link }) {
  const [isHovered, setIsHovered] = useState(false);
  // Interactive logic here
}
```

---

## Link Card Variants

### Text Only (`thumbnailSize: "none"`)
```
┌─────────────────────────────────┐
│         Link Title              │
└─────────────────────────────────┘
```

### Small Thumbnail (`thumbnailSize: "small"`)
```
┌─────────────────────────────────┐
│ [img]    Link Title             │
└─────────────────────────────────┘
```

### Large Banner (`thumbnailSize: "large"`)
```
┌─────────────────────────────────┐
│  ┌───────────────────────────┐  │
│  │      Large Image          │  │
│  └───────────────────────────┘  │
│         Link Title              │
└─────────────────────────────────┘
```

---

## Animation Types

| Type | Effect |
|------|--------|
| `none` | No animation |
| `glow` | Subtle shadow glow on hover |
| `scale` | Scale up 2% on hover |
| `bounce` | Quick bounce effect |
| `shake` | Subtle wiggle effect |

---

## Debugging Tips

### Links Not Showing
1. Check YAML syntax is valid
2. Verify schema compliance (all required fields)
3. Check section name matches `siteConfig.sections`
4. Run `npm run build` to see validation errors

### Thumbnails Not Loading
1. Verify file exists in `public/thumbnails/`
2. Check path starts with `/thumbnails/`
3. Check file extension matches exactly

### Styling Issues
1. Check Tailwind classes are valid
2. Verify CSS custom properties in `globals.css`
3. Test on mobile viewport (primary target)

---

## Data Flow

```
YAML Files → Zod Validation → loadLinks() →
Group by Section → Sort by Order → Render Components
```

---

## File Naming Convention

### Links
- Format: `NN-descriptive-name.yml`
- Example: `01-yambo-website.yml`, `04-comfyui-workshop.yml`
- Order number in filename should match `order` field

### Thumbnails
- Format: `descriptive-name.jpg` or `.png`
- Example: `comfyui-workshop.jpg`, `walls-of-hope.png`
- Keep filenames lowercase with hyphens

---

## Common Errors & Solutions

### "Module not found"
- Run `npm install`
- Verify file exists at specified path

### "Type error"
- Run `npm run typecheck`
- Check schema definitions match usage
- Verify all required props are passed

### "Hydration mismatch"
- Ensure server and client render same content
- Check for browser-only code in SSR
- Use `useEffect` for client-only operations

---

## Performance Notes

- Static generation: all pages pre-built at deploy
- No client-side data fetching
- Images should be optimized before adding
- Fonts loaded locally (no external requests)

---

## Security Notes

- No user input processing
- No API routes needed
- No authentication
- All content is public
- Next.js 15.5.7 patched for CVE-2025-55182

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zod Docs](https://zod.dev)
- [YAML Spec](https://yaml.org/spec/)
- Project Plan: `docs/PLAN.md`
