import { Link, Outlet } from 'react-router-dom'
import DynamicBackground from '../components/common/DynamicBackground'

export default function MainLayout() {
  return (
    <div className="app-shell">
      <DynamicBackground />
      <header className="app-header">
        <Link className="brand" to="/">
          Pixel y Pochoclo
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
