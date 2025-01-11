import React from "react";
import { useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

export function EditLanding() {
  return (
    <div className="libros">
      <h1 className="text">Editando!</h1>
      <Outlet />
    </div>

  );
}

export function EditEmail() {
  return (
    <div className="libros">
      <h1 className="text">EMAIL!</h1>
      <div className="librosNav">
        <Link to="/admin/edit" className="text"> Regresar </Link>
      </div>
      <Outlet />
    </div>

  );
}

export function EditPass() {
  return (
    <div className="libros">
      <h1 className="text">Password!</h1>
      <div className="librosNav">
        <Link to="/admin/edit" className="text"> Regresar </Link>
      </div>
      <Outlet />
    </div>

  );
}


export function EditDatos() {
  return (
    <div className="libros">
      <h1 className="text">Datos!</h1>
      <div className="librosNav">
        <Link to="/admin/edit" className="text"> Regresar </Link>
      </div>
      <Outlet />
    </div>

  );
}

export function EditDatosEspec() {
  const { id } = useParams();
  return (
    <div className="libros">
      <h1 className="text">Editando {id}!</h1>
      <Outlet />
    </div>

  );
}

export function EditCard() {
  return (
    <div className="libros">
      <h1 className="text">Card!</h1>
      <div className="librosNav">
        <Link to="/admin/edit" className="text"> Regresar </Link>
      </div>
      <Outlet />
    </div>

  );
}

export function EditLibro() {
  return (
    <div className="libros">
      <h1 className="text">Libro!</h1>
      <div className="librosNav">
        {/*<Link to="/admin/edit" className="text"> Regresar </Link>*/}
      </div>
      <Outlet />
    </div>

  );
}

export function EditUsuarios() {
  return (
    <div className="libros">
      <h1 className="text">Usuarios!</h1>

      <Outlet />
    </div>

  );
}


