const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const upload = require('../middleware/fileUpload');

// Rutas públicas (GET)
router.get('/', articleController.getAllArticles);
router.get('/by-id/:id', articleController.getArticleById);
router.get('/by-slug/:slug', articleController.getArticleBySlug);
router.get('/category/:category', articleController.getArticlesByCategory);

// Rutas de admin (POST, PUT, DELETE)
// En producción, agregar middleware de autenticación aquí
router.post('/', upload.single('image'), articleController.createArticle);
router.put('/:id', upload.single('image'), articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
