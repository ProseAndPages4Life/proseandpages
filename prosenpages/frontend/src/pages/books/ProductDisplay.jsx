import React, { Children, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsData } from "../../ProductsData";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";

let source = 0;
let alreadyGot = 0;

let idExportlet = {};
export function ProductDisplay() {

  const { register, handleSubmit, formState: {
    errors
  } } = useForm();

  //  const { idBook } = useParams();
  const navigate = useNavigate();

  const { getaBook, bookList, pushCarrito, errorsBack  } = useAuth();

  const { id } = useParams();
  /* 
  console.log("idExportlet");
  console.log(idExportlet);
  console.log("idExportlet.id");
  console.log(idExportlet.id); */


  useEffect(() => {
    if (alreadyGot == 0) {
      /* console.log("Jalando libros");
      console.log("bookList antes");
      console.log(bookList); */
      getaBook(id);
      /* console.log("bookList despues");
      console.log(bookList); */
      source = bookList.Portada;
      alreadyGot = 1;
    } else {
      alreadyGot = 0;
    }
  });

  const onSubmit = handleSubmit(async (user) => {
    console.log("Mostrando datos ingresados!");
    console.log(user);
    console.log("Agregando libro");
    user.Libro = id;
    console.log("Mostrando actualizada");
    pushCarrito(user);
  }
  );

  return (

    <div className="column">
      {/*
        errorsBack.map((error, i) => (
          <div key={error} className="text">
            {error}
          </div>
        ))
      */}

      <h1>STOCK: {bookList.Stock}</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="Cantidad">Cantidad </label>
        <input type="number" min="0" max={bookList.Stock} placeholder="1" {...register("Cantidad", { required: true })} /><br /><br />
        {
          errors.Cantidad && (
            <p className="text">Cantidad es requerido!</p>
          )
        }

        <button type="submit" className="botonRegistro">Agrega al carrito</button>
      </form>

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
