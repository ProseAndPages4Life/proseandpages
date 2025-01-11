import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import ProfilePage from './components/profile';
import Home from "./components/Home.jsx";
import Products from "./components/products/Products.jsx";
import Login from "./components/Login.jsx";
import Search from "./components/products/Search.jsx";
import AddProduct from "./components/products/AddProduct.jsx";
import ProductDisplay from "./components/products/ProductDisplay.jsx";
import ListProducts from "./components/products/ListProducts.jsx";


function App() {
  return (
    /*
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Admin</h1>}>
          <Route path='profile' element={<h1>Profile</h1>}/>
          <Route path='books'>
            <Route path=':id' />
          </Route>
          <Route path='/users'>
            <Route path='/:id'/>
            <Route path='/pass'>
              <Route path='/:id' />
            </Route>
            <Route path='/email'>
              <Route path='/:id' />
            </Route>
          </Route>
          <Route path='/register'/>
          <Route path='/login'/>
          <Route path='/register'/>
        </Route>
      </Routes>
    </BrowserRouter>
    */
    
    <BrowserRouter>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="login"> Login </Link>
        <Link to="products/search"> Products </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="products" element={<Products />}>
          <Route path="search" element={<Search />} />
          <Route path="list" element={<ListProducts />} />
          <Route path="add" element={<AddProduct />} />
          <Route path=":id" element={<ProductDisplay />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;