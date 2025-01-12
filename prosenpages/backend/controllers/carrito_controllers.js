import { pool } from "../db.js";//Importando conexion con la base
import { v4 as uuidv4 } from 'uuid';//Random numero de orden


export const addCarrito = async (req, res) => {
    console.log('Añadiendo a carrito');
    try {

        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"]);
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        console.log("Tu usuario id es:", parseInt(Usuario.id));

        console.log("Iniciando createCarrito!\nCachando JSON:\n");
        console.log(req.body);
        console.log("\nExtrayendo datos del JSON!\n");
        const { Libro, Cantidad } = req.body;
        const Libro1 = parseInt(Libro);
        let Cantidad1 = parseInt(Cantidad);
        console.log("Datos extraídos:\nLibro1:", Libro1, "\nCantidad1:", Cantidad1, "\nUsuario:", Usuario.id);

        console.log("Checando si existe el stock solicitado!");
        console.log("Se busca agregar: " + Cantidad1);

        const [resultCantidad1] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            "SELECT * FROM Libros WHERE id=?",
            [(Libro1)]);
        console.log("resultCantidad1");
        console.log(resultCantidad1);

        if (!resultCantidad1.length) {
            console.log("No existe ese libro!");
            return res.status(500).json(["No existe ese libro!!"]);
        }

        let Stock = resultCantidad1[0].Stock;
        console.log("Stock:");
        console.log(Stock);
        console.log("Usuario:");
        console.log(Usuario.id);
        console.log("Libro:");
        console.log(Libro1);
        console.log("Cantidad1:");
        console.log(Cantidad1);

        if (Stock == 0) {
            console.log("No hay stock de ese libro!");
            //return res.status(409).json([ "No hay stock de ese libro!!!" ]);
            return res.status(200).json(["No hay stock de ese libro!!!"]);
        }

        //Agrega codigo para qeu cada vez que se agregue al carrito el mismo libro,
        //se sume a los qe ya tenia del mismo ibro
        console.log("Checando si ya existe el libro en el carrito");
        const [stockCarrito] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            "SELECT * FROM Carrito WHERE (usuario=?) & (libro_id=?)",
            [Usuario.id, Libro1]);

        console.log("stockCarrito:");
        console.log(stockCarrito);

        //if ((stockCarrito!=undefined)||(stockCarrito!=[]) || (!stockCarrito)) {
        if (stockCarrito.length != 0) {
            console.log("Resultado stockcarrito: ");
            console.log(stockCarrito.cantidad);
            const CarritoActual = stockCarrito[0].cantidad;
            console.log("Ya hay de ese libro en el carrito!");
            //return res.status(500).json([ "No existe ese libro!!" ]);


            console.log("Y stock en carro es:", CarritoActual);
            console.log("Ya tiene libros de ese tipo, checando si esta agregando más del stock actual");
            console.log("Intendando agregar:(Cantidad1)", Cantidad1);

            console.log("Checando si se intenta elminiar mas libros de los que hay en el carro");
            console.log("Se intuye que quiere elminar el producto del carrito");
            console.log("Cantidad " + Cantidad1 + " + " + CarritoActual + " <= 0?");
            if ((Cantidad1 + CarritoActual) <= 0) {
                //El usuario intento eliminar más de los libros que tiene en el carro. 
                //En lugar de colocar en 0, se borra el registro
                console.log("Se intentan eliminar más de los que hay!");
                console.log("Se borra el registro");
                console.log("Mostrando id del libro a elminar:");
                console.log(stockCarrito[0].Id);
                const [delteProduct] = await pool.query(
                    "DELETE FROM Carrito WHERE id=?",
                    //"SELECT * FROM Libros WHERE id=?",
                    [(stockCarrito[0].Id)]);
                console.log(delteProduct);
                if (delteProduct == []) {
                    console.log("No existe ese campo en el carrito!");
                    return res.status(500).json(["No campo en el carro!!"]);
                }
                console.log("delteProduct");
                console.log(delteProduct);


                return res.status(401).json(["Se elimino el producto del carrito!"]);
            }



            const Total = (Cantidad1) + (CarritoActual);
            console.log("Cantidad1 + stockCarrito=", Total);
            console.log("Total:", Total);
            console.log("Cantidad:", Cantidad1);
            console.log("Stock:", Stock);
            const idModificar = stockCarrito[0].Id;
            const add = Cantidad1 + CarritoActual;

            if ((Total > Stock) && ((Cantidad1 > Stock))) {
                console.log(Total, ">", Stock);

                console.log("\nLa cantidad a agregar mas el stock en carrito supera el stock actual");
                console.log("Cambiando cantidad máxima en el carrito al stock actual");
                console.log("Stock carrito mod id:");

                console.log(idModificar);
                const [updateCarritoMod] = await pool.query(
                    //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
                    "UPDATE carrito SET cantidad=? where id=?;",
                    [Stock, idModificar]);
                if (!(updateCarritoMod).length) {
                    console.log("Fallo la operacion");
                }
                console.log("Mostrando resultados de actualizacion:");
                console.log(updateCarritoMod);
                return res.status(401).json(["Tienes la cantidad maxima de libros! Ya no hay stock!"]);
            } else {
                console.log("Cantidad a agregar:", Cantidad1, "+", CarritoActual, "=", add);
                console.log("Cantidad a actualizar:");
                console.log(add);
                const [updateCarritoMod] = await pool.query(
                    //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
                    "UPDATE carrito SET cantidad=? where id=?;",
                    [add, idModificar]);
                if (!updateCarritoMod.length) {
                    console.log("Fallo la operacion");
                }
                console.log("Mostrando resultados de actualizacion:");
                console.log(updateCarritoMod);

                console.log("Terminando...");
            }
            /*
            if(Cantidad1>Stock){
                console.log(Cantidad1, ">", Stock);
                console.log("la cantidad es mayor al stock");
                console.log("No puedes agregar lobris sde lor que hay")
            return res.status(401).json([ "Tienes la cantidad maxima de libros de los que hay!xd", ]);
            */
        } else {

            if (Cantidad1 <= 0) {
                console.log("No es posible agregar valores negativos o 0's");
                return res.status(409).json(["No es posible agregar valores negativos o nulos!!"]);
            }

            console.log("Agregando al carrito");
            const [resultCarrito] = await pool.query(
                //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
                "INSERT INTO Carrito(libro_id, cantidad, usuario) VALUES (?,?,?)",
                [Libro1, Cantidad1, Usuario.id]);
            console.log(resultCarrito);
            if (resultCarrito.length == 0) {
                console.log("Error al agregar al carrito!");
                return res.status(500).json(["Error al agregar al carrito!!"]);

            }
        }
        const [consultCarrito] = await pool.query("SELECT * FROM Carrito WHERE usuario=?",
            [Usuario.id]
        );
        if (consultCarrito.length == 0) {
            console.log("Error al leer el carrito!");
            return res.status(500).json(["Error al leer el carro!!"]);
        }
        /*
        console.log("Creando acces Token:\n");
        const Token = await crearToken({id: resultU.insertId},3)
        res.cookie("Token",Token);
        */
        console.log("Mostrando resultados en el navegador!\n");
        res.json({//Respuesta en el navegador!
            //id: resultU.insertId,
            //id: resultCarrito.insertId,
            //Tipo,
            Libro1,
            Cantidad1,//, Token
            Stock,
            consultCarrito

        });
    } catch (error) {
        console.log("Error!!");
        switch (error.code) {
            case "ER_DUP_ENTRY":
                console.log("Correo ya existe!!");
                return res.status(500).json(["Correo ya existe!!"]);
                break;
            default:
                console.log("Error en createCarrito().\n", error);
                console.log("Falló funcion createCarrito.");
                return res.status(500).json([error.message]);
                break;
        }
        console.log("Error en createCarrito().\n", error);
    }
    console.log("Finalizando funcion de createCarrito");
};

//Carritos
export const getCarrito = async (req, res) => {
    console.log("Obteniendo usuarios!\n");
    try {
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"]);
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        console.log("Tu usuario id es:", parseInt(Usuario.id));
        const [stockCarrito] = await pool.query(
            //"INSERT IGNORE INTO Login(Email, Contraseña) VALUES (?,?)",
            "SELECT * FROM Carrito WHERE (usuario=?)",
            [Usuario.id]);
        if (!stockCarrito.length) {
            console.log("Algo sucedio en el chequeo de la tabla. Seguramente no existe!");
            return res.status(500).json(["Nada en tu carrito!"]);
        } else {
            console.log("Mostrando resultados de consulta");
            console.log(stockCarrito);
            console.log("Tamaño del arreglo:");
            console.log(stockCarrito.length);
            let nombresLibros = 0;

            console.log("Printing arreglo del resultado!");
            let jsonGen = [];
            for (let n = 0; n <= (stockCarrito.length - 1); n++) {
                let [nombresLibros] = await pool.query(
                    "SELECT Titulo,Categoria FROM Libros WHERE (id=?)",
                    [stockCarrito[n].libro_id]);
                if (!nombresLibros.length) {
                    console.log("Algo sucedio en el chequeo de la tabla. Seguramente no existe!");
                }
                console.log("nombresLibros:");
                console.log(nombresLibros);
                console.log("Titulo cachado:");
                console.log(nombresLibros[0].Titulo);
                console.log("Cat3egoria:");
                console.log(nombresLibros[0].Categoria);
                let Titulo = nombresLibros[0].Titulo;
                let Categoria = nombresLibros[0].Categoria;
                //return res.status(500).json({ messsage: "Nada en tu carrito!" ]);
                /*jsonGen[n]=
                '{'+
                    'Id:'+(stockCarrito[n].Id)+','+
                    'Libro:'+stockCarrito[n].libro_id+','+
                    'Cantidad:'+stockCarrito[n].cantidad+','+
                    'Fecha:'+stockCarrito[n].fecha
                    
                +'}';
                */
                jsonGen[n] = {
                    "Id": stockCarrito[n].Id,
                    "Libro_id": stockCarrito[n].libro_id,
                    "Libro": Titulo,
                    "Categoria": Categoria,
                    "Cantidad": stockCarrito[n].cantidad,
                    "Fecha": stockCarrito[n].fecha
                };

                console.log("Id:", stockCarrito[n].Id);
                console.log("libro_id:", stockCarrito[n].libro_id);
                console.log("Cantidad:", stockCarrito[n].cantidad);
                console.log("Fecha:", stockCarrito[n].fecha);
            }

            console.log("json generado:");
            console.log(JSON.stringify(jsonGen));
            const jsonEntrega = JSON.parse(JSON.stringify(jsonGen));

            console.log("Parseado:");
            console.log(jsonEntrega);
            //res.json(stockCarrito);
            console.log("Mandando al navegador!");
            res.json(jsonEntrega);

            /*
            const string1 = '{"result":true,';
            const string2 = ' "count":42}';
            const resp= '"result":';
            const count = '"count":';
            const resultado= true;
            const conteo = 44
            const inicio = "{";
            const final = "}";
            const coma = ","
            const json1 = '{"result":true, "count":42}';
            const json2 = inicio+resp+resultado+coma+count+conteo+final
            const json3 ='{"result":'+resultado+', "count":'+conteo+'}';
            console.log(json2)
            const obj1 = JSON.parse(json1);
            const obj2 = JSON.parse(json2);
            const obj3 = JSON.parse(json3);
            
            console.log(obj1.count);
            // Expected output: 42
            
            console.log(obj1.result);
            // Expected output: true
            
            console.log(obj1)
            console.log(obj2)
            console.log(obj3)
            */
            /*
            res.json({
                Libro: stockCarrito.libro_id,
                Cantidad: stockCarrito.cantidad,
                Fecha: stockCarrito.fecha
            })
            */

            /*
            res.json({
                Libro: stockCarrito.map((stockCarrito) => (
                    stockCarrito.libro_id
                )),
                Cantidad: stockCarrito.map((stockCarrito) => (
                    stockCarrito.cantidad
                )),

                Fecha: stockCarrito.map((stockCarrito) => (

                    stockCarrito.fecha
                ))
            })
                */
        }



    } catch (error) {
        console.log("Error en getCarrito().\nNo se pudo realizar la consulta select. Seguramente la tabla no existe.\n", error);
        return res.status(500).json([error.message]);
    }
    console.log("Finalizando funcion de consulta");
};