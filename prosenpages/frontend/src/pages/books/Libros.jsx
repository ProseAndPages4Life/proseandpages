import React from "react";
import { Link, Outlet } from "react-router-dom";

function Libros() {
  return (
    <div className="libros">
      <div className="librosNav">
        <Link to="/books/search"> Search </Link>
        <Link to="/books/"> Mostrar </Link>
        <Link to="/books/add"> Crear </Link>
      </div>

      <Outlet />
    </div>
  );
}

export default Libros;
