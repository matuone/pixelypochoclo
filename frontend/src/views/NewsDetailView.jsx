import { useParams, Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageContainer from '../components/common/PageContainer'
import '../styles/news-detail.css'

// Mock data - después viene de API
const MOCK_NOTICIAS_MAP = {
  1: {
    id: 1,
    titulo: 'Amazon Raising A Pokemon Game Price To $80 Sets A Worrying Precedent',
    descripcion: 'Amazon está aumentando el precio de los juegos de Pokémon a $80, estableciendo un precedente preocupante en la industria.',
    imagen: 'https://via.placeholder.com/800x400?text=Pokemon+Game',
    fecha: '2024-03-10',
    categoria: 'Noticias',
    contenido: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
  },
  2: {
    id: 2,
    titulo: 'Resident Evil Requiem Is Getting New Story Content, Along With Photo Mode And A Minigame',
    descripcion: 'Capcom anuncia nuevo contenido para Resident Evil Requiem incluyendo modo foto y minijuego.',
    imagen: 'https://via.placeholder.com/800x400?text=Resident+Evil',
    fecha: '2024-03-10',
    categoria: 'Noticias',
    contenido: `
      Resident Evil Requiem recibe una actualización importante con nuevo contenido de historia exclusivo.
      
      El modo foto permitirá a los jugadores capturar momentos icónicos del juego con filtros y opciones de personalización.
      
      El nuevo minijuego añade horas de entretenimiento adicional a la experiencia principal.
      
      Esta actualización llega gratuitamente a todos los propietarios del juego en todas las plataformas.
    `,
  },
  3: {
    id: 3,
    titulo: 'The Best Mario Day Deals - Save On Games, Figures, Merch, & More',
    descripcion: 'Recopilación de las mejores ofertas para celebrar el Mario Day.',
    imagen: 'https://via.placeholder.com/800x400?text=Mario+Day',
    fecha: '2024-03-10',
    categoria: 'Ofertas',
    contenido: `
      El Mario Day trae descuentos increíbles en toda la merchandise y videojuegos de Super Mario.
      
      Desde figuras coleccionables hasta clásicos del NES, aquí encontrarás las mejores ofertas del año.
      
      Retailers como Amazon y Nintendo Store participan con descuentos exclusivos.
      
      No te pierdas estas ofertas limitadas disponibles por tiempo limitado.
    `,
  },
}

export default function NoticiaDetalleView() {
  const { id } = useParams()
  const noticia = MOCK_NOTICIAS_MAP[id]

  if (!noticia) {
    return (
      <PageContainer>
        <section className="noticia-detallenoEncontrada">
          <h1>Noticia no encontrada</h1>
          <Link to="/noticias" className="button-link">
            Volver a noticias
          </Link>
        </section>
      </PageContainer>
    )
  }

  useDocumentTitle(`${noticia.titulo} | Pixel y Pochoclo`)

  return (
    <PageContainer>
      <Link to="/noticias" className="link-volver">
        ← Volver a noticias
      </Link>

      <article className="noticia-detalle">
        <header className="noticia-detalle-header">
          <h1>{noticia.titulo}</h1>
          <div className="noticia-meta">
            <span className="noticia-fecha">{noticia.fecha}</span>
            <span className="noticia-categoria">{noticia.categoria}</span>
          </div>
        </header>

        <img
          src={noticia.imagen}
          alt={noticia.titulo}
          className="noticia-imagen-grande"
        />

        <div className="noticia-cuerpo">
          <p className="noticia-descripcion">{noticia.descripcion}</p>
          {noticia.contenido && (
            <div className="noticia-texto">
              {noticia.contenido
                .split('\n\n')
                .map((parrafo, idx) => (
                  <p key={idx}>{parrafo.trim()}</p>
                ))}
            </div>
          )}
        </div>
      </article>

      <div className="noticia-actions">
        <Link to="/noticias" className="button-link">
          Ver más noticias
        </Link>
      </div>
    </PageContainer>
  )
}
