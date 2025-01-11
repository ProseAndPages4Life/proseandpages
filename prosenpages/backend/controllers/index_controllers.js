import { pool } from "../db.js";

export const doPing = async (req,res)=>{
    try {
        //throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        const[rows]= await pool.query("SELECT now() as 'Current Time'");
        console.log("Realizando ping a la base de datos!!\n",rows[0]);
        res.json(
            
            rows[0]
        )
    } catch (error) {
        console.log("Error en la conexion con la base de datos!\n");
        return res.status(500).json({message: error.message});
    }

}