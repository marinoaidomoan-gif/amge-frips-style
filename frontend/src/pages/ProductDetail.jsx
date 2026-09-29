import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaWhatsapp, FaChevronLeft } from 'react-icons/fa';
import { getProductById, getProducts, ASSET_URL } from '../services/api.js';
import { formatPrice } from '../lib/format.js';
import { SITE, DELIVERY_ZONES } from '../lib/seo.js';
import { getWhatsAppLink } from '../utils/whatsapp.js';
import { useSeo } from '../hooks/useSeo.js';
import MasonryGrid from '../components/MasonryGrid.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useSeo({
    title: product ? `${product.name} — ${SITE.name}` : `Produit — ${SITE.name}`,
    description: product
      ? `${product.name} — ${formatPrice(product.price)}. ${product.description || `Pièce unique disponible chez ${SITE.name}, Porto-Novo.`}`
      : undefined,
  });

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    getProductById(id)
      .then((data) => (data ? setProduct(data) : setNotFound(true)))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
    getProducts().then(setOthers);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div className="aspect-[3/4] w-full animate-pulse bg-charcoal/10 dark:bg-offwhite/10" />
        <div className="space-y-5">
          <div className="h-7 w-2/3 animate-pulse bg-charcoal/10 dark:bg-offwhite/10" />
          <div className="h-4 w-1/3 animate-pulse bg-charcoal/10 dark:bg-offwhite/10" />
          <div className="h-24 w-full animate-pulse bg-charcoal/10 dark:bg-offwhite/10" />
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="font-display uppercase tracking-[0.04em] text-xl">Pièce introuvable</p>
        <span className="w-14 h-px bg-gold mt-7" />
        <p className="mt-7 max-w-sm text-sm text-charcoal/60 dark:text-offwhite/60">
          Cette pièce n'est plus en ligne — elle a probablement trouvé sa propriétaire.
        </p>
        <Link to="/catalogue" className="inline-flex items-center gap-2 bg-gold text-charcoal px-7 py-3 uppercase tracking-[0.1em] text-sm mt-10 hover:bg-gold-deep transition-colors">
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const suggestions = others.filter((item) => item._id !== product._id).slice(0, 3);
  const details = [
    { label: 'Catégorie', value: product.category },
    { label: 'Taille', value: product.size },
    { label: 'Couleur', value: product.color },
  ].filter((row) => Boolean(row.value));

  return (
    <div>
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link to="/catalogue" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-charcoal/60 dark:text-offwhite/60 hover:text-gold-deep dark:hover:text-gold transition-colors">
          <FaChevronLeft size={12} /> Catalogue
        </Link>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-14 md:gap-16">
        <div className="aspect-[3/4] w-full overflow-hidden bg-blush-soft dark:bg-charcoal-light shadow-soft">
          {product.imageUrl && (
            <img src={`${ASSET_URL}${product.imageUrl}`} alt={product.name} className="w-full h-full object-cover" />
          )}
        </div>

        <div className="md:pt-6">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-deep dark:text-gold">
            {product.category === 'Neuf' ? 'Pièce neuve' : 'Friperie de luxe'}
          </p>
          <p className="font-display uppercase tracking-[0.04em] text-2xl md:text-3xl mt-6">{product.name}</p>
          <span className="w-14 h-px bg-gold mt-7 block" />
          <p className="font-display text-2xl text-gold-deep dark:text-gold mt-7">{formatPrice(product.price)}</p>

          {product.description && (
            <p className="mt-8 text-sm leading-[1.95] text-charcoal/70 dark:text-offwhite/70">{product.description}</p>
          )}

          {details.length > 0 && (
            <dl className="mt-10 divide-y divide-charcoal/10 dark:divide-offwhite/10 border-y border-charcoal/10 dark:border-offwhite/10">
              {details.map((row) => (
                <div key={row.label} className="flex items-center justify-between py-4">
                  <dt className="text-xs uppercase tracking-[0.1em] text-charcoal/50 dark:text-offwhite/50">{row.label}</dt>
                  <dd className="text-sm">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}

          
          <a  href={getWhatsAppLink(product)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-gold text-charcoal py-4 uppercase tracking-[0.1em] text-sm mt-10 hover:bg-gold-deep transition-colors"
          >
            <FaWhatsapp /> Commander sur WhatsApp
          </a>

          <p className="mt-6 text-xs leading-relaxed tracking-wider text-charcoal/50 dark:text-offwhite/50">
            Paiement et livraison convenus directement avec la gérante. Livraison : {DELIVERY_ZONES.join(', ')}.
          </p>
        </div>
      </section>

      {suggestions.length > 0 && (
        <section className="border-t border-charcoal/10 dark:border-offwhite/10 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-deep dark:text-gold mb-10">Vous aimerez aussi</p>
            <MasonryGrid columns={3}>
              {suggestions.map((item, i) => (
                <ProductCard key={item._id} product={item} index={i} />
              ))}
            </MasonryGrid>
          </div>
        </section>
      )}
    </div>
  );
}