import { useForm } from "react-hook-form";

function PassForm() {

    const { register, handleSubmit } = useForm();

    return (
        <div className="form">
            <form onSubmit={handleSubmit((values) =>
                console.log(values)
            )}>
                <label htmlFor="Contraseña">Contraseña: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Contraseña", { required: true })} /><br /><br />

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
export default PassForm;