
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
                {
                    errors.Titulo && (
                        <p className="text">Titulo es requerido!</p>
                    )
                }
                <label htmlFor="Autor">Autor: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Autor", { required: true })} /><br /><br />
                {
                    errors.Autor && (
                        <p className="text">Autor es requerido!</p>
                    )
                }
                <input type="radio" id="Físico" name="Formato" value="Físico" {...register("Formato", { required: true })} />
                <label htmlFor="Físico">Físico</label>
                {
                    errors.Formato && (
                        <p className="text">Formato es requerido!</p>
                    )
                }
                <input type="radio" id="Digital" name="Formato" value="Digital" {...register("Formato", { required: true })} />
                <label htmlFor="Digital">Digital</label><br />
                {
                    errors.Formato && (
                        <p className="text">Formato es requerido!</p>
                    )
                }
                <label htmlFor="Editorial">Editorial: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Editorial", { required: true })} /><br /><br />
                {
                    errors.Editorial && (
                        <p className="Editorial">xxx es requerido!</p>
                    )
                }
                <label htmlFor="Año">Año: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Año", { required: true })} /><br /><br />
                {
                    errors.Año && (
                        <p className="text">Año es requerido!</p>
                    )
                }
                <label htmlFor="Idioma">Idioma: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Idioma", { required: true })} /><br /><br />
                {
                    errors.Idioma && (
                        <p className="text">Idioma es requerido!</p>
                    )
                }
                <label htmlFor="NumPag">Número de páginas: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("NumPag", { required: true })} /><br /><br />
                {
                    errors.NumPag && (
                        <p className="text">Número de páginas es requerido!</p>
                    )
                }
                <div>
                    <input type="radio" id="Tapa blanda" name="Encuadernacion" value="Tapa blanda" {...register("Encuadernacion", { required: true })} />
                    <label htmlFor="TapaBlanda">Tapa blanda</label>
                    {
                        errors.Encuadernacion && (
                            <p className="text">Encuadernacion es requerido!</p>
                        )
                    }
                    <input type="radio" id="Tapa dura" name="Encuadernacion" value="Tapa dura" {...register("Encuadernacion", { required: true })} />
                    <label htmlFor="TapaDura">Tapa dura</label>
                    {
                        errors.Encuadernacion && (
                            <p className="text">Encuadernacion es requerido!</p>
                        )
                    }
                    <input type="radio" id="No aplica" name="Encuadernacion" value="No aplica" {...register("Encuadernacion", { required: true })} />
                    <label htmlFor="NoAplica">No aplica</label><br />
                    {
                        errors.Encuadernacion && (
                            <p className="text">Encuadernacion es requerido!</p>
                        )
                    }
                </div>
                <br />
                <label htmlFor="ISBN">ISBN: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("ISBN", { required: true })} /><br /><br />
                {
                    errors.ISBN && (
                        <p className="text">ISBN es requerido!</p>
                    )
                }
                <div>
                    <input type="radio" id="Fantasía" name="Categoria" value="Fantasía" {...register("Categoria", { required: true })} />
                    <label htmlFor="Fantasía">Fantasía</label>
                    {
                        errors.Categoria && (
                            <p className="text">Categoria es requerido!</p>
                        )
                    }
                    <input type="radio" id="Ciencia Ficción" name="Categoria" value="Ciencia Ficción" {...register("Categoria", { required: true })} />
                    <label htmlFor="Ciencia Ficción">Ciencia Ficción</label>
                    {
                        errors.Categoria && (
                            <p className="text">Categoria es requerido!</p>
                        )
                    }
                    <input type="radio" id="Romance" name="Categoria" value="Romance" {...register("Categoria", { required: true })} />
                    <label htmlFor="Romance">Romance</label>
                    {
                        errors.Categoria && (
                            <p className="text">Categoria es requerido!</p>
                        )
                    }
                    <input type="radio" id="Suspenso" name="Categoria" value="Suspenso" {...register("Categoria", { required: true })} />
                    <label htmlFor="Suspenso">Suspenso</label>
                    {
                        errors.Categoria && (
                            <p className="text">Categoria es requerido!</p>
                        )
                    }
                    <input type="radio" id="Poesía" name="Categoria" value="Poesía" {...register("Categoria", { required: true })} />
                    <label htmlFor="Poesía">Poesía</label>
                    {
                        errors.Categoria && (
                            <p className="text">Categoria es requerido!</p>
                        )
                    }
                    <input type="radio" id="Infantiles" name="Categoria" value="Infantiles" {...register("Categoria", { required: true })} />
                    <label htmlFor="Infantiles">Infantiles</label>
                    {
                        errors.Categoria && (
                            <p className="text">Categoria es requerido!</p>
                        )
                    }
                </div>
                <br />
                <label htmlFor="Precio">Precio: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Precio", { required: true })} /><br /><br />
                {
                    errors.Precio && (
                        <p className="text">Precio es requerido!</p>
                    )
                }
                <label htmlFor="Portada">Portada: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Portada", { required: true })} /><br /><br />
                {
                    errors.Portada && (
                        <p className="text">Portada es requerido!</p>
                    )
                }
                <label htmlFor="Stock">Stock: </label>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("Stock", { required: true })} /><br /><br />
                {
                    errors.Stock && (
                        <p className="text">Stock es requerido!</p>
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
export default BookForm;