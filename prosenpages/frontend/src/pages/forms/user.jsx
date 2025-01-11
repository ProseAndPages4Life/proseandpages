
import { useForm } from "react-hook-form";

export function UserForm() {

    const { register, handleSubmit } = useForm();

    return (
        <div className="form">
            <form onSubmit={handleSubmit((values) =>
                console.log(values)
            )}>
                <label htmlFor="Nombre">Nombre: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Nombre", { required: true })} /><br /><br />

                <label htmlFor="Apellido">Apellido: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Apellido", { required: true })} /><br /><br />

                <label htmlFor="Nacimiento">Nacimiento: </label>
                <input type="date" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Nacimiento", { required: true })} /><br /><br />

                <label htmlFor="Email">Correo electrónico: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Email", { required: true })} /><br /><br />

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

export function UserFormAdmin() {

    const { register, handleSubmit } = useForm();

    return (
        <div className="form">
            <form onSubmit={handleSubmit((values) =>
                console.log(values)
            )}>
                <label htmlFor="Nombre">Nombre: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Nombre", { required: true })} /><br /><br />

                <label htmlFor="Apellido">Apellido: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Apellido", { required: true })} /><br /><br />

                <label htmlFor="Nacimiento">Nacimiento: </label>
                <input type="date" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Nacimiento", { required: true })} /><br /><br />

                <label htmlFor="Email">Correo electrónico: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Email", { required: true })} /><br /><br />

                <label htmlFor="Contraseña">Contraseña: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Contraseña", { required: true })} /><br /><br />

                
                <div>
                    <input type="radio" id="Administrador" name="Tipo" value="Administrador" />
                    <label htmlFor="Administrador">Administrador</label>

                    <input type="radio" id="Inventario" name="Tipo" value="Inventario" />
                    <label htmlFor="Inventario">Inventario</label>

                    <input type="radio" id="Cliente" name="Tipo" value="Cliente" />
                    <label htmlFor="Cliente">Cliente</label>
                </div>
                <br />

                {/*
                <label htmlFor="Tipo">Tipo: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Contraseña", { required: true })} /><br /><br />


                <input type="radio"  id="Cliente1" name="Tipo" value="Cliente" {...register("Cliente", { required: true })} /><br />
                <label htmlFor="Tipo" for="Cliente1">Cliente</label><br />
                <input type="radio"  id="Inventario1" name="Tipo" value="Inventario"{...register("Inventario", { required: true })} /><br />
                <label htmlFor="Tipo" for="Inventario1">Inventario</label><br />
                <input type="radio"  id="Administrador1" name="Tipo" value="Administrador" {...register("Admninstador", { required: true })} /><br />
                <label htmlFor="Tipo" for="Administrador1">Administrador</label><br />
                */}

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

