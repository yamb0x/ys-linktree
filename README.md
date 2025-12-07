# YS-Linktree

A custom Linktree replacement for Yambo Studio. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **YAML-based content** - Add links by creating simple YAML files
- **Git-powered CMS** - Push to GitHub, auto-deploy to Vercel
- **Mobile-first design** - Dark theme, optimized for mobile
- **Multiple link styles** - Text only, small thumbnail, or large banner
- **Hover animations** - Glow, scale, bounce, or shake effects

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3500](http://localhost:3500)

## Adding a New Link

Create a YAML file in `content/links/`:

```yaml
# content/links/08-my-link.yml
title: "My New Link"
url: "https://example.com"
section: "main"
order: 8
thumbnail: "/thumbnails/my-image.jpg"  # optional
thumbnailSize: "small"  # "none" | "small" | "large"
animation: "glow"       # "none" | "glow" | "scale" | "bounce" | "shake"
```

Push to GitHub and Vercel auto-deploys.

## Configuration

Edit `src/config/site-config.ts` to change:
- Title and description
- Avatar image
- Hero banner
- Social links
- Section order

## Tech Stack

- Next.js 15.5.7
- TypeScript
- Tailwind CSS
- Zod (schema validation)

## License

MIT
