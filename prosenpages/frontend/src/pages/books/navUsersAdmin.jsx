import React from "react";
import { useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";


//const { id } = useParams();


export function NavBooksGeneral() {
  
  return (
    <div className="libros">
      <h1 className="text">Libros!</h1>
      <div className="librosNav">
        <Link to="/admin/books"> Mostrar </Link>
        <Link to="/admin/books/create"> Crear </Link>
      </div>
      <Outlet />
    </div>
  );
}


export function NavBooksAdminFocused() {
  
  return (
    <div className="libros">
      <div className="librosNav">
        <Link to="edit/"> Editar  </Link>
        <Link to="del/"> Eliminar </Link>
      </div>
      <Outlet />
    </div>
  );
}


//export default NavBooksAdmin;
