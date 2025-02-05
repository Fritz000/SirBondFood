import React from 'react'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contacts from './pages/Contacts'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Signup from './pages/Signup'
import Verify from './pages/Verify'
import Registrationsuccessful from './pages/Registrationsuccessful'
import Signin from './pages/Signin'
import Resetpassword from './pages/Resetpassword'
import Securitycode from './pages/Securitycode'
import Reset from './pages/Reset'
import Passwordresetsuccesfully from './pages/Passwordresetsuccesfully'
import EmptyCart from './pages/Emptycart'

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
      <Route path='Registrationsuccessful' element={<Registrationsuccessful />} />
      <Route path='Signin' element={<Signin />} />
      <Route path='Resetpassword' element={<Resetpassword />} />
      <Route path='Securitycode' element={<Securitycode />} /> 
      <Route path='Reset' element={<Reset />} />  
      <Route path='Passwordresetsuccesfully' element={<Passwordresetsuccesfully />} />
      <Route path='Emptycart' element={<EmptyCart />} />
  
      </Route>
    )

  )


  return (
    <RouterProvider router={router}/>
  )
}

export default App
