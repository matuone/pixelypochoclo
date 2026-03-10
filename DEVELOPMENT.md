# Guía de Desarrollo - Pixel y Pochoclo

## 🏗️ Arquitectura General

```
FRONTEND (React + Vite)          BACKEND (Node.js + Express)          DATABASE (MongoDB)
├── Admin Panel                  ├── Article API                       ├── articles
├── Artículos Grid              ├── Image Upload                       └── índices
└── Detalle Artículo            └── CORS Handler                        (bson documents)
```

## 🔧 Stack Tecnológico

### Backend
- **Express.js**: Framework HTTP
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **Multer**: Manejo de archivos (imágenes)
- **CORS**: Control de acceso cross-origin
- **Nodemon**: Auto-reload en desarrollo

### Frontend
- **React 18**: Framework UI
- **Vite**: Bundler (muy rápido)
- **React Router v6**: Enrutamiento
- **Framer Motion**: Animaciones
- **Lucide React**: Iconos SVG

## 📁 Estructura del Backend

```
backend/
├── src/
│   ├── models/
│   │   └── Article.js           # Schema MongoDB + métodos pre-save
│   ├── controllers/
│   │   └── articleController.js # Lógica CRUD + estadísticas
│   ├── routes/
│   │   └── articleRoutes.js      # Rutas y middlewares
│   ├── middleware/
│   │   └── fileUpload.js         # Configuración multer
│   └── config/
│       └── db.js                 # Conexión MongoDB
├── uploads/
│   └── articles/                 # Imágenes de artículos
├── server.js                     # Punto de entrada
├── seed.js                       # Datos de ejemplo
└── package.json
```

### API Endpoints

#### GET (Público)

```
GET /api/articles
  ?category=analisis      # Filtrar por categoría
  ?featured=true          # Solo destacados
  ?limit=12              # Items por página (default: 12)
  ?skip=0                # Offset para paginación

GET /api/articles/by-id/:id
GET /api/articles/by-slug/:slug
GET /api/articles/category/:category
```

#### POST/PUT/DELETE (Admin)

```
POST /api/articles                    # Crear (multipart/form-data)
  - title*
  - description*
  - content*
  - category* (analisis|opinion|podcast)
  - image* (file upload)
  - author
  - featured (boolean)
  - rating (0-10)
  - imageAlt
  - published

PUT /api/articles/:id                 # Actualizar (mismo formato)
DELETE /api/articles/:id              # Eliminar
```

## 📁 Estructura del Frontend

```
frontend/src/
├── views/
│   ├── HomeView.jsx         # Página de inicio con 3 secciones
│   ├── ArticleDetailView.jsx # Detalle de artículo (por slug)
│   └── NotFoundView.jsx
├── admin/
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminArticlesPage.jsx
│   │   ├── CreateArticlePage.jsx
│   │   └── EditArticlePage.jsx
│   ├── components/
│   │   ├── AdminLayout.jsx   # Sidebar + header admin
│   │   └── ArticleForm.jsx   # Formulario CRUD
│   └── styles/
│       ├── AdminLayout.css
│       ├── ArticleForm.css
│       └── ArticlesAdminPage.css
├── components/
│   ├── ArticlesGrid/
│   │   ├── ArticlesGrid.jsx  # Grid responsive de artículos
│   │   ├── ArticlesGrid.css
│   │   └── ArticleDetailView.css
│   └── common/
│       ├── DynamicBackground.jsx
│       └── PageContainer.jsx
├── hooks/
│   ├── useArticles.js        # useArticles, useArticleBySlug
│   └── useDocumentTitle.js
├── services/
│   └── articleService.js     # API client (fetch)
├── router/
│   └── index.jsx             # Rutas principales
├── layouts/
│   └── MainLayout.jsx        # Header + nav + outlet
├── styles/
│   ├── App.css
│   └── index.css             # CSS global
└── assets/
    └── images/
        └── logo.png
```

## 🔄 Flujo de Datos

### Obtener Artículos
```
ArticlesGrid.jsx
  ↓
useArticles() [hook]
  ↓
articleService.getAll() [fetch]
  ↓
GET /api/articles [backend]
  ↓
Article.find() [MongoDB]
```

### Crear Artículo
```
CreateArticlePage.jsx
  ↓
ArticleForm.jsx (multipart/form-data)
  ↓
articleService.create(formData)
  ↓
POST /api/articles [backend]
  ↓
multer guarda imagen en /uploads/articles
  ↓
Article.create() [MongoDB]
```

## 🎨 Variables CSS Globales

```css
--bg-bone: #f9f3eb         /* Blanco hueso */
--bg-rose: #efc1b8         /* Rosa pastel */
--ink: #2f232a             /* Tinta oscura */
--line: rgba(58,38,49,0.14) /* Bordes */
--surface: rgba(255,255,255,0.55) /* Superficies */
```

## 🏷️ Categorías

- **analisis**: 🔍 Análisis profundos
- **opinion**: 💭 Opiniones y reseñas
- **podcast**: 🎙️ Contenido de audio

## 📊 Modelo Article

```javascript
{
  _id: ObjectId,
  title: String,              // Título principal
  slug: String,              // URL-friendly (auto-generado)
  description: String,       // Resumen breve (muestra en grid)
  content: String,           // Contenido completo (muestra en detalle)
  image: String,             // Ruta: /uploads/articles/123.jpg
  imageAlt: String,          // Para accesibilidad
  category: String,          // enum: analisis|opinion|podcast
  author: String,            // Autor del artículo
  featured: Boolean,         // Destacar en home
  published: Boolean,        // Publicado vs borrador
  rating: Number,           // 0-10 (para películas/juegos)
  views: Number,            // Incrementa al ver artículo
  createdAt: Date,          // Auto-generado
  updatedAt: Date           // Auto-generado
}
```

## 🔐 Seguridad Actual

⚠️ **NO HAY AUTENTICACIÓN** - El panel admin es accesible públicamente

Para producción, agregar:

```javascript
// middleware/auth.js
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Aplicar a rutas POST/PUT/DELETE
router.post('/', authMiddleware, upload.single('image'), createArticle);
```

## 🚀 Desarrollo Local

### Terminal 1: MongoDB
```bash
# Windows Service
net start MongoDB

# O Docker
docker run -d -p 27017:27017 mongo
```

### Terminal 2: Backend
```bash
cd backend
npm install
npm run seed  # Cargar datos de ejemplo
npm run dev   # Iniciar servidor en puerto 5000
```

### Terminal 3: Frontend
```bash
cd frontend
npm install
npm run dev   # Iniciar frontend en puerto 5173
```

## 📝 Crear Nuevo Artículo Manualmente

1. Ir a [/admin/articles/new](http://localhost:5173/admin/articles/new)
2. Llenar formulario:
   - Título *
   - Descripción breve *
   - Contenido completo *
   - Categoría *
   - Imagen * (JPG, PNG, WebP, GIF - máx 5MB)
   - Autor (default: "Admin")
   - Puntuación (0-10)
   - Destacar (checkbox)
   - Publicado (checkbox)
3. Hacer click "Crear"
4. Se redirige a [/admin/articles](http://localhost:5173/admin/articles)
5. El artículo aparece en el grid por slug

## 🐛 Debugging Common Issues

### "Cannot GET /api/articles"
- ¿Está corriendo el backend en puerto 5000?
- ¿MONGODB_URI en .env es correcto?
- ¿MongoDB está ejecutándose?

### Las imágenes no cargan en admin
- ¿Carpeta backend/uploads/articles existe?
- ¿Multer está configurado para servir estáticos?
- Ver: `app.use('/uploads', express.static(path.join(__dirname, 'uploads')));`

### CORS Error
- Revisar FRONTEND_URL en backend/.env
- Default: http://localhost:5173

### Slug duplicado
- El modelo tiene `unique: true` en slug
- Si intentas crear título igual, fallará
- Solución: Editar título anterior o hacer delete

## 🔄 Workflows Comunes

### Agregar nueva categoría

1. Actualizar en `backend/src/models/Article.js`:
```javascript
category: {
  type: String,
  enum: ['analisis', 'opinion', 'podcast', 'nueva'], // Agregar aqui
  required: true,
}
```

2. Actualizar UI en componentes

3. Actualizar HomeView.jsx para mostrar sección nueva

### Cambiar colores

Editar `frontend/src/styles/index.css`:
```css
:root {
  --bg-bone: #NUEVO_COLOR;
  --bg-rose: #NUEVO_COLOR;
  /* etc */
}
```

## 📈 Próximas Mejoras

- [ ] Authentication con JWT
- [ ] Búsqueda full-text
- [ ] Filtros avanzados (fecha, autor)
- [ ] Tags/etiquetas
- [ ] Comentarios de usuarios
- [ ] Generación de sitemap.xml
- [ ] Cache de imágenes con sharp
- [ ] CDN para imágenes
- [ ] Paginación en grid
- [ ] Contador de lectores en tiempo real

## 🎓 Recursos

- [MongoDB Docs](https://docs.mongodb.com/)
- [Express Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
