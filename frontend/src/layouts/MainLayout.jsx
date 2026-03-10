import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Squash as Hamburger } from 'hamburger-react'
import { Search } from 'lucide-react'
import DynamicBackground from '../components/common/DynamicBackground'
import logo from '../assets/images/logo.png'

export default function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Analisis', href: '#analisis' },
    { label: 'Opiniones', href: '#opiniones' },
    { label: 'Podcast', href: '#podcast' },
  ]

  return (
    <div className="app-shell">
      <DynamicBackground />
      <Link className="floating-brand" to="/" onClick={() => setIsMenuOpen(false)}>
        <img className="floating-brand-logo" src={logo} alt="Pixel y Pochoclo" />
      </Link>

      <header className="app-header">
        <div className="app-header-bar">
          {/* Desktop nav — visible only on larger screens */}
          <nav className="nav-desktop" aria-label="Navegacion principal">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <div className="search-container">
              <button
                className="search-toggle-btn"
                type="button"
                aria-label="Abrir busqueda"
                onClick={() => setIsSearchOpen((prev) => !prev)}
              >
                <Search size={24} />
              </button>
              {isSearchOpen && (
                <input
                  type="text"
                  className="search-input"
                  placeholder="Buscar..."
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
              )}
            </div>

            {/* Hamburger — visible only on mobile */}
            <button
              className="menu-toggle-btn"
              type="button"
              aria-label="Abrir menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <Hamburger toggled={isMenuOpen} size={18} duration={0.3} rounded />
            </button>
          </div>
        </div>

        {/* Mobile dropdown nav */}
        {isMenuOpen && (
          <nav className="nav-dropdown" aria-label="Navegacion principal">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
