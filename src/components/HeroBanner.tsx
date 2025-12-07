import Image from 'next/image';
import { siteConfig } from '../config/site-config';

export default function HeroBanner() {
  const { hero } = siteConfig;

  if (!hero.src) {
    return null;
  }

  const content = hero.type === 'video' ? (
    <video
      src={hero.src}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-auto"
    />
  ) : (
    <Image
      src={hero.src}
      alt={`${siteConfig.title} hero`}
      width={680}
      height={380}
      className="w-full h-auto"
      priority
    />
  );

  // If hero has a link, wrap in anchor
  if (hero.link) {
    return (
      <a
        href={hero.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full mb-6 rounded-link overflow-hidden hover:opacity-90 transition-opacity"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="w-full mb-6 rounded-link overflow-hidden">
      {content}
    </div>
  );
}
