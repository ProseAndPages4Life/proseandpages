import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit, formState:{
    errors
  } } = useForm();
  const { loginUser, user, isAutenticado } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAutenticado) navigate("/")
  }, [isAutenticado]);


  console.log("Usuario:");
  console.log(user);
  const onSubmit = handleSubmit(async (user) => {
    loginUser(user);
  }
  );

  return (
    <div className="form">
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
    
        <div className="libros">
          <div className="libros">
            <a>
              <button type="submit">Entra!</button>
              <text type="submit" className="botonRegistro">Entrar!</text>
            </a>
          </div>
        </div>
      </form>

      <p>Haz click para registrarte!!</p>

    </div>
  );
}

export default Login;
