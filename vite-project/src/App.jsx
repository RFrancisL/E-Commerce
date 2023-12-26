/* eslint-disable react/prop-types */
import {useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, Link, Navigate, useLocation} from 'react-router-dom';
import GetProducts, {GetProductsId, GetCategoriesId} from './Components/GetProducts.jsx'
import GetCategories from './Components/GetCategories.jsx';
import NoMatch from './Components/NoMatch.jsx';
import Home from './Components/Home.jsx'
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import CreateProduct from './Admin/ProductsCreate.jsx';
import './styles/App.css';
import { createContext, useContext } from 'react';
import EditProduct from './Admin/ProductsEdit.jsx';
import { ViewCarrito } from './Components/ViewCarrito.jsx';
import {QueryClientProvider, QueryClient} from "react-query"
import { CarritoProvider } from './Components/Carrito.jsx';
import { ProductProvider } from './Components/ProductContext.jsx';

const queryClient = new QueryClient()
export const AuthContext = createContext(null)

function App() {
  const [userName, setUserName] = useState({
    user: '',
  })
  const [password, setPassword] = useState({
    password: '',
  })


  const handleLogin = (user, password) => {
    //guardo el user en setUserName y el password en setStatePassword
    setUserName({user})
    password({password})
    //añado al localStorage el user y el password con las keys 'user' y 'password', sin antes convertirlos en strings con JSON.stringify()
    localStorage.setItem('user', JSON.stringify({userName}))
    localStorage.setItem('password', JSON.stringify({setPassword}))
  }

  const handleLogout = () => {
    //actualizo el user y el password a strings vacios 
    setUserName('')
    setPassword('')
    //añado al locaStorage en user y el password vacios sin antes convertirlos en strings con JSON.stringify
    localStorage.removeItem('user');
    localStorage.removeItem('password');
  }

  const value={
    userName,
    password,
    handleLogin,
    handleLogout
  }

  useEffect(()=>{

    //obtengo los datos del localStorage (en este caso el user y el password)
    const saveUser = localStorage.getItem('user')
    const savePassword = localStorage.getItem('password')

    //si los datos existen devuelve true, sino devuelve null
    if(saveUser && savePassword){
      //a los datos los convierto en objetos con JSON.parse()
      setUserName(JSON.parse(saveUser))
      setPassword(JSON.parse(savePassword)) 
    }
  },[])

  return (
    <div className='Nav-Browser'>
      <AuthContext.Provider value={value}>
        <QueryClientProvider client={queryClient}>
          <ProductProvider>
            <CarritoProvider>       
              <BrowserRouter>
              <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="products" element={<GetProducts />} />
                  <Route path="products/:id" element={<GetProductsId />} />
                  <Route path="categories" element={<GetCategories />} />
                  <Route path="categories/:id" element={<GetCategoriesId />}/>
                  {/* ESTO DEBERIA SER ASI PERO COMO NO FUNCIONA EL LOGIN NO LO HAGO
                    <Route path="create" element={
                      <AdminRoutes>
                        <CreateProduct />
                      </AdminRoutes>
                      } />
                    <Route path="edit/:id" element={
                      <AdminRoutes>
                        <EditProduct />
                      </AdminRoutes>
                      }>
                    </Route>
                  */}
                    <Route path="create" element={<CreateProduct />}/>
                    <Route path="edit/:id" element={<EditProduct />}/>
                    <Route path="shop" element={<ViewCarrito/>}/>
                  <Route path="*" element={<NoMatch />} />
                </Route>
              </Routes>
              </BrowserRouter>
            </CarritoProvider>
          </ProductProvider>
        </QueryClientProvider>
      </AuthContext.Provider>
    </div>
    
  );
}
function Layout() {
  return (
    <div className="Links">
      <nav>
          <li>
            <Link to="/" style={{textDecoration:'none', color:'white'}}>Home</Link>
          </li>
          <li>
            <Link to="/products" style={{textDecoration:'none', color:'white'}}>Products</Link>
          </li>
          <li>
            <Link to="/categories" style={{textDecoration:'none', color:'white'}}>Categories</Link>
          </li>
          <li>
            <Link to="/shop" style={{textDecoration:'none', color:'white'}}>Shop</Link>
          </li>
          <li>
            <Link to="/create" style={{textDecoration:'none', color:'white'}}>Create</Link>
          </li>
      </nav>

      <Outlet />
    </div>
  );
}

function AdminRoutes({ children }){
  const { userName, statePassword} = useContext(AuthContext)
  const currentLocation = useLocation()

  if (!userName || !statePassword){
    return <Navigate to='/login' state={{ from: currentLocation }} replace />
  }

  console.log(userName, statePassword)

  return children;
}
export default App
