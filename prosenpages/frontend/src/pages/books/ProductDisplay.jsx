import React, { Children, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsData } from "../../ProductsData";
import { useAuth } from "../../context/authContext";

let source = 0;
let alreadyGot = 0;



export function ProductDisplay() {
//  const { idBook } = useParams();
  const navigate = useNavigate();

  const { getaBook, bookList } = useAuth();
  const { idBook } = useParams();



  useEffect(() => {
    if (alreadyGot == 0) {
      console.log("Jalando libros");
      console.log("bookList antes");
      console.log(bookList);
      getaBook();
      console.log("bookList despues");
      console.log(bookList);
      source = bookList.Portada;
      alreadyGot = 1;
    } else {
      alreadyGot = 1;
    }
  });

  return (

    <div className="column">
      <div className="card">
        
      <h1>{bookList.Titulo}</h1>{" "}
        <p>{bookList.Autor}</p>
        <p>{bookList.Formato}</p>
        <p>{bookList.Editorial}</p>
        <p>{bookList.Año}</p>
        <p>{bookList.Idioma}</p>
        <p>{bookList.NumPag}</p>
        <p>{bookList.Encudernacion}</p>
        <p>{bookList.ISBN}</p>
        <p>{bookList.Categoria}</p>
        <p>${bookList.Precio}</p>
        <p>{bookList.Portada}</p>
        {/* 
        <h1>{bookList[idBook].Titulo}</h1>{" "}
        <p>{bookList[idBook].Autor}</p>
        <p>{bookList[idBook].Formato}</p>
        <p>{bookList[idBook].Editorial}</p>
        <p>{bookList[idBook].Año}</p>
        <p>{bookList[idBook].Idioma}</p>
        <p>{bookList[idBook].NumPag}</p>
        <p>{bookList[idBook].Encudernacion}</p>
        <p>{bookList[idBook].ISBN}</p>
        <p>{bookList[idBook].Categoria}</p>
        <p>${bookList[idBook].Precio}</p>
        <p>{bookList[idBook].Portada}</p> */}
        <p>{source}</p>
        <img src={source} />
      </div>
    </div>



  );
}
/* <div className="listOflibros">
      <div className="libroDisplay">
        <h1>{ProductsData[idBook - 1].name}</h1>{" "}
        <p>{ProductsData[idBook - 1].description}</p>{" "}
      </div>
    </div> */
