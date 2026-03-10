require('dotenv').config();
const mongoose = require('mongoose');
const Article = require('./src/models/Article');
const connectDB = require('./src/config/db');

const sampleArticles = [
  {
    title: 'Kingdom Come: Deliverance 2 - Análisis Completo',
    description: 'Un viaje inmersivo a Bohemia medieval. Analicemos los grafismos, gameplay y narrativa de este esperado secuela.',
    content: `Kingdom Come: Deliverance 2 es una obra maestra de simulación medieval que desafía las convenciones de los videojuegos modernos.

Desde el primer momento, nos sumergimos en un mundo donde cada detalle importa. Los gráficos son impresionantes, especialmente en las cinemáticas y los entornos naturales. La atmósfera creada por Warhorse Studios es simplemente cautivadora.

La jugabilidad sigue el mismo patrón de inmersión total del primer juego. No hay minimapas, no hay marcadores objetivos. Todo se comunica a través de diálogos y cinemáticas naturales. Este enfoque puede parecer tedioso al principio, pero se convierte en increíblemente satisfactorio una vez que te adaptas.

El sistema de combate ha mejorado significativamente. Los enfrentamientos ahora son más fluidos y desafiantes. Necesitas aprender y practicar las combinaciones de movimientos, lo que hace que victoria se sienta verdaderamente ganada.

La narrativa es profunda y envolvente. Las misiones secundarias tienen el mismo peso y desarrollo que las principales, rara vez los juegos logran esto con tanta maestría.

Con más de 100 horas de contenido, este es un juego que demanda tu tiempo y atención, pero recompensa generosamente a quienes estén dispuestos a invertir en él.`,
    category: 'analisis',
    author: 'Admin',
    featured: true,
    rating: 9,
    imageAlt: 'Captura de Kingdom Come Deliverance 2',
    published: true,
  },
  {
    title: 'Elden Ring Shadow of the Erdtree - La Mejor Expansión Ever',
    description: 'FromSoftware nos entrega una expansión que supera al juego base. Nuevas áreas, enemigos legendarios y una historia emotiva.',
    content: `Shadow of the Erdtree es simplemente extraordinario. No es una expansión de relleno, sino una pieza de arte que expande y mejora el universo de Elden Ring.

Las nuevas áreas son bellísimas. Land of Shadow es misteriosa, compleja y visualmente impresionante. Cada zona tiene su propia identidad visual y atmosférica.

Los enemigos jefe nuevos son algunos de los mejores diseñados en toda la saga Souls. El sistema de combat se lleva a nuevas alturas con enemigos que exigen mastery absoluto de tus herramientas.

La narrativa que se revela en esta expansión añade profundidad significativa al lore de Elden Ring. Las cinemáticas finales son emotivas y dejan mucho en qué reflexionar.

El contenido es abundante. Entre 50 y 100 horas de nuevo contenido, dependiendo de qué tan minucioso seas. Hay cosas escondidas por encontrar constantemente.

Si jugaste Elden Ring y te encantó, esta expansión es obligatoria. Es la culminación de todo lo que FromSoftware ha aprendido en la saga Souls.`,
    category: 'analisis',
    author: 'Admin',
    featured: true,
    rating: 9.5,
    imageAlt: 'Elden Ring Shadow of the Erdtree',
    published: true,
  },
  {
    title: 'Balatro: El Roguelike de Cartas Que No Esperabas',
    description: 'Un juego indie que mezcla pocker, synergias locas y estadísticas totales que te enganchará por horas.',
    content: `Balatro es la prueba de que no necesitas un presupuesto AAA para crear experiencias adictivas e innovadoras.

La premisa es simple: crear manos de póker con puntuaciones cada vez más altas para derrotar oponentes progresivamente más difíciles. Pero la verdadera magia está en cómo la progresión se mantiene fresca a través de cientos de combinaciones de cartas de bonificación.

Cada run es diferente. Las sinergias que descubres, aunque seguidas, siempre lucen nuevas gracias a la abundancia de combinaciones posibles. Encontrar el combo ganador es intensamente satisfactorio.

El arte pixel art es hermoso. La música es pegadiza. La interfaz es clara a pesar de la complejidad de lo que sucede en pantalla.

Este es el tipo de juego que juegas "una mano más" a las 3 de la mañana. Altamente recomendado para fanáticos de roguelikes y personas que les gusta optimizar construcciones.`,
    category: 'opinion',
    author: 'Admin',
    featured: true,
    rating: 8.5,
    imageAlt: 'Balatro Card Game',
    published: true,
  },
  {
    title: 'La Industria de Videojuegos en 2025: Reflexiones en Mitad de Año',
    description: 'Conversación sobre las tendencias, lanzamientos y cambios que estamos viendo en la industria gamer este año.',
    content: `Estamos viviendo una época fascinante para los videojuegos. Después de años de conglomeraciones y fusiones masivas, ahora estamos viendo un resurgimiento de estudios independientes que rivalizan con producciones AAA.

Las máquinas console de nueva generación comienzan a mostrar su verdadero potencial. Ya no es solo gráficos mejorados, sino experiencias fundamentalmente diferentes en términos de carga de jugadores y presentación de mundos.

Los juegos live-service están recibiendo más escrutinio del público. Proyectos ambiciosos están siendo cancelados cuando no cumplen expectativas financieras. Esto es tanto malo como bueno.

El precio de los juegos también es punto de discusión actual. ¿Está justificado pagar 70 dólares? La industria está reconociendo que hay un punto de fatiga.

Pero lo más emocionante es ver cómo las voces independientes están ganando presencia. Juegos como Balatro, Dave the Diver y otros indie están ganando premios junto a producciones de millones.

El futuro se ve interesante, diverso y competitivo. Es un buen momento para ser gamer.`,
    category: 'podcast',
    author: 'Admin',
    featured: false,
    rating: 8,
    imageAlt: 'Gaming Industry 2025',
    published: true,
  },
  {
    title: 'Dune: Part Two - Película Épica para Amantes de la Ciencia Ficción',
    description: 'Denis Villeneuve logra lo imposible: crear una película de ciencia ficción épica, inteligente y visualmente deslumbrante.',
    content: `Dune: Part Two es un tour de force cinematográfico. Villeneuve entiende la fuente material y crea una adaptación que es fiel mientras mantiene su propia identidad visual distinpositivo.

Los efectos visuales son asombrosos. Arrakis se siente como un mundo real, hostil y hermoso simultáneamente. Cada plano es composición pura.

El elenco está perfectamente ensamblado. Timothée Chalamet continúa creciendo como actor. Zendaya, a pesar del tiempo limitido de pantalla, deja una impresión significativa.

Hans Zimmer proporciona una partitura que es simultaneamente bella e inquietante. Los temas recurrentes se entrelazan perfectamente con la narrativa.

La película mantiene el ritmo a lo largo de sus 166 minutos. No se siente larga, aunque definitivamente es épica en escala.

Para aquellos que aman la ciencia ficción inteligente y el cine presupuestado, esto es obligatorio. Es el tipo de película que se ve mejor en cine IMAX.`,
    category: 'opinion',
    author: 'Admin',
    featured: true,
    rating: 9,
    imageAlt: 'Dune Part Two',
    published: true,
  },
  {
    title: 'Cómo Makoto-san cambió los Metaversos (Podcast)',
    description: 'En este episodio especial, discutimos cómo una creadora de contenido revolucionó la forma en que pensamos en espacios virtuales.',
    content: `En este podcast exploramos la influencia inesperada que ciertos creadores han tenido en la industria de tecnología y metaversos.

La era del Web3 prometió mundos virtuales totalmente descentralizados. Muchos fallaron espectacularmente. Pero otros tienen éxito no por la tecnología, sino por la comunidad que construyen.

Discutimos cómo la autenticidad y el criterio artístico consistente pueden ser más valiosos que cualquier blockchain o criptomoneda.

También hablamos sobre las tendencias actuales en streaming y creación de contenido, y cómo la barrera para crear experiencias inmersivas ha bajado tremendamente para personas individuales.

Este es un episodio que invita a reflexión sobre el futuro de la tecnología y la creación.`,
    category: 'podcast',
    author: 'Admin',
    featured: false,
    rating: 7.5,
    imageAlt: 'Podcast metaversos',
    published: true,
  },
];

async function seedDatabase() {
  try {
    await connectDB();
    console.log('Base de datos conectada');

    // Limpiar artículos existentes
    await Article.deleteMany({});
    console.log('Artículos anteriores eliminados');

    // Insertar nuevos artículos
    const createdArticles = await Article.insertMany(sampleArticles);
    console.log(`${createdArticles.length} artículos creados exitosamente`);

    console.log('\nArtículos creados:');
    createdArticles.forEach((article) => {
      console.log(`- ${article.title} (${article.category}) - ID: ${article._id}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error al cargar datos de ejemplo:', error);
    process.exit(1);
  }
}

seedDatabase();
