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
      <div className="card">

        TItulo:<h1> {bookList.Titulo}</h1>{" "}
        Autor:<p>{bookList.Autor}</p>
        Formato:<p>{bookList.Formato}</p>
        Editorial:<p>{bookList.Editorial}</p>
        Año:<p>{bookList.Año}</p>
        Idioma:<p>{bookList.Idioma}</p>
        Número de páginas:<p>{bookList.NumPag}</p>
        Encuadernación:<p>{bookList.Encudernacion}</p>
        ISBN:<p>{bookList.ISBN}</p>
        Categoría:<p>{bookList.Categoria}</p>
        Precio:<p>${bookList.Precio}</p>
        Portada:<p>{bookList.Portada}</p>

        <img src={source} alt={source} />
      </div>
    </div>



  );
}
/* <div className="listOflibros">
      <div className="libroDisplay">
        <h1>{ProductsData[idBook - 1].name}</h1>{" "}
        :<p>{ProductsData[idBook - 1].description}</p>{" "}
      </div>
    </div> */
