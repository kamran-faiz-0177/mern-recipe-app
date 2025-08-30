import React from 'react'
import Signup from './Pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './Pages/Signin'
import Navbar from './Components/Navbar'
import CreateRecipe from './Pages/CreateRecipe'
import Home from './Pages/Home'
import PageNotFound from './Pages/PageNotFound'
import ReadMore from './Pages/ReadMore'
import { useSelector } from 'react-redux';
import MyRecipe from './Pages/MyRecipe'

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log('from app.js', isLoggedIn);
  return (
    <BrowserRouter>
      {
        isLoggedIn ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/createrecipe" element={<CreateRecipe />} />
              <Route path="/createrecipe/:id" element={<CreateRecipe />} />
              <Route path="/readmore/:id" element={<ReadMore />} />
              <Route path="/myrecipe" element={<MyRecipe />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </>
        )
      }
    </BrowserRouter>
  )
}

export default App