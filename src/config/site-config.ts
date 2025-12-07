type HeroType = 'image' | 'video';

interface SiteConfigType {
  title: string;
  description: string;
  avatar: string;
  hero: {
    src: string;
    type: HeroType;
  };
  socials: Array<{
    name: string;
    url: string;
  }>;
  sections: string[];
}

export const siteConfig: SiteConfigType = {
  // Header
  title: "Yambo Studio",
  description: "We create bespoke visuals for brands looking to distinguish themselves.",
  avatar: "/icons/studio-logo.png",

  // Hero banner
  hero: {
    src: "/thumbnails/yambo-studio-hero.png",
    type: "image",
  },

  // Social links (footer)
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/yam-ben-adiva-a931a632/" },
    { name: "Email", url: "mailto:hello@yambo.me" },
    { name: "X", url: "https://x.com/dissrup1" },
  ],

  // Section display order
  // Links with section "main" appear first (no header)
  // Other sections appear in this order with headers
  sections: ["main", "Education", "Initiatives"],
};

export type SiteConfig = typeof siteConfig;
