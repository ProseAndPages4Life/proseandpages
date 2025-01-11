import { pool } from "../db.js";//Importando conexion con la base
//Calle, Numero, Colonia, Estado, CP, Refer


export const getAddr = async (req, res) => {
    console.log("Obteniendo address!\n");
    try {
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        console.log("Tu usuario id es:", parseInt(Usuario.id));

        let [addrsUser] = await pool.query(
            "SELECT * FROM Direccion WHERE usuario_id=?",
            [Usuario.id]);

        if (addrsUser.length == []) {
            console.log("No hay addrs registradas!");
        }
        console.log("addrsUser:");
        console.log(addrsUser);
        console.log("Tamaño del arreglo de la consulta:");
        console.log(addrsUser.length);
        let calleSaved = 0;
        let numSaved = 0;
        let addrId = 0;

        for (let n = 0; n <= (addrsUser.length - 1); n++) {
            calleSaved = addrsUser[n].Calle;
            numSaved = addrsUser[n].Numero;
            addrId = addrsUser[n].Id;
            console.log("\nCalle no. " + (n + 1));
            console.log("Id: " + addrId);
            console.log("Nombre de calle cachado:");
            console.log(calleSaved);
            console.log("Y numero:");
            console.log(numSaved);
        }

        res.json(addrsUser);
    } catch (error) {
        console.log("Error en getAddr().\nNo se pudo realizar la consulta select. Seguramente la tabla no existe.\n", error);
        return res.status(500).json({ message: error.message });
    }
    console.log("Finalizando funcion de consulta");
};

export const createAddr = async (req, res) => {
    console.log('Creando addr');
    try {
        //var valid = require("card-validator");
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);

        console.log("Checando si se puede agregar otra addr");
        let [addrsUser] = await pool.query(
            "SELECT id,Calle,Numero FROM Direccion WHERE usuario_id=(?)",
            [Usuario.id]);

        if (addrsUser.length == []) {
            console.log("No hay addrs registradas!");
        }
        console.log("addrsUser:");
        console.log(addrsUser);
        console.log("Tamaño del arreglo de la consulta:");
        console.log(addrsUser.length);
        if (addrsUser.length >= 2) {
            console.log("Ya no puedes agregar más addrs!!");
            return res.status(200).json({ Error: "Ya no puedes agregar más addrs!!" });
        }
        //existe la que se quire agreagar?
        console.log("Checando si ya existe la addr");

        console.log("Cachando JSON:\n");
        console.log(req.body);
        console.log("\nExtrayendo datos del JSON!\n");
        const { Calle, Numero, Colonia, Estado, CP, Refer } = req.body;
        console.log("Datos extraídos:\n", Calle, Numero, Colonia, Estado, CP, Refer);

        for (let n = 0; n <= (addrsUser.length - 1); n++) {
            let calleSaved = addrsUser[n].Calle;
            let numSaved = addrsUser[n].Numero;
            console.log("Nombre de calle cachado:");
            console.log(calleSaved);
            console.log("Y numero:");
            console.log(numSaved);
            if ((calleSaved == Calle) && (numSaved == Numero)) {
                console.log(calleSaved + " = " + Calle);
                console.log(numSaved + " = " + Numero);
                console.log("Ya existe la addr en la base!");
                console.log("Deteniendo for");
                n = addrsUser.length;
                return res.status(200).json({ Error: "Ya existe esa addr!!" });
            }
        }

        console.log("Ingresando ");//agrega la tarjeta
        let [addrsInsert] = await pool.query(
            //"insert into direccion(usuario_id,nombre,num,venc,cvv) values (?,?,?,?,?)",
            "insert into direccion(Usuario_id,Calle,Numero,Colonia,Estado,CP,Refer) values (?,?,?,?,?,?,?)",
            [Usuario.id, Calle, Numero, Colonia, Estado, CP, Refer]);

        if (addrsInsert.length == []) {
            console.log("No se pudo registrar la addr!");
        }
        console.log("addrsInsert:");
        console.log(addrsInsert);

        let jsonGen = {
            Calle, Numero, Colonia, Estado, CP, Refer
        };

        console.log(JSON.stringify(jsonGen));
        const jsonAddr = JSON.parse(JSON.stringify(jsonGen));
        console.log("json generado:");
        console.log(jsonAddr);

        console.log("Mostrando resultados en el navegador!\n");
        res.json(jsonAddr);

    } catch (error) {
        console.log("Error!!");
        switch (error.code) {
            case "ER_DUP_ENTRY":
                console.log("Ya no puedes agregar más addrs!!");
                return res.status(500).json({ Error: "Ya no puedes agregar más addrs!!" });
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

export const updateAddr = async (req, res) => {
    console.log("Actualizando addr!\n");
    try {
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        let UserId = Usuario.id;
        console.log("Tu usuario id es:", parseInt(UserId));

        console.log("Jalando datos del JSON");
        let { Calle, Numero, Colonia, Estado, CP, Refer } = req.body;
        console.log("Datos extraídos:\n", Calle, Numero, Colonia, Estado, CP, Refer);
        console.log("Id del url");
        const idUrl = req.params.id;
        console.log(idUrl);
        //++++++++++++++++++++++
        console.log("Checando si ya existe la addr");

        let [addrsUser] = await pool.query(
            "SELECT id,Calle,Numero FROM Direccion WHERE usuario_id=(?)",
            [Usuario.id]);

        if (addrsUser.length == []) {
            console.log("No hay addrs registradas!");
        }
        console.log("addrsUser:");
        console.log(addrsUser);
        console.log("Tamaño del arreglo de la consulta:");
        console.log(addrsUser.length);
        let calleSaved = 0;
        let numSaved = 0;
        let addrId = 0;


        for (let n = 0; n <= (addrsUser.length - 1); n++) {
            calleSaved = addrsUser[n].Calle;
            numSaved = addrsUser[n].Numero;
            addrId = addrsUser[n].Id;
            console.log("\nCalle no. " + (n + 1));
            console.log("Id: " + addrId);
            console.log("Nombre de calle cachado:");
            console.log(calleSaved);
            console.log("Y numero:");
            console.log(numSaved);
            if ((calleSaved == Calle) && (numSaved == Numero)) {
                console.log(calleSaved + " = " + Calle);
                console.log(numSaved + " = " + Numero);
                console.log("Ya existe la addr en la base!");
                console.log("Deteniendo for");
                n = addrsUser.length;
                return res.status(200).json({ Error: "Ya existe esa addr!!" });
            }
        }

        console.log(addrsUser.length);
        console.log(idUrl);
        if (addrsUser.length == 2) {
            switch (idUrl) {
                case "1":
                    console.log("Actualizando address 1");
                    addrId = addrsUser[0].id;
                    console.log("addrId ahora");
                    console.log(addrId);
                    break;
                case "2":
                    console.log("Actualizando address 2");
                    addrId = addrsUser[1].id;
                    console.log("addrId ahora");
                    console.log(addrId);
                    break;
                default:
                    console.log("Actualizando address 1");
                    addrId = addrsUser[0].id;
                    console.log("addrId ahora");
                    console.log(addrId);
                    break;
            }
        } else {
            console.log("Actualizando address 1");
            addrId = addrsUser[0].id;
            console.log("addrId ahora");
            console.log(addrId);
        }

        /*
"insert into direccion(Usuario_id,Calle,Numero,Colonia,Estado,CP,Refer) values (?,?,?,?,?,?,?)",
            [Usuario.id, Calle, Numero, Colonia, Estado, CP, Refer]);
        */
        const [updateAddress] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            "UPDATE direccion set Calle=?,Numero=?,Colonia=?,Estado=?, CP=?,Refer=? where usuario_id=? AND id=?",
            [Calle, Numero, Colonia, Estado, CP, Refer, Usuario.id, addrId]);

        if (!updateAddress.length) {
            console.log("Algo sucedio en el chequeo de la tabla. Seguramente no existe!");
            //return res.status(500).json({ message: "Nada en tu address!" });
        }
        console.log("Mostrando resultados de update");
        console.log(updateAddress);
        console.log("Tamaño del arreglo:");
        console.log(updateAddress.length);

        console.log("generando json!");

        let jsonGen = {
            //"Id": updateAddress[n].id,
            Calle, Numero, Colonia, Estado, CP,
            "Referencias:": Refer
        };

        console.log("json generado:");
        console.log(JSON.stringify(jsonGen));
        const jsonEntrega = JSON.parse(JSON.stringify(jsonGen));

        console.log("Parseado:");
        console.log(jsonEntrega);
        //res.json(updateAddress);
        console.log("Mandando al navegador!");
        res.json(jsonEntrega);

    } catch (error) {
        console.log("Error en getTarjeta().\nNo se pudo realizar la consulta select. Seguramente la tabla no existe.\n", error);
        return res.status(500).json({ message: error.message });
    }
    console.log("Finalizando funcion de consulta");
};