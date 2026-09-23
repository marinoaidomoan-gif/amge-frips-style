import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { ASSET_URL } from '../services/api.js';
import { getWhatsAppLink } from '../utils/whatsapp.js';

const ratios = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-[2/3]', 'aspect-[5/7]'];

export default function ProductCard({ product, index = 0 }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 8) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate(`/produit/${product._id}`)}
      className="group relative block break-inside-avoid mb-5 overflow-hidden cursor-pointer shadow-soft hover:shadow-lift transition-shadow duration-300"
    >
      <div className={`relative w-full overflow-hidden bg-blush-soft dark:bg-charcoal-light ${ratios[index % ratios.length]}`}>
        {product.imageUrl && (
          <img
            src={`${ASSET_URL}${product.imageUrl}`}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        <span className={`absolute top-3 left-3 text-[10px] uppercase tracking-[0.1em] px-2.5 py-1 ${product.category === 'Neuf' ? 'bg-gold text-charcoal' : 'bg-blush text-charcoal'}`}>
          {product.category}
        </span>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gold/75 text-center px-4">
          <p className="font-display uppercase tracking-[0.1em] text-white text-lg">{product.name}</p>
          <p className="text-xs uppercase tracking-[0.1em] text-white">{product.price} FCFA</p>
          <span className="text-xs uppercase tracking-[0.1em] text-white border-b border-white/70 pb-1 mt-1">Voir le produit</span>
        </div>
      </div>

      
       <a href={getWhatsAppLink(product)}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        aria-label={`Commander ${product.name} sur WhatsApp`}
        className="absolute top-3 right-3 z-10 w-9 h-9 bg-offwhite/90 flex items-center justify-center text-charcoal hover:bg-green-500 hover:text-white transition-colors"
      >
        <FaWhatsapp size={16} />
      </a>
    </motion.div>
  );
}