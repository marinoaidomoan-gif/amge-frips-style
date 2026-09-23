import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, description, align = 'center', tone = 'dark' }) {
  const centered = align === 'center';
  const light = tone === 'light';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${centered ? 'items-center text-center' : 'items-start text-left'}`}
    >
      {eyebrow && <p className="text-xs uppercase tracking-[0.2em] text-gold-deep dark:text-gold mb-4">{eyebrow}</p>}
      <p className={`font-display uppercase tracking-[0.04em] text-3xl md:text-4xl ${light ? 'text-offwhite' : ''}`}>{title}</p>
      <span className={`w-14 h-px bg-gold mt-7 mb-2 ${centered ? 'mx-auto' : ''}`} />
      {description && (
        <p className={`mt-5 max-w-xl text-sm leading-relaxed ${light ? 'text-offwhite/65' : 'text-charcoal/60 dark:text-offwhite/60'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}