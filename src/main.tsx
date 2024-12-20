import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile/Dashboard'
import { Settings } from './pages/Profile/Settings'
import { Layout } from './pages/Profile/Layout'
import { Posts } from './pages/Profile/Posts'
import { Search } from './pages/Profile/Search'

const routes = createBrowserRouter([
  {
    path:'',
    element:<Signup/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'profile',
    element:<Layout/>,
    children:[
      {
        path: '',
        element: <Profile/>,
      },
      {
        path: 'settings',
        element: <Settings/>,
      },
      {
        path: 'posts',
        element: <Posts/>,
      },
      {
        path: 'search',
        element: <Search/>,
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider  router={routes}>
    </RouterProvider>
  </StrictMode>,
)
