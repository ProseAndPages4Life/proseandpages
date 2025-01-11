import React from "react";
import { ProductsData } from "../../ProductsData.jsx";
import { useNavigate } from "react-router-dom";


function ListLibrosInv() {
  const navigate = useNavigate();
  return (
    <div className="listOfLibros">
      <div className="librosList">
        {ProductsData.map((product) => {
          return (
            <div
              className="libroDisplay"
              onClick={() => {
                {/*
                switch(usuario){
                                
                  case "Cliente":
                    navigate(`/books/${product.id}`);
                    break;
                    
                  case "Admin":
                    navigate(`admin/books/${product.id}`);
                    break;
                    
                  case "Inven":
                    navigate(`inv/books/${product.id}`);
                    break;
                }
                    */}
                  navigate(`/inv/books/${product.id}`);
                
              }}
            >
              <h1>{product.name}</h1> <p>{product.description}</p>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListLibrosInv;
