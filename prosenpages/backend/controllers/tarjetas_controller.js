import { pool } from "../db.js";//Importando conexion con la base


export const createTarjeta = async (req, res) => {
    console.log('Creando tarjeta');
    try {
        //var valid = require("card-validator");
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);

        console.log("Checando si se puede agregar otra tarjeta");
        let [tarjetasUser] = await pool.query(
            "SELECT id,Num FROM Tarjeta WHERE usuario_id=(?)",
            [Usuario.id]);

        if (tarjetasUser.length == []) {
            console.log("No hay tarjetas registradas!");
        }
        console.log("tarjetasUser:");
        console.log(tarjetasUser);
        console.log("Tamaño del arreglo de la consulta:");
        console.log(tarjetasUser.length);
        if (tarjetasUser.length >= 2) {
            console.log("Ya no puedes agregar más tarjetas!!");
            return res.status(200).json({ Error: "Ya no puedes agregar más tarjetas!!" });
        }
        //existe la que se quire agreagar?
        console.log("Checando si ya existe la tarjeta");

        console.log("Cachando JSON:\n");
        console.log(req.body);
        console.log("\nExtrayendo datos del JSON!\n");
        const { Nombre, Tarjeta, Vencimiento, CVV } = req.body;
        console.log("Datos extraídos:\n", Nombre, Tarjeta, Vencimiento, CVV);

        for (let n = 0; n <= (tarjetasUser.length - 1); n++) {
            let numTarj = tarjetasUser[n].Num;
            console.log("Num de tarjeta chcado:");
            console.log(numTarj);
            if (numTarj == Tarjeta) {
                console.log(numTarj + " = " + Tarjeta);
                console.log("Ya existe la tarjeta en la base!");
                console.log("Deteniendo for");
                n = tarjetasUser.length;
                return res.status(200).json({ Error: "Ya existe esa tarjeta!!" });
            }
        }

        console.log("Ingresando ");//agrega la tarejta
        let [tarjetasInsert] = await pool.query(
            "insert into tarjeta(usuario_id,name,num,venc,cvv) values (?,?,?,?,?)",
            [Usuario.id, Nombre, Tarjeta, Vencimiento, CVV]);

        if (tarjetasInsert.length == []) {
            console.log("No se pudo registrar la tarjeta!");
        }
        console.log("tarjetasInsert:");
        console.log(tarjetasInsert);

        let jsonGen = {
            Nombre,
            Tarjeta,
            Vencimiento,
            CVV
        };

        console.log(JSON.stringify(jsonGen));
        const jsonTarjeta = JSON.parse(JSON.stringify(jsonGen));
        console.log("json generado:");
        console.log(jsonTarjeta);

        console.log("Mostrando resultados en el navegador!\n");
        /*
        res.json({//Respuesta en el navegador!
            id: resultU.insertId,
            id: resultMail.insertId,
            Tipo,
            Nombre, Apellido, Nacim, Email, Hashed//, Token
        });*/
        //res.json({
        //    Nombre, Tarjeta, Vencimiento, CVV 
        //})
        res.json(jsonTarjeta);
    } catch (error) {
        console.log("Error!!");
        switch (error.code) {
            case "ER_DUP_ENTRY":
                console.log("Ya no puedes agregar más tarjetas!!");
                return res.status(500).json({ Error: "Ya no puedes agregar más tarjetas!!" });
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

export const getTarjeta = async (req, res) => {
    console.log("Obteniendo usuarios!\n");
    try {
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        console.log("Tu usuario id es:", parseInt(Usuario.id));
        const [stockTarjeta] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            "SELECT * FROM tarjeta WHERE (usuario_id=?)",
            [Usuario.id]);

        if (!stockTarjeta.length) {
            console.log("Algo sucedio en el chequeo de la tabla. Seguramente no existe!");
            return res.status(500).json({ message: "Nada en tu tarjeta!" });
        } else {
            console.log("Mostrando resultados de consulta");
            console.log(stockTarjeta);
            console.log("Tamaño del arreglo:");
            console.log(stockTarjeta.length);
            let nombresLibros = 0;

            console.log("Printing arreglo del resultado!");
            let jsonGen = [];
            for (let n = 0; n <= (stockTarjeta.length - 1); n++) {
                let numCard = stockTarjeta[n].Num;
                numCard = numCard.substr(-4, 4);
                jsonGen[n] = {
                    //"Id": stockTarjeta[n].id,
                    "Tarjeta #": n + 1,
                    "Usuario_id": stockTarjeta[n].usuari_id,
                    "Nombre": stockTarjeta[n].Name,
                    "Numero de Tarjeta": numCard,
                    "Vencimiento": stockTarjeta[n].Venc,
                    "CVV": stockTarjeta[n].CVV
                };

                console.log("Id" + stockTarjeta[n].id);
                console.log("Usuario_id" + stockTarjeta[n].usuari_id);
                console.log("Nombre" + stockTarjeta[n].Name);
                console.log("Numero de Tarjeta" + numCard);
                console.log("Vencimiento" + stockTarjeta[n].Venc);
                console.log("CVV" + stockTarjeta[n].CVV);
            }

            console.log("json generado:");
            console.log(JSON.stringify(jsonGen));
            const jsonEntrega = JSON.parse(JSON.stringify(jsonGen));

            console.log("Parseado:");
            console.log(jsonEntrega);
            //res.json(stockTarjeta);
            console.log("Mandando al navegador!");
            res.json(jsonEntrega);
        }



    } catch (error) {
        console.log("Error en getTarjeta().\nNo se pudo realizar la consulta select. Seguramente la tabla no existe.\n", error);
        return res.status(500).json({ message: error.message });
    }
    console.log("Finalizando funcion de consulta");
};

export const updateTarjeta = async (req, res) => {
    console.log("Actualizando tarjeta!\n");
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
        let { Nombre, Tarjeta, Vencimiento, CVV } = req.body;
        console.log("Id del url");
        const idUrl = req.params.id;
        console.log(idUrl);

        console.log("Checando id de tarjeta");
        console.log("y si ya existe la tarjeta ingresada");
        const [cardsUser] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            "SELECT * FROM Tarjeta WHERE usuario_id=?",
            [UserId]);

        console.log("resultado cardsUser");
        console.log(cardsUser);
        if (!cardsUser.length) {
            console.log("Algo sucedio en el chequeo de la tabla. Seguramente no existe!");
            return res.status(200).json({ message: "No tienes tarjetas!" });
        }

        for(let p=0;p<=(cardsUser.length-1);p++){
            if((cardsUser[p].Name==Nombre)&&(cardsUser[p].Num==Tarjeta)&&(cardsUser[p].Venc==Vencimiento)&&(cardsUser[p].CVV==CVV)){
                console.log("Tarjeta ya existe!")
                return res.status(201).json({ message: "Tarjeta ya existe!" });
            }
        }


        console.log(cardsUser.length);
        let cardId = 0;
        if (cardsUser.length == 2) {
            switch (idUrl) {
                case "1":
                    console.log("Actualizando tarjeta 1");
                    cardId = cardsUser[0].id;
                    console.log("cardId ahora");
                    console.log(cardId);
                    break;
                case "2":
                    console.log("Actualizando tarjeta 2");
                    cardId = cardsUser[1].id;
                    console.log("cardId ahora");
                    console.log(cardId);
                    break;
                default:
                    console.log("Actualizando tarjeta 1");
                    cardId = cardsUser[0].id;
                    console.log("cardId ahora");
                    console.log(cardId);
                    break;
            }
        } else {
            console.log("Actualizando tarjeta 1");
            cardId = cardsUser[0].id;
            console.log("cardId ahora");
            console.log(cardId);
        }


        const [stockTarjeta] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            "UPDATE tarjeta set Name=?,Num=?,Venc=?,CVV=? where usuario_id=? AND id=?",
            [Nombre, Tarjeta, Vencimiento, CVV, Usuario.id, cardId]);

        if (!stockTarjeta.length) {
            console.log("Algo sucedio en el chequeo de la tabla. Seguramente no existe!");
            //return res.status(500).json({ message: "Nada en tu tarjeta!" });
        }
        console.log("Mostrando resultados de update");
        console.log(stockTarjeta);
        console.log("Tamaño del arreglo:");
        console.log(stockTarjeta.length);

        console.log("generando json!");
        

        Tarjeta = Tarjeta.substr(-4, 4);
        let jsonGen = {
            //"Id": stockTarjeta[n].id,
            "Nombre": Nombre,
            "Numero de Tarjeta": Tarjeta,
            "Vencimiento": Vencimiento,
            "CVV": CVV
        };

        console.log("json generado:");
        console.log(JSON.stringify(jsonGen));
        const jsonEntrega = JSON.parse(JSON.stringify(jsonGen));

        console.log("Parseado:");
        console.log(jsonEntrega);
        //res.json(stockTarjeta);
        console.log("Mandando al navegador!");
        res.json(jsonEntrega);

    } catch (error) {
        console.log("Error en getTarjeta().\nNo se pudo realizar la consulta select. Seguramente la tabla no existe.\n", error);
        return res.status(500).json({ message: error.message });
    }
    console.log("Finalizando funcion de consulta");
};