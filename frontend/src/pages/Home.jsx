import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaTruck } from 'react-icons/fa';
import { getProducts } from '../services/api.js';
import MasonryGrid from '../components/MasonryGrid.jsx';
import ProductCard from '../components/ProductCard.jsx';

const zones = ['Bénin', 'Burkina Faso', 'Niger', 'Togo'];

export default function Home() {
  return (
    <>
      <Hero />
      <DeliveryZones />
      <Categories />
      <NewArrivals />
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
          {zones.map((zone) => (
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