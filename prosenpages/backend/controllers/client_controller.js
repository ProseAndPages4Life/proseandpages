//import { pool } from "../db.js";//Importando conexion con la base

//Admin principal
export const getLandingClient = async (req, res) => {
    const Usuario = await req.user;
    if (!Usuario) {
        //return res.status(500).json({message: "No se pudo logear"});
        return console.log("No se pudo loguear!\n");
    }
    console.log("logueado como: ", Usuario);
    console.log("getLandingClient\n");
    res.send('Bienvenido a cliente!!');
};