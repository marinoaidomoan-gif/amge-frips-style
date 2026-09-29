import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import MasonryGrid from '../components/MasonryGrid.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { getProducts } from '../services/api.js';
import { SITE } from '../lib/seo.js';
import { whatsappLink } from '../utils/whatsapp.js';
import { useSeo } from '../hooks/useSeo.js';

const filters = ['Tous', 'Neuf', 'Friperie'];

export default function Catalogue() {
  useSeo({
    title: `Catalogue — ${SITE.name}`,
    description: 'Robes, ensembles et pièces de friperie de luxe disponibles. Chaque pièce est unique : commandez directement sur WhatsApp.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const initial = useMemo(() => {
    const value = searchParams.get('category');
    return value === 'Neuf' || value === 'Friperie' ? value : 'Tous';
  }, [searchParams]);

  const [active, setActive] = useState(initial);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts(active === 'Tous' ? undefined : active).then(setProducts).finally(() => setLoading(false));
  }, [active]);

  const handleChange = (value) => {
    setActive(value);
    setSearchParams(value === 'Tous' ? {} : { category: value });
  };

  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-10 text-center">
        <SectionHeading
          eyebrow={`${SITE.city} · Pièces uniques`}
          title="Le catalogue"
          description="Une pièce, un exemplaire. Ce qui est affiché est disponible ; ce qui est vendu disparaît du catalogue."
        />
      </section>

      <div className="sticky top-[72px] z-30 border-y border-charcoal/10 dark:border-offwhite/10 bg-offwhite/95 dark:bg-charcoal/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-8 px-6 py-5">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleChange(item)}
              className={`relative pb-1 text-xs uppercase tracking-[0.1em] transition-colors duration-300 ${
                active === item ? 'text-gold-deep dark:text-gold' : 'text-charcoal/50 dark:text-offwhite/50 hover:text-charcoal dark:hover:text-offwhite'
              }`}
            >
              {item}
              {active === item && (
                <motion.span layoutId="catalogue-filter" className="absolute -bottom-px left-0 h-px w-full bg-gold" />
              )}
            </button>
          ))}
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((slot) => (
              <div key={slot} className="aspect-[3/4] w-full animate-pulse bg-charcoal/10 dark:bg-offwhite/10" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <MasonryGrid columns={3}>
            {products.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} />
            ))}
          </MasonryGrid>
        ) : (
          <div className="flex flex-col items-center py-24 text-center">
            <p className="font-display uppercase tracking-[0.04em] text-xl">Aucune pièce dans cette sélection</p>
            <span className="w-14 h-px bg-gold mt-7" />
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-charcoal/60 dark:text-offwhite/60">
              Le catalogue est renouvelé chaque semaine. Écrivez-nous pour être prévenue des prochains arrivages.
            </p>
            
            <a  href={whatsappLink(`Bonjour ${SITE.name} ! Prévenez-moi des prochains arrivages.`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-charcoal px-7 py-3 uppercase tracking-[0.1em] text-sm mt-10 hover:bg-gold-deep transition-colors"
            >
              Être prévenue
            </a>
          </div>
        )}
      </section>
    </div>
  );
}