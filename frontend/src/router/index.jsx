import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomeView from '../views/HomeView'
import NotFoundView from '../views/NotFoundView'

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
        path: '*',
        element: <NotFoundView />,
      },
    ],
  },
])
