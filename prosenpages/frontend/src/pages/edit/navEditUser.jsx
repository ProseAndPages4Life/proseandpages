import React from "react";
import { useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

export function NavEditUser() {

    return (
        <div className="libros">
            <div className="librosNav">

                <Link to="/admin/edit" className="text"> Regresar </Link>

                <Link to="email"> Email  </Link>
                <Link to="pass"> Password  </Link>
                <Link to="datos"> Datos </Link>
                <Link to="card"> Tarjetas </Link>
            </div>
            <Outlet />
        </div>
    );
}
