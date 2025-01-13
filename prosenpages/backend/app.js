import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";//Para leer cookies
import indexRoutes from './routes/index_routes.js';//Indice de rutas
import adminRoutes from './routes/admin_routes.js';
import clientRoutes from './routes/client_routes.js';
import invRoutes from './routes/inv_routes.js';

import { portFront, siteFront  } from "./config.js";
//import in

//Creando aplicacion de express
export const app = express();

export const origenFront = "/"+siteFront +":"+portFront+"/";

var corsOptions = {
    origin: /localhost:5173/,
    credentials: true 
    //,"methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
    //,"methods": "GET,PUT,POST,DELETE"
    //,methods: "GET , DELETE"
    //,optionsSuccessStatus: 200 
    //origin: 'http://localhost:5173',
}
//Para autorizar dominio para peticiones
app.use(cors(
    corsOptions
    //{ origin: 'http://localhost:5173/' }
    //{ origin: ["http://example1.com", /\.example2\.com$/] }
    //{ origin: /^http:\/\/localhost\/$/ }
    //{ origin: [/http://localhost$/] }
    ));
//Morgan para saber que peticiones se hacen
app.use(morgan('dev'));
//Convierte req en JSON's
app.use(express.json());
//Leemos cookies
app.use(cookieParser());
//Rutas
app.use(clientRoutes);//Cliente
app.use("/admin", adminRoutes);//Admin
app.use("/inv", invRoutes);
app.use("/dev", indexRoutes);//Desarrollo
//app.use("/admin" , adminloginRoutes);