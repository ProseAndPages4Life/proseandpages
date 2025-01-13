import { pool } from "../db.js";
import jwt from 'jsonwebtoken';
import { secretToken, secretTokenAdmin, secretTokenInv } from '../config.js';

export const doPing = async (req, res) => {
    try {
        //throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        const [rows] = await pool.query("SELECT now() as 'Current Time'");
        console.log("Realizando ping a la base de datos!!\n", rows[0]);
        res.json(

            rows[0]
        );
    } catch (error) {
        console.log("Error en la conexion con la base de datos!\n");
        return res.status(500).json([error.message]);
    }

};


export const verifyTokenClient = async (req, res) => {
    try {
        const { Token } = req.cookies;

        if (!Token) {
            return res.status(401).json(["No autorizado!"]);
        }
        jwt.verify(Token, secretToken, async (err, user) => {
            if (err) return res.status(401).json(["No autorizado!"]);

            const [resultB] = await pool.query("SELECT * FROM Login WHERE id= ?",
                [user.id]
            );
            if (resultB[0].length == 0 | resultB[0].length == []) {
                console.log("Usuario inexistente!");
                return res.status(401).json(["No autorizado!"]);
            }
            console.log("Retornando id & email y finalizando");
            return res.json({
                id: resultB[0].id,
                Email: resultB[0].Email
            });
        });
    } catch (error) {
        console.log("Error en verifyAdmintoken o comosea");
        console.log(error);
    }
};

export const verifyTokenAdmin = async (req, res) => {
    try {
        const { Token } = req.cookies;

        if (!Token) {
            console.log("No hay token!");
            return res.status(401).json(["No autorizado!"]);
        }
        console.log("Desde back\n Tu token es:");
        console.log(Token);
        jwt.verify(Token, secretTokenAdmin, async (err, user) => {
            if (err) {
                console.log("Se ecnontro un error!");
                return res.status(401).json(["No autorizado!"]);
            }
            console.log("Realizando consulta de usuario con id:", user.id);
            const [resultB] = await pool.query("SELECT * FROM Login WHERE id= ?",
                [user.id]
            );
            console.log("consulta hecha.");
            console.log(resultB)
            if (resultB[0].length == 0 | resultB[0].length == []) {
                console.log("Usuario inexistente!");
                return res.status(401).json(["No autorizado!"]);
            }
            console.log("Retornando id & email y finalizando");
            return res.json({
                id: resultB[0].id,
                Email: resultB[0].Email
            });
        });
    } catch (error) {
        console.log("Error en verifyAdmintoken o comosea");
        console.log(error);
    }
};

export const verifyTokenInv = async (req, res) => {
    try {
        const { Token } = req.cookies;

        if (!Token) {
            return res.status(401).json(["No autorizado!"]);
        }
        jwt.verify(Token, secretTokenInv, async (err, user) => {
            if (err) return res.status(401).json(["No autorizado!"]);

            const [resultB] = await pool.query("SELECT * FROM Login WHERE id= ?",
                [user.id]
            );
            if (resultB[0].length == 0 | resultB[0].length == []) {
                console.log("Usuario inexistente!");
                return res.status(401).json(["No autorizado!"]);
            }
            console.log("Retornando id & email y finalizando");
            return res.json({
                id: resultB[0].id,
                Email: resultB[0].Email
            });
        });
    } catch (error) {
        console.log("Error en verifyAdmintoken o comosea");
        console.log(error);
    }
};

