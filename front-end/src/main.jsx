import { StrictMode,Suspense,lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'


const App = lazy(()=> import('./App.jsx'))
const LoginUser = lazy(()=> import("./components/Login.jsx"))
const VideoPlay = lazy(()=>import("./components/VideoPLay.jsx"))
const Signup = lazy(()=> import("./components/Signup.jsx"))
const CreateChannel = lazy(()=>import("./components/CreateChannel.jsx"))
const ChannelPage = lazy(()=>import("./components/ChannelPage.jsx"))
const MainContent = lazy(()=>import("./components/MainContent.jsx"))
const VideoForm = lazy(()=> import("./components/VideoForm.jsx"))
const NotFound = lazy(()=>import("./components/NotFoundPage.jsx"))
import { UserProvider } from './context/UserContext';

export const Loading = ()=><div style={{padding:"50px",textAlign:"center"}}>Loading..</div>
const appRoute = createBrowserRouter([
  {
    path:"/",
    element:(
      <Suspense fallback={<Loading/>}>
        <App/>
      </Suspense>
    ),
    children: [
      { path: "/", element: <MainContent /> },
      { path: "/videos/:id", element: <VideoPlay /> },
      { path: "/viewChannel", element: <ChannelPage /> },
    ],
  },
  {
    path:"/login",
    element:(
      <Suspense fallback={<Loading/>}>
        <LoginUser/>
      </Suspense>
    )
  },
  {
    path:"/signup",     
    element:(
      <Suspense fallback={<Loading/>}>
        <Signup/>
      </Suspense>
    )
  },
  {
  path: "/channel/create",
  element:(
    <Suspense fallback={<Loading/>}>
      <CreateChannel />
    </Suspense>
  )
},
{
  path:"/create-video",
  element:(
    <Suspense fallback={<Loading/>}>
      <VideoForm/>
    </Suspense>
  )
},
{
  path:"/edit-video/:id",
  element:(
    <Suspense fallback={<Loading/>}>
      <VideoForm/>
    </Suspense>
  )
},
{
  path:"*",
element:(
  <Suspense fallback={<Loading/>}>
    <NotFound/>
  </Suspense>
)
}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* Wrap entire app in provider */}
      <RouterProvider router={appRoute} />
      <ToastContainer position="top-right" autoClose={3000} />
    </UserProvider>
  </StrictMode>,
)
