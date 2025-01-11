import React from "react";
import { usersData } from "../../ProductsData";
import { useNavigate } from "react-router-dom";

function ListUsers() {
  const navigate = useNavigate();
  return (
    <div className="listOfLibros">
      <div className="librosList">
        {usersData.map((user) => {
          return (
            <div
              className="libroDisplay"
              onClick={() => {
                navigate(`${user.id}`);
              }}
            >
              <h1>{user.name}</h1> <p>{user.description}</p>{"a"}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListUsers;
