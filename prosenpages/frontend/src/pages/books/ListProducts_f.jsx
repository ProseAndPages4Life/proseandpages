import React from "react";
import { ProductsData } from "../../ProductsData";
import { useNavigate } from "react-router-dom";
function ListLibros() {
  const navigate = useNavigate();
  return (
    <div className="listOfLibros">
      <div className="librosList">
        {librosData.map((libro) => {
          return (
            <div
              className="libroDisplay"
              onClick={() => {
                navigate(`/libros/${libro.id}`);
              }}
            >
              <h1>{libro.name}</h1> <p>{libro.description}</p>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListLibros;
