import { secretToken, secretTokenAdmin, secretTokenInv } from "../config.js";//Jalando llave
import jwt from "jsonwebtoken";
//Iniciando creacion del token de acceso JWT
/*
export function crearToken(payload) {
    return new Promise((salioBien,salioMal)=> { 
        jwt.sign(
            payload,
            secretTokenInv,
            {
                expiresIn: "1d",
            },
            (err, token)=>{
                if (err) salioMal(err)
                salioBien(token)
            }      
        );
    });
}
    */

export function crearToken(payload, permiso) {
    var typeOfToken = "";
    console.log("Usando tipo:");
    switch (permiso) {
        case 1:
            console.log("cliente");
            typeOfToken = secretToken;
            break;
        case 2:
            console.log("admin");
            typeOfToken = secretTokenAdmin;
            break;
        case 3:
            console.log("inv");
            typeOfToken = secretTokenInv;
            break;
        default:
            console.log("No indicado\nUsando cliente");
            typeOfToken = secretToken;
            break;
    }
    return new Promise((salioBien, salioMal) => {
        jwt.sign(
            payload,
            typeOfToken,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) salioMal(err);
                console.log("Token creado!\n");
                salioBien(token);
            }
        );
    });
}