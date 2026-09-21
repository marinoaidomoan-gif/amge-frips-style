import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaTruck, FaWhatsapp, FaFacebookF, FaSnapchatGhost } from 'react-icons/fa';
import { getProducts } from '../services/api.js';
import MasonryGrid from '../components/MasonryGrid.jsx';
import ProductCard from '../components/ProductCard.jsx';

import { DELIVERY_ZONES, CONTACT } from '../lib/seo.js';

export default function Home() {
  return (
    <>
      <Hero />
      <DeliveryZones />
      <Categories />
      <NewArrivals />
      <BrandStory />
      <SocialCTA />
    </>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden -mt-20">
      <motion.div style={{ y }} className="absolute inset-0 bg-linear-to-br from-charcoal via-charcoal-light to-gold-deep/40">
        {/* TODO: remplacer par une vraie photo de la collection :
            <img src="/hero.jpg" alt="" className="w-full h-full object-cover" /> */}
      </motion.div>
      <div className="absolute inset-0 bg-charcoal/40" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display italic text-4xl md:text-6xl text-offwhite max-w-3xl leading-tight"
        >
          L'élégance à portée de main
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-offwhite/80 mt-4 text-lg"
        >
          Friperie de luxe & Créations neuves
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
          <Link to="/catalogue" className="inline-block mt-8 bg-gold text-charcoal px-7 py-3 rounded-full hover:bg-gold-deep transition-colors">
            Découvrir la collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function DeliveryZones() {
  return (
    <section className="py-16 px-6 bg-blush-soft dark:bg-charcoal-light">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-display text-2xl mb-2">Nous livrons dans toute l'Afrique de l'Ouest</p>
        <p className="text-charcoal/60 dark:text-offwhite/60 mb-10">Où que vous soyez, l'élégance vous parvient.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {DELIVERY_ZONES.map((zone) => (
            <div key={zone} className="flex flex-col items-center gap-3 bg-offwhite dark:bg-charcoal rounded-2xl py-6">
              <FaTruck className="text-gold" size={24} />
              <p className="text-sm">{zone}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
      <Link to="/catalogue?category=Neuf" className="relative h-72 rounded-2xl overflow-hidden bg-linear-to-br from-gold-deep to-gold flex items-end p-6 hover:opacity-90 transition-opacity">
        <p className="font-display italic text-2xl text-charcoal">Nos Robes Neuves</p>
      </Link>
      <Link to="/catalogue?category=Friperie" className="relative h-72 rounded-2xl overflow-hidden bg-linear-to-br from-blush-soft to-blush flex items-end p-6 hover:opacity-90 transition-opacity">
        <p className="font-display italic text-2xl text-charcoal">Nos pépites de Friperie</p>
      </Link>
    </section>
  );
}

function NewArrivals() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data.slice(0, 4)));
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <p className="font-display text-2xl text-center mb-10">Nouveautés</p>
      <MasonryGrid columns="columns-2 lg:columns-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </MasonryGrid>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-blush-soft dark:bg-charcoal-light order-2 md:order-1">
        {/* TODO: remplacer par une vraie photo de la collection :
            <img src="/collection.jpg" alt="" className="w-full h-full object-cover" /> */}
      </div>

      <div className="order-1 md:order-2">
        <p className="text-gold-deep dark:text-gold text-sm mb-3">La maison</p>
        <p className="font-display italic text-3xl md:text-4xl mb-6 leading-tight">
          Une sélection, pas un stock
        </p>
        <p className="text-charcoal/75 dark:text-offwhite/75 leading-relaxed mb-4">
          Depuis 2020, à Porto-Novo, chaque pièce est choisie à la main : la coupe, la matière,
          l'état. Rien n'entre au catalogue sans avoir été vérifié.
        </p>
        <p className="text-charcoal/75 dark:text-offwhite/75 leading-relaxed mb-8">
          Pas de vitrine anonyme : vous échangez directement avec la gérante, qui vous conseille
          sur la taille, la tenue et la livraison dans les quatre pays desservis.
        </p>
        <Link
          to="/a-propos"
          className="inline-block border border-gold text-gold-deep dark:text-gold px-6 py-2.5 rounded-full hover:bg-gold hover:text-charcoal transition-colors"
        >
          Notre histoire
        </Link>
      </div>
    </section>
  );
}

function SocialCTA() {
  return (
    <section className="relative py-24 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-charcoal via-charcoal-light to-charcoal">
        {/* TODO: remplacer par une vraie photo de la boutique/atelier :
            <img src="/boutique.jpg" alt="" className="w-full h-full object-cover" /> */}
      </div>
      <div className="absolute inset-0 bg-charcoal/60" />

      <div className="relative max-w-2xl mx-auto">
        <p className="text-gold text-sm mb-3">Rejoignez-nous</p>
        <p className="font-display italic text-3xl md:text-4xl text-offwhite mb-4 leading-tight">
          Les nouveautés arrivent d'abord sur nos réseaux
        </p>
        <div className="w-12 h-px bg-gold mx-auto mb-6" />
        <p className="text-offwhite/75 mb-10">
          Nouveautés, arrivages et tenues complètes sont publiés chaque semaine sur nos réseaux.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          
          <a  href={`https://wa.me/${CONTACT.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-charcoal px-6 py-3 rounded-full hover:bg-gold-deep transition-colors"
          >
            <FaWhatsapp /> WhatsApp
          </a>
          
          <a  href={CONTACT.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-offwhite/30 text-offwhite px-6 py-3 rounded-full hover:border-gold hover:text-gold transition-colors"
          >
            <FaFacebookF /> Facebook
          </a>
          
          <a  href={CONTACT.snapchatUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-offwhite/30 text-offwhite px-6 py-3 rounded-full hover:border-gold hover:text-gold transition-colors"
          >
            <FaSnapchatGhost /> Snapchat
          </a>
        </div>
      </div>
    </section>
  );
}