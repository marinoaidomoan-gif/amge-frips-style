import { useState } from 'react';
import { FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { CONTACT, DELIVERY_ZONES } from '../lib/seo.js';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: brancher un vrai envoi (ex. service email type EmailJS, ou une route backend dédiée)
    setSent(true);
  };

  const inputClass =
    'w-full px-3 py-2 rounded-lg border border-charcoal/15 dark:border-offwhite/20 bg-transparent focus:outline-none focus:border-gold';

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
      <div>
        <p className="font-display italic text-3xl mb-6">Nous contacter</p>

        {sent ? (
          <p className="text-charcoal/75 dark:text-offwhite/75">
            Merci, votre message a bien été envoyé — nous revenons vers vous rapidement.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1.5">Nom</label>
              <input type="text" required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm mb-1.5">Email</label>
              <input type="email" required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm mb-1.5">Téléphone</label>
              <input type="tel" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm mb-1.5">Message</label>
              <textarea rows={4} required className={inputClass} />
            </div>
            <button
              type="submit"
              className="bg-gold text-charcoal px-6 py-2.5 rounded-full hover:bg-gold-deep transition-colors"
            >
              Envoyer
            </button>
          </form>
        )}
      </div>

      <div className="space-y-8">
        <div>
          <p className="font-display text-lg mb-3 flex items-center gap-2">
            <FaMapMarkerAlt className="text-gold" /> Adresse
          </p>
          <p className="text-charcoal/70 dark:text-offwhite/70">{CONTACT.address}</p>
        </div>

        <div>
          <p className="font-display text-lg mb-3 flex items-center gap-2">
            <FaWhatsapp className="text-gold" /> WhatsApp
          </p>
          
          <a  href={`https://wa.me/${CONTACT.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="text-gold-deep dark:text-gold hover:underline"
          >
            Discuter directement
          </a>
        </div>

        <div>
          <p className="font-display text-lg mb-3">Zones de livraison</p>
          <div className="grid grid-cols-2 gap-y-1 text-sm text-charcoal/70 dark:text-offwhite/70">
            {DELIVERY_ZONES.map((z) => (
              <p key={z}>{z}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}