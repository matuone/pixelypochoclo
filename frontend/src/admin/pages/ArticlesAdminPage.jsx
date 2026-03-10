import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { articleService } from '../../services/articleService';
import '../styles/ArticlesAdminPage.css';

export default function ArticlesAdminPage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await articleService.getAll({ limit: 100 });
      setArticles(data.data || []);
      setError(null);
    } catch (err) {
      setError('Error al cargar artículos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await articleService.delete(id);
      setArticles(articles.filter(article => article._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Error al eliminar artículo');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="articles-admin-page"><p>Cargando...</p></div>;
  }

  return (
    <div className="articles-admin-page">
      <div className="admin-page-header">
        <h2>Artículos</h2>
        <button
          className="btn-create"
          onClick={() => navigate('/admin/articles/new')}
        >
          + Crear Artículo
        </button>
      </div>

      {error && <div className="page-error">{error}</div>}

      {articles.length === 0 ? (
        <div className="empty-state">
          <p>No hay artículos aún</p>
          <button
            className="btn-create"
            onClick={() => navigate('/admin/articles/new')}
          >
            Crear primer artículo
          </button>
        </div>
      ) : (
        <div className="articles-table-container">
          <table className="articles-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Título</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Vistas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article._id}>
                  <td>
                    <img
                      src={`http://localhost:5000${article.image}`}
                      alt={article.imageAlt}
                      className="table-image"
                    />
                  </td>
                  <td>
                    <div>
                      <div className="article-title">{article.title}</div>
                      {article.featured && <span className="badge-featured">Destacado</span>}
                    </div>
                  </td>
                  <td>
                    <span className={`badge category-${article.category}`}>
                      {article.category}
                    </span>
                  </td>
                  <td>
                    <span className={`badge status-${article.published ? 'published' : 'draft'}`}>
                      {article.published ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td>{article.views}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/admin/articles/${article._id}`)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => setDeleteConfirm(article._id)}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>¿Eliminar artículo?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modal-buttons">
              <button
                className="btn-cancel"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancelar
              </button>
              <button
                className="btn-delete-modal"
                onClick={() => handleDelete(deleteConfirm)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
