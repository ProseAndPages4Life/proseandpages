import { pool } from "../db.js";//Importando conexion con la base
import { v4 as uuidv4 } from 'uuid';//Random numero de orden
//const numOrder = uuidv4();

//Id, numCompra, fecha, usuario, libro, direccion, tarjeta

//insert into compras(numCompra,usuario,libro,direccion,tarjeta) values(?,?,?,?,?);
export const createOrder = async (req, res) => {
    //console.log('Creando orden');
    //Se necesita
    //Libro, Cantidad, Usuario
    try {
        console.log("Creando orden");

        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        console.log("Tu usuario id es:", parseInt(Usuario.id));

        let UserId = Usuario.id;

        //Vas a crear codigo para que el usuarioa agregue tarjetas
        //CHECA SI LA TARJETA QUE EL USUARIO INGRESA EXISTE
        //DESPUES LA PUEDES USAR PARA INSERTAR LA ORDEN. 
        //LO MISMO PERO CON EL DOMICILIO
        //if(tarjeta==null||undefined||0){
        //return res.status(500).json({ message: "Necesitas agregar una tarjeta!" });
        // }
        console.log("Cachando JSON para saber domicilio y tarjeta");
        console.log(req.body);
        console.log("\nExtrayendo datos del JSON!\n");
        let { Tarjeta, Domicilio } = req.body;
        console.log("Datos extraídos:\n", Tarjeta, Domicilio);

        console.log("Checando si el usuario tiene la tarjeta y el domicilio solicitados");
        
        console.log("Primero tarjeta");
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
        console.log(cardsUser.length)

        if(cardsUser.length==2){
        switch (Tarjeta) {
            case "1":
                console.log("Usando tarjeta 1")
                Tarjeta = cardsUser[0].id;
                console.log("Usando ahora")
                console.log(Tarjeta)
                break;
            case "2":
                console.log("Usando tarjeta 2")
                Tarjeta = cardsUser[1].id;
                console.log("Usando ahora")
                console.log(Tarjeta)
                break;
            default:
                break;
        }
        }else{
            console.log("Usando tarjeta 1")
                Tarjeta = cardsUser[0].id;
                console.log("Usando ahora")
                console.log(Tarjeta)
        }

        console.log("segundo addr");
        const [addrUser] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            "SELECT * FROM direccion WHERE usuario_id=?",
            [UserId]);

        console.log("resultado addrUser");
        console.log(addrUser);
        if (!addrUser.length) {
            console.log("No tienes domicilios!");
            return res.status(200).json({ message: "No tienes domicilios!" });
        }

        console.log(addrUser.length)

        if(addrUser.length==2){
        switch (Domicilio) {
            case "1":
                console.log("Usando domicilio 1")
                Domicilio = addrUser[0].Id;
                console.log("Usando ahora")
                console.log(Domicilio)
                break;
            case "2":
                console.log("Usando domicilio 2")
                Domicilio = addrUser[1].Id;
                console.log("Usando ahora")
                console.log(Domicilio)
                break;
            default:
                break;
        }
        }else{
            console.log("Usando domicilio 1")
                Domicilio = addrUser[0].Id;
                console.log("Usando ahora")
                console.log(Domicilio)
        }

        console.log("Jalando datos del carrito");
        console.log("Buscando ");
        const [stockCarrito] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            "SELECT * FROM Carrito WHERE (usuario=?)",
            [Usuario.id]);
        if (!stockCarrito.length) {
            console.log("Algo sucedio en el chequeo de la tabla. Seguramente no existe!");
            return res.status(200).json({ message: "Nada en tu carrito!" });
        }

        //Todo el carrito se guarda en un array
        //usando for para acceder a ei
        console.log("ordenes stockcarrito: ");
        console.log(stockCarrito);
        //console.log("Guardando en");
        //console.log("\n\n");
        console.log("Creando número de orden!");
        let numOrder = uuidv4();
        numOrder = numOrder.split('-');
        numOrder = numOrder[4];
        console.log("Mostrando carrito formateado");
        let jsonGen = [];
        console.log("Numero de orden: " + numOrder);

        for (let n = 0; n <= (stockCarrito.length - 1); n++) {
            console.log("\nProducto no." + (n + 1) + ":");
            let idCarrito = stockCarrito[n].Id;
            let Libro = stockCarrito[n].libro_id;
            let Cantidad = stockCarrito[n].cantidad;
            console.log("Libro: " + Libro);
            console.log("Cantidad: " + Cantidad);
            console.log("Fecha: " + stockCarrito[n].fecha);
            console.log("Orden: " + numOrder);

            console.log("Checando stock de tabla libros:");
            const [stockLibros] = await pool.query(
                //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
                "SELECT Stock FROM Libros WHERE (id=?)",
                [Libro]);
            //console.log(stockLibros)
            //console.log(stockLibros[0].Stock)
            //console.log(stockLibros.length)
            if ((!stockCarrito.length) || (stockCarrito.length == [])) {
                console.log("Ya no hay stock!");
                console.log("Omitiendo producto!");
                //return res.status(500).json({ message: "Ya no hay stock!" });
            } else {
                let stock = stockLibros[0].Stock;

                if (Cantidad > stock) {
                    console.log(Cantidad + "<" + stock + "!");
                    console.log("La cantidad de libros que uqieres comprar supera la del stock!");
                    console.log("Ordenando solo la cantidad que hay");
                    Cantidad = stock;
                }
                console.log("Quitando stock de tabla libros");
                let stockMenos = parseInt(stock) - parseInt(Cantidad);
                console.log("stock: ");
                console.log(stock);
                console.log("Cantidad:");
                console.log(Cantidad);
                console.log("stockMenos: ");
                console.log(stockMenos);
                let [quitStock] = await pool.query(
                    //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
                    "UPDATE libros SET Stock='?' WHERE id='?' ",
                    [stockMenos, Libro]);
                if ((!quitStock.length) || (quitStock.length == [])) {
                    console.log("Fallo el update!");
                    //return res.status(500).json({ message: "Ya no hay stock!" });
                }
                console.log("Resultado de update:");
                console.log(quitStock);


                console.log("Insertando producto");
                console.log("Usando:");
                console.log("Libro: " + Libro);
                console.log("Cantidad: " + Cantidad);
                console.log("Fecha: " + stockCarrito[n].fecha);
                console.log("Orden: " + numOrder);
                //console.log("Tarjeta: "+ Tarjeta);

                //insert into compras(numCompra,usuario,libro,direccion,tarjeta) values(?,?,?,?,?);

                let [insertOrder] = await pool.query(
                    //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
                    "insert into compras(numCompra,usuario,libro,cantidad,direccion,tarjeta) values(?,?,?,?,?,?)",
                    [numOrder, UserId, Libro, Cantidad, Domicilio, Tarjeta]);
                if ((!insertOrder.ResultSetHeader) || (insertOrder.ResultSetHeader == [])) {
                    console.log("Fallo el insertOrder!");
                    //return res.status(500).json({ message: "Ya no hay stock!" });
                }
                console.log("Resultado de insertOrder:");
                console.log(insertOrder);
                console.log("insertOrder id:");
                console.log(insertOrder.insertId);



                //numTarjeta = numTarjeta.substr(-4, 4);
                //Vas a crear codigo para que el usuarioa agregue tarjetas
                console.log("Generando custom query para colocar los datos en el json que se entega");
                console.log("con joins y todo el pedo");

                console.log("Checando ordenes!");
                let [checkOrderUp] = await pool.query(
                    //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
                    "SELECT numCompra AS 'Compra',fecha AS 'Fecha',Titulo AS 'Titulo', Cantidad AS 'Cantidad',Nombre as 'Cliente',Calle,Numero AS 'Numero',Num AS 'Tarjeta' FROM Compras comp INNER JOIN Usuarios user ON comp.usuario = user.id INNER JOIN Libros book ON comp.libro = book.id INNER JOIN Direccion addr ON comp.direccion = addr.Id INNER JOIN Tarjeta card ON comp.tarjeta = card.id WHERE user.id='?' AND comp.id='?';",
                    [UserId, (insertOrder.insertId)]);
                if ((!checkOrderUp.length) || (checkOrderUp.length == [])) {
                    console.log("Fallo el checkOrderUp!");
                    //return res.status(500).json({ message: "Ya no hay stock!" });
                }
                console.log("Resultado de checkOrderUp:");
                console.log(checkOrderUp);

                console.log("Guardando en variables");
                let CompraF = checkOrderUp[0].Compra;
                let FechaF = checkOrderUp[0].Fecha;
                let TituloF = checkOrderUp[0].Titulo;
                let CantidadF = checkOrderUp[0].Cantidad;
                let ClienteF = checkOrderUp[0].Cliente;
                let CalleF = checkOrderUp[0].Calle;
                let NumeroF = (checkOrderUp[0].Numero).toString();
                let stringTar = checkOrderUp[0].Tarjeta;
                let TarjetaF = stringTar.substr(-4, 4);

                //let CompraFinal=checkOrderUp[n].Compra;

                console.log("Generando JSON...");
                jsonGen[n] = {
                    "No.": n + 1,
                    "Compra": CompraF,
                    "Fecha": FechaF,
                    "Titulo": TituloF,
                    "Cantidad": CantidadF,
                    "Cliente": ClienteF,
                    "Calle": CalleF,
                    "Numero": NumeroF,
                    "Tarjeta": TarjetaF
                };


                console.log("Eliminando producto del carrito");
                console.log("idCarrito en");
                console.log(idCarrito);

                let [quitCarrito] = await pool.query(
                    //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
                    "DELETE FROM Carrito WHERE id='?'",
                    [idCarrito]);
                console.log("Resultado delte");
                console.log(quitCarrito);
                if ((!quitCarrito.length) || (quitCarrito.length == [])) {
                    console.log("Fallo el delete!");
                    //return res.status(500).json({ message: "Ya no hay stock!" });
                }
                console.log("Resultado de update:");
                console.log(quitCarrito);

            }

        }
        console.log("Numero de orden: " + numOrder[4]);

        const jsonEntrega = JSON.parse(JSON.stringify(jsonGen));
        console.log("json generado:");
        console.log(jsonEntrega);
        res.json(jsonEntrega
            //{Mensaje_de_dev: "Haciendo pruebas!"}
        );
    } catch (error) {
        console.log("Error!!");
        switch (error.code) {
            case "ER_DUP_ENTRY":
                console.log("Correo ya existe!!");
                return res.status(500).json({ Error: "Correo ya existe!!" });
                break;
            default:
                console.log("Error en createOrder().\n", error);
                console.log("Falló funcion crear orden.");
                return res.status(500).json({ Error: error.message });
                break;
        }
        console.log("Error en regisUser().\n", error);
    }
    console.log("Finalizando funcion de crear orden");
};

//Users
export const getOrder = async (req, res) => {
    console.log("Obteniendo ordenes!\n");
    try {
        let Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        Usuario = Usuario.id;
        console.log("Id usuario: " + Usuario);

        console.log("Realizando consulta de ordenes!\n");
        //throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        const [ordenes] =
            //await pool.query("SELECT * FROM compras WHERE usuario=? ",
            await pool.query("SELECT numCompra AS 'Compra',fecha AS 'Fecha',Titulo AS 'Titulo',Cantidad AS 'Cantidad',Nombre as 'Cliente',Calle,Numero AS 'Numero',Num AS 'Tarjeta' FROM Compras comp INNER JOIN Usuarios user ON comp.usuario = user.id INNER JOIN Libros book ON comp.libro = book.id INNER JOIN Direccion addr ON comp.direccion = addr.Id INNER JOIN Tarjeta card ON comp.tarjeta = card.id WHERE user.id=?",
                [Usuario]);

        if ((!ordenes.length) || (ordenes.length == [])) {
            console.log("Algo sucedio en el chequeo de la tabla. Seguramente no existe!");
            return res.status(500).json({ message: "No haz hecho ordenes!" });
        } else {
            console.log("Consulta con éxito!\n");
            console.log("Mostrando resultados de consulta");
            console.log(ordenes);
            /*
            console.log("Tamaño del arreglo:");
            console.log(ordenes.length);
            let nombresLibros = 0;
            console.log("Printing arreglo del resultado!");
            let jsonGen = [];
            for (let n = 0; n <= (ordenes.length - 1); n++) {
                console.log("ANTES DE CONSULTA:")
                console.log("Id "+ ordenes[n].Id);
                   console.log("Orden # "+ordenes[n].numCompra);
                   console.log("Usuario "+ ordenes[n].usuario);
                   console.log("Libro "+ ordenes[n].libro);
                   console.log("Direccion"+ ordenes[n].direccion);
                   console.log("TerminacionTarjeta"+ ordenes[n].tarjeta);
                   
                   console.log("Realizando busqueda de titulo de libro")
                   console.log("Realizando busqueda de calle y numero")
                   console.log("Realizando busqueda de terminacion de la tarjeta")
                   
                jsonGen[n] = {
                    //"Id": ordenes[n].id,
                    "no.": n+1,
                    "Orden #": ordenes[n].numCompra,
                    "Usuario": ordenes[n].usuario,
                    "Libro": ordenes[n].libro,
                    "Direccion": ordenes[n].direccion,
                    "TerminacionTarjeta": ordenes[n].tarjeta
                };

                   
            }

            console.log("json generado:");
            console.log(JSON.stringify(jsonGen));
            const jsonEntrega = JSON.parse(JSON.stringify(jsonGen));

            console.log("Parseado:");
            console.log(jsonEntrega);
            console.log("Mandando al navegador!");
            res.json(jsonEntrega);
            */
            res.json(ordenes);

        }




        //console.log("Mandando ordeness al navegador!");
        //res.json(ordenes);
    } catch (error) {
        console.log("Error en getUsers().\nNo se pudo realizar la consulta select. Seguramente la tabla no existe.\n", error);
        return res.status(500).json({ message: error.message });
    }
    console.log("Finalizando funcion de consulta");
};