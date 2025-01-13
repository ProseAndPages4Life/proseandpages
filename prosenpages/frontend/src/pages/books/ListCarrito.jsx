import { useEffect } from "react";
import { ProductsData } from "../../ProductsData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
let alreadyGot = 0;


export function ListCarrito() {

  const navigate = useNavigate();

  const { getCarrito, carritoList } = useAuth();

  const { register, handleSubmit, formState: {
    errors
  } } = useForm();

  /*
   useEffect(() => {
    
    console.log("desde useEffect")
    getBooks();
    console.log("booksList");
    console.log(booksList);
  }); 
  */

  useEffect(() => {
    if (alreadyGot == 0) {
      console.log("Jalando libros");
      console.log("carritoList antes");
      console.log(carritoList);
      getCarrito();
      console.log("carritoList despues");
      console.log(carritoList);
      alreadyGot = 1;
    } else {
      alreadyGot = 0;
    }
  });

  const onSubmit = handleSubmit(async (user) => {
    loginInv(user);
  });


  return (


    <div className="row">{/* listOfLibros */}

      <form onSubmit={onSubmit} className="column">
        <label htmlFor="Tarjeta">Tarjeta </label>
        <input type="number" min="0" max="2" placeholder="1" {...register("Tarjeta", { required: true })} /><br /><br />
        {
          errors.Tarjeta && (
            <p className="text">Tarjeta es requerido!</p>
          )
        }

        <label htmlFor="Domicilio">Domicilio </label>
        <input type="number" min="0" max="2" placeholder="1" {...register("Domicilio", { required: true })} /><br /><br />
        {
          errors.Domicilio && (
            <p className="text">Domicilio es requerido!</p>
          )
        }

        <button type="submit" className="botonRegistro">Realizar orden!</button>
      </form>
      {/* <img src="/src/img/portadas/img1.png"/> */}

      {carritoList.map((product) => {
        //let source = `${product.Portada}`;
        return (
          <div className="column" key={product.libro_id}>{/* column */}
            <div
              key={product.Libro_id} className="card"/* libroSolo */
              onClick={() => {
                navigate(`${product.Libro_id}`);
              }}
            >

              <h3>ID: {product.Id}</h3>
              <h3>ID Libro: {product.Libro_id}</h3>
              <h3>Titulo: {product.Libro}</h3>
              <h4><p>Categoria: {product.Categoria}</p>{/* {"a"} */}</h4>
              <h4><p>Cantidad: {product.Cantidad}</p>{/* {"a"} */}</h4>
              <h4><p>Fecha: {product.Fecha}</p>{/* {"a"} */}</h4>
            </div>
          </div>
        );
      })}
      {/* ProductsData.map((product) => {
          return (
            <div
              key={product.id}
              className="libroDisplay"
              onClick={() => {
                navigate(`${product.id}`);
              }}
            >
              <h1>{product.name}</h1> <p>{product.description}</p>{"a"}
            </div>
          );
        }) */}

    </div>
  );
}






