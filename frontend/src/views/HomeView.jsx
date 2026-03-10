import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageContainer from '../components/common/PageContainer'
import ArticlesGrid from '../components/ArticlesGrid/ArticlesGrid'

export default function HomeView() {
  useDocumentTitle('Inicio | Pixel y Pochoclo')

  return (
    <PageContainer>
      <section id="analisis" className="hero">
        <h1>🔍 Análisis</h1>
        <p>
          Análisis profundos y detallados de los mejores videojuegos y películas del momento.
        </p>
        <ArticlesGrid category="analisis" limit={6} />
      </section>

      <section id="opiniones" className="hero hero-section">
        <h1>💭 Opiniones</h1>
        <p>Editoriales y reseñas con mirada crítica, claras y fáciles de comparar.</p>
        <ArticlesGrid category="opinion" limit={6} />
      </section>

      <section id="podcast" className="hero hero-section">
        <h1>🎙️ Podcast</h1>
        <p>Conversaciones semanales sobre estrenos, clásicos y tendencias de la cultura pop.</p>
        <ArticlesGrid category="podcast" limit={6} />
      </section>
    </PageContainer>
  )
}
