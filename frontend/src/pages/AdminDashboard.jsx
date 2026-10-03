import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getProducts, createProduct, updateProduct, deleteProduct, ASSET_URL } from '../services/api.js';
import ProductForm from '../components/ProductForm.jsx';
import MessagesList from '../components/MessagesList.jsx';
import AdminSidebar from '../components/AdminSidebar.jsx';
import DashboardOverview from '../components/DashboardOverview.jsx';
import DeleteButton from '../components/DeleteButton.jsx';

const titles = { dashboard: 'Tableau de bord', products: 'Produits', messages: 'Messages' };

export default function AdminDashboard() {
  const { token, logout } = useAuth();
  const [view, setView] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    try { setProducts(await getProducts()); } catch { setError('Impossible de charger les produits.'); } finally { setLoading(false); }
  };

  useEffect(() => { if (view === 'products') loadProducts(); }, [view]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError('');
    try {
      if (editing === 'new') await createProduct(formData, token);
      else await updateProduct(editing._id, formData, token);
      setEditing(null);
      await loadProducts();
    } catch (err) { setError(err.message); } finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    try { await deleteProduct(id, token); await loadProducts(); } catch { setError('Suppression impossible.'); }
  };

  return (
    <div className="flex">
      <AdminSidebar active={view} onChange={setView} onLogout={logout} />

      <main className="flex-1 px-8 py-8 bg-blush-soft/40 dark:bg-charcoal min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <p className="font-display uppercase tracking-[0.04em] text-xl">{titles[view]}</p>
          {view === 'products' && (
            <button onClick={() => setEditing('new')} className="bg-gold text-charcoal px-4 py-2 text-xs uppercase tracking-[0.1em] hover:bg-gold-deep transition-colors">
              + Ajouter un produit
            </button>
          )}
        </div>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        {view === 'dashboard' && <DashboardOverview />}
        {view === 'messages' && <MessagesList />}

        {view === 'products' && (
          <>
            {editing && (
              <div className="mb-10 p-6 border border-charcoal/10 dark:border-offwhite/10 bg-offwhite dark:bg-charcoal-light">
                <p className="font-display text-lg mb-4">{editing === 'new' ? 'Nouveau produit' : `Modifier : ${editing.name}`}</p>
                <ProductForm initialData={editing === 'new' ? null : editing} onSubmit={handleSubmit} onCancel={() => setEditing(null)} submitting={submitting} />
              </div>
            )}

            {loading ? (
              <p>Chargement...</p>
            ) : products.length === 0 ? (
              <p className="text-charcoal/60 dark:text-offwhite/60">Aucun produit pour le moment.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((p) => (
                  <div key={p._id} className="border border-charcoal/10 dark:border-offwhite/10 bg-offwhite dark:bg-charcoal-light">
                    {p.imageUrl && <img src={`${ASSET_URL}${p.imageUrl}`} alt={p.name} className="w-full h-48 object-cover" />}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium">{p.name}</p>
                        <span className={`text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 ${p.category === 'Neuf' ? 'bg-gold/20 text-gold-deep' : 'bg-blush text-charcoal'}`}>
                          {p.category}
                        </span>
                      </div>
                      <p className="text-sm text-charcoal/60 dark:text-offwhite/60 mb-3">{p.price} FCFA</p>
                      <div className="flex items-center justify-between">
                        <button onClick={() => setEditing(p)} className="text-xs uppercase tracking-[0.1em] py-2 px-3 border border-charcoal/15 dark:border-offwhite/20 hover:border-gold transition-colors">Modifier</button>
                        <DeleteButton onConfirm={() => handleDelete(p._id)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}