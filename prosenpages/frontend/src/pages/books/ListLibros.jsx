import React from "react";
import { ProductsData } from "../../ProductsData";
import { useNavigate } from "react-router-dom";
function ListProducts() {
  const navigate = useNavigate();
  return (
    <div className="listOfProducts">
      <div className="librosList">
        {ProductsData.map((product) => {
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
        })}
      </div>
    </div>
  );
}

export default ListProducts;
