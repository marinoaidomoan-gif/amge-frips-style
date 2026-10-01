import SectionHeading from '../components/SectionHeading.jsx';
import { SITE } from '../lib/seo.js';
import { PRIVACY_SECTIONS } from '../lib/legal-content.js';
import { useSeo } from '../hooks/useSeo.js';

export default function Confidentialite() {
  useSeo({ title: `Politique de confidentialité — ${SITE.name}` });

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <SectionHeading eyebrow="Mentions légales" title="Politique de confidentialité" align="left" />
      <div className="mt-12 space-y-10">
        {PRIVACY_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="font-display text-lg tracking-[0.05em] mb-3">{section.title}</p>
            <p className="text-sm leading-relaxed text-charcoal/70 dark:text-offwhite/70">{section.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}