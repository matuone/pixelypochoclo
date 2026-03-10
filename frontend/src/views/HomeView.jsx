import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageContainer from '../components/common/PageContainer'

export default function HomeView() {
  useDocumentTitle('Inicio | Pixel y Pochoclo')

  return (
    <PageContainer>
      <section id="analisis" className="hero">
        <h1>Proyecto React listo</h1>
        <p>
          Estructura inicial para publicar analisis de videojuegos y peliculas.
        </p>
      </section>

      <section id="opiniones" className="hero hero-section">
        <h1>Opiniones</h1>
        <p>Editoriales y reseñas con mirada critica, claras y faciles de comparar.</p>
      </section>

      <section id="podcast" className="hero hero-section">
        <h1>Podcast</h1>
        <p>Conversaciones semanales sobre estrenos, clasicos y tendencias de la cultura pop.</p>
      </section>
    </PageContainer>
  )
}
