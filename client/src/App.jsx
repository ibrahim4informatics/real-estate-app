import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import PostPage from "./pages/PostPage"
import { ShowSignInContext } from "./pages/_Layout";
import { useState } from "react";



const routes = createBrowserRouter([
  { path: '/', element: <HomePage />, errorElement: "" },
  { path: '/annonces', element: <SearchPage />, errorElement: "" },
  { path: '/annonces/:id', element: <PostPage />, errorElement: "" },

])
function App() {

  const [showSignIn, setShowSignIn] = useState(false);


  return (
    <>

      <ShowSignInContext.Provider value={{ showSignIn, setShowSignIn }}>
        <RouterProvider router={routes} />
      </ShowSignInContext.Provider>

    </>
  )
}

export default App
