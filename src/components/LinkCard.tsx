'use client';

import Image from 'next/image';
import { ParsedLink } from '../lib/content/schema';

interface LinkCardProps {
  link: ParsedLink;
}

export default function LinkCard({ link }: LinkCardProps) {
  const { title, url, thumbnail, thumbnailSize, animation } = link;

  // Build animation class
  const animationClass = animation !== 'none' ? `link-card-${animation}` : '';

  // Large thumbnail variant
  if (thumbnailSize === 'large' && thumbnail) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`link-card block w-full bg-surface rounded-link overflow-hidden ${animationClass}`}
      >
        {/* Large image */}
        <div className="w-full aspect-video relative">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        {/* Title below image */}
        <div className="p-4 text-center">
          <span className="text-link text-text-primary">{title}</span>
        </div>
      </a>
    );
  }

  // Small thumbnail variant
  if (thumbnailSize === 'small' && thumbnail) {
    // Use object-contain for SVG icons, object-cover for photos
    const isSvg = thumbnail.endsWith('.svg');

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`link-card flex items-center w-full bg-surface rounded-link p-4 gap-4 ${animationClass}`}
      >
        {/* Small thumbnail */}
        <div className={`w-12 h-12 flex-shrink-0 relative ${isSvg ? 'p-3' : 'rounded-lg overflow-hidden'}`}>
          <Image
            src={thumbnail}
            alt={title}
            fill
            className={isSvg ? 'object-contain' : 'object-cover'}
          />
        </div>
        {/* Title */}
        <span className="text-link text-text-primary flex-grow text-center pr-12">
          {title}
        </span>
      </a>
    );
  }

  // Text only variant (default)
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-card flex items-center justify-center w-full bg-surface rounded-link p-4 min-h-[56px] ${animationClass}`}
    >
      <span className="text-link text-text-primary text-center">{title}</span>
    </a>
  );
}
