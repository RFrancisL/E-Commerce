/* eslint-disable react/prop-types */
import { BrowserRouter, Routes, Route, Outlet, Link, Navigate, useLocation} from 'react-router-dom';
import GetProducts, {GetProductsId} from './Components/GetProducts.jsx'
// import GetProductsId from './Components/GetProductsId.jsx';
import GetCategories from './Components/GetCategories.jsx';
import NoMatch from './Components/NoMatch.jsx';
import Home from './Components/Home.jsx'
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import ProductsCreate from './Admin/ProductsCreate.jsx';
import ProductsEdit from './Admin/ProductsEdit.jsx';
import './styles/App.css';
import { createContext, useContext } from 'react';

const AuthContext = createContext(null)
function App() {
  return (
    <div className='Nav-Browser'>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<GetProducts />} />
            <Route path="products/:id" element={<GetProductsId />} />
            <Route path="categories" element={<GetCategories />} />
            <Route path="admin" element={<AdminRoutes />}>
              <Route path="create" element={<ProductsCreate />} />
              <Route path="edit" element={<ProductsEdit />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>

      </BrowserRouter>
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
            <Link to="/login" style={{textDecoration:'none', color:'white'}}>Login</Link>
          </li>
          <li>
            <Link to="/register" style={{textDecoration:'none', color:'white'}}>Register</Link>
          </li>
        
      </nav>

      <Outlet />
    </div>
  );
}

function AdminRoutes({ children }){
  const currentLocation = useLocation()
  const { id } = useContext(AuthContext)

  if (!id){
    return <Navigate to='/login' state={{ from: currentLocation }} replace />
  }

  return children;
}
export default App
