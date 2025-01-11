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
        <Link to="/admin/create/books/"> Crear </Link>
      </div>
      <Outlet />
    </div>
  );
}


export function NavBooksAdminFocused() {
  const { id } = useParams();
  let routeRegresar = "/admin/books/";
  let routeEdit = "/admin/edit/books/datos/" + id;
  let routeDel = "/admin/del/books/" + id;
  return (
    <div className="libros">
      <div className="librosNav">
        <Link to={routeRegresar}> Regresar  </Link>
        <Link to={routeEdit}> Editar  </Link>
        <Link to={routeDel}> Eliminar </Link>
      </div>
      <Outlet />
    </div>
  );
}


//export default NavBooksAdmin;
