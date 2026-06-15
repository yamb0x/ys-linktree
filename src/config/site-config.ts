type HeroType = 'image' | 'video';

interface SiteConfigType {
  title: string;
  description: string;
  avatar: string;
  hero: {
    src: string;
    type: HeroType;
    link?: string;
  };
  socials: Array<{
    name: string;
    url: string;
  }>;
  sections: string[];
  footerMessage?: string;
}

export const siteConfig: SiteConfigType = {
  // Header
  title: "Yambo",
  description: "Co-Founder of plnty.app and founder of Yambo Studio: We create bespoke visuals for brands looking to distinguish themselves.",
  avatar: "/icons/studio-logo.png",

  // Hero banner
  hero: {
    src: "/thumbnails/plnty-hero.png",
    type: "image",
    link: "https://plnty.app",
  },

  // Social links (footer)
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/yam-ben-adiva-a931a632/" },
    { name: "X", url: "https://x.com/yamb0x" },
    { name: "Behance", url: "https://www.behance.net/yambo" },
  ],

  // Section display order
  // Links with section "main" appear first (no header)
  // Other sections appear in this order with headers
  sections: ["main", "Education", "Archive", "Yambo Studio"],

  // Footer message
  footerMessage: "This page was built using Claude Code in 18 minutes from initial prompt to working version on Vercel. There's no reason to pay for services like Linktree nowadays ;)",
};

export type SiteConfig = typeof siteConfig;
