import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getMessages, deleteMessage } from '../services/api.js';
import DeleteButton from './DeleteButton.jsx';

export default function MessagesList() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try { setMessages(await getMessages(token)); } catch { setError('Impossible de charger les messages.'); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    try { await deleteMessage(id, token); await load(); } catch { setError('Suppression impossible.'); }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600 text-sm">{error}</p>;
  if (messages.length === 0) return <p className="text-charcoal/60 dark:text-offwhite/60">Aucun message pour le moment.</p>;

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <div key={m._id} className="border border-charcoal/10 dark:border-offwhite/10 bg-offwhite dark:bg-charcoal-light p-5">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <p className="font-medium">{m.name}</p>
              <p className="text-xs text-charcoal/50 dark:text-offwhite/50">
                {m.email}{m.phone ? ` · ${m.phone}` : ''}
              </p>
            </div>
            <p className="text-xs text-charcoal/40 dark:text-offwhite/40 shrink-0">
              {new Date(m.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <p className="text-sm text-charcoal/75 dark:text-offwhite/75 leading-relaxed mb-3">{m.body}</p>
          <DeleteButton onConfirm={() => handleDelete(m._id)} />
        </div>
      ))}
    </div>
  );
}