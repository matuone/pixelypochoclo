import { useParams, useNavigate } from 'react-router-dom';
import { useArticleBySlug } from '../hooks/useArticles';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import PageContainer from '../components/common/PageContainer';
import '../components/ArticlesGrid/ArticleDetailView.css';

export default function ArticleDetailView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { article, loading, error } = useArticleBySlug(slug);

  useDocumentTitle(article ? `${article.title} | Pixel y Pochoclo` : 'Artículo | Pixel y Pochoclo');

  if (loading) {
    return (
      <PageContainer>
        <div className="article-detail loading">
          <p>Cargando artículo...</p>
        </div>
      </PageContainer>
    );
  }

  if (error || !article) {
    return (
      <PageContainer>
        <div className="article-detail error">
          <h2>Artículo no encontrado</h2>
          <p>{error || 'El artículo que buscas no existe'}</p>
          <button onClick={() => navigate('/')} className="btn-back">
            Volver al inicio
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <article className="article-detail">
        <button onClick={() => navigate('/')} className="btn-back">
          ← Volver
        </button>

        <header className="article-header">
          <div className="article-header-meta">
            <span className={`category-badge category-${article.category}`}>
              {article.category === 'analisis' ? '🔍 Análisis' : article.category === 'opinion' ? '💭 Opinión' : '🎙️ Podcast'}
            </span>
            {article.rating && (
              <span className="rating-large">⭐ {article.rating}/10</span>
            )}
          </div>

          <h1 className="article-detail-title">{article.title}</h1>

          <div className="article-meta-info">
            <span className="author">Por {article.author}</span>
            <span className="separator">•</span>
            <time dateTime={article.createdAt}>
              {new Date(article.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="separator">•</span>
            <span className="views">{article.views} vistas</span>
          </div>
        </header>

        <div className="article-image-large">
          <img
            src={`http://localhost:5000${article.image}`}
            alt={article.imageAlt}
          />
        </div>

        <div className="article-body">
          <p className="article-description-large">{article.description}</p>

          <div className="article-content-html">
            {article.content.split('\n').map((paragraph, idx) => (
              paragraph.trim() && <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        <footer className="article-footer-detail">
          <div className="article-rating">
            <span className="rating-label">Puntuación</span>
            <div className="rating-stars">
              {[...Array(10)].map((_, i) => (
                <span key={i} className={i < article.rating ? 'star-filled' : 'star-empty'}>
                  ★
                </span>
              ))}
            </div>
            <span className="rating-value">{article.rating}/10</span>
          </div>

          <button onClick={() => navigate('/')} className="btn-more-articles">
            Ver más artículos →
          </button>
        </footer>
      </article>
    </PageContainer>
  );
}
