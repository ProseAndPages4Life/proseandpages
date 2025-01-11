import React from "react";
import { useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

export function NavEdit() {

    return (
        <div className="libros">
            <div className="librosNav">

                <Link to="books"> Libros  </Link>
                <Link to="users"> Usuarios  </Link>
            </div>
            <Outlet />
        </div>
    );
}
