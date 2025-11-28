import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './component/MainLayout'
import Home from './pages/Home'
import Ok from './pages/Ok'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path:"/simulator",
        element:<Ok />
      },
           {
        path:"/compare",
        element:<Ok />
      }
    ]
  }
])

export default routes
