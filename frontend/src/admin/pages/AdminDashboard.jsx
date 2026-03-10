import AdminLayout from '../components/AdminLayout';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div>
        <h2 style={{ marginTop: 0 }}>Bienvenido al Panel de Admin</h2>
        <p>Aquí puedes gestionar todo el contenido de Pixel y Pochoclo.</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            border: '1px solid var(--line)',
            borderRadius: '6px'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>📝 Artículos</h3>
            <p style={{ margin: 0, opacity: 0.7 }}>Crear, editar y eliminar artículos</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            border: '1px solid var(--line)',
            borderRadius: '6px'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>🎯 Categorías</h3>
            <p style={{ margin: 0, opacity: 0.7 }}>Análisis, Opinión, Podcast</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            border: '1px solid var(--line)',
            borderRadius: '6px'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>📊 Estadísticas</h3>
            <p style={{ margin: 0, opacity: 0.7 }}>Vistas, engagement, etc.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
