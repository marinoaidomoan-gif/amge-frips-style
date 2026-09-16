import { useState } from 'react';
import { ASSET_URL } from '../services/api.js';

const empty = { name: '', price: '', category: 'Neuf', size: '', color: '', description: '' };

export default function ProductForm({ initialData, onSubmit, onCancel, submitting }) {
  const [fields, setFields] = useState(initialData ? { ...empty, ...initialData } : empty);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initialData?.imageUrl ? `${ASSET_URL}${initialData.imageUrl}` : null);

  const handleChange = (e) => setFields({ ...fields, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
    if (file) formData.append('image', file);
    onSubmit(formData);
  };

  const inputClass =
    'w-full px-3 py-2 rounded-lg border border-charcoal/15 dark:border-offwhite/20 bg-transparent focus:outline-none focus:border-gold';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1.5">Nom</label>
        <input name="name" value={fields.name} onChange={handleChange} required className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1.5">Prix (FCFA)</label>
          <input name="price" type="number" value={fields.price} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm mb-1.5">Catégorie</label>
          <select name="category" value={fields.category} onChange={handleChange} className={inputClass}>
            <option value="Neuf">Neuf</option>
            <option value="Friperie">Friperie</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1.5">Taille</label>
          <input name="size" value={fields.size} onChange={handleChange} placeholder="S, M, L, XL" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm mb-1.5">Couleur</label>
          <input name="color" value={fields.color} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1.5">Description</label>
        <textarea name="description" value={fields.description} onChange={handleChange} rows={3} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm mb-1.5">Photo</label>
        {preview && (
          <img src={preview} alt="Aperçu" className="w-32 h-32 object-cover rounded-lg mb-2 border border-charcoal/10 dark:border-offwhite/10" />
        )}
        <input type="file" accept="image/jpeg,image/png" onChange={handleFile} className="text-sm" />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-gold text-charcoal py-2.5 rounded-lg hover:bg-gold-deep transition-colors disabled:opacity-60"
        >
          {submitting ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg border border-charcoal/15 dark:border-offwhite/20 hover:border-gold transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}