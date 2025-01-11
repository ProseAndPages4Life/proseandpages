import { Router } from "express";
import {
    getLandingInv
} from "../controllers/inv_controllers.js";

import {
    getBooks, getaBook, createBook, updateBook, deleteBook
} from "../controllers/book_controller.js";

import { loginInv, logoutUser, profileUser } from "../controllers/login_controller.js";
import { authInv } from "../middleware/validate_token.js";
import { regisInv, updateMail, updatePass  } from "../controllers/register_controller.js";

import { validarSchema } from "../middleware/validate_schema.js";
import { loginSchema } from "../schemas/login_schema.js";
import { regisSchema } from "../schemas/regis_schema.js";
import { bookSchema } from "../schemas/book_schema.js";
import { passSchema } from "../schemas/pass_schema.js"
import { mailSchema } from "../schemas/mail_schema.js";

const router = Router();

//Solo un administrador puede crear usuarios de admin e inventario
//Registrar
router.post("/register",validarSchema(regisSchema),  regisInv);

//Login
router.post("/login", validarSchema(loginSchema), loginInv);

//Logout
router.post("/logout", authInv, logoutUser);

//Profile
router.get("/profile", authInv, profileUser);

//Landing para admin
router.get("/", authInv, getLandingInv);
//GET & POST generales
//Libros
router.get('/books', authInv, getBooks);//Solicitar libros
router.post('/books', authInv, validarSchema(bookSchema), createBook);//   libros
// GET, PUT & DELETE especificos
//Libros
router.get('/books/:id', authInv, getaBook);//Solicitar libros
router.put('/books/:id', authInv, validarSchema(bookSchema), updateBook);//Solicitar libros
router.delete('/books/:id', authInv, deleteBook);

//Password
router.post('/pass',authInv, validarSchema(passSchema), updatePass);
router.post('/email',authInv, validarSchema(mailSchema), updateMail);

export default router;