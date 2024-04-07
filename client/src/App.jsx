import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
/** import all components // STEP 4 ->Step 5 Create UI for the Username */
import Username from './components/Username.jsx'
import Register from './components/Register.jsx'
import Recovery from './components/Recovery.jsx'
import Password from "./components/Password.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import Reset from './components/Reset.jsx'
import Profile from './components/Profile.jsx'

// auth middleware
import { AuthorizeUser, ProtectRoute } from "./middleware/auth.jsx";

/**  root routes // STEP 3 -> Step 4 is making components   */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username></Username>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/profile',
    element: <AuthorizeUser><Profile /></AuthorizeUser>
  },
  {
    path: '/password',
    element: <ProtectRoute><Password /></ProtectRoute>
  },
  {
    path: '/reset',
    element: <Reset></Reset>
  },
  {
    path: '/recovery',
    element: <Recovery></Recovery>
  },
  {
    path: '/*',
    element: <PageNotFound></PageNotFound>
  }
])


function App() {
  return (
    <>
      <main>
        <RouterProvider router={router}></RouterProvider>
        {/* <div>React App this</div> */}
      </main>
    </>
  )
}

export default App
