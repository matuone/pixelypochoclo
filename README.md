# Pixel y Pochoclo - Sistema de Artículos

Web de análisis, opiniones y podcasts sobre videojuegos y películas, con panel de administración para gestionar artículos.

## ⚡ Inicio Rápido

### 1. MongoDB (primero)

Asegúrate de tener MongoDB ejecutándose en tu máquina:

```bash
# En Windows (si está instalado como servicio)
net start MongoDB

# O si tienes Docker:
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Cargar Datos de Ejemplo

En otra terminal:
```bash
cd backend
npm run seed
```

### 4. Frontend

En otra terminal:
```bash
cd frontend
npm install
npm run dev
```

✅ Listo! Abre [http://localhost:5173](http://localhost:5173)

## 🚀 Requisitos

- Node.js 16+
- npm o yarn
- MongoDB (local o Atlas)

## 📦 Instalación Completa

### Backend

```bash
cd backend
npm install
```

Configurar `.env` con tu instancia de MongoDB:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pixelypochoclo
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Iniciar el servidor:
```bash
npm run dev  # Development con nodemon
npm start    # Producción
```

Cargar datos de ejemplo:
```bash
npm run seed
```

El API estará en `http://localhost:5000/api`

### Frontend

```bash
cd frontend
npm install
```

El archivo `.env` ya está configurado con `VITE_API_BASE_URL=http://localhost:5000/api`

Iniciar el desarrollo:
```bash
npm run dev
```

La aplicación estará en `http://localhost:5173`

## 🎯 Características

### Frontend
- 📸 Grid de artículos con imágenes
- 🔍 Página de detalle de artículo (por slug)
- 📱 Diseño responsive
- ✨ Animaciones y transiciones suaves
- 🎨 Diseño minimalista con colores personalizados


### Backend API
- `GET /api/articles` - Obtener todos los artículos (con paginación y filtros)
- `GET /api/articles/by-id/:id` - Obtener artículo por ID
- `GET /api/articles/by-slug/:slug` - Obtener artículo por slug
- `GET /api/articles/category/:category` - Obtener artículos por categoría
- `POST /api/articles` - Crear artículo (con imagen)
- `PUT /api/articles/:id` - Actualizar artículo
- `DELETE /api/articles/:id` - Eliminar artículo

### Panel Admin
- 📊 Dashboard de administración
- ✏️ Crear, editar y eliminar artículos
- 🖼️ Subir imágenes
- 📁 Gestionar categorías (Análisis, Opinión, Podcast)
- ⭐ Marcar artículos como destacados
- 📈 Ver estadísticas de vistas

## 🔗 Rutas del Frontend

### Públicas
- `/` - Inicio con artículos por categoría
- `/article/:slug` - Página de detalle del artículo

### Admin
- `/admin` - Dashboard
- `/admin/articles` - Lista de artículos
- `/admin/articles/new` - Crear artículo
- `/admin/articles/:id` - Editar artículo

## 🗄️ Modelo de Datos

### Article

```javascript
{
  title: String,                // Título del artículo
  slug: String,                 // URL-friendly (auto-generado)
  description: String,          // Breve descripción
  content: String,              // Contenido completo
  image: String,                // Ruta de imagen
  imageAlt: String,            // Texto alt para SEO
  category: String,             // 'analisis', 'opinion', 'podcast'
  author: String,               // Nombre del autor
  featured: Boolean,            // Destacar en home
  published: Boolean,           // Publicado o borrador
  views: Number,                // Contador de vistas
  rating: Number,               // 0-10
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Colores y Tipografía

### Variables CSS
- `--bg-bone`: #f9f3eb (Blanco hueso)
- `--bg-rose`: #efc1b8 (Rosa pastel)
- `--ink`: #2f232a (Tinta oscura)
- `--line`: rgba(58, 38, 49, 0.14) (Líneas)
- `--surface`: rgba(255, 255, 255, 0.55) (Superficie)

### Tipografía
- Fuente principal: Special Elite (Google Fonts)
- Fallback: Courier New, Courier, monospace

## 📸 Estructura de Carpetas

```
pixelypochoclo/
├── backend/
│   ├── src/
│   │   ├── models/       # Esquemas MongoDB
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── routes/       # Rutas API
│   │   ├── middleware/   # Express middleware
│   │   └── config/       # Configuración
│   ├── uploads/          # Imágenes subidas
│   └── server.js         # Entrada del servidor
├── frontend/
│   ├── src/
│   │   ├── views/        # Páginas principales
│   │   ├── components/   # Componentes reutilizables
│   │   ├── admin/        # Panel administrador
│   │   ├── styles/       # CSS global
│   │   ├── hooks/        # React hooks
│   │   ├── services/     # API client
│   │   ├── router/       # Configuración de rutas
│   │   └── assets/       # Imágenes, fuentes
│   └── vite.config.js
└── README.md
```

## 🚢 Deployment

### Backend (Producción)
1. Cambiar `NODE_ENV` a "production"
2. Usar MongoDB Atlas en lugar de local
3. Desplegar en Heroku, Railway, Vercel, etc.

### Frontend (Producción)
```bash
npm run build
npm run preview
```

## 🐛 Troubleshooting

### "Cannot find module 'mongoose'"
```bash
cd backend && npm install
```

### API 404
Asegúrate de que el backend está ejecutándose en `http://localhost:5000`

### Imágenes no cargan
Verifica que la carpeta `backend/uploads/articles/` existe y el servidor sirve archivos estáticos

## 📝 Próximas mejoras

- [ ] Autenticación admin
- [ ] Búsqueda de artículos
- [ ] Comentarios de usuarios
- [ ] Sistema de tags
- [ ] Generación de sitemap
- [ ] SEO meta tags dinámicos
- [ ] Caché de imágenes

## 📄 Licencia

MIT
