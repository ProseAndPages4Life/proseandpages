import { useEffect } from "react";
import { ProductsData } from "../../ProductsData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
let alreadyGot = 0;


export function ListLibros() {

  const navigate = useNavigate();

  const { getBooks, booksList } = useAuth();

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
      console.log("booksList antes");
      console.log(booksList);
      getBooks();
      console.log("booksList despues");
      console.log(booksList);
      alreadyGot = 1;
    } else {
      alreadyGot = 0;
    }
  });


  return (
    <div className="row">{/* listOfLibros */}
      {/* <img src="/src/img/portadas/img1.png"/> */}

      {booksList.map((product) => {
        let source = `${product.Portada}`;
        return (
          <div className="column" key={product.id}>{/* column */}
            <div
              key={product.id} className="card"/* libroSolo */
              onClick={() => {
                navigate(`${product.id}`);
              }}
            >
              <h1>{product.Titulo}</h1> 
              <h2><p>{product.Autor}</p>{/* {"a"} */}</h2>
              <img src={source} />
              <h1>Precio: $ {product.Precio}</h1>
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






