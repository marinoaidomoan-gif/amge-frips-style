import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext.jsx';
import { CONTACT } from '../lib/seo.js';

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  const overHero = pathname === '/' && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        overHero ? 'bg-transparent' : 'bg-offwhite/90 dark:bg-charcoal/90 backdrop-blur-sm shadow-soft'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <NavLink to="/" className="font-display uppercase tracking-[0.15em] text-base">
          <span className={overHero ? 'text-offwhite' : 'text-charcoal dark:text-offwhite'}>AMGE </span>
          <span className="text-gold-deep dark:text-gold">Frips&amp;Style</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 text-xs uppercase tracking-[0.1em]">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => {
                    const base = 'pb-1.5 border-b transition-colors';
                    if (isActive) {
                      return overHero
                        ? `${base} text-gold border-gold`
                        : `${base} text-gold-deep dark:text-gold border-gold-deep dark:border-gold`;
                    }
                    return overHero
                      ? `${base} text-offwhite/85 border-transparent hover:text-gold`
                      : `${base} text-charcoal/80 dark:text-offwhite/80 border-transparent hover:text-gold-deep dark:hover:text-gold`;
                  }}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleTheme}
            aria-label="Changer de thème"
            className={`w-8 h-8 flex items-center justify-center border text-sm ${
              overHero ? 'border-offwhite/30 text-offwhite' : 'border-charcoal/15 dark:border-offwhite/20'
            }`}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          
          <a  href={`https://wa.me/${CONTACT.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 border px-5 py-2 text-xs uppercase tracking-[0.1em] transition-colors ${
              overHero
                ? 'border-gold text-gold hover:bg-gold hover:text-charcoal'
                : 'border-gold-deep dark:border-gold text-gold-deep dark:text-gold hover:bg-gold hover:text-charcoal hover:border-gold'
            }`}
          >
            <FaWhatsapp /> Nous écrire
          </a>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleTheme} aria-label="Changer de thème" className={overHero ? 'text-offwhite' : 'text-charcoal dark:text-offwhite'}>
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className={overHero ? 'text-offwhite' : 'text-charcoal dark:text-offwhite'}>
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-charcoal/10 dark:border-offwhite/10 bg-offwhite dark:bg-charcoal md:hidden"
          >
            <div className="flex flex-col px-6 py-6">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} className="text-xs uppercase tracking-[0.1em] border-b border-charcoal/10 dark:border-offwhite/10 py-4 last:border-0">
                  {link.label}
                </NavLink>
              ))}
              
             <a   href={`https://wa.me/${CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-gold text-charcoal py-3 mt-6 uppercase tracking-[0.1em] text-sm"
              >
                <FaWhatsapp /> Nous écrire sur WhatsApp
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}