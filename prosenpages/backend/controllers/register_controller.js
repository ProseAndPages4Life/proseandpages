import { pool } from "../db.js";//Importando conexion con la base
import bcrypt from 'bcryptjs';//Hasehar passwords
//import { crearToken } from '../libs/jwt.js'; //JWT para autenticar

export const regisAdmin = async (req, res) => {
    try {
        const Usuario = await req.user;
        if (Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            console.log("Estas logueado!\n");
            return res.status(404).json({ message: "Estas logueado!" })
        }
        //console.log("logueado como: ", Usuario);
        console.log("++++++++++++++++++");
        console.log("Iniciando registro!\nCachando JSON:\n");
        console.log(req.body);
        console.log("\nExtrayendo datos del JSON!\n");
        const { Nombre, Apellido, Nacim, Email, Contraseña } = req.body;
        console.log("Datos extraídos:\n", Nombre, Apellido, Nacim, Email, Contraseña);

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
        //}else{
        //    console.log("Consulta vacia! Continuando")
        //}

        console.log("Insertando correo...");
        const [resultMail] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            "INSERT INTO Login(Email) VALUES (?)",
            [Email]);
        console.log(resultMail);
        if (resultMail.affectedRows == 0) {
            console.log("No se registro el usuario!\n");
            console.log("Correo ya existe!\n");
            console.log("Finalizando");
            return res.status(404).json({ message: "Correo ya existe!!" });
        }
        console.log("Hasheando password:\n");
        const Hashed = await bcrypt.hash(Contraseña, 10);//Hasheando contraseña
        const [resultHash] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            "UPDATE Login SET Contraseña=? WHERE id=?",
            [Hashed, resultMail.insertId]);
        console.log(resultHash);
        console.log("Insertados pass & email!!!\n\n\n");
        console.log("Insertando Usuario\n");
        const [resultU] = await pool.query(
            "INSERT INTO Usuarios(Tipo, Nombre, Apellido, Nacim) VALUES ('Administrador',?,?,?)",
            [Nombre, Apellido, Nacim]);
        console.log(resultHash);
        console.log("Insertado con éxito!!!\n");
        console.log("\n----------------------\n++\nMostando resultados Usuario:\n", resultU);
        console.log("\nLogin:\n\nMail:");
        console.log(resultMail);
        console.log("\nHash:");
        console.log(resultHash);
        console.log("\nDatos ingresados:\n", Nombre, Apellido, Nacim, Email, Hashed);
        /*
        console.log("Creando acces Token:\n");
        const Token = await crearToken({id: resultU.insertId},2)
        res.cookie("Token",Token);
        */
        console.log("Mostrando resultados en el navegador!\n");

        res.json({//Respuesta en el navegador!
            id: resultMail.insertId,
            id2: resultU.insertId,
            //id2: resultHash.insertId, Siempre esta en 0 porque es un update
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
    }
    console.log("Finalizando funcion de registro");
};

export const regisClient = async (req, res) => {
    try {
        const Usuario = await req.user;
        console.log("usuario")
        console.log(Usuario)
        if (Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            console.log("Estas logueado!\n");
            return res.status(404).json({ message: "Estas logueado!" })
        }
        console.log("++++++++++++++++++");
        console.log("Iniciando registro!\nCachando JSON:\n");
        console.log(req.body);
        console.log("\nExtrayendo datos del JSON!\n");
        const { Nombre, Apellido, Nacim, Email, Contraseña } = req.body;
        console.log("Datos extraídos:\n", Nombre, Apellido, Nacim, Email, Contraseña);

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
        console.log("Insertando correo...");
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
            "UPDATE Login SET Contraseña=? WHERE id=?",
            [Hashed, resultMail.insertId]);
        console.log(resultHash);
        console.log("Insertados pass & email!!!\n\n\n");
        console.log("Insertando Usuario\n");
        const [resultU] = await pool.query(
            "INSERT INTO Usuarios(Tipo, Nombre, Apellido, Nacim) VALUES ('Cliente',?,?,?)",
            [Nombre, Apellido, Nacim]);
        console.log(resultHash);
        console.log("Insertado con éxito!!!\n");
        console.log("\n----------------------\n++\nMostando resultados Usuario:\n", resultU);
        console.log("\nLogin:\n\nMail:");
        console.log(resultMail);
        console.log("\nHash:");
        console.log(resultHash);
        console.log("\nDatos ingresados:\n", Nombre, Apellido, Nacim, Email, Hashed);
        /*
        console.log("Creando acces Token:\n");
        const Token = await crearToken({id: resultU.insertId},2)
        res.cookie("Token",Token);
        */
        console.log("Mostrando resultados en el navegador!\n");

        res.json({//Respuesta en el navegador!
            id: resultMail.insertId,
            id2: resultU.insertId,
            //id2: resultHash.insertId, Siempre esta en 0 porque es un update
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
    }
    console.log("Finalizando funcion de registro");
};

export const regisInv = async (req, res) => {
    try {

        const Usuario = await req.user;
        console.log("usuario")
        console.log(Usuario)
        if (Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            console.log("Estas logueado!\n");
            return res.status(404).json({ message: "Estas logueado!" })
        }
        console.log("++++++++++++++++++");
        console.log("Iniciando registro!\nCachando JSON:\n");
        console.log(req.body);
        console.log("\nExtrayendo datos del JSON!\n");
        const { Nombre, Apellido, Nacim, Email, Contraseña } = req.body;
        console.log("Datos extraídos:\n", Nombre, Apellido, Nacim, Email, Contraseña);

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
        console.log("Insertando correo...");
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
            "UPDATE Login SET Contraseña=? WHERE id=?",
            [Hashed, resultMail.insertId]);
        console.log(resultHash);
        console.log("Insertados pass & email!!!\n\n\n");
        console.log("Insertando Usuario\n");
        const [resultU] = await pool.query(
            "INSERT INTO Usuarios(Tipo, Nombre, Apellido, Nacim) VALUES ('Inventario',?,?,?)",
            [Nombre, Apellido, Nacim]);
        console.log(resultHash);
        console.log("Insertado con éxito!!!\n");
        console.log("\n----------------------\n++\nMostando resultados Usuario:\n", resultU);
        console.log("\nLogin:\n\nMail:");
        console.log(resultMail);
        console.log("\nHash:");
        console.log(resultHash);
        console.log("\nDatos ingresados:\n", Nombre, Apellido, Nacim, Email, Hashed);
        /*
        console.log("Creando acces Token:\n");
        const Token = await crearToken({id: resultU.insertId},2)
        res.cookie("Token",Token);
        */
        console.log("Mostrando resultados en el navegador!\n");

        res.json({//Respuesta en el navegador!
            id: resultMail.insertId,
            id2: resultU.insertId,
            //id2: resultHash.insertId, Siempre esta en 0 porque es un update
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
    }
    console.log("Finalizando funcion de registro");
};

export const updatePass = async (req, res) => {
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
    console.log("Extrayedno contraseña del JSON\n")
        const {Contraseña } = req.body;
        console.log("Contraseña:")
        console.log(Contraseña)
        console.log("Hasheando password:\n");
        const Hashed = await bcrypt.hash(Contraseña, 10);//Hasheando contraseña
        console.log("Hashed: "+Hashed)
        const resultado = await pool.query("UPDATE Login SET Contraseña=? WHERE id= ?;", [
            //const resultado = await pool.query("UPDATE Libros SET Titulo="Titulo" WHERE id=1;", [
            Hashed,
            Usuario.id
            //req.params.id
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
        console.log("Error en updatePass().\n", error);
        return res.status(500).json({ message: error.message });
    }
};

export const updateMail = async (req, res) => {
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
            Usuario.id
            //req.params.id
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
        console.log("Mail actualizada con éxito!!\n");
        res.status(200).json("Actualizada con éxito!");
    } catch (error) {
        console.log("Error en updateMail().\n", error);
        return res.status(500).json({ message: error.message });
    }
};

/*
export const regisGlobal = async (req,res) => {
    try {
        
        console.log("Iniciando registro!\nCachando JSON:\n")
        console.log(req.body)
        console.log("\nExtrayendo datos del JSON!\n");
        const {Nombre, Apellido, Nacim, Email, Contraseña} = req.body;
        console.log("Datos extraídos:\n",Nombre, Apellido, Nacim, Email, Contraseña)
        console.log("Hasheando password:\n");
        const Hashed = await bcrypt.hash(Contraseña,10)//Hasheando contraseña

        const [resultU] = await pool.query(
            "INSERT INTO Usuarios(Tipo, Nombre, Apellido, Nacim) VALUES ('Cliente',?,?,?)",
            [Nombre,Apellido,Nacim] );
        const [resultL] = await pool.query(
            "INSERT INTO Login(Email, Contraseña) VALUES (?,?)",
            [Email,Hashed] );
        console.log("Insertado con éxito!!!\n")
        console.log("\n----------------------\n++\nMostando resultados Usuario:\n",resultU);
        console.log("\n++\nMostando resultados Login:\n",resultL);
        console.log("Datos ingresados:\n",Nombre, Apellido, Nacim, Email, Hashed)
        
        //console.log("Creando acces Token:\n");
        //const Token = await crearToken({id: resultU.insertId},1)
        //res.cookie("Token",Token);
        
        console.log("Mostrando resultados en el navegador!\n");
        
        res.json({//Respuesta en el navegador!
            id: resultU.insertId,
            id: resultL.insertId,
            Nombre, Apellido, Nacim, Email, Hashed//, Token
        })
    } catch (error) {
        console.log("Error en regisUser().\n",error)
        return res.status(500).json({message: error.message});
    }
        console.log("Finalizando funcion de registro")
}



*/