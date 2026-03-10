import { useState, useEffect } from 'react';
import { articleService } from '../services/articleService';

export function useArticles(params = {}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await articleService.getAll(params);
        setArticles(data.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [JSON.stringify(params)]);

  return { articles, loading, error };
}

export function useArticleBySlug(slug) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await articleService.getBySlug(slug);
        setArticle(data.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  return { article, loading, error };
}
