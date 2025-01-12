import { pool } from "../db.js";//Importando conexion con la base
//import { chekLogin } from "../middleware/validar_Login.js";

//Books
export const getBooks = async (req, res) => {
    try {

        /*
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear" ]);
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        */
        console.log("Realizando consulta de libros!\n");
        //throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        const [resultado] = await pool.query("SELECT * FROM Libros ORDER BY Titulo ASC");
        //const [resultado] = await pool.query("SELECT * FROM Login WHERE Emaiil=?");
        console.log("Consulta con éxito!\n");
        console.log("Mandando resultados al navegador!");
        res.json(resultado);
    } catch (error) {
        console.log("Error en getBooks().\nNo se pudo realizar la consulta select. Seguramente la tabla no existe.\n", error);
        return res.status(500).json([error.message]);
    }
    console.log("Finalizando funcion de consulta");
};

export const getaBook = async (req, res) => {
    try {
        /*
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear" ]);
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        */
        console.log("Realizando consulta de 1 libro!\n");
        //throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        const [resultado] = await pool.query("SELECT * FROM Libros WHERE id= ? ORDER BY Titulo DESC",
            [req.params.id]
        );
        if (resultado.length == 0) return res.status(404).json(["Libro no encontrado!!"]);

        console.log("Consulta con éxito!\n");


        console.log("Mandando resultados al navegador!");
        res.json(resultado[0]);
    } catch (error) {
        console.log("Error en getaBook().\nNo se pudo realizar la consulta select. Seguramente el id no existe.\n", error);
        return res.status(500).json([error.message]);
    }
    console.log("Finalizando funcion de consulta");
};

export const createBook = async (req, res) => {
    try {
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear" ]);
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        console.log("Mostrando JSON recibido:\n\n", req.body, "\nComenzando a jalar datos del JSON para meterlos a la base...\n");
        //Creando variables para guardar lo recibido en el JSON
        const { Titulo, Autor, Formato, Editorial, Año, Idioma, NumPag, Encudernacion, ISBN, Categoria, Precio, Portada, Stock } = req.body;
        console.log("Datos recibidos!\n");
        console.log(Titulo, Autor, Formato, Editorial, Año, Idioma, NumPag, Encudernacion, ISBN, Categoria, Precio, Portada, Stock);
        console.log("Insertando informacion en base...\n");
        //Creamos variable para realizar la consulta y sus resultados
        const [resultados] = await pool.query(
            "INSERT INTO Libros(Titulo, Autor, Formato, Editorial, Año, Idioma, NumPag, Encudernacion, ISBN, Categoria, Precio, Portada, Stock) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [Titulo, Autor, Formato, Editorial, Año, Idioma, NumPag, Encudernacion, ISBN, Categoria, Precio, Portada, Stock]);

        console.log("Insertado con éxito!!!\n");
        console.log("\n----------------------\nMostando resultados:\n", resultados);
        console.log("Datos ingresados:\n", Titulo, Autor, Formato, Editorial);
        console.log("Mostrando resultados en el navegador!\n");
        res.json({//Respuesta en el navegador!
            id: resultados.insertId,
            Titulo, Autor, Formato, Editorial, Año, Idioma, NumPag, Encudernacion, ISBN, Categoria, Precio, Portada, Stock
        });

    } catch (error) {
        console.log("Error en createBook().\n", error);
        return res.status(500).json([error.message]);
    }
    console.log("Terminando función!!\n");
};

export const updateBook = async (req, res) => {
    try {
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear" ]);
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        console.log('Actualizando libro');
        console.log("JSON Recibido: " + req.body);
        const resultado = await pool.query("UPDATE Libros SET ? WHERE id= ?", [
            //const resultado = await pool.query("UPDATE Libros SET Titulo="Titulo" WHERE id=1;", [
            req.body,
            req.params.id
        ]);
        if (resultado[0].affectedRows == 0) {
            console.log("Libro no existe!!\n");
            return res.status(404).json(["Libro no existe!!"]);
        }
        console.log(resultado);
        res.status(200).json(resultado);
    } catch (error) {
        console.log("Error en updateBook().\n", error);
        return res.status(500).json([error.message]);
    }
};

export const deleteBook = async (req, res) => {
    try {
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear" ]);
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        console.log("Recibido id:" + req.params.id);
        console.log("Realizando eliminacion de libros!\n");
        const resultado = await pool.query("DELETE FROM Libros WHERE id= ?",
            [req.params.id]
        );
        console.log(resultado[0]);
        if (resultado[0].affectedRows == 0) {
            console.log("Libro no existe!!\n");
            console.log("Finalizando funcion de consulta");
            return res.status(404).json(["Libro no existe!!"]);
        }
        console.log("Eliminado con éxito!\n");
        console.log("Mandando resultados al navegador!");
        console.log("Finalizando funcion de consulta");
        return res.status(200).json(["Eliminado con éxito!!"]);
    } catch (error) {
        console.log("Error en deleteBook().\n", error);
        return res.status(500).json([error.message]);
    }

};