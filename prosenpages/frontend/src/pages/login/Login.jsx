import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit, formState: {
    errors
  } } = useForm();
  const { loginUser, user, isAutenticado, errorsLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAutenticado) navigate("/");
  }, [isAutenticado]);


  console.log("Usuario:");
  console.log(user);
  const onSubmit = handleSubmit(async (user) => {
    loginUser(user);
  }
  );

  return (
    <div className="form">
      {
        errorsLogin.map((error, i) => (
          <div key={error}>
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

        <div className="libros">
          <div className="libros">
            <a>
              <button type="submit" className="botonRegistro"><h2>Entra!</h2></button>

            </a>
          </div>
        </div>
      </form>

      <p>Haz click para registrarte!!</p>

    </div>
  );
}

export default Login;
