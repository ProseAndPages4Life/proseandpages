/*
{
    "Nombre": "Nombre1",
    "Apellido": "Apelldo1",
    "Nacim": "2009-07-04",
    "Email": "admin21@test1.com",
    "Contraseña": "PasS11!!"
}
*/
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const { register, handleSubmit, formState: {
        errors
    } } = useForm();

    const { regisClient, errorsBack, isRegistrado,
        // isAutenticado
    } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (isRegistrado) navigate("/login");
    }, [isRegistrado]);
    

    const onSubmit = handleSubmit(async (datos) => {
        console.log("Leyendo datos ingresados en la consola!");
        console.log(datos);
        console.log("Pasando datos al register");
        regisClient(datos);
    }
    );

    return (
        <div className="form">
            <div className="text"><h1>Registro!</h1></div>
            {
                errorsBack.map((error, i) => (
                    <div className="text" key={error}>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={onSubmit}>

                <label htmlFor="Nombre">Nombre: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Nombre", { required: true })} /><br /><br />
                {
                    errors.Nombre && (
                        <p className="text">Nombre es requerido!</p>
                    )
                }
                <label htmlFor="Apellido">Apellido: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Apellido", { required: true })} /><br /><br />
                {
                    errors.Apellido && (
                        <p className="text">Apellido es requerido!</p>
                    )
                }
                <label htmlFor="Nacim">Nacimiento: </label>
                <input type="date" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Nacim", { required: true })} /><br /><br />
                {
                    errors.Nacim && (
                        <p className="text">Nacimiento es requerido!</p>
                    )
                }
                <label htmlFor="Email">Correo electrónico: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Email", { required: true })} /><br /><br />
                {
                    errors.Email && (
                        <p className="text">Email es requerido!</p>
                    )
                }
                <label htmlFor="Contraseña">Contraseña: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Contraseña", { required: true })} /><br /><br />
                {
                    errors.Contraseña && (
                        <p className="text">Contraseña es requerido!</p>
                    )
                }
                <div className="libros">
                    <div className="libros">

                        <button type="submit" className="botonRegistro"><h2>Registrar!</h2></button>
                        <p className="text" > <br /><br />
                            Ya tienes cuenta?<br />
                            <Link className="botonRegistro" to="/login"> Ingresa</Link>
                        </p>
                    </div>
                </div>
            </form>

            <p>Haz click para registrarte!!</p>

        </div>
    );

}
export default Register;