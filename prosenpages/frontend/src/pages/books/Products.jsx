import React from "react";
import { Link, Outlet } from "react-router-dom";

function Products() {
  return (
    <div className="libros">
      <div className="librosNav">
        <Link to="/books/search"> Search </Link>
        <Link to="/books/list"> List </Link>
        <Link to="/books/add"> Add </Link>
      </div>

      <Outlet />
    </div>
  );
}

export default Products;
