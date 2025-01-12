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

function CardForm() {

    const { register, handleSubmit } = useForm();

    return (
        <div className="form">
            <form onSubmit={handleSubmit((values) =>
                console.log(values)
            )}>
                <label htmlFor="Nombre">Nombre: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Nombre", { required: true })} /><br /><br />
                {
                    errors.Nombre && (
                        <p className="text">Nombre es requerido!</p>
                    )
                }
                <label htmlFor="Numero">Numero: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Apellido", { required: true })} /><br /><br />
                {
                    errors.Numero && (
                        <p className="text">Numero es requerido!</p>
                    )
                }
                <label htmlFor="Vencimiento">Vencimiento: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Email", { required: true })} /><br /><br />
                {
                    errors.Vencimiento && (
                        <p className="text">Vencimiento es requerido!</p>
                    )
                }
                <label htmlFor="CVV">CVV: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Contraseña", { required: true })} /><br /><br />
                {
                    errors.CVV && (
                        <p className="text">CVV es requerido!</p>
                    )
                }
                <div className="libros">
                    <div className="libros">
                        <a>
                            <button type="submit" className="botonRegistro"><h2>Registrar!</h2></button>
                        </a>
                    </div>
                </div>
            </form>

            <p>Haz click para registrarte!!</p>

        </div>
    );

}
export default CardForm;