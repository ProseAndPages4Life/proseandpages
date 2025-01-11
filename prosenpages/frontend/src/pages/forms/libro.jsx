
import { useForm } from "react-hook-form";
import { createBookReq } from "../../api/auth";

function BookForm() {

    const { register, handleSubmit } = useForm();
    

    const onSubmit = handleSubmit(async (values) => {
        console.log(values);
        const res = await createBookReq(values);
        console.log(res);
    }
    );

    return (
        <div className="form">
            <form onSubmit={onSubmit}>
                <label htmlFor="Titulo">Titulo: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Titulo", { required: true })} /><br /><br />


                <label htmlFor="Autor">Autor: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Autor", { required: true })} /><br /><br />


                <input type="radio" id="Físico" name="Formato" value="Físico" {...register("Formato", { required: true })} />
                <label htmlFor="Físico" for="Físico">Físico</label>
                <input type="radio" id="Digital" name="Formato" value="Digital" {...register("Formato", { required: true })} />
                <label htmlFor="Digital">Digital</label><br />



                <label htmlFor="Editorial">Editorial: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Editorial", { required: true })} /><br /><br />



                <label htmlFor="Año">Año: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Año", { required: true })} /><br /><br />

                <label htmlFor="Idioma">Idioma: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Idioma", { required: true })} /><br /><br />

                <label htmlFor="NumPag">Número de páginas: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("NumPag", { required: true })} /><br /><br />

                <div>
                    <input type="radio" id="Tapa blanda" name="Encuadernacion" value="Tapa blanda" {...register("Encuadernacion", { required: true })} />
                    <label htmlFor="Tipo1">Tapa blanda</label>

                    <input type="radio" id="Tapa dura" name="Encuadernacion" value="Tapa dura" {...register("Encuadernacion", { required: true })} />
                    <label htmlFor="Inventario">Tapa dura</label>

                    <input type="radio" id="No aplica" name="Encuadernacion" value="No aplica" {...register("Encuadernacion", { required: true })} />
                    <label htmlFor="Cliente">No aplica</label><br />
                </div>
                <br />
                <label htmlFor="ISBN">ISBN: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("ISBN", { required: true })} /><br /><br />

                <div>
                    <input type="radio" id="Fantasía" name="Categoria" value="Fantasía" {...register("Categoria", { required: true })} />
                    <label htmlFor="Fantasía">Fantasía</label>

                    <input type="radio" id="Ciencia Ficción" name="Categoria" value="Ciencia Ficción" {...register("Categoria", { required: true })} />
                    <label htmlFor="Ciencia Ficción">Ciencia Ficción</label>

                    <input type="radio" id="Romance" name="Categoria" value="Romance" {...register("Categoria", { required: true })} />
                    <label htmlFor="Romance">Romance</label>

                    <input type="radio" id="Suspenso" name="Categoria" value="Suspenso" {...register("Categoria", { required: true })} />
                    <label htmlFor="Suspenso">Suspenso</label>

                    <input type="radio" id="Poesía" name="Categoria" value="Poesía" {...register("Categoria", { required: true })} />
                    <label htmlFor="Poesía">Poesía</label>

                    <input type="radio" id="Infantiles" name="Categoria" value="Infantiles" {...register("Categoria", { required: true })} />
                    <label htmlFor="Infantiles">Infantiles</label>

                </div>
                <br />
                <label htmlFor="Precio">Precio: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Precio", { required: true })} /><br /><br />

                <label htmlFor="Portada">Portada: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Portada", { required: true })} /><br /><br />

                <label htmlFor="Stock">Stock: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Stock", { required: true })} /><br /><br />


                <div className="libros">
                    <div className="libros">
                        <a>
                            <button type="submit">Registrar!</button>
                            <text type="submit" className="botonRegistro">Registrar!</text>
                        </a>
                    </div>
                </div>
            </form>

            <p>Haz click para registrarte!!</p>

        </div>
    );

}
export default BookForm;