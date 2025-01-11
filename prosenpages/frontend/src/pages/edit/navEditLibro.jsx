import React from "react";
import { useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
//}}const { id } = useParams();
export function NavEditLibro() {
    const { id } = useParams();
    let route= "/admin/edit/books/datos/"+id
    //console.log("La ruta sera:")
    //console.log(route)
    return (
        <div className="libros">
            <div className="librosNav">

                <Link to="/admin/edit" className="text"> Regresar </Link>
                
                <Link to={route}> Datos  </Link>

            </div>
            <Outlet />
        </div>
    );
}
