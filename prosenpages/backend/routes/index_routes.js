import { Router } from "express";
import { doPing, verifyTokenAdmin, verifyTokenClient, verifyTokenInv } from "../controllers/index_controllers.js";
const router = Router();

//Manejador de peticiones de express
//Creando peticion
router.get("/ping",doPing);


//verificar tokens
//'/auth/verify'


//Anterior
/*
router.get("/ping", async (req,res)=>{
    try {
        //throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        const[rows]= await pool.query("SELECT 1 + 1 as result");
        console.log("Realizando ping a la base de datos!!\n",rows[0]);
        res.json(
    
            rows[0]
        )
    } catch (error) {
        console.log("Error en la conexion con la base de datos!\n");
        return res.status(500).json({message: error.message});
    }

})
    */
export default router;

