import { Router } from "express";

import {
    getLandingAdmin,
    getUsers, getaUser, createUser, updateUser, updateUserPass, updateUserEmail, deleteUser,
} from "../controllers/admin_controllers.js";
import {
    getBooks, getaBook, createBook, updateBook, deleteBook
} from "../controllers/book_controller.js";
import { loginAdmin, logoutUser, profileUser } from "../controllers/login_controller.js";
import { regisAdmin, updateMail, updatePass } from "../controllers/register_controller.js";

import { authGen, authAdmin } from "../middleware/validate_token.js";
import { validarSchema } from "../middleware/validate_schema.js";

import { loginSchema } from "../schemas/login_schema.js";
import { regisSchema } from "../schemas/regis_schema.js";
import { bookSchema } from "../schemas/book_schema.js";
import { passSchema } from "../schemas/pass_schema.js";
import { userAdminSchema, userAdminNoLoginSchema } from "../schemas/userAdmin_schema.js";
import { userSchema } from "../schemas/user_schema.js";
import { mailSchema } from "../schemas/mail_schema.js";

const router = Router();

//Solo un administrador puede crear usuarios de admin e inventario
//Registrar
//router.post("/register", authAdmin, regisAdmin);
router.post("/register",
    //authAdmin,
    validarSchema(regisSchema), regisAdmin);

//Login
router.post("/login", validarSchema(loginSchema), loginAdmin);

//Logout
router.post("/logout",
    //authAdmin,
    logoutUser);

//Profile
router.get("/profile", authAdmin, profileUser);


//Landing para admin
router.get("/", authAdmin, getLandingAdmin);
//GET & POST generales
//Usuarios
router.get('/users', authAdmin, getUsers);//Solicitar usuarios
router.post('/users', authAdmin, validarSchema(userAdminSchema), createUser);//Crear usuarios
router.delete('/users', authAdmin, validarSchema(userAdminSchema), createUser);//Crear usuarios
//Libros
router.get('/books', authAdmin, getBooks);//Solicitar todos los libros
router.post('/books', authAdmin, validarSchema(bookSchema), createBook);//Crear un libro

// GET, PUT & DELETE especificos
//Usuarios
router.get('/users/:id', authAdmin, getaUser);//Solicitar usuario especifico
router.put('/users/:id', authAdmin, validarSchema(userAdminNoLoginSchema), updateUser);//Actualizar usuario esp
router.delete('/users/:id', authAdmin, deleteUser);//Eliminar usuario esp

router.put('/users/pass/:id', authAdmin, validarSchema(passSchema), updateUserPass);//Actualizar usuario contraseña
router.put('/users/email/:id', authAdmin, validarSchema(mailSchema), updateUserEmail);
//Libros
router.get('/books/:id', authAdmin, getaBook);//Solicitar libros esp
router.put('/books/:id', authAdmin, validarSchema(bookSchema), updateBook);//Actualizar libro esp
router.delete('/books/:id', authAdmin, deleteBook);//Eliminar libro esp


//Password & Mail
router.post('/pass', authAdmin, validarSchema(passSchema), updatePass);
router.post('/email', authAdmin, validarSchema(mailSchema), updateMail);


export default router;