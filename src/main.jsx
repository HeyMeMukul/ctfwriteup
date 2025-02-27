import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

import PrivacyPolicy from './pages/PolicyPage.jsx'
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import authService from './appwrite/auth.js'
import Post from "./pages/Post";
import { Link } from "react-router-dom";

import AllPosts from "./pages/AllPosts";
import Profile from "./pages/Profile";


authService.getCurrentUser().then((userData) => {
    if (userData) {
        setUser({
            ...userData,
            id: userData.$id,
            joined: formatDate(userData.registration),
        });
    }
});
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
        {
            path: "/about",
            element: (
               
                    <About />
                
            ),
        },
        {
            path: "/contact",
            element: (
                
                    <Contact />
                
            ),
        },
        {
            path: "/privacy",
            element: (
               
                    <PrivacyPolicy />
                
            ),
        },
        {
            path : "/profile",
            element: (
                <AuthLayout authentication>
                    <Profile />
                </AuthLayout>
            ),
        },
     

    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
