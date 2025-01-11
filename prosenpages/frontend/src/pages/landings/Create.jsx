import React from "react";
import { Link, Outlet } from "react-router-dom";

export function CreateLanding() {
  return (
    <div>
      <h1 className="text">Creando!</h1>
      <Outlet />
    </div>

  );
}