import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomeView from '../views/HomeView'
import NotFoundView from '../views/NotFoundView'
import ArticleDetailView from '../views/ArticleDetailView'
import AdminDashboard from '../admin/pages/AdminDashboard'
import AdminArticlesPage from '../admin/pages/AdminArticlesPage'
import CreateArticlePage from '../admin/pages/CreateArticlePage'
import EditArticlePage from '../admin/pages/EditArticlePage'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: 'article/:slug',
        element: <ArticleDetailView />,
      },
      {
        path: '*',
        element: <NotFoundView />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/articles',
    element: <AdminArticlesPage />,
  },
  {
    path: '/admin/articles/new',
    element: <CreateArticlePage />,
  },
  {
    path: '/admin/articles/:id',
    element: <EditArticlePage />,
  },
])
