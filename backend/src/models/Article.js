const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      default: 'Article image',
    },
    category: {
      type: String,
      enum: ['analisis', 'opinion', 'podcast'],
      required: true,
    },
    author: {
      type: String,
      default: 'Admin',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

// Generar slug antes de guardar
articleSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

module.exports = mongoose.model('Article', articleSchema);
