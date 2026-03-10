import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { articleService } from '../../services/articleService';
import '../styles/AdminLayout.css';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Inicio', path: '/admin' },
    { label: 'Artículos', path: '/admin/articles' },
    { label: 'Crear Artículo', path: '/admin/articles/new' },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin</h2>
          <p>Pixel y Pochoclo</p>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <button
              key={item.path}
              className="admin-nav-item"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Panel de Administración</h1>
          <button
            className="admin-logout-btn"
            onClick={() => {
              sessionStorage.removeItem('adminToken');
              navigate('/');
            }}
          >
            Salir
          </button>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
