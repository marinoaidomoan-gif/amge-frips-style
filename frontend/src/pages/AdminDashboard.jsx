import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getProducts, createProduct, updateProduct, deleteProduct, ASSET_URL } from '../services/api.js';
import ProductForm from '../components/ProductForm.jsx';

export default function AdminDashboard() {
  const { token, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | 'new' | produit
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    try {
      setProducts(await getProducts());
    } catch {
      setError('Impossible de charger les produits.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError('');
    try {
      if (editing === 'new') {
        await createProduct(formData, token);
      } else {
        await updateProduct(editing._id, formData, token);
      }
      setEditing(null);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce produit ?')) return;
    try {
      await deleteProduct(id, token);
      await loadProducts();
    } catch {
      setError('Suppression impossible.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display italic text-2xl">Dashboard admin</h1>
        <div className="flex gap-3">
          <button onClick={() => setEditing('new')} className="bg-gold text-charcoal px-4 py-2 rounded-lg text-sm hover:bg-gold-deep transition-colors">
            + Ajouter un produit
          </button>
          <button onClick={logout} className="px-4 py-2 rounded-lg text-sm border border-charcoal/15 dark:border-offwhite/20 hover:border-gold transition-colors">
            Déconnexion
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {editing && (
        <div className="mb-10 p-6 border border-charcoal/10 dark:border-offwhite/10 rounded-2xl">
          <h2 className="font-display text-lg mb-4">
            {editing === 'new' ? 'Nouveau produit' : `Modifier : ${editing.name}`}
          </h2>
          <ProductForm
            initialData={editing === 'new' ? null : editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
            submitting={submitting}
          />
        </div>
      )}

      {loading ? (
        <p>Chargement...</p>
      ) : products.length === 0 ? (
        <p className="text-charcoal/60 dark:text-offwhite/60">Aucun produit pour le moment.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p) => (
            <div key={p._id} className="border border-charcoal/10 dark:border-offwhite/10 rounded-2xl overflow-hidden">
              {p.imageUrl && <img src={`${ASSET_URL}${p.imageUrl}`} alt={p.name} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">{p.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.category === 'Neuf' ? 'bg-gold/20 text-gold-deep' : 'bg-blush text-charcoal'}`}>
                    {p.category}
                  </span>
                </div>
                <p className="text-sm text-charcoal/60 dark:text-offwhite/60 mb-3">{p.price} FCFA</p>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(p)} className="flex-1 text-sm py-1.5 rounded-lg border border-charcoal/15 dark:border-offwhite/20 hover:border-gold transition-colors">
                    Modifier
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="flex-1 text-sm py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}