import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import LinkCard from '../components/LinkCard';
import SectionHeader from '../components/SectionHeader';
import SocialLinks from '../components/SocialLinks';
import { loadGroupedLinks } from '../lib/content/loadLinks';
import { siteConfig } from '../config/site-config';

export default async function Home() {
  const groupedLinks = await loadGroupedLinks();

  return (
    <main className="min-h-screen">
      <div className="container py-6">
        {/* Header with avatar, title, description */}
        <Header />

        {/* Hero banner */}
        <HeroBanner />

        {/* Links grouped by section */}
        <div className="flex flex-col gap-3">
          {siteConfig.sections.map((section) => {
            const links = groupedLinks.get(section) || [];

            if (links.length === 0) {
              return null;
            }

            return (
              <div key={section}>
                {/* Show section header for non-main sections */}
                {section !== 'main' && (
                  <SectionHeader title={section} />
                )}

                {/* Links in this section */}
                <div className="flex flex-col gap-3">
                  {links.map((link) => (
                    <LinkCard key={link.filename} link={link} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Social links footer */}
        <SocialLinks />
      </div>
    </main>
  );
}
