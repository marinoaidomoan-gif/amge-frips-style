import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Connexion échouée.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blush-soft dark:bg-charcoal px-6 py-12">
      <div className="relative w-full max-w-3xl">
        {/* Panneau photo */}
        <div className="relative hidden md:block ml-auto w-[78%] h-[440px] bg-linear-to-br from-charcoal via-charcoal-light to-gold-deep/30 shadow-lift overflow-hidden">
          {/* TODO: vraie photo — <img src="/admin-bg.jpg" alt="" className="w-full h-full object-cover" /> */}
          <div className="absolute inset-0 bg-charcoal/55" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-10">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Espace réservé</p>
            <p className="font-display uppercase tracking-[0.04em] text-3xl text-offwhite mb-4">Bon retour</p>
            <p className="text-sm text-offwhite/70 leading-relaxed max-w-xs">
              Connectez-vous pour ajouter, modifier ou retirer une pièce du catalogue.
            </p>
          </div>
        </div>

        {/* Carte formulaire, en chevauchement */}
        <div className="relative md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 w-full md:w-[360px] bg-offwhite dark:bg-charcoal-light shadow-lift p-12">
          <p className="md:hidden font-display uppercase tracking-[0.15em] text-base text-center mb-8">
            AMGE <span className="text-gold-deep dark:text-gold">Frips&amp;Style</span>
          </p>

          <p className="font-display text-2xl text-center mb-2">Connexion</p>
          <div className="w-10 h-px bg-gold mx-auto mb-9" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-offwhite/40" size={13} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Nom d'utilisateur"
                className="w-full pl-11 pr-4 py-3.5 border border-charcoal/15 dark:border-offwhite/20 bg-transparent focus:outline-none focus:border-gold text-sm placeholder:text-charcoal/35 dark:placeholder:text-offwhite/35"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-offwhite/40" size={13} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Mot de passe"
                className="w-full pl-11 pr-4 py-3.5 border border-charcoal/15 dark:border-offwhite/20 bg-transparent focus:outline-none focus:border-gold text-sm placeholder:text-charcoal/35 dark:placeholder:text-offwhite/35"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gold text-charcoal py-4 uppercase tracking-[0.1em] text-sm hover:bg-gold-deep transition-colors disabled:opacity-60"
            >
              <FaSignInAlt size={13} /> {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}