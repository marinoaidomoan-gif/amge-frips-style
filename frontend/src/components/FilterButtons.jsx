const options = ['Tous', 'Neuf', 'Friperie'];

export default function FilterButtons({ active, onChange }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-5 py-2 rounded-full text-sm transition-colors ${
            active === opt
              ? 'bg-gold text-charcoal'
              : 'border border-charcoal/15 dark:border-offwhite/20 hover:border-gold'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}