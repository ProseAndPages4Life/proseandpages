/*
{
    "Nombre": "Nombre1",
    "Apellido": "Apelldo1",
    "Nacim": "2009-07-04",
    "Email": "admin21@test1.com",
    "Contraseña": "PasS11!!"
}
*/
import { useForm } from "react-hook-form";

function Register() {

    const { register, handleSubmit } = useForm();

    return (
        <div className="form">
            <form onSubmit={handleSubmit((values) =>
                console.log(values)
            )}>
                <div>
                    <label htmlFor="Nombre">Nombre: </label>
                    <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Nombre", { required: true })} /><br /><br />
                </div>

                <div>
                    <label htmlFor="Apellido">Apellido: </label>
                    <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Apellido", { required: true })} /><br /><br />
                </div>
                <div>
                    <label htmlFor="Nacimiento">Nacimiento: </label>
                    <input type="date" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Nacimiento", { required: true })} /><br /><br />
                </div>
                <div>
                    <label htmlFor="Email">Correo electrónico: </label>
                    <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Email", { required: true })} /><br /><br />
                </div>
                <div>
                    <label htmlFor="Contraseña">Contraseña: </label>
                    <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Contraseña", { required: true })} /><br /><br />
                </div>
                <div className="libros">
                    <div className="libros">
                        <a>
                            <text type="submit" className="botonRegistro">Registrar!</text>
                        </a>
                    </div>
                </div>
            </form>

            <p>Haz click para registrarte!!</p>

        </div>
    );

}
export default Register;