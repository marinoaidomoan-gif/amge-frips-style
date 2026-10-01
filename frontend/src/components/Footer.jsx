import { Link } from 'react-router-dom';
import { FaTruck, FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaFacebookF, FaSnapchatGhost } from 'react-icons/fa';
import { SITE, CONTACT, DELIVERY_ZONES } from '../lib/seo.js';
import { displayPhone } from '../lib/format.js';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-offwhite border-t border-offwhite/10">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display uppercase tracking-[0.15em] text-lg">
              AMGE <span className="text-gold">Frips&amp;Style</span>
            </p>
            <span className="block w-12 h-px bg-gold mt-6" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-offwhite/60">
              {SITE.tagline}. Une sélection de pièces uniques pour toutes les femmes, depuis {SITE.since} à {SITE.city}.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(`Bonjour ${SITE.name} !`)}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-10 h-10 flex items-center justify-center border border-offwhite/15 text-gold hover:border-gold transition-colors">
                <FaWhatsapp size={15} />
              </a>
              <a href={CONTACT.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center border border-offwhite/15 text-gold hover:border-gold transition-colors">
                <FaFacebookF size={15} />
              </a>
              <a href={CONTACT.snapchatUrl} target="_blank" rel="noreferrer" aria-label="Snapchat" className="w-10 h-10 flex items-center justify-center border border-offwhite/15 text-gold hover:border-gold transition-colors">
                <FaSnapchatGhost size={15} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-gold">Navigation</p>
            <ul className="mt-6 space-y-3 text-sm text-offwhite/60">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-offwhite transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-gold">Nous joindre</p>
            <ul className="mt-6 space-y-4 text-sm text-offwhite/60">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-gold" size={14} />
                {CONTACT.address}
              </li>
              <li className="flex items-start gap-3">
                <FaPhone className="mt-0.5 shrink-0 text-gold" size={14} />
                {displayPhone()}
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-0.5 shrink-0 text-gold" size={14} />
                {CONTACT.email}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-offwhite/10 pt-10">
          <div className="flex items-center gap-3">
            <FaTruck className="text-gold" size={14} />
            <p className="text-xs uppercase tracking-[0.1em] text-offwhite/70">Livraison en Afrique de l'Ouest</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm text-offwhite/55">
            {DELIVERY_ZONES.map((zone) => (
              <span key={zone}>{zone}</span>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs tracking-wider text-offwhite/35">
          <p>© {new Date().getFullYear()} {SITE.name}. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link to="/cgu" className="hover:text-offwhite/60 transition-colors">CGU</Link>
            <Link to="/confidentialite" className="hover:text-offwhite/60 transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}