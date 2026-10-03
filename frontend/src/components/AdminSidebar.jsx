import { FaChartBar, FaTshirt, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const items = [
  { key: 'dashboard', label: 'Tableau de bord', icon: FaChartBar },
  { key: 'products', label: 'Produits', icon: FaTshirt },
  { key: 'messages', label: 'Messages', icon: FaEnvelope },
];

export default function AdminSidebar({ active, onChange, onLogout }) {
  return (
    <aside className="w-60 shrink-0 bg-charcoal text-offwhite min-h-screen flex flex-col">
      <div className="px-6 py-7 border-b border-offwhite/10">
        <p className="font-display uppercase tracking-[0.1em] text-sm">
          AMGE <span className="text-gold">Frips&amp;Style</span>
        </p>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {items.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.1em] transition-colors ${
              active === key ? 'bg-gold text-charcoal' : 'text-offwhite/65 hover:bg-offwhite/5 hover:text-offwhite'
            }`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </nav>

      <div className="px-3 py-6 border-t border-offwhite/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.1em] text-offwhite/65 hover:bg-offwhite/5 hover:text-offwhite transition-colors"
        >
          <FaSignOutAlt size={14} /> Déconnexion
        </button>
      </div>
    </aside>
  );
}