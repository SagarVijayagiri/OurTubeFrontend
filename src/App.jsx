import { useState } from 'react'


import './App.css'
import { Login } from "./components/Login"
import { Signup } from "./components/Signup"
import { Video } from "./components/dashboard/Video/Video"
import { UpdateVideo } from "./components/UpdateVideo"
import { Dashboard } from "./components/dashboard/Dashboard"
import { Home } from "./components/dashboard/Home"
import { Myvideos } from "./components/dashboard/Myvideos"
import { Uploadvideos } from "./components/dashboard/Uploadvideos"
import { createBrowserRouter, RouterProvider , Navigate  } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
//import { Logout } from "./components/dashboard/Logout";








function App() {
  const myroutes = createBrowserRouter([
    //{ path: '/', element: <Dashboard /> },
    { path: '/', element: <Navigate to="/dashboard" /> },
    { path: '/signup', element: <Signup /> },
    { path: '/login', element: <Login /> },
    //{ path: '/video/:id', element: <Video /> },
    { path: '/dashboard', element: <Dashboard />,children:[
      {index: true, element: <Home /> },
      {path:'home', element: <Home /> },
      {path:'uploadvideos', element: <Uploadvideos /> },
      {path:'myvideos', element: <Myvideos /> },
      { path: 'video/:id', element: <Video /> },
      //{path:'logout', element: <Logout /> }
      ] },
      { path:"/update/:id", element:<UpdateVideo /> },
    //{ path="/",element:<Home /> }
  ])

  return (
    <>
      <RouterProvider router={myroutes} />
      <ToastContainer />
    </>
  )
}

export default App