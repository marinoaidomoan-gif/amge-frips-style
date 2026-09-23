import { useState } from 'react';

export default function DeleteButton({ onConfirm, label = 'Supprimer' }) {
  const [armed, setArmed] = useState(false);

  if (armed) {
    return (
      <span className="flex items-center gap-3 text-xs uppercase tracking-[0.1em]">
        <button type="button" onClick={onConfirm} className="text-red-600 underline">Confirmer</button>
        <button type="button" onClick={() => setArmed(false)} className="text-charcoal/50 dark:text-offwhite/50">Non</button>
      </span>
    );
  }

  return (
    <button type="button" onClick={() => setArmed(true)} className="text-xs uppercase tracking-[0.1em] text-red-600 hover:underline">
      {label}
    </button>
  );
}