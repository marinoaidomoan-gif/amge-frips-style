import { useState } from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTruck, FaFacebookF, FaSnapchatGhost } from 'react-icons/fa';
import SectionHeading from '../components/SectionHeading.jsx';
import { SITE, CONTACT, DELIVERY_ZONES } from '../lib/seo.js';
import { displayPhone } from '../lib/format.js';
import { sendMessage } from '../services/api.js';
import { useSeo } from '../hooks/useSeo.js';

export default function Contact() {
  useSeo({
    title: `Contact — ${SITE.name}`,
    description: `Contactez ${SITE.name} à Porto-Novo : WhatsApp, Facebook, Snapchat, e-mail. Livraison au Bénin, Burkina Faso, Niger et Togo.`,
  });

  const [form, setForm] = useState({ name: '', email: '', phone: '', body: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await sendMessage(form);
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', body: '' });
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  const labelClass = 'block text-xs uppercase tracking-[0.1em] text-charcoal/60 dark:text-offwhite/60 mb-2';
  const inputClass =
    'w-full px-4 py-3 border border-charcoal/15 dark:border-offwhite/15 bg-offwhite dark:bg-charcoal focus:outline-none focus:border-gold placeholder:text-charcoal/35 dark:placeholder:text-offwhite/35 text-sm';

  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-4 text-center">
        <SectionHeading
          eyebrow="Écrivez-nous"
          title="Contact"
          description="La voie la plus rapide reste WhatsApp : la gérante répond elle-même, du lundi au samedi."
        />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-[1fr_1.1fr] gap-16">
        <div>
          <a
            href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(`Bonjour ${SITE.name} !`)}`}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 bg-gold text-charcoal py-4 uppercase tracking-[0.1em] text-sm hover:bg-gold-deep transition-colors"
          >
            <FaWhatsapp /> Ouvrir WhatsApp
          </a>

          <dl className="mt-12 space-y-8">
            <div className="flex gap-5">
              <FaPhone className="mt-1 shrink-0 text-gold-deep dark:text-gold" size={15} />
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-charcoal/50 dark:text-offwhite/50">Téléphone / WhatsApp</dt>
                <dd className="mt-1.5 text-sm">{displayPhone()}</dd>
              </div>
            </div>
            <div className="flex gap-5">
              <FaEnvelope className="mt-1 shrink-0 text-gold-deep dark:text-gold" size={15} />
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-charcoal/50 dark:text-offwhite/50">E-mail</dt>
                <dd className="mt-1.5 text-sm">{CONTACT.email}</dd>
              </div>
            </div>
            <div className="flex gap-5">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-gold-deep dark:text-gold" size={15} />
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-charcoal/50 dark:text-offwhite/50">Adresse</dt>
                <dd className="mt-1.5 text-sm">{CONTACT.address}</dd>
              </div>
            </div>
            <div className="flex gap-5">
              <FaTruck className="mt-1 shrink-0 text-gold-deep dark:text-gold" size={15} />
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-charcoal/50 dark:text-offwhite/50">Zones de livraison</dt>
                <dd className="mt-1.5 text-sm leading-relaxed">{DELIVERY_ZONES.join(' · ')}</dd>
              </div>
            </div>
          </dl>

          <div className="mt-12 flex gap-3">
            <a href={CONTACT.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-11 h-11 border border-charcoal/15 dark:border-offwhite/15 flex items-center justify-center text-gold-deep dark:text-gold hover:bg-gold hover:text-charcoal transition-colors">
              <FaFacebookF size={15} />
            </a>
            <a href={CONTACT.snapchatUrl} target="_blank" rel="noreferrer" aria-label="Snapchat" className="w-11 h-11 border border-charcoal/15 dark:border-offwhite/15 flex items-center justify-center text-gold-deep dark:text-gold hover:bg-gold hover:text-charcoal transition-colors">
              <FaSnapchatGhost size={15} />
            </a>
          </div>
        </div>

        <div className="bg-blush-soft dark:bg-charcoal-light p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.1em] text-gold-deep dark:text-gold">Formulaire</p>
          <p className="font-display mt-4 text-xl tracking-[0.06em]">Une question, une demande particulière ?</p>

          {status === 'sent' ? (
            <div className="mt-10">
              <p className="text-sm leading-relaxed">
                Merci, votre message est bien arrivé. La gérante vous répond au plus vite.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-8 border border-gold-deep dark:border-gold text-gold-deep dark:text-gold px-6 py-2.5 uppercase tracking-[0.1em] text-sm hover:bg-gold hover:text-charcoal hover:border-gold transition-colors"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div>
                <label htmlFor="name" className={labelClass}>Nom</label>
                <input id="name" aria-label="Nom" required value={form.name} onChange={update('name')} className={inputClass} placeholder="Votre nom" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className={labelClass}>E-mail</label>
                  <input id="email" aria-label="E-mail" type="email" required value={form.email} onChange={update('email')} className={inputClass} placeholder="vous@exemple.com" />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Téléphone</label>
                  <input id="phone" aria-label="Téléphone" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="Optionnel" />
                </div>
              </div>
              <div>
                <label htmlFor="body" className={labelClass}>Message</label>
                <textarea id="body" aria-label="Message" required rows={5} value={form.body} onChange={update('body')} className={`${inputClass} resize-none`} placeholder="Dites-nous ce que vous cherchez..." />
              </div>

              <button type="submit" disabled={status === 'sending'} className="w-full bg-gold text-charcoal py-4 uppercase tracking-[0.1em] text-sm hover:bg-gold-deep transition-colors disabled:opacity-60">
                {status === 'sending' ? 'Envoi...' : 'Envoyer le message'}
              </button>

              {status === 'error' && (
                <p className="text-xs text-red-600">
                  L'envoi a échoué. Réessayez ou écrivez-nous sur WhatsApp.
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </div>
  );
}