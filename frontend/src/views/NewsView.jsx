import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageContainer from '../components/common/PageContainer'
import '../styles/news.css'

// Mock data - después viene de API
const MOCK_NOTICIAS = [
  {
    id: 1,
    titulo: 'Amazon Raising A Pokemon Game Price To $80 Sets A Worrying Precedent',
    descripcion: 'El precio de los juegos de Pokémon alcanza nuevos máximos en portátiles...',
    imagen: 'https://via.placeholder.com/400x280?text=Pokemon+Game',
    fecha: '2024-03-10',
    categoria: 'Noticias',
  },
  {
    id: 2,
    titulo: 'Resident Evil Requiem Is Getting New Story Content, Along With Photo Mode And A Minigame',
    descripcion: 'Nuevo contenido confirmado para Resident Evil Requiem con características adicionales...',
    imagen: 'https://via.placeholder.com/400x280?text=Resident+Evil',
    fecha: '2024-03-10',
    categoria: 'Noticias',
  },
  {
    id: 3,
    titulo: 'The Best Mario Day Deals - Save On Games, Figures, Merch, & More',
    descripcion: 'Ofertas especiales en juegos y merchandising de Super Mario...',
    imagen: 'https://via.placeholder.com/400x280?text=Mario+Day',
    fecha: '2024-03-10',
    categoria: 'Ofertas',
  },
  {
    id: 4,
    titulo: 'Fortnite V-Bucks Are Getting More Expensive',
    descripcion: 'Epic Games anuncia aumento de precios en la moneda de Fortnite...',
    imagen: 'https://via.placeholder.com/400x280?text=Fortnite',
    fecha: '2024-03-09',
    categoria: 'Gaming',
  },
  {
    id: 5,
    titulo: "PSA: You'll Have to Pay For Switch 2's GameChat Soon, And It's Not Worth It",
    descripcion: 'Nintendo incluirá sistema de chat de pago en Switch 2 con comentarios críticos...',
    imagen: 'https://via.placeholder.com/400x280?text=Switch+2',
    fecha: '2024-03-09',
    categoria: 'Nintendo',
  },
  {
    id: 6,
    titulo: "Slay The Spire 2 Days Won't Add Microtransactions, Even Though Fans Would Pay For Them",
    descripcion: 'Developers confirman que no habrá microtransacciones en Slay The Spire 2...',
    imagen: 'https://via.placeholder.com/400x280?text=Slay+the+Spire',
    fecha: '2024-03-09',
    categoria: 'Opinión',
  },
  {
    id: 7,
    titulo: 'Crimson Desert PC Requirements And Console Specs Revealed: Check If Your Rig Is Ready',
    descripcion: 'Requisitos técnicos oficiales para Crimson Desert en PC y consolas...',
    imagen: 'https://via.placeholder.com/400x280?text=Crimson+Desert',
    fecha: '2024-03-08',
    categoria: 'Análisis',
  },
  {
    id: 8,
    titulo: 'First Call Of Duty: Warzone Black Ops Royale Gameplay Footage Is Full Of Blackout Nostalgia',
    descripcion: 'Primeros gameplays del nuevo modo royale muestran referencias a Blackout...',
    imagen: 'https://via.placeholder.com/400x280?text=Call+of+Duty',
    fecha: '2024-03-08',
    categoria: 'Gaming',
  },
]

export default function NoticiasView() {
  useDocumentTitle('Noticias | Pixel y Pochoclo')

  return (
    <PageContainer>
      <section className="noticias-hero">
        <h1>Últimas Noticias</h1>
        <p>Análisis, opiniones y puntajes de videojuegos y películas</p>
      </section>

      <div className="noticias-grid">
        {MOCK_NOTICIAS.map((noticia) => (
          <Link
            key={noticia.id}
            to={`/noticias/${noticia.id}`}
            className="noticia-card"
          >
            <div className="noticia-imagen">
              <img src={noticia.imagen} alt={noticia.titulo} />
              <span className="noticia-fecha">{noticia.fecha}</span>
            </div>
            <div className="noticia-contenido">
              <h3>{noticia.titulo}</h3>
              <p>{noticia.descripcion}</p>
              <span className="noticia-categoria">{noticia.categoria}</span>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}
