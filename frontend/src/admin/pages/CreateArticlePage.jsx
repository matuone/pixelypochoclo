import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import ArticleForm from '../components/ArticleForm';

export default function CreateArticlePage() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div>
        <h2 style={{ marginTop: 0, marginBottom: '2rem' }}>Crear Nuevo Artículo</h2>
        <ArticleForm />
      </div>
    </AdminLayout>
  );
}
