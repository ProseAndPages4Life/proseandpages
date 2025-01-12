import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";



export function LoginAdmin() {
  const { register, handleSubmit, formState: {
    errors
  } } = useForm();
  const { loginAdmin, user, isAutenticado, errorsBack } = useAuth();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (isAutenticado) navigate("/");
  }, [isAutenticado]);
  

  //console.log("Usuario:");
  //console.log(user);

  const onSubmit = handleSubmit(async (user) => {
    loginAdmin(user);
  }
  );

  return (
    <div className="form">

      <div className="text"><h1>Login!</h1></div>
      {
        errorsBack.map((error, i) => (
          <div key={error} className="text">
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit}>
        <label htmlFor="Email">Correo electrónico: </label>
        <input type="text" {...register("Email", { required: true })} /><br /><br />

        {
          errors.Email && (
            <p className="text">Email es requerido!</p>
          )
        }

        <label htmlFor="Contraseña">Contraseña: </label>
        {/* <input type="text" {...register("Contraseña", { required: true })} /><br /><br /> */}
        <input type="password" {...register("Contraseña", { required: true })} /><br /><br />
        {
          errors.Contraseña && (
            <p className="text">Contraseña es requerido!</p>
          )
        }
        <div className="libros">
          <button type="submit" className="botonRegistro"><h2>Entra!</h2></button>
          <p className="text" > <br /><br />
            No estás registrado?<br />
            <Link className="botonRegistro" to="/register"> Registrate</Link>
          </p>
        </div>
      </form>


    </div>
  );
}

export function LoginClient() {
  const { register, handleSubmit, formState: {
    errors
  } } = useForm();
  const { loginClient, user, isAutenticado, errorsBack } = useAuth();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (isAutenticado) navigate("/");
  }, [isAutenticado]);
  

  //console.log("Usuario:");
  //console.log(user);

  const onSubmit = handleSubmit(async (user) => {
    loginClient(user);
  }
  );

  return (
    <div className="form">

      <div className="text"><h1>Login!</h1></div>
      {
        errorsBack.map((error, i) => (
          <div key={error} className="text">
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit}>
        <label htmlFor="Email">Correo electrónico: </label>
        <input type="text" {...register("Email", { required: true })} /><br /><br />

        {
          errors.Email && (
            <p className="text">Email es requerido!</p>
          )
        }

        <label htmlFor="Contraseña">Contraseña: </label>
        {/* <input type="text" {...register("Contraseña", { required: true })} /><br /><br /> */}
        <input type="password" {...register("Contraseña", { required: true })} /><br /><br />
        {
          errors.Contraseña && (
            <p className="text">Contraseña es requerido!</p>
          )
        }
        
        <div className="libros">
          <button type="submit" className="botonRegistro"><h2>Entra!</h2></button>
          <p className="text" > <br /><br />
            No estás registrado?<br />
            <Link className="botonRegistro" to="/register"> Registrate</Link>
          </p>
        </div>
      </form>


    </div>
  );
}

export function LoginInv() {
  const { register, handleSubmit, formState: {
    errors
  } } = useForm();
  const { loginInv, user, isAutenticado, errorsBack } = useAuth();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (isAutenticado) navigate("/");
  }, [isAutenticado]);
  

  //console.log("Usuario:");
  //console.log(user);

  const onSubmit = handleSubmit(async (user) => {
    loginInv(user);
  }
  );

  return (
    <div className="form">

      <div className="text"><h1>Login!</h1></div>
      {
        errorsBack.map((error, i) => (
          <div key={error} className="text">
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit}>
        <label htmlFor="Email">Correo electrónico: </label>
        <input type="text" {...register("Email", { required: true })} /><br /><br />

        {
          errors.Email && (
            <p className="text">Email es requerido!</p>
          )
        }

        <label htmlFor="Contraseña">Contraseña: </label>
        {/* <input type="text" {...register("Contraseña", { required: true })} /><br /><br /> */}
        <input type="password" {...register("Contraseña", { required: true })} /><br /><br />
        {
          errors.Contraseña && (
            <p className="text">Contraseña es requerido!</p>
          )
        }
        <div className="libros">
          <button type="submit" className="botonRegistro"><h2>Entra!</h2></button>
          <p className="text" > <br /><br />
            No estás registrado?<br />
            <Link className="botonRegistro" to="/register"> Registrate</Link>
          </p>
        </div>
      </form>


    </div>
  );
}
