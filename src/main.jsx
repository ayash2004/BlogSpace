// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { Provider } from 'react-redux'
// import store from './store/store.js'
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
// import Home from './pages/Home.jsx'
// import Login from './components/Login.jsx'
// import { AuthLayout, Login, Signup } from './components/index.js'
// import Post from './pages/Post'
// import {} from './pages/indexpages.js'

// const router = createBrowserRouter(createRoutesFromElements(
//   <Route path='/' element= {<App />} >
//     <Route path='/' element= {<Home /> }/>
//     <Route path='/login' element= {<AuthLayout authentication={false}> <Login /> </AuthLayout>}></Route>
//     <Route path='/signup' element= {<AuthLayout authentication={false}> <Signup /> </AuthLayout>}></Route>
//     {/* <Route path='/all-posts' element= {<AuthLayout authentication> <Allposts /> </AuthLayout>}></Route> */}
//     <Route path='/signup' element= {<AuthLayout authentication={false}> <Signup /> </AuthLayout>}></Route>

//   </Route>
// ))

import { createRoot } from "react-dom/client"
import React from "react"
import ReactDom from 'react-dom/client'
import App from "./App"
import './index.css'
import { Provider } from "react-redux"
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home.jsx"
import { AuthLayout, Login } from "./components/index.js"

import AddPost from './pages/AddPost.jsx'
import Signup from './pages/Signup.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import AllPosts from './pages/AllPosts.jsx'

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
