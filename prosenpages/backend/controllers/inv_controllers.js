import { pool } from "../db.js";//Importando conexion con la base

//Admin principal
export const getLandingInv = async (req,res)=>{
    const Usuario = await req.user
        if(!Usuario){
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n")
        }
        console.log("logueado como: ",Usuario)
    console.log("getLandingInv\n")
    res.send('Bienvenido a inv!!')
}