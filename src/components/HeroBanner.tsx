import Image from 'next/image';
import { siteConfig } from '../config/site-config';

export default function HeroBanner() {
  const { hero } = siteConfig;

  if (!hero.src) {
    return null;
  }

  return (
    <div className="w-full mb-6 rounded-link overflow-hidden">
      {hero.type === 'video' ? (
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
      )}
    </div>
  );
}
