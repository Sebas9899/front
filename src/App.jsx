import { useContext } from 'react'
import { Route, Routes } from 'react-router'
import { Admin } from './components/pages/Admin'
import { Login } from './components/pages/Auth/Login'
import { Register } from './components/pages/Auth/Register'
import { Home } from './components/pages/Home'
import { CartProvider } from './Context/CartContext'
import UserContext from './Context/UserContext'
import './style.css'

function App() {
  const { isAuth } = useContext(UserContext);
  console.log(isAuth);

  return (
    <CartProvider >
      {
        (isAuth.auth) && (isAuth.rol) === "USER_ROLE" &&
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/*' element={<Home />} />
        </Routes>
      }
      {
        (isAuth.auth) && (isAuth.rol) === "ADMIN_ROLE" &&
        <Routes>
          <Route path='/admin/productos' element={<Admin />} />
          <Route path='/*' element={<Admin />} />
        </Routes>
      }
      {
        !isAuth.auth &&
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/*' element={<Login />} />
        </Routes>
      }
    </CartProvider>
  )
}

export default App
