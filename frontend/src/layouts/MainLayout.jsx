import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Squash as Hamburger } from 'hamburger-react'
import DynamicBackground from '../components/common/DynamicBackground'

export default function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="app-shell">
      <DynamicBackground />
      <header className="app-header">
        <div className="app-header-bar">
          <Link className="brand" to="/" onClick={() => setIsMenuOpen(false)}>
            Pixel y Pochoclo
          </Link>

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
