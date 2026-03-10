require('dotenv').config();
const mongoose = require('mongoose');
const Article = require('./src/models/Article');
const connectDB = require('./src/config/db');

// Función para generar slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const sampleArticles = [
  {
    title: 'Kingdom Come: Deliverance 2 - Análisis Completo',
    description: 'Un viaje inmersivo a Bohemia medieval. Analicemos los gráficos, gameplay y narrativa de este esperado secuela.',
    image: '/uploads/articles/placeholder-kcd2.jpg',
    category: 'analisis',
    author: 'Admin',
    featured: true,
    rating: 9,
    imageAlt: 'Captura de Kingdom Come Deliverance 2',
    published: true,
    content: 'Kingdom Come: Deliverance 2 es una obra maestra de simulación medieval que desafía las convenciones de los videojuegos modernos. Con más de 100 horas de contenido, este es un juego que demanda tu tiempo y atención, pero recompensa generosamente a quienes estén dispuestos a invertir en él.',
  },
  {
    title: 'Elden Ring Shadow of the Erdtree - La Mejor Expansión Ever',
    description: 'FromSoftware nos entrega una expansión que supera al juego base. Nuevas áreas, enemigos legendarios y una historia emotiva.',
    image: '/uploads/articles/placeholder-elden.jpg',
    category: 'analisis',
    author: 'Admin',
    featured: true,
    rating: 9.5,
    imageAlt: 'Elden Ring Shadow of the Erdtree',
    published: true,
    content: 'Shadow of the Erdtree es simplemente extraordinario. No es una expansión de relleno, sino una pieza de arte que expande y mejora el universo de Elden Ring. Las nuevas áreas son bellísimas y visualmente impresionantes.',
  },
  {
    title: 'Balatro: El Roguelike de Cartas Que No Esperabas',
    description: 'Un juego indie que mezcla poker, synergias locas y estadísticas totales que te enganchará por horas.',
    image: '/uploads/articles/placeholder-balatro.jpg',
    category: 'opinion',
    author: 'Admin',
    featured: true,
    rating: 8.5,
    imageAlt: 'Balatro Card Game',
    published: true,
    content: 'Balatro es la prueba de que no necesitas un presupuesto AAA para crear experiencias adictivas e innovadoras. Este es el tipo de juego que juegas una mano más a las 3 de la mañana.',
  },
  {
    title: 'La Industria de Videojuegos en 2025: Reflexiones en Mitad de Año',
    description: 'Conversación sobre las tendencias, lanzamientos y cambios que estamos viendo en la industria gamer este año.',
    image: '/uploads/articles/placeholder-industry.jpg',
    category: 'podcast',
    author: 'Admin',
    featured: false,
    rating: 8,
    imageAlt: 'Gaming Industry 2025',
    published: true,
    content: 'Estamos viviendo una época fascinante para los videojuegos. El futuro se ve interesante, diverso y competitivo. Es un buen momento para ser gamer.',
  },
  {
    title: 'Dune: Part Two - Película Épica para Amantes de la Ciencia Ficción',
    description: 'Denis Villeneuve logra lo imposible: crear una película de ciencia ficción épica, inteligente y visualmente deslumbrante.',
    image: '/uploads/articles/placeholder-dune.jpg',
    category: 'opinion',
    author: 'Admin',
    featured: true,
    rating: 9,
    imageAlt: 'Dune Part Two',
    published: true,
    content: 'Dune: Part Two es un tour de force cinematográfico. Los efectos visuales son asombrosos y cada plano es composición pura. Es el tipo de película que se ve mejor en cine IMAX.',
  },
  {
    title: 'Cómo Makoto-san cambió los Metaversos (Podcast)',
    description: 'En este episodio especial, discutimos cómo una creadora de contenido revolucionó la forma en que pensamos en espacios virtuales.',
    image: '/uploads/articles/placeholder-metaverse.jpg',
    category: 'podcast',
    author: 'Admin',
    featured: false,
    rating: 7.5,
    imageAlt: 'Podcast metaversos',
    published: true,
    content: 'En este podcast exploramos la influencia inesperada que ciertos creadores han tenido en la industria de tecnología y metaversos. La autenticidad y el criterio artístico pueden ser más valiosos que cualquier tecnología.',
  },
];

async function seedDatabase() {
  try {
    await connectDB();
    console.log('Base de datos conectada');

    await Article.deleteMany({});
    console.log('Artículos anteriores eliminados');

    // Agregar slugs generados automáticamente
    const articlesWithSlugs = sampleArticles.map(article => ({
      ...article,
      slug: generateSlug(article.title),
    }));

    const createdArticles = await Article.insertMany(articlesWithSlugs);
    console.log(`\n✅ ${createdArticles.length} artículos creados exitosamente\n`);

    console.log('Artículos creados:');
    createdArticles.forEach((article) => {
      console.log(`  ✓ ${article.title} (${article.category})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error al cargar datos de ejemplo:', error.message);
    process.exit(1);
  }
}

seedDatabase();
