import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext.jsx';

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-offwhite/90 dark:bg-charcoal/90 backdrop-blur-sm shadow-[0_1px_0_rgba(44,44,44,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <NavLink to="/" className="font-display italic text-xl">
          AMGE Frips&Style
        </NavLink>

        <ul className="hidden md:flex items-center gap-9 text-[15px]">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `pb-1 transition-colors ${
                    isActive
                      ? 'text-gold-deep dark:text-gold'
                      : 'text-charcoal/80 dark:text-offwhite/80 hover:text-gold-deep dark:hover:text-gold'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Changer de thème"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-charcoal/15 dark:border-offwhite/20 text-sm"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          
          <a  href="https://wa.me/229XXXXXXXX"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-gold text-charcoal px-4 py-2 rounded-full text-sm hover:bg-gold-deep transition-colors"
          >
            <FaWhatsapp /> Nous écrire
          </a>
        </div>
      </nav>
    </header>
  );
}