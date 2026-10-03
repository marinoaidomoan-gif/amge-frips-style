import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { FaTshirt, FaLayerGroup, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext.jsx';
import { getStats } from '../services/api.js';
import StatCard from './StatCard.jsx';

const COLORS = ['#D4AF37', '#F8E1E7'];

export default function DashboardOverview() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats(token).then(setStats).finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p>Chargement...</p>;
  if (!stats) return <p className="text-red-600 text-sm">Impossible de charger les statistiques.</p>;

  const pieData = [
    { name: 'Neuf', value: stats.categoryBreakdown.Neuf },
    { name: 'Friperie', value: stats.categoryBreakdown.Friperie },
  ];

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        <StatCard label="Produits au catalogue" value={stats.totalProducts} icon={FaTshirt} />
        <StatCard label="Répartition Neuf / Friperie" value={`${stats.categoryBreakdown.Neuf} / ${stats.categoryBreakdown.Friperie}`} icon={FaLayerGroup} />
        <StatCard label="Messages reçus" value={stats.totalMessages} icon={FaEnvelope} />
      </div>

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-5">
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
                {pieData.map((entry, i) => (
                  <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                ))}
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
    </div>
  );
}