import React from "react";
import { useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

export function NavDelete() {
    const { id } = useParams();
    let routeBack = "/admin/books/" + id;
    let routeFoward = "/admin/books/deleted";
    return (
        <div className="libros">
            <div className="librosNav">
                <h2 className="text">Estas seguro?</h2>
                <p><br />
                </p>
                <Link to={routeFoward} className="botonRegreso"> Sí  </Link>
                <Link to={routeBack} className="botonRegistro"> No  </Link>
            </div>
            <Outlet />
        </div>
    );
}
