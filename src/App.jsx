import React from 'react'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contacts from './pages/Contacts'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Signup from './pages/Signup'
import Verify from './pages/Verify'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
      <Route path='Products' element={<Products />} />
      <Route path='About' element={<About />} />
      <Route path='Contacts' element={<Contacts />} />
      <Route path='Signup' element={<Signup />} />
      <Route path='Verify' element={<Verify />} />
  
      </Route>
    )

  )


  return (
    <RouterProvider router={router}/>
  )
}

export default App
