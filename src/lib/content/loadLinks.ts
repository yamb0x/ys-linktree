import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { LinkSchema, ParsedLink } from './schema';
import { siteConfig } from '../../config/site-config';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'links');

/**
 * Load all links from YAML files in content/links/
 * Validates each file against the LinkSchema
 */
export async function loadAllLinks(): Promise<ParsedLink[]> {
  // Check if directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn('Content directory not found:', CONTENT_DIR);
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
  const links: ParsedLink[] = [];

  for (const filename of files) {
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    try {
      const rawData = yaml.load(fileContent);
      const validatedLink = LinkSchema.parse(rawData);

      links.push({
        ...validatedLink,
        filename,
      });
    } catch (error) {
      console.error(`Error parsing ${filename}:`, error);
      // Continue with other files even if one fails
    }
  }

  return links;
}

/**
 * Group links by section and sort by order within each section
 * Returns sections in the order defined by siteConfig.sections
 */
export function groupLinksBySection(links: ParsedLink[]): Map<string, ParsedLink[]> {
  const grouped = new Map<string, ParsedLink[]>();

  // Initialize sections in config order
  for (const section of siteConfig.sections) {
    grouped.set(section, []);
  }

  // Group links
  for (const link of links) {
    const section = link.section || 'main';
    if (!grouped.has(section)) {
      grouped.set(section, []);
    }
    grouped.get(section)!.push(link);
  }

  // Sort links within each section by order
  for (const [section, sectionLinks] of grouped) {
    grouped.set(section, sectionLinks.sort((a, b) => a.order - b.order));
  }

  return grouped;
}

/**
 * Load and group all links in one call
 */
export async function loadGroupedLinks(): Promise<Map<string, ParsedLink[]>> {
  const links = await loadAllLinks();
  return groupLinksBySection(links);
}
