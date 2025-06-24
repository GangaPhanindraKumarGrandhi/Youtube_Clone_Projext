import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import LoginUser from './components/Login.jsx'
import VideoPlay from './components/VideoPLay.jsx'
import Signup from './components/Signup.jsx'
import CreateChannel from './components/CreateChannel.jsx';
import './App.css'
import ChannelPage from './components/ChannelPage.jsx'
import { UserProvider } from './context/UserContext';


const appRoute = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/login",
    element:<LoginUser/>
  },
  {
    path:"/signup",     
    element:<Signup/>
  },
  {
  path: "/channel/create",
  element: <CreateChannel />
},
  {
    path:"/viewChannel",
    element:<ChannelPage/>
  },
  {
    path:"/videos/:id",
    element:<VideoPlay/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* ✅ Wrap entire app in provider */}
      <RouterProvider router={appRoute} />
    </UserProvider>
  </StrictMode>,
)
