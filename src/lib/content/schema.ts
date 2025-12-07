import { z } from 'zod';

/**
 * Thumbnail size variants for link cards
 * - none: Text only button
 * - small: 48px square thumbnail on left
 * - large: Full-width image above text
 */
export const ThumbnailSize = z.enum(['none', 'small', 'large']);
export type ThumbnailSize = z.infer<typeof ThumbnailSize>;

/**
 * Animation types for link card hover effects
 * - none: No animation
 * - glow: Subtle shadow glow
 * - scale: Scale up 2%
 * - bounce: Quick bounce effect
 * - shake: Subtle wiggle
 */
export const AnimationType = z.enum(['none', 'glow', 'scale', 'bounce', 'shake']);
export type AnimationType = z.infer<typeof AnimationType>;

/**
 * Link schema for YAML content files
 * All fields must match the YAML frontmatter structure
 */
export const LinkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Must be a valid URL'),
  section: z.string().default('main'),
  order: z.number().int().positive('Order must be a positive integer'),
  thumbnail: z.string().nullable().optional(),
  thumbnailSize: ThumbnailSize.default('none'),
  animation: AnimationType.default('none'),
});

export type Link = z.infer<typeof LinkSchema>;

/**
 * Parsed link with additional metadata
 */
export interface ParsedLink extends Link {
  filename: string;
}
