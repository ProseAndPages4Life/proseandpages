import React from "react";
import { useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
//}}const { id } = useParams();
export function BacktoBooks() {
    const { id } = useParams();
    let route= "/admin/books/"+id
    //console.log("La ruta sera:")
    //console.log(route)
    return (
        <div className="libros">
            <div className="librosNav">
                <Link to={route} className="botonRegreso"> Regresar </Link>
            </div>
            <Outlet />
        </div>
    );
}
