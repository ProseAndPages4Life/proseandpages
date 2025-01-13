import React, { Children, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsData } from "../../ProductsData";
import { useAuth } from "../../context/authContext";

let source = 0;
let alreadyGot = 0;

let idExportlet = {};
export function ProductDisplay() {
  //  const { idBook } = useParams();
  const navigate = useNavigate();

  const { getaBook, bookList } = useAuth();
  const { id } = useParams();
  idExportlet = { id };
  console.log("idExportlet");
  console.log(idExportlet);
  console.log("idExportlet.id");
  console.log(idExportlet.id);


  useEffect(() => {
    if (alreadyGot == 0) {
      console.log("Jalando libros");
      console.log("bookList antes");
      console.log(bookList);
      getaBook(id);
      console.log("bookList despues");
      console.log(bookList);
      source = bookList.Portada;
      alreadyGot = 1;
    } else {
      alreadyGot = 0;
    }
  });

  return (

    <div className="column">
      <div className="card1">

        <h1> {bookList.Titulo}</h1>{" "}
        <h4>
          <p>Autor: {bookList.Autor}</p>
          <p>Formato: {bookList.Formato}</p>
          <p>Editorial: {bookList.Editorial}</p>
          <p>Año: {bookList.Año}</p>
          <p>Idioma: {bookList.Idioma}</p>
          <p>Número de páginas: {bookList.NumPag}</p>
          <p>Encuadernación: {bookList.Encudernacion}</p>
          <p>ISBN: {bookList.ISBN}</p>
          <p>Categoría: {bookList.Categoria}</p>
          <p>Precio: ${bookList.Precio}</p>
        </h4>

        <img src={source} alt={source} />
      </div>
    </div>



  );
}
/* <div className="listOflibros">
      <div className="libroDisplay">
        <h1>{ProductsData[idBook - 1].name}</h1>{" "}
        :{ProductsData[idBook - 1].description}</p>{" "}
      </div>
    </div> */
