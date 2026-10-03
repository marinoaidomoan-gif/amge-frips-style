export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="bg-offwhite dark:bg-charcoal-light border border-charcoal/10 dark:border-offwhite/10 p-6 flex items-center gap-4">
      {Icon && (
        <div className="w-11 h-11 bg-gold/15 flex items-center justify-center shrink-0">
          <Icon className="text-gold-deep dark:text-gold" size={18} />
        </div>
      )}
      <div>
        <p className="text-2xl font-display">{value}</p>
        <p className="text-xs uppercase tracking-[0.1em] text-charcoal/50 dark:text-offwhite/50 mt-1">{label}</p>
      </div>
    </div>
  );
}