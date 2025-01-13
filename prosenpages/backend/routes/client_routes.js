import { Router } from "express";
//import { regisClient, loginClient, logoutClient, profileClient} from "../controllers/ctlauth_controllers.js"
import { loginClient, logoutUser, profileUser } from "../controllers/login_controller.js";
import {
    getBooks, getaBook, createBook, updateBook, deleteBook
} from "../controllers/book_controller.js";
import { getLandingClient } from "../controllers/client_controller.js";
import { authClient } from "../middleware/validate_token.js";
import { regisClient, updateMail, updatePass } from "../controllers/register_controller.js";

import { getCarrito, addCarrito } from "../controllers/carrito_controllers.js";
import { createOrder, getOrder } from "../controllers/compras_controller.js";

import { validarSchema } from "../middleware/validate_schema.js";

import { loginSchema } from "../schemas/login_schema.js";
import { regisSchema } from "../schemas/regis_schema.js";

import { passSchema } from "../schemas/pass_schema.js"
import { mailSchema } from "../schemas/mail_schema.js";

import { createTarjeta, getTarjeta, updateTarjeta } from "../controllers/tarjetas_controller.js";
import { cardSchema } from "../schemas/tarjeta_schema.js";
import { createAddr, getAddr, updateAddr } from "../controllers/addr_controller.js";
import { addrSchema } from "../schemas/addr_schema.js";
import { doPing, verifyTokenAdmin, verifyTokenClient, verifyTokenInv } from "../controllers/index_controllers.js";


//Generando enrutador
const router = Router();

router.get("/auth/verify/admin",verifyTokenAdmin);

router.get('/auth/verify/client', verifyTokenClient);
router.get('/auth/verify/inv', verifyTokenInv);


//Registrar
router.post("/register", validarSchema(regisSchema), regisClient);

//Login
router.post("/login", validarSchema(loginSchema), loginClient);

//Logout
router.post("/logout", authClient, logoutUser);

//Profile
router.get("/profile", authClient, profileUser);

//Landing
router.get("/", authClient, getLandingClient);
//GET
//Libros
router.get('/books', getBooks);//Solicitar libros
//Libros
router.get('/books/:id', getaBook);//Solicitar libros

//Carrito
router.get("/carrito",authClient, getCarrito)//Añadir al carrito
router.post("/carrito",authClient, addCarrito)//Añadir al carrito

//Orden
router.get("/order",authClient, getOrder)//Get  comrpas
router.post("/order",authClient, createOrder)//Añadir a comrpas

//Password & Mail
router.post('/account/pass',authClient, validarSchema(passSchema), updatePass);
router.post('/account/email',authClient, validarSchema(mailSchema), updateMail);

//Tarjetas
router.get('/account/card',authClient, getTarjeta);
router.post('/account/card',authClient, validarSchema(cardSchema), createTarjeta);
router.put('/account/card/:id',authClient, validarSchema(cardSchema), updateTarjeta);

//Addresses
router.get('/account/addr',authClient, getAddr);
router.post('/account/addr',authClient, validarSchema(addrSchema), createAddr);
router.put('/account/addr/:id',authClient, validarSchema(addrSchema), updateAddr);

/*
//Cliente no puede modificar libros
//No puede crear libros!
//router.post('/books', authClient, createBook);//   libros
router.put('/books/:id', authClient, updateBook);//Solicitar libros
router.delete('/books/:id', authClient, deleteBook);
*/
export default router;