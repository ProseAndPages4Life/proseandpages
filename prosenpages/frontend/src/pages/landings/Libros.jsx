import React from "react";
import { Link, Outlet } from "react-router-dom";

function LibrosLanding() {
  return (
    <div className="libros">
      <h1 className="text">Libros!</h1>
      <Outlet />
    </div>
    
  );
}

export default LibrosLanding;