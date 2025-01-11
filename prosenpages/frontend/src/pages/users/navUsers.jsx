import React from "react";
import { useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";


//const { id } = useParams();


export function NavUsersGeneral() {
  
  return (
    <div className="libros">
      <h1 className="text">Usuarios!</h1>
      <div className="librosNav">
        <Link to="/admin/users"> Mostrar </Link>
        <Link to="/admin/create/users"> Crear </Link>
      </div>
      <Outlet />
    </div>
  );
}


export function NavUsersAdminFocused() {
  
  return (
    <div className="libros">
      <div className="librosNav">
        <Link to="/admin/edit"> Editar  </Link>
        <Link to="del/"> Eliminar </Link>
      </div>
      <Outlet />
    </div>
  );
}


//export default NavBooksAdmin;
