import { Link, Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="app-shell">
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
