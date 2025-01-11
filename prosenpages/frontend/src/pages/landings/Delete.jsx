import React from "react";
import { Link, Outlet } from "react-router-dom";

export function DelLanding() {
  return (
    <div>
      <h1 className="text">Eliminando!</h1>
      <Outlet />
    </div>

  );
}

export function DelFoward() {
  return (
    <div>
      <h1 className="text">Eliminado!</h1>
      <Link to="/admin/books" className="botonRegistro"> Enterado  </Link>
                      
      <Outlet />
    </div>

  );
}