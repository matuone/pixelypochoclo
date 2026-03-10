import { useParams } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import ArticleForm from '../components/ArticleForm';

export default function EditArticlePage() {
  const { id } = useParams();

  return (
    <AdminLayout>
      <div>
        <h2 style={{ marginTop: 0, marginBottom: '2rem' }}>Editar Artículo</h2>
        <ArticleForm articleId={id} />
      </div>
    </AdminLayout>
  );
}
