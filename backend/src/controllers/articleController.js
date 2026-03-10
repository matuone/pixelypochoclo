const Article = require('../models/Article');
const path = require('path');
const fs = require('fs');

// Obtener todos los artículos
exports.getAllArticles = async (req, res) => {
  try {
    const { category, featured, limit = 12, skip = 0 } = req.query;

    let query = { published: true };

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    const articles = await Article.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await Article.countDocuments(query);

    res.status(200).json({
      success: true,
      data: articles,
      total,
      limit: parseInt(limit),
      skip: parseInt(skip),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Obtener artículo por ID
exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artículo no encontrado',
      });
    }

    // Incrementar vistas
    article.views += 1;
    await article.save();

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Obtener artículo por slug
exports.getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await Article.findOne({ slug });

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artículo no encontrado',
      });
    }

    // Incrementar vistas
    article.views += 1;
    await article.save();

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Crear artículo
exports.createArticle = async (req, res) => {
  try {
    const { title, description, content, category, author, featured, rating, imageAlt } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'La imagen es requerida',
      });
    }

    const image = `/uploads/articles/${req.file.filename}`;

    const article = new Article({
      title,
      description,
      content,
      category,
      author,
      featured: featured === 'true' || featured === true,
      rating: parseInt(rating) || 5,
      image,
      imageAlt: imageAlt || title,
    });

    await article.save();

    res.status(201).json({
      success: true,
      data: article,
      message: 'Artículo creado exitosamente',
    });
  } catch (error) {
    // Eliminar imagen si la creación falla
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.log('Error al eliminar imagen:', err);
      });
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Actualizar artículo
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, category, author, featured, rating, imageAlt, published } = req.body;

    let article = await Article.findById(id);

    if (!article) {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.log('Error al eliminar imagen:', err);
        });
      }
      return res.status(404).json({
        success: false,
        message: 'Artículo no encontrado',
      });
    }

    // Si hay nueva imagen, eliminar la anterior
    if (req.file) {
      const oldImagePath = path.join(__dirname, '../../.' + article.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => {
          if (err) console.log('Error al eliminar imagen anterior:', err);
        });
      }
      article.image = `/uploads/articles/${req.file.filename}`;
    }

    article.title = title || article.title;
    article.description = description || article.description;
    article.content = content || article.content;
    article.category = category || article.category;
    article.author = author || article.author;
    article.featured = featured !== undefined ? (featured === 'true' || featured === true) : article.featured;
    article.rating = rating !== undefined ? parseInt(rating) : article.rating;
    article.imageAlt = imageAlt || article.imageAlt;
    article.published = published !== undefined ? (published === 'true' || published === true) : article.published;

    await article.save();

    res.status(200).json({
      success: true,
      data: article,
      message: 'Artículo actualizado exitosamente',
    });
  } catch (error) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.log('Error al eliminar imagen:', err);
      });
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Eliminar artículo
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndDelete(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artículo no encontrado',
      });
    }

    // Eliminar imagen
    const imagePath = path.join(__dirname, '../../.' + article.image);
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) console.log('Error al eliminar imagen:', err);
      });
    }

    res.status(200).json({
      success: true,
      message: 'Artículo eliminado exitosamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Obtener artículos por categoría
exports.getArticlesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 12, skip = 0 } = req.query;

    const articles = await Article.find({ category, published: true })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await Article.countDocuments({ category, published: true });

    res.status(200).json({
      success: true,
      data: articles,
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
