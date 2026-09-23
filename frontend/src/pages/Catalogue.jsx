import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api.js';
import FilterButtons from '../components/FilterButtons.jsx';
import MasonryGrid from '../components/MasonryGrid.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(searchParams.get('category') || 'Tous');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts(active === 'Tous' ? undefined : active)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [active]);

  const handleChange = (value) => {
    setActive(value);
    setSearchParams(value === 'Tous' ? {} : { category: value });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="font-display italic text-3xl text-center mb-3">Notre catalogue</p>
      <p className="text-charcoal/60 dark:text-offwhite/60 text-center mb-10">
        Robes neuves et pépites de friperie, sélectionnées avec soin.
      </p>

      <FilterButtons active={active} onChange={handleChange} />

      {loading ? (
        <p className="text-center text-charcoal/60 dark:text-offwhite/60">Chargement...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-charcoal/60 dark:text-offwhite/60">
          Aucun produit dans cette catégorie pour le moment.
        </p>
      ) : (
        <MasonryGrid>
          {products.map((p, i) => (
            <ProductCard key={p._id} product={p} index={i} />
          ))}
        </MasonryGrid>
      )}
    </div>
  );
}