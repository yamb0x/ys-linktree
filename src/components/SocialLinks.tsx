import { siteConfig } from '../config/site-config';

export default function SocialLinks() {
  const { socials, footerMessage } = siteConfig;

  return (
    <footer className="py-8 mt-4">
      {socials && socials.length > 0 && (
        <nav className="flex items-center justify-center gap-6 mb-6">
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
      )}

      {footerMessage && (
        <p className="text-center text-xs text-text-muted opacity-60 max-w-sm mx-auto leading-relaxed">
          {footerMessage}
        </p>
      )}
    </footer>
  );
}
