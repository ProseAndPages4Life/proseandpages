import { pool } from "../db.js";//Importando conexion con la base
import bcrypt from 'bcryptjs';//Hasehar passwords
//Admin principal
export const getLandingAdmin = async (req, res) => {
    const Usuario = await req.user;
    if (!Usuario) {
        //return res.status(500).json({message: "No se pudo logear"});
        return console.log("No se pudo loguear!\n");
    }
    console.log("logueado como: ", Usuario);
    console.log("getLandingAdmin\n");
    res.send('Bienvenido a admin!!');
};
//Users
export const getUsers = async (req, res) => {
    console.log("Obteniendo usuarios!\n");
    try {

        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);

        console.log("Realizando consulta de usuarios!\n");
        //throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        const [resultado] = await pool.query("SELECT * FROM Usuarios WHERE id!= ? ORDER BY Tipo ASC",
            [Usuario.id]);
        console.log(resultado)
        console.log("Consulta con éxito!\n");
        console.log("Mandando resultados al navegador!");
        res.json(resultado);
    } catch (error) {
        console.log("Error en getUsers().\nNo se pudo realizar la consulta select. Seguramente la tabla no existe.\n", error);
        return res.status(500).json({ message: error.message });
    }
    console.log("Finalizando funcion de consulta");
};

export const getaUser = async (req, res) => {
    console.log('Obteniendo 1 usuario');
    try {
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        console.log("Realizando consulta de 1 usuario!\n");
        //throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        const [resultado] = await pool.query("SELECT * FROM Usuarios WHERE (id= ?) AND (id!=?)",
            [req.params.id, Usuario.id]
        );
        if (resultado.length == 0) return res.status(404).json({ message: "Usuario no encontrado!!" });

        console.log("Consulta con éxito!\n");


        console.log("Mandando resultados al navegador!");
        res.json(resultado[0]);
    } catch (error) {
        console.log("Error en getaUser().\nNo se pudo realizar la consulta select. Seguramente el id no existe.\n", error);
        return res.status(500).json({ message: error.message });
    }
    console.log("Finalizando funcion de consulta");
};

export const createUser = async (req, res) => {
    console.log('Creando usuarios');
    try {
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        console.log("Iniciando registro!\nCachando JSON:\n");
        console.log(req.body);
        console.log("\nExtrayendo datos del JSON!\n");
        const { Nombre, Apellido, Nacim, Email, Contraseña, Tipo } = req.body;
        console.log("Datos extraídos:\n", Nombre, Apellido, Nacim, Email, Contraseña, Tipo);

        console.log("Checando si ya existe correo: " + Email + "!");
        const [checkMail] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            "SELECT * FROM Login WHERE Email=? ",
            [Email]);
        console.log("Consulta: ");
        console.log(checkMail);
        console.log("Fin consulta");
        if (checkMail.length != 0) {
            console.log("Consulta no vacia!");

            //if (checkMail!=(undefined) || checkMail!=(0) || checkMail!=("") || checkMail!=(null) || checkMail!=([])|| checkMail.length!=0){
            console.log("Mostrando resultado de consulta:");
            console.log(checkMail[0].Email);
            //console.log(checkMail.Email);
            console.log("Comparando con ", Email);
            console.log(Email + "=" + checkMail[0].Email + "?");
            if (Email == checkMail[0].Email) {
                console.log("Correo ya existe!!\nbAntes de meter en db");
                return res.status(404).json({ message: "Correo ya existe!! Antes de db" });
            }
        }
        console.log("Consulta bazia! Correo no existe!");
        console.log("Continuando...");


        const [resultMail] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            "INSERT INTO Login(Email) VALUES (?)",
            [Email]);
        console.log(resultMail);
        if (resultMail.affectedRows == 0) {
            console.log("No se registro el usuario!\n");
            console.log("Correo ya existe!\n");
            console.log("Finalizando");
            return res.status(404).json({ message: "Usuario no existe!!" });
        }
        console.log("Hasheando password:\n");
        const Hashed = await bcrypt.hash(Contraseña, 10);//Hasheando contraseña
        const [resultHash] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            //"INSERT INTO Login(Contraseña) VALUES (?)",
            "UPDATE Login SET Contraseña=(?) WHERE Email=(?)",
            [Hashed, Email]);
        console.log(resultHash);
        console.log("Insertado!!! Login\n\n");
        console.log("Insertando Usuario\n");
        const [resultU] = await pool.query(
            "INSERT INTO Usuarios(Tipo, Nombre, Apellido, Nacim) VALUES (?,?,?,?)",
            [Tipo, Nombre, Apellido, Nacim]);
        console.log("Insertado con éxito!!!\n");
        console.log("\n----------------------\n++\nMostando resultados Usuario:\n", resultU);
        console.log("\n++\nMostando resultados Login:\nMail\n", resultMail + "\nHash\n" + resultHash);
        console.log("Datos ingresados:\n", Tipo, Nombre, Apellido, Nacim, Email, Hashed);
        /*
        console.log("Creando acces Token:\n");
        const Token = await crearToken({id: resultU.insertId},3)
        res.cookie("Token",Token);
        */
        console.log("Mostrando resultados en el navegador!\n");
        res.json({//Respuesta en el navegador!
            id: resultU.insertId,
            id: resultMail.insertId,
            Tipo,
            Nombre, Apellido, Nacim, Email, Hashed//, Token
        });
    } catch (error) {
        console.log("Error!!");
        switch (error.code) {
            case "ER_DUP_ENTRY":
                console.log("Correo ya existe!!");
                return res.status(500).json({ Error: "Correo ya existe!!" });
                break;
            default:
                console.log("Error en regisUser().\n", error);
                console.log("Falló funcion registro.");
                return res.status(500).json({ Error: error.message });
                break;
        }
        console.log("Error en regisUser().\n", error);
    }
    console.log("Finalizando funcion de registro");
};

export const updateUser = async (req, res) => {
    console.log('Actualizando usuario');
    try {
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);

        const idUsuario=Usuario.id;
        const idUrl=req.params.id;
        let sameUser=0;
        console.log("UsuarioId: "+idUsuario)
        console.log("UrlID: "+idUrl)
        if(idUrl==idUsuario){
            console.log("Mismo usuario!")
            sameUser=1;
            const Tipo=req.body.Tipo;
            console.log("Tipo:")
            console.log(Tipo)
            if(Tipo!=undefined){
                console.log("No puedes actualizar tu tipo!")
                return res.status(404).json({ message: "No cambies tu tipo!!" });
            }
        }
        console.log('Actualizando libro');
        console.log("JSON Recibido: " + req.body);
        /*            
        const Email = req.body.Email;
        console.log("Checando si ya existe correo: " + Email + "!");
        const [checkMail] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            "SELECT * FROM Login WHERE Email=? ",
            [Email]);
        console.log("Consulta: ");
        console.log(checkMail);
        console.log("Fin consulta");
        if (checkMail.length != 0) {
            console.log("Consulta no vacia!");

            //if (checkMail!=(undefined) || checkMail!=(0) || checkMail!=("") || checkMail!=(null) || checkMail!=([])|| checkMail.length!=0){
            console.log("Mostrando resultado de consulta:");
            console.log(checkMail[0].Email);
            //console.log(checkMail.Email);
            console.log("Comparando con ", Email);
            console.log(Email + "=" + checkMail[0].Email + "?");
            if (Email == checkMail[0].Email) {
                console.log("Correo ya existe!!\nbAntes de meter en db");
                return res.status(404).json({ message: "Correo ya existe!! Antes de db" });
            }
        }
        console.log("Consulta bazia! Correo no existe!");
        console.log("Continuando...");
        */
        
        

        const resultado = await pool.query("UPDATE Usuarios SET ? WHERE id= ?;", [
            //const resultado = await pool.query("UPDATE Libros SET Titulo="Titulo" WHERE id=1;", [
            req.body,
            req.params.id
        ]);
        if (resultado[0].affectedRows == 0) {
            console.log("Usuario no existe!!\n");
            return res.status(404).json({ message: "Usuario no existe!!" });
        }
        const resultado2 = await pool.query("UPDATE Login SET Actualizacion=now() WHERE id= ?;", [
            //const resultado = await pool.query("UPDATE Libros SET Titulo="Titulo" WHERE id=1;", [
            req.params.id
        ]);

        console.log("Resultados:\n");
        console.log(resultado);
        console.log("Resultado2:\n");
        console.log(resultado2);
        console.log("Usuario actualizado con éxito!!\n");
        res.status(200).json("Actualizado con éxito!");
    } catch (error) {
        console.log("Error en updateBook().\n", error);
        return res.status(500).json({ message: error.message });
    }
};

export const updateUserPass = async (req, res) => {
    console.log('Actualizando contraseña');
    try {
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);

        console.log('Actualizando libro');
        console.log("JSON Recibido: " + req.body);
        const resultado = await pool.query("UPDATE Login SET ? WHERE id= ?;", [
            //const resultado = await pool.query("UPDATE Libros SET Titulo="Titulo" WHERE id=1;", [
            req.body,
            req.params.id
        ]);
        if (resultado[0].affectedRows == 0) {
            console.log("Usuario no existe!!\n");
            return res.status(404).json({ message: "Usuario no existe!!" });
        }
        const resultado2 = await pool.query("UPDATE Login SET Actualizacion=now() WHERE id= ?;", [
            //const resultado = await pool.query("UPDATE Libros SET Titulo="Titulo" WHERE id=1;", [
            req.params.id
        ]);

        console.log("Resultados:\n");
        console.log(resultado);
        console.log("Resultado2:\n");
        console.log(resultado2);
        console.log("Contraseña actualizada con éxito!!\n");
        res.status(200).json("Actualizada con éxito!");
    } catch (error) {
        console.log("Error en updateBook().\n", error);
        return res.status(500).json({ message: error.message });
    }
};

export const updateUserEmail = async (req, res) => {
    console.log('Actualizando email');
    try {
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);

        console.log('Actualizando libro');
        console.log("JSON Recibido: " + req.body);

        const Email = req.body.Email;
        console.log("Checando si ya existe correo: " + Email + "!");
        const [checkMail] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            "SELECT * FROM Login WHERE Email=? ",
            [Email]);
        console.log("Consulta: ");
        console.log(checkMail);
        console.log("Fin consulta");
        if (checkMail.length != 0) {
            console.log("Consulta no vacia!");

            //if (checkMail!=(undefined) || checkMail!=(0) || checkMail!=("") || checkMail!=(null) || checkMail!=([])|| checkMail.length!=0){
            console.log("Mostrando resultado de consulta:");
            console.log(checkMail[0].Email);
            //console.log(checkMail.Email);
            console.log("Comparando con ", Email);
            console.log(Email + "=" + checkMail[0].Email + "?");
            if (Email == checkMail[0].Email) {
                console.log("Correo ya existe!!\nbAntes de meter en db");
                return res.status(404).json({ message: "Correo ya existe!! Antes de db" });
            }
        }
        console.log("Consulta bazia! Correo no existe!");
        console.log("Continuando...");

        const resultado = await pool.query("UPDATE Login SET ? WHERE id= ?;", [
            //const resultado = await pool.query("UPDATE Libros SET Titulo="Titulo" WHERE id=1;", [
            req.body,
            req.params.id
        ]);
        if (resultado[0].affectedRows == 0) {
            console.log("Usuario no existe!!\n");
            return res.status(404).json({ message: "Usuario no existe!!" });
        }
        const resultado2 = await pool.query("UPDATE Login SET Actualizacion=now() WHERE id= ?;", [
            //const resultado = await pool.query("UPDATE Libros SET Titulo="Titulo" WHERE id=1;", [
            req.params.id
        ]);

        console.log("Resultados:\n");
        console.log(resultado);
        console.log("Resultado2:\n");
        console.log(resultado2);
        console.log("Contraseña actualizada con éxito!!\n");
        res.status(200).json("Actualizada con éxito!");
    } catch (error) {
        console.log("Error en updateBook().\n", error);
        return res.status(500).json({ message: error.message });
    }
};


export const deleteUser = async (req, res) => {
    console.log('eliminando usuario');
    try {
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        console.log("Recibido id:" + req.params.id);
        if (Usuario.id == req.params.id) {
            console.log("No puedes borrar tu usuario!!\n");
            console.log("Finalizando funcion de eliminar");
            return res.status(404).json({ message: "No puedes borrar tu usuario!!" });
        }
        console.log("Realizando eliminacion de usuario!\n");

        const resultado = await pool.query("DELETE FROM Usuarios WHERE id= ?",
            [req.params.id]
        );
        console.log(resultado[0]);
        if (resultado[0].affectedRows == 0) {
            console.log("Usuario no existe!!\n");
            console.log("Finalizando funcion de eliminar");
            return res.status(404).json({ message: "Usuario no existe!!" });
        }
        const resultado2 = await pool.query("DELETE FROM Login WHERE id= ?",
            [req.params.id]
        );
        console.log("Eliminado con éxito!\n");
        console.log("Resultados:\n");
        console.log(resultado, "\n---&---\n", resultado2, "\n");
        console.log("Mandando resultados al navegador!");
        console.log("Finalizando funcion de eliminar");
        return res.status(200).json({ message: "Eliminado con éxito!!" });
    } catch (error) {
        console.log("Error en deleteBook().\n", error);
        return res.status(500).json({ message: error.message });
    }

}
/*
//Books
export const getBooks = async (req,res) => {
    try {
        console.log("Realizando consulta de libros!\n")
        //throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        const [resultado] = await pool.query("SELECT * FROM Libros ORDER BY Titulo DESC")
        console.log("Consulta con éxito!\n");
        console.log("Mandando resultados al navegador!")
        res.json(resultado)
    } catch (error) {
        console.log("Error en getBooks().\nNo se pudo realizar la consulta select. Seguramente la tabla no existe.\n",error)
        return res.status(500).json({message: error.message});
    }
        console.log("Finalizando funcion de consulta")
}

export const getaBook = async (req,res) => {
    try {
        console.log("Realizando consulta de 1 libro!\n")
        //throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        const [resultado] = await pool.query("SELECT * FROM Libros WHERE id= ? ORDER BY Titulo DESC",
            [req.params.id]
        )
        if (resultado.length == 0) return res.status(404).json({ message: "Libro no encontrado!!"})
        
        console.log("Consulta con éxito!\n");


        console.log("Mandando resultados al navegador!")
        res.json(resultado[0])
    } catch (error) {
        console.log("Error en getaBook().\nNo se pudo realizar la consulta select. Seguramente el id no existe.\n",error)
        return res.status(500).json({message: error.message});
    }
        console.log("Finalizando funcion de consulta")
}

export const createBook = async (req,res) => {
    try {
        console.log("Mostrando JSON recibido:\n\n",req.body,"\nComenzando a jalar datos del JSON para meterlos a la base...\n")
        //Creando variables para guardar lo recibido en el JSON
        const {Titulo,Autor,Formato,Editorial,Año,Idioma,NumPag,Encudernacion,ISBN,Categoria,Precio,Portada,Stock} = req.body
        console.log("Datos recibidos!\n");
        console.log(Titulo,Autor,Formato,Editorial,Año,Idioma,NumPag,Encudernacion,ISBN,Categoria,Precio,Portada,Stock)
        console.log("Insertando informacion en base...\n")
        //Creamos variable para realizar la consulta y sus resultados
        const [resultados] = await pool.query(
            "INSERT INTO Libros(Titulo, Autor, Formato, Editorial, Año, Idioma, NumPag, Encudernacion, ISBN, Categoria, Precio, Portada, Stock) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [Titulo,Autor,Formato,Editorial,Año,Idioma,NumPag,Encudernacion,ISBN,Categoria,Precio,Portada,Stock] );
    
        console.log("Insertado con éxito!!!\n")
        console.log("\n----------------------\nMostando resultados:\n",resultados);
        console.log("Datos ingresados:\n",titulo,Autor,Formato,Editorial)
        console.log("Mostrando resultados en el navegador!\n");
        res.json({//Respuesta en el navegador!
            id: resultados.insertId,
            Titulo,Autor,Formato,Editorial,Año,Idioma,NumPag,Encudernacion,ISBN,Categoria,Precio,Portada,Stock
        })
        
    } catch (error) {
        console.log("Error en createBook().\n",error)
        return res.status(500).json({message: error.message});
    }
    console.log("Terminando función!!\n")
}

export const updateBook = async (req,res) => {
    try {
        console.log('Actualizando libro')
        const resultado = await pool.query("UPDATE Login SET ? WHERE id= ?", [
            req.body,
            req.params.id
        ])
        if (resultado[0].affectedRows == 0) {
            console.log("Libro no existe!!\n");
            return res.status(404).json({message: "Libro no existe!!"});
        }
        console.log(resultado)
        res.status(200).json(resultado)
    } catch (error) {
        console.log("Error en updateBook().\n",error)
        return res.status(500).json({message: error.message});
    }
}

export const deleteBook = async (req,res) => {
    try {
        console.log("Recibido id:"+req.params.id)
        console.log("Realizando eliminacion de libros!\n")
        const resultado = await pool.query("DELETE FROM Libros WHERE id= ?",
            [req.params.id]
        )
        console.log(resultado[0])
        if (resultado[0].affectedRows == 0) {
            console.log("Libro no existe!!\n");
            console.log("Finalizando funcion de consulta")
            return res.status(404).json({message: "Libro no existe!!"});
        }
        console.log("Eliminado con éxito!\n");
        console.log("Mandando resultados al navegador!")
        console.log("Finalizando funcion de consulta")
        return res.status(200).json({message: "Eliminado con éxito!!"});
    } catch (error) {
        console.log("Error en deleteBook().\n",error)
        return res.status(500).json({message: error.message});
    }
        
}

*/