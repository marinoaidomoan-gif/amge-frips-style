import { FaFacebookF, FaSnapchatGhost, FaWhatsapp } from 'react-icons/fa';

const zones = ['Bénin', 'Burkina Faso', 'Niger', 'Togo'];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-offwhite">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <p className="font-display italic text-2xl mb-4">AMGE Frips&Style</p>
          <p className="text-offwhite/70 text-sm leading-relaxed max-w-xs">
            Friperie de luxe et créations neuves pour femmes, depuis Porto-Novo.
          </p>
        </div>

        <div>
          <p className="font-display text-lg mb-4">Zones de livraison</p>
          <ul className="grid grid-cols-2 gap-y-2 text-sm text-offwhite/70">
            {zones.map((z) => (
              <li key={z}>{z}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-lg mb-4">Nous suivre</p>
          <div className="flex gap-4 mb-6">
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-offwhite/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
              <FaFacebookF size={14} />
            </a>
            <a href="#" aria-label="Snapchat" className="w-9 h-9 rounded-full border border-offwhite/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
              <FaSnapchatGhost size={14} />
            </a>
            <a href="https://wa.me/229XXXXXXXX" aria-label="WhatsApp" className="w-9 h-9 rounded-full border border-offwhite/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
              <FaWhatsapp size={14} />
            </a>
          </div>
          <p className="text-offwhite/60 text-sm">Porto-Novo, Bénin</p>
        </div>
      </div>

      <div className="border-t border-offwhite/10 py-6 text-center text-xs text-offwhite/50">
        © {new Date().getFullYear()} AMGE Frips&Style. Tous droits réservés.
      </div>
    </footer>
  );
}