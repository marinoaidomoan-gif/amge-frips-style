import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaWhatsapp, FaFacebookF, FaSnapchatGhost, FaArrowRight } from 'react-icons/fa';
import { getProducts } from '../services/api.js';
import MasonryGrid from '../components/MasonryGrid.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { SITE, CONTACT, DELIVERY_ZONES } from '../lib/seo.js';
import { useSeo } from '../hooks/useSeo.js';

export default function Home() {
  useSeo({
    title: `${SITE.name} — Friperie de luxe & vêtements neufs à Porto-Novo`,
    description: SITE.description,
  });

  return (
    <>
      <Hero />
      <DeliveryBar />
      <Categories />
      <LatestProducts />
      <Story />
      <SocialBanner />
    </>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 150]);
  const fade = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <section className="relative h-screen overflow-hidden -mt-20">
      <motion.div style={{ y }} className="absolute inset-0 -top-24 h-[calc(100%+6rem)] bg-linear-to-br from-charcoal via-charcoal-light to-gold-deep/40">
        {/* TODO: vraie photo — <img src="/images/hero.jpg" alt="" className="w-full h-full object-cover" /> */}
        <div className="absolute inset-0 bg-charcoal/45" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }} className="text-xs uppercase tracking-[0.2em] text-offwhite/80">
          Porto-Novo · Bénin · Depuis 2020
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display uppercase tracking-[0.05em] mt-8 text-4xl sm:text-5xl lg:text-6xl text-offwhite max-w-3xl"
        >
          L'élégance à portée de main
        </motion.h1>

        <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 0.8 }} className="w-24 h-px bg-gold mt-9 origin-center" />

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7 }} className="mt-9 max-w-md text-sm leading-[1.95] font-light text-offwhite/75">
          La friperie de luxe et les créations neuves, choisies une à une pour la femme qui préfère l'élégance au superflu.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9 }} className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link to="/catalogue" className="bg-gold text-charcoal px-8 py-4 uppercase tracking-[0.1em] text-sm text-center hover:bg-gold-deep transition-colors">
            Découvrir le catalogue
          </Link>
          
          <a  href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(`Bonjour ${SITE.name} ! Je souhaite des renseignements sur vos pièces.`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-offwhite uppercase tracking-[0.1em] text-sm border border-offwhite/50 hover:bg-offwhite/10 transition-colors"
          >
            <FaWhatsapp /> Commander
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.span animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 2.6, repeat: Infinity }} className="text-xs uppercase tracking-[0.2em] text-offwhite/70">
          Défiler
        </motion.span>
      </div>
    </section>
  );
}

function DeliveryBar() {
  return (
    <section className="border-y border-charcoal/10 dark:border-offwhite/10 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-deep dark:text-gold">Livraison</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {DELIVERY_ZONES.map((zone) => (
            <li key={zone} className="text-xs uppercase tracking-[0.1em] text-charcoal/60 dark:text-offwhite/60">{zone}</li>
          ))}
        </ul>
        <p className="text-xs text-charcoal/50 dark:text-offwhite/50">Commande &amp; paiement via WhatsApp</p>
      </div>
    </section>
  );
}

const categories = [
  { title: 'Pièces neuves', text: 'Robes et ensembles neufs, sélectionnés pour les grandes occasions.', to: '/catalogue?category=Neuf' },
  { title: 'Friperie de luxe', text: 'Griffes authentiques de seconde main, en parfait état, en pièce unique.', to: '/catalogue?category=Friperie' },
];

function Categories() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 md:py-28">
      <SectionHeading
        eyebrow="Nos univers"
        title="Deux façons de s'habiller bien"
        description="Le neuf pour marquer l'événement, la friperie pour la pièce que personne d'autre ne portera."
      />
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={i === 1 ? 'md:mt-14' : ''}
          >
            <Link to={cat.to} className="group block">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-linear-to-br from-charcoal via-charcoal-light to-gold-deep/30">
                {/* TODO: vraie photo */}
                <div className="absolute inset-0 bg-charcoal/25 group-hover:bg-charcoal/40 transition-colors duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="font-display uppercase tracking-[0.04em] text-xl md:text-2xl text-offwhite">{cat.title}</p>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-offwhite/75">{cat.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-offwhite">
                    Voir les pièces <FaArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function LatestProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => setProducts(data.slice(0, 4))).finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-blush-soft dark:bg-charcoal-light py-24 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Nouveautés"
          title="Dernières arrivées"
          description="Le catalogue est renouvelé chaque semaine. Une pièce vous plaît ? Elle part sur WhatsApp."
        />

        <div className="mt-16">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[0, 1, 2, 3].map((slot) => (
                <div key={slot} className="aspect-[3/4] w-full animate-pulse bg-charcoal/10 dark:bg-offwhite/10" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <MasonryGrid columns="columns-2 lg:columns-4">
              {products.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </MasonryGrid>
          ) : (
            <p className="text-center text-sm text-charcoal/60 dark:text-offwhite/60">
              Les nouvelles pièces arrivent très bientôt.
            </p>
          )}
        </div>

        <div className="mt-16 flex justify-center">
          <Link to="/catalogue" className="border border-charcoal/20 dark:border-offwhite/20 px-7 py-3 uppercase tracking-[0.1em] text-sm hover:border-gold hover:text-gold-deep dark:hover:text-gold transition-colors">
            Tout le catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 md:py-28 grid md:grid-cols-2 gap-14 items-center">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/5] w-full overflow-hidden bg-blush-soft dark:bg-charcoal-light shadow-soft"
      >
        {/* TODO: vraie photo de la gérante */}
      </motion.div>

      <div>
        <SectionHeading
          eyebrow="La maison"
          title="Une sélection, pas un stock"
          align="left"
          description="Depuis 2020, à Porto-Novo, chaque pièce est choisie à la main : la coupe, la matière, l'état. Rien n'entre au catalogue sans avoir été vérifié."
        />
        <p className="mt-8 text-sm leading-[1.95] text-charcoal/70 dark:text-offwhite/70">
          Pas de vitrine anonyme : vous échangez directement avec la gérante, qui vous conseille sur la taille, la tenue et la livraison dans les quatre pays desservis.
        </p>
        <Link to="/a-propos" className="inline-block border border-charcoal/20 dark:border-offwhite/20 px-7 py-3 uppercase tracking-[0.1em] text-sm mt-10 hover:border-gold hover:text-gold-deep dark:hover:text-gold transition-colors">
          Notre histoire
        </Link>
      </div>
    </section>
  );
}

function SocialBanner() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-linear-to-br from-charcoal via-charcoal-light to-charcoal">
        {/* TODO: vraie photo boutique/atelier */}
      </div>
      <div className="absolute inset-0 bg-charcoal/70" />
      <div className="relative max-w-3xl mx-auto px-6 flex flex-col items-center text-center">
        <SectionHeading
          eyebrow="Rejoignez-nous"
          title="Les pièces partent d'abord en ligne"
          tone="light"
          description="Nouveautés, arrivages et tenues complètes sont publiés chaque semaine sur nos réseaux."
        />
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(`Bonjour ${SITE.name} !`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-gold text-charcoal px-7 py-3.5 uppercase tracking-[0.1em] text-sm shadow-gold hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300">
            <FaWhatsapp /> WhatsApp
          </a>
          <a href={CONTACT.facebookUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 text-offwhite uppercase tracking-[0.1em] text-sm border border-offwhite/45 hover:bg-offwhite/10 transition-colors">
            <FaFacebookF size={14} /> Facebook
          </a>
          <a href={CONTACT.snapchatUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 text-offwhite uppercase tracking-[0.1em] text-sm border border-offwhite/45 hover:bg-offwhite/10 transition-colors">
            <FaSnapchatGhost size={14} /> Snapchat
          </a>
        </div>
      </div>
    </section>
  );
}