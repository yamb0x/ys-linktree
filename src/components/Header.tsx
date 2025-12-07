import Image from 'next/image';
import { siteConfig } from '../config/site-config';

export default function Header() {
  return (
    <header className="flex flex-col items-center text-center py-8">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 bg-surface">
        <Image
          src={siteConfig.avatar}
          alt={siteConfig.title}
          width={80}
          height={80}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Title */}
      <h1 className="text-title text-text-primary mb-2">
        {siteConfig.title}
      </h1>

      {/* Description */}
      <p className="text-description max-w-sm">
        {siteConfig.description}
      </p>
    </header>
  );
}
