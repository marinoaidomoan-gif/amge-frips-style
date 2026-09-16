import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { ASSET_URL } from '../services/api.js';
import { getWhatsAppLink } from '../utils/whatsapp.js';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/produit/${product._id}`)}
      className="group relative block break-inside-avoid mb-5 rounded-2xl overflow-hidden cursor-pointer"
    >
      {product.imageUrl ? (
        <img
          src={`${ASSET_URL}${product.imageUrl}`}
          alt={product.name}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full aspect-[3/4] bg-blush-soft dark:bg-charcoal-light" />
      )}

      <span
        className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full ${
          product.category === 'Neuf' ? 'bg-gold text-charcoal' : 'bg-blush text-charcoal'
        }`}
      >
        {product.category}
      </span>

      
      <a  href={getWhatsAppLink(product)}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Commander sur WhatsApp"
        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-offwhite/90 flex items-center justify-center text-green-600 hover:bg-offwhite transition-colors"
      >
        <FaWhatsapp size={16} />
      </a>

      <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/70 transition-colors duration-300 flex items-end opacity-0 group-hover:opacity-100 pointer-events-none">
        <div className="p-4 text-white">
          <p className="font-display text-lg">{product.name}</p>
          <p className="text-sm">{product.price} FCFA</p>
        </div>
      </div>
    </div>
  );
}