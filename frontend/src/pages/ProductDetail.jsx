import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import { getProductById, ASSET_URL } from '../services/api.js';
import { getWhatsAppLink } from '../utils/whatsapp.js';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    getProductById(id)
      .then((data) => {
        if (!data) setNotFound(true);
        else setProduct(data);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center py-24 text-charcoal/60 dark:text-offwhite/60">Chargement...</p>;
  }

  if (notFound || !product) {
    return (
      <div className="text-center py-24">
        <p className="mb-4">Produit introuvable.</p>
        <Link to="/catalogue" className="text-gold-deep dark:text-gold underline">
          Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <Link
        to="/catalogue"
        className="inline-flex items-center gap-2 text-sm text-charcoal/60 dark:text-offwhite/60 hover:text-gold-deep dark:hover:text-gold mb-8 transition-colors"
      >
        <FaArrowLeft size={12} /> Retour au catalogue
      </Link>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="rounded-2xl overflow-hidden bg-blush-soft dark:bg-charcoal-light">
          {product.imageUrl ? (
            <img
              src={`${ASSET_URL}${product.imageUrl}`}
              alt={product.name}
              className="w-full aspect-[3/4] object-cover"
            />
          ) : (
            <div className="w-full aspect-[3/4]" />
          )}
        </div>

        <div>
          <span
            className={`inline-block text-xs px-2.5 py-1 rounded-full mb-4 ${
              product.category === 'Neuf' ? 'bg-gold text-charcoal' : 'bg-blush text-charcoal'
            }`}
          >
            {product.category}
          </span>

          <h1 className="font-display italic text-3xl mb-2">{product.name}</h1>
          <p className="text-2xl text-gold-deep dark:text-gold mb-6">{product.price} FCFA</p>

          <div className="flex gap-6 mb-6 text-sm">
            {product.size && (
              <div>
                <p className="text-charcoal/50 dark:text-offwhite/50 mb-1">Taille</p>
                <p>{product.size}</p>
              </div>
            )}
            {product.color && (
              <div>
                <p className="text-charcoal/50 dark:text-offwhite/50 mb-1">Couleur</p>
                <p>{product.color}</p>
              </div>
            )}
          </div>

          {product.description && (
            <p className="text-charcoal/75 dark:text-offwhite/75 leading-relaxed mb-8">
              {product.description}
            </p>
          )}

          
          <a  href={getWhatsAppLink(product)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-charcoal px-6 py-3 rounded-full hover:bg-gold-deep transition-colors"
          >
            <FaWhatsapp /> Acheter sur WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}