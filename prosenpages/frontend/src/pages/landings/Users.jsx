import React from "react";
import { Link, Outlet } from "react-router-dom";

function UsuariosLanding() {
  return (
    <div className="libros">
      <h1 className="text">Usuarios!</h1>
      <Outlet />
    </div>
    
  );
}

export default UsuariosLanding;