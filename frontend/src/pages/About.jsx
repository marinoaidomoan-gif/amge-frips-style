import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import { SITE } from '../lib/seo.js';
import { VALUES, MILESTONES } from '../lib/about-content.js';
import { useSeo } from '../hooks/useSeo.js';

export default function About() {
  useSeo({
    title: `À propos — ${SITE.name}`,
    description: `L'histoire de ${SITE.name} : une friperie de luxe fondée en ${SITE.since} à Porto-Novo, Bénin, et des créations neuves choisies une à une.`,
  });

  return (
    <div>
      <section className="relative h-[46vh] min-h-[320px] overflow-hidden -mt-20">
        <div className="absolute inset-0 bg-linear-to-br from-charcoal via-charcoal-light to-gold-deep/30">
          {/* TODO: vraie photo de l'atelier/boutique */}
        </div>
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-offwhite/75">Depuis {SITE.since}</p>
          <p className="font-display uppercase tracking-[0.04em] text-3xl md:text-5xl text-offwhite mt-6">La maison</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24 md:py-28 grid md:grid-cols-[1fr_1.1fr] gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] w-full overflow-hidden bg-blush-soft dark:bg-charcoal-light shadow-soft"
        >
          {/* TODO: vraie photo de la gérante */}
        </motion.div>

        <div>
          <SectionHeading eyebrow="Notre histoire" title="Bien s'habiller n'est pas une question de budget" align="left" />
          <div className="mt-8 space-y-6 text-sm leading-[1.95] text-charcoal/70 dark:text-offwhite/70">
            <p>
              {SITE.name} est née en {SITE.since} à Porto-Novo d'une conviction simple : une femme peut
              porter de belles matières et de belles coupes sans payer le prix d'une boutique de luxe.
            </p>
            <p>
              La maison réunit deux sélections. D'un côté la friperie de luxe : des griffes authentiques
              de seconde main, contrôlées pièce par pièce, disponibles en un seul exemplaire. De l'autre
              les créations neuves : robes et ensembles choisis pour les cérémonies, quand l'occasion
              demande du neuf.
            </p>
            <p>
              Il n'y a ni panier ni paiement en ligne, et c'est volontaire. Chaque commande commence par
              une conversation sur WhatsApp : la gérante vérifie la taille, confirme la disponibilité et
              annonce les frais de livraison avant que vous ne vous engagiez.
            </p>
          </div>
          <Link
            to="/catalogue"
            className="inline-block border border-charcoal/20 dark:border-offwhite/20 px-7 py-3 uppercase tracking-[0.1em] text-sm mt-10 hover:border-gold hover:text-gold-deep dark:hover:text-gold transition-colors"
          >
            Voir le catalogue
          </Link>
        </div>
      </section>

      <section className="bg-blush-soft dark:bg-charcoal-light py-24 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading eyebrow="Nos engagements" title="Ce sur quoi nous ne cédons pas" />
          <div className="mt-16 grid md:grid-cols-2 gap-x-14 gap-y-12">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="border-t border-charcoal/15 dark:border-offwhite/15 pt-8"
              >
                <p className="text-xs uppercase tracking-[0.1em] text-gold-deep dark:text-gold">0{i + 1}</p>
                <p className="font-display text-lg tracking-[0.05em] mt-4">{value.title}</p>
                <p className="mt-4 text-sm leading-[1.9] text-charcoal/70 dark:text-offwhite/70">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24 md:py-28">
        <SectionHeading eyebrow="Parcours" title="Six années, une même exigence" />
        <ol className="mt-16 space-y-10">
          {MILESTONES.map((m, i) => (
            <motion.li
              key={m.year}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex gap-8 border-b border-charcoal/10 dark:border-offwhite/10 pb-8"
            >
              <span className="font-display text-xl text-gold-deep dark:text-gold">{m.year}</span>
              <p className="flex-1 text-sm leading-[1.9] text-charcoal/70 dark:text-offwhite/70">{m.text}</p>
            </motion.li>
          ))}
        </ol>
      </section>
    </div>
  );
}