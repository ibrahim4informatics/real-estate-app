import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import { ShowSignInContext } from "./pages/_Layout";
import { useState } from "react";


import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

// Now you can use Swiper
const swiper = new Swiper('.swiper', {
  // Install modules
  modules: [Navigation, Pagination, Scrollbar],
  speed: 500,
  mousewheel: { enabled: true },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // ...
});


const routes = createBrowserRouter([
  { path: '/', element: <HomePage />, errorElement: "" },
  { path: '/search', element: <SearchPage />, errorElement: "" },

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
