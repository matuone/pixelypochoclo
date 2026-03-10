import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { articleService } from '../../services/articleService';
import '../styles/ArticleForm.css';

export default function ArticleForm({ articleId = null, onSuccess = null }) {
  const navigate = useNavigate();
  const params = useParams();
  const id = articleId || params.id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'analisis',
    author: 'Admin',
    featured: false,
    rating: 5,
    imageAlt: '',
    published: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  useEffect(() => {
    if (id && id !== 'new') {
      loadArticle(id);
    }
  }, [id]);

  const loadArticle = async (articleId) => {
    try {
      const data = await articleService.getById(articleId);
      const article = data.data;
      setFormData({
        title: article.title,
        description: article.description,
        content: article.content,
        category: article.category,
        author: article.author,
        featured: article.featured,
        rating: article.rating,
        imageAlt: article.imageAlt,
        published: article.published,
      });
      setExistingImage(article.image);
      setImagePreview(article.image);
    } catch (err) {
      setError('Error al cargar el artículo');
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImagePreview(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('featured', formData.featured);
      formDataToSend.append('rating', formData.rating);
      formDataToSend.append('imageAlt', formData.imageAlt || formData.title);
      formDataToSend.append('published', formData.published);

      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      let response;
      if (id && id !== 'new') {
        response = await articleService.update(id, formDataToSend);
      } else {
        if (!imageFile) {
          setError('La imagen es requerida para crear un nuevo artículo');
          setLoading(false);
          return;
        }
        response = await articleService.create(formDataToSend);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/admin/articles');
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="article-form" onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="form-main">
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="title">Título *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Ej: Kingdom Come Deliverance 2 - Análisis"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Categoría *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="analisis">Análisis</option>
                <option value="opinion">Opinión</option>
                <option value="podcast">Podcast</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rating">Puntuación</label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="0"
                max="10"
                step="0.5"
                value={formData.rating}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción Breve *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="3"
              placeholder="Breve descripción que aparecerá en la tarjeta..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Contenido Completo *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows="8"
              placeholder="Contenido completo del artículo..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="author">Autor</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Nombre del autor"
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageAlt">Texto Alt Imagen</label>
              <input
                type="text"
                id="imageAlt"
                name="imageAlt"
                value={formData.imageAlt}
                onChange={handleInputChange}
                placeholder="Descripción de la imagen"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-checkbox">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
              />
              <label htmlFor="featured">Destacar artículo</label>
            </div>

            <div className="form-checkbox">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleInputChange}
              />
              <label htmlFor="published">Publicado</label>
            </div>
          </div>
        </div>

        <div className="form-sidebar">
          <div className="form-group">
            <label htmlFor="image">Imagen *</label>
            <div className="image-upload">
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              )}
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="image-input"
              />
              <label htmlFor="image" className="image-upload-label">
                {imagePreview ? 'Cambiar imagen' : 'Subir imagen'}
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Guardando...' : id && id !== 'new' ? 'Actualizar' : 'Crear'}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/admin/articles')}
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}
