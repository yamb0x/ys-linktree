import { siteConfig } from '../config/site-config';

export default function SocialLinks() {
  const { socials } = siteConfig;

  if (!socials || socials.length === 0) {
    return null;
  }

  return (
    <footer className="py-8 mt-4">
      <nav className="flex items-center justify-center gap-6">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-description text-text-muted hover:text-text-primary transition-colors"
          >
            {social.name}
          </a>
        ))}
      </nav>
    </footer>
  );
}
