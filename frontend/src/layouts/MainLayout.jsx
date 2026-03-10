import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Squash as Hamburger } from 'hamburger-react'
import { Search } from 'lucide-react'
import DynamicBackground from '../components/common/DynamicBackground'
import logo from '../assets/images/logo.png'

export default function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="app-shell">
      <DynamicBackground />
      <Link className="floating-brand" to="/" onClick={() => setIsMenuOpen(false)}>
        <img className="floating-brand-logo" src={logo} alt="Pixel y Pochoclo" />
      </Link>

      <header className="app-header">
        <div className="app-header-bar">
          <div className="search-container">
            <button
              className="search-toggle-btn"
              type="button"
              aria-label="Abrir busqueda"
              onClick={() => setIsSearchOpen((prev) => !prev)}
            >
              <Search size={18} />
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

        {isMenuOpen && (
          <nav className="nav-dropdown" aria-label="Navegacion principal">
            <a href="#" onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
            <a href="#analisis" onClick={() => setIsMenuOpen(false)}>
              Analisis
            </a>
            <a href="#opiniones" onClick={() => setIsMenuOpen(false)}>
              Opiniones
            </a>
            <a href="#podcast" onClick={() => setIsMenuOpen(false)}>
              Podcast
            </a>
          </nav>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
