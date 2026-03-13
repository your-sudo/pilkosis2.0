import { useState } from 'react';
import '../styles/Navbar.css';

const links = [
  { label: 'Beranda', href: '#home' },
  { label: 'Kalender', href: '#calendar' },
  { label: 'Berita', href: '#news' },
  { label: 'Tentang', href: '#about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <a className="navbar__logo" href="#home" onClick={() => setIsOpen(false)}>
        <span className="navbar__logo-icon"></span>
        Smenza<span>Keren</span>
      </a>

      <div className={`navbar__menu-btn ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`navbar__links ${isOpen ? 'open' : ''}`}>
        {links.map(link => (
          <li key={link.label}>
            <a href={link.href} onClick={() => setIsOpen(false)}>{link.label}</a>
          </li>
        ))}
        <li>
          <a href="/login" className="navbar__cta" onClick={() => setIsOpen(false)}>Login</a>
        </li>
      </ul>
    </nav>
  );
}
