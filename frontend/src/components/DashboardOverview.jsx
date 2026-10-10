import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { FaTshirt, FaLayerGroup, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext.jsx';
import { getStats, getMe, ASSET_URL } from '../services/api.js';
import StatCard from './StatCard.jsx';

const COLORS = ['#D4AF37', '#F8E1E7'];

export default function DashboardOverview({ onNavigate }) {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats(token).then(setStats).finally(() => setLoading(false));
    getMe(token).then((data) => setUsername(data.username)).catch(() => {});
  }, [token]);

  if (loading) return <p>Chargement...</p>;
  if (!stats) return <p className="text-red-600 text-sm">Impossible de charger les statistiques.</p>;

  const pieData = [
    { name: 'Neuf', value: stats.categoryBreakdown.Neuf },
    { name: 'Friperie', value: stats.categoryBreakdown.Friperie },
  ];

  return (
    <div>
      <WelcomeBanner username={username} totalMessages={stats.totalMessages} onNavigate={onNavigate} />

      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        <StatCard label="Produits au catalogue" value={stats.totalProducts} icon={FaTshirt} />
        <StatCard label="Répartition Neuf / Friperie" value={`${stats.categoryBreakdown.Neuf} / ${stats.categoryBreakdown.Friperie}`} icon={FaLayerGroup} />
        <StatCard label="Messages reçus" value={stats.totalMessages} icon={FaEnvelope} />
      </div>

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-5 mb-5">
        <div className="bg-offwhite dark:bg-charcoal-light border border-charcoal/10 dark:border-offwhite/10 p-6">
          <p className="text-xs uppercase tracking-[0.1em] text-charcoal/50 dark:text-offwhite/50 mb-6">
            Produits ajoutés (8 dernières semaines)
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stats.productsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#00000015" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#D4AF37" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-offwhite dark:bg-charcoal-light border border-charcoal/10 dark:border-offwhite/10 p-6">
          <p className="text-xs uppercase tracking-[0.1em] text-charcoal/50 dark:text-offwhite/50 mb-6">Répartition du catalogue</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {pieData.map((entry, i) => <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs uppercase tracking-[0.1em]">
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 inline-block" style={{ background: COLORS[0] }} /> Neuf</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 inline-block" style={{ background: COLORS[1] }} /> Friperie</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <RecentProducts products={stats.recentProducts} />
        <RecentMessages messages={stats.recentMessages} />
      </div>
    </div>
  );
}

function WelcomeBanner({ username, totalMessages, onNavigate }) {
  return (
    <div className="relative overflow-hidden bg-linear-to-br from-charcoal via-charcoal-light to-gold-deep/40 text-offwhite p-8 mb-8">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(var(--color-gold) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      />
      <div className="relative">
        <p className="font-display text-2xl mb-2">Bonjour{username ? `, ${username}` : ''} !</p>
        <p className="text-offwhite/75 text-sm max-w-md mb-6">
          {totalMessages > 0
            ? `Vous avez ${totalMessages} message${totalMessages > 1 ? 's' : ''} à consulter au total.`
            : 'Aucun message en attente pour le moment.'}
        </p>
        <div className="flex gap-3">
          <button onClick={() => onNavigate?.('products')} className="bg-gold text-charcoal px-5 py-2.5 uppercase tracking-[0.1em] text-xs hover:bg-gold-deep transition-colors">
            + Ajouter un produit
          </button>
          <button onClick={() => onNavigate?.('messages')} className="border border-offwhite/30 text-offwhite px-5 py-2.5 uppercase tracking-[0.1em] text-xs hover:bg-offwhite/10 transition-colors">
            Voir les messages
          </button>
        </div>
      </div>
    </div>
  );
}

function RecentProducts({ products = [] }) {
  return (
    <div className="bg-offwhite dark:bg-charcoal-light border border-charcoal/10 dark:border-offwhite/10 p-6">
      <p className="text-xs uppercase tracking-[0.1em] text-charcoal/50 dark:text-offwhite/50 mb-5">Derniers produits</p>
      {products.length === 0 ? (
        <p className="text-sm text-charcoal/50 dark:text-offwhite/50">Aucun produit pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {products.map((p) => (
            <div key={p._id} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blush-soft dark:bg-charcoal shrink-0 overflow-hidden">
                {p.imageUrl && <img src={`${ASSET_URL}${p.imageUrl}`} alt={p.name} className="w-full h-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm truncate">{p.name}</p>
                <p className="text-xs text-charcoal/50 dark:text-offwhite/50">{p.price} FCFA</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RecentMessages({ messages = [] }) {
  return (
    <div className="bg-offwhite dark:bg-charcoal-light border border-charcoal/10 dark:border-offwhite/10 p-6">
      <p className="text-xs uppercase tracking-[0.1em] text-charcoal/50 dark:text-offwhite/50 mb-5">Derniers messages</p>
      {messages.length === 0 ? (
        <p className="text-sm text-charcoal/50 dark:text-offwhite/50">Aucun message pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m._id}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{m.name}</p>
                <p className="text-xs text-charcoal/40 dark:text-offwhite/40">
                  {new Date(m.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                </p>
              </div>
              <p className="text-xs text-charcoal/60 dark:text-offwhite/60 truncate">{m.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}