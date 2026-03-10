import { useNavigate } from 'react-router-dom';
import { useArticles } from '../../hooks/useArticles';
import './ArticlesGrid.css';

export default function ArticlesGrid({ category = null, limit = 12 }) {
  const navigate = useNavigate();
  const params = {
    limit,
    ...(category && { category }),
  };

  const { articles, loading, error } = useArticles(params);

  if (loading) {
    return <div className="articles-grid loading">Cargando artículos...</div>;
  }

  if (error) {
    return <div className="articles-grid error">Error al cargar artículos: {error}</div>;
  }

  if (!articles || articles.length === 0) {
    return <div className="articles-grid empty">No hay artículos disponibles</div>;
  }

  return (
    <div className="articles-grid">
      {articles.map((article) => (
        <article
          key={article._id}
          className="article-card"
          onClick={() => navigate(`/article/${article.slug}`)}
        >
          <div className="article-image-container">
            <img
              src={`http://localhost:5000${article.image}`}
              alt={article.imageAlt}
              className="article-image"
            />
            {article.featured && <span className="featured-badge">⭐ Destacado</span>}
          </div>

          <div className="article-content">
            <div className="article-meta">
              <span className={`category-badge category-${article.category}`}>
                {article.category === 'analisis' ? '🔍 Análisis' : article.category === 'opinion' ? '💭 Opinión' : '🎙️ Podcast'}
              </span>
              {article.rating && (
                <span className="rating">⭐ {article.rating}/10</span>
              )}
            </div>

            <h3 className="article-title">{article.title}</h3>

            <p className="article-description">{article.description}</p>

            <div className="article-footer">
              <small className="article-views">👁️ {article.views} vistas</small>
              <small className="article-date">
                {new Date(article.createdAt).toLocaleDateString('es-ES')}
              </small>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
