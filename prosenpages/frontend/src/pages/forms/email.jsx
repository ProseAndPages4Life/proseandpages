import { useForm } from "react-hook-form";

function EmailForm() {

    const { register, handleSubmit } = useForm();

    return (
        <div className="form">
            <form onSubmit={handleSubmit((values) =>
                console.log(values)
            )}>
                <label htmlFor="Email">Correo electrónico: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Email", { required: true })} /><br /><br />

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
export default EmailForm;