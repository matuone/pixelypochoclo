import { Link } from 'react-router-dom'
import PageContainer from '../components/common/PageContainer'

export default function NotFoundView() {
  return (
    <PageContainer>
      <section className="hero">
        <h1>404</h1>
        <p>La pagina que buscas no existe.</p>
        <Link className="button-link" to="/">
          Volver al inicio
        </Link>
      </section>
    </PageContainer>
  )
}
