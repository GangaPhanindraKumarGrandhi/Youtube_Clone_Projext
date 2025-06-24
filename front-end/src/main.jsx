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
import MainContent from './components/MainContent.jsx'


const appRoute = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<MainContent />
      },
      {
       path:"/videos/:id",
       element:<VideoPlay/>
      },
      {
         path:"/viewChannel",
         element:<ChannelPage/>
      }
    ]
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
}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* ✅ Wrap entire app in provider */}
      <RouterProvider router={appRoute} />
    </UserProvider>
  </StrictMode>,
)
