import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";//Para leer cookies
import indexRoutes from './routes/index_routes.js';//Indice de rutas
import adminRoutes from './routes/admin_routes.js';
import clientRoutes from './routes/client_routes.js';
import invRoutes from './routes/inv_routes.js';
//import in

//Creando aplicacion de express
const app = express();

//Para autorizar dominio para peticiones
app.use(cors(
    
    
    //{ origin: "http://localhost:5173/" }
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


export default app;