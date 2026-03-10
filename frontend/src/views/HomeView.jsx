import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageContainer from '../components/common/PageContainer'

export default function HomeView() {
  useDocumentTitle('Inicio | Pixel y Pochoclo')

  return (
    <PageContainer>
      <section className="hero">
        <h1>Proyecto React listo</h1>
        <p>
          Estructura inicial creada con carpetas estandar para escalar el frontend.
        </p>
      </section>
    </PageContainer>
  )
}
