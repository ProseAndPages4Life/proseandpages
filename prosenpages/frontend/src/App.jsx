import { BrowserRouter as Router, Link, Routes, Route, Outlet } from "react-router-dom";
//import "./App2.css";
import "./App.css";
import Home from "./pages/landings/Home";

import { NavBooksGeneral, NavBooksAdminFocused } from "./pages/books/navBooksAdmin";

import Login from "./pages/login/Login";
import Logout from "./pages/login/Logout";
import Register from "./pages/login/register";

import Search from "./pages/books/Search";
import AddProduct from "./pages/books/AddProduct";
import ProductDisplay from "./pages/books/ProductDisplay";
import ListLibros from "./pages/books/ListLibros";
import { NavUsersAdminFocused, NavUsersGeneral } from "./pages/users/navUsers";
import { NavEditUser } from "./pages/edit/navEditUser";

import EmailForm from "./pages/forms/email";
import PassForm from "./pages/forms/pass";
import { EditCard, EditDatos, EditDatosEspec, EditEmail, EditLanding, EditLibro, EditPass, EditUsuarios } from "./pages/landings/Editando";
import {UserForm, UserFormAdmin} from "./pages/forms/user";
import CardForm from "./pages/forms/tarjeta";
import { NavEdit } from "./pages/edit/navEdit";
import { NavEditLibro } from "./pages/edit/navEditLibro";
import { CreateLanding } from "./pages/landings/Create";
import { BacktoBooks } from "./pages/edit/backtoBooks";
import { DelFoward, DelLanding } from "./pages/landings/Delete";
import { NavDelete } from "./pages/delete/navDelete";
import BookForm from "./pages/forms/libro";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
    <Router>
      <nav className="mainNav">
        <Link to="/" className="navBar"> Home </Link>
        <Link to="profile" className="navBar"> Profile</Link>
        <Link to="register" className="navBar"> Register </Link>
        <Link to="login" className="navBar"> Login </Link>
        <Link to="/admin/books" className="navBar"> Libros_Admin </Link>
        <Link to="/admin/users" className="navBar"> Usuarios_Admin </Link>
        <Link to="/admin/edit" className="navBar"> Editar_Admin </Link>
        <Link to="/admin/create" className="navBar"> Crear_Admin </Link>
        <Link to="/carrito" className="navBar"> Carrito </Link>
        <Link to="logout" className="navBar"> Logout </Link>
      </nav>
      <div className="mainBody">
        <Routes>
          <Route path="admin" element={<Home />} />
          <Route path="admin">

            {/* /admin/books/ */}
            <Route path="books" element={<NavBooksGeneral />}>
              <Route path="" element={<ListLibros />} />
              {/* /admin/books/deleted/ */}
              <Route path=":id" element={<NavBooksAdminFocused />}>
                <Route path="" element={<ProductDisplay />} />
              </Route>
              {/* /admin/books/deleted/ */}
              <Route path="deleted" element={<DelFoward />} />
              {/*Fin de deleted */}
            </Route>

            {/* /admin/create/ */}
            <Route path="create" element={<CreateLanding />}>
              <Route path="" element={<NavEdit />} />
              {/* /admin/create/users/ */}
              <Route path="users" element={<EditUsuarios />}>
                <Route path="" element={<UserFormAdmin />} />
                {/* /admin/create/users/ */}
                {/*<Route path="email" element={<EditEmail />}>
                <Route path="" element={<EmailForm />} />
              </Route>*/}
              </Route>
              {/* /admin/create/books/ */}
              <Route path="books" element={<EditLibro />} >{/*Libro! */}
                <Route path="" element={<BookForm />} />
              </Route>
            </Route>{/*Fin de create*/}

            {/* /admin/del/ */}
            <Route path="del" element={<DelLanding />}>{/* Eliminando! */}
              <Route path="" element={<NavEdit />} />
              {/* /admin/del/books/ */}
              <Route path="books" element={<NavBooksGeneral />}>{/* Libros! Mostrar Crear*/}
                <Route path="" element={<ListLibros />} />
                <Route path=":id" element={<NavDelete />}>
                  <Route path="" element={<ProductDisplay />} />
                </Route>
              </Route>
              {/* /admin/del/users/ */}
              <Route path="users" element={<EditUsuarios />}>
                <Route path="" element={<NavEditUser />} />
                {/* /admin/create/users/ */}
                {/*<Route path="email" element={<EditEmail />}>
                <Route path="" element={<EmailForm />} />
              </Route>*/}
              </Route>

            </Route>{/*Fin de del*/}

            {/* /admin/edit/ */}
            <Route path="edit" element={<EditLanding />}>
              {/*<Route path="" element={<NavEditUser />} /> */}
              <Route path="" element={<NavEdit />} />
              {/* /admin/edit/users/ */}
              <Route path="users" element={<EditUsuarios />}>
                <Route path="" element={<NavEditUser />} />
                {/* /admin/edit/users/email */}
                <Route path="email" element={<EditEmail />}>
                  <Route path="" element={<EmailForm />} />
                </Route>
                {/* /admin/edit/users/pass */}
                <Route path="pass" element={<EditPass />}>
                  <Route path="" element={<PassForm />} />
                </Route>
                {/* /admin/edit/users/dato */}
                <Route path="datos" element={<EditDatos />}>
                  <Route path="" element={<UserForm />} />
                </Route>
                {/* /admin/edit/users/card */}
                <Route path="card" element={<EditCard />}>
                  <Route path="" element={<CardForm />} />
                </Route>
              </Route>
              {/* /admin/edit/books/ */}
              <Route path="books" element={<NavBooksGeneral />}>
                <Route path="" element={<ListLibros />} />
                <Route path=":id">
                  <Route path="" element={<NavEditLibro />} />
                </Route>
                {/* /admin/edit/books/datos/ */}
                <Route path="datos">
                  <Route path="" element={<EditDatosEspec />} />
                  <Route path=":id" element={<BacktoBooks />}>
                    <Route path="" element={<BookForm />} />
                  </Route>
                </Route>
              </Route>
              {/*<Route path="stock">
                <Route path="" element={<EditDatosEspec />} />
                <Route path=":id" element={<BacktoBooks />}>
                  <Route path="" element={<StockForm />} />
                </Route>
              </Route>*/}
            </Route>{/*Fin de edit*/}


            {/*<Route path="/" element={<ListLibros />} />*/}


            {/* /admin/users/ */}
            <Route path="users" element={<NavUsersGeneral />}>
              <Route path="" element={<ListLibros />} />
              <Route path=":id" element={<NavUsersAdminFocused />}>
                <Route path="" element={<ProductDisplay />} />
              </Route>
            </Route>
            {/* /admin/profile/ */}
            <Route path="profile" element={<Search />} />
            {/* /admin/register/ */}
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/">
            <Route path="profile" element={<Search />} />
            <Route path="books" element={<ListLibros />}>
              <Route path=":id" element={<ProductDisplay />} />
              <Route path="search" element={<Search />} />
            </Route>
            <Route path="pass" element={<Search />} />
            <Route path="email" element={<Search />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="inv">
            <Route path="profile" element={<Search />} />
            <Route path="books" element={<ListLibros />}>
              <Route path=":id" element={<ProductDisplay />} />
            </Route>
            <Route path="pass" element={<Search />} />
            <Route path="email" element={<Search />} />
            <Route path="register" element={<Search />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>

      </div>
    </Router>
    </AuthProvider>
    /*
    <Router>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="login"> Login </Link>
        <Link to="Libros/search"> Libros </Link>
      </nav>
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
    </Router>
    */
    /*
     <Router>
       <nav>
         <Link to="/"> Home </Link>
         <Link to="login"> Login </Link>
         <Link to="Libros/search"> Libros </Link>
       </nav>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="login" element={<Login />} />
         <Route path="Libros" element={<Libros />}>
           <Route path="search" element={<Search />} />
           <Route path="list" element={<ListLibros />} />
           <Route path="add" element={<AddProduct />} />
           <Route path=":id" element={<ProductDisplay />} />
         </Route>
       </Routes>
     </Router>
     */
  );
}

export default App;

/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </h2></button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/