import { pool } from "../db.js";//Importando conexion con la base
import bcrypt from 'bcryptjs';//Hasehar passwords
import { crearToken } from '../libs/jwt.js'; //JWT para autenticar
let logged = 0;
let logout = 1;
let userI = 0;

export const loginClient = async (req, res) => {
    try {
        /*
        console.log("Iniciando loginClient");
        console.log("Tu req.user da:", req.user);
        if (logged) {
            console.log("logged esta en:" + logged);
            console.log("logout esta en:" + logout);
            console.log("Ya estas logueado!!\nTerminando authClient\n");
            return res.status(401).json({ Advertencia: 'Usuario NO autorizado!!' });
        }
            */
        console.log("Iniciando login!\nCachando JSON:\n");
        console.log(req.body);
        console.log("\nExtrayendo datos del JSON!\n");
        const { Email, Contraseña } = req.body;
        console.log("Datos extraídos:\n", Email, Contraseña);
        console.log("Realizando busqueda del usuario\n");
        //throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        const [resultB] = await pool.query("SELECT * FROM Login WHERE Email= ?",
            [Email]
        );
        if (resultB.length == 0) {
            console.log("Usuario inexistente!");
            const [TiempoActual] = await pool.query("SELECT now() as now");
            console.log("FAIL!\nMostrando tiempo actual: \n", TiempoActual[0].now);
            console.log(logged);
            console.log("Finalizando login!\n logged en:", logged, " & logout:" + logout);
            console.log("logout esta en:" + logout);
            return res.status(404).json({ message: "Usuario inexistente!" });
        }
        console.log("Consulta con éxito!\n");
        console.log("Reultado general:\n", resultB);
        //console.log("Resultado de resultB\n",resultB[0].Contraseña);

        console.log("Realizando comparacion de contraseñas!\n");
        const theyMatch = await bcrypt.compare(Contraseña, resultB[0].Contraseña);
        if (!theyMatch) {
            console.log("Credenciales incorrectas!");
            const [TiempoActual] = await pool.query("SELECT now() as now");
            console.log("FAIL!\nMostrando tiempo actual: \n", TiempoActual[0].now);
            console.log(logged);
            console.log("Finalizando login!\n logged en:", logged, " & logout:" + logout);
            return res.status(400).json({ message: "Credenciales incorrectas!" });
        }
        console.log("Contraseñas coinciden!\n");

        console.log("Creando acces Token:\n");
        const Token = await crearToken({ id: resultB[0].id }, 1);
        res.cookie("Token", Token);
        console.log("Mostrando resultados en el navegador!\n");
        const LastLogin = resultB[0].UltimoLogin;
        console.log("Ultimo login:\n", LastLogin);

        console.log("Realizando actualizacion de login\n");
        const resultUpdate = await pool.query("UPDATE Login SET UltimoLogin = now()  WHERE Email= ?",
            [Email]
        );
        console.log("Resultado de actualizacion:\n", resultUpdate);


        const [TiempoActual] = await pool.query("SELECT now() as now");
        console.log("ÉXITO!\nMostrando tiempo actual: \n", TiempoActual[0].now);
        logged = 1;
        logout = 0;
        console.log("Finalizando login!\n logged en:", logged, " & logout:" + logout);
        res.json({//Respuesta en el navegador!
            id: resultB[0].id,
            Email,
            LastLogin,
            Actual: TiempoActual[0].now,
            Contraseña: resultB[0].Contraseña,
            Token
        }
        );

    } catch (error) {
        console.log("Error en regisUser().\n", error);
        console.log("Finalizando funcion de login\nlogged:", logged, " & logout:" + logout);
        return res.status(500).json({ message: error.message });
    }
    console.log("Finalizando funcion de login\nlogged:", logged, " & logout:" + logout);
};

export const loginAdmin = async (req, res) => {
    try {
        /*
        console.log("Iniciando loginAdmin");
        console.log("Tu req.user da:", req.user);
        if (logged) {
            console.log("logged esta en:" + logged);
            console.log("logout esta en:" + logout);
            console.log("Ya estas logueado!!\nTerminando authClient\n");
            return res.status(401).json({ Advertencia: 'Usuario NO autorizado!!' });
        }
            */
        console.log("Iniciando login!\nCachando JSON:\n");
        console.log(req.body);
        console.log("\nExtrayendo datos del JSON!\n");
        const { Email, Contraseña } = req.body;
        console.log("Datos extraídos:\n", Email, Contraseña);
        console.log("Realizando busqueda del usuario\n");
        //throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        const [resultB] = await pool.query("SELECT * FROM Login WHERE Email= ?",
            [Email]
        );
        if (resultB.length == 0) {
            console.log("Usuario inexistente!");
            const [TiempoActual] = await pool.query("SELECT now() as now");
            console.log("FAIL!\nMostrando tiempo actual: \n", TiempoActual[0].now);
            console.log(logged);
            console.log("Finalizando login!\n logged en:", logged, " & logout:" + logout);
            console.log("logout esta en:" + logout);
            return res.status(404).json({ message: "Usuario inexistente!" });
        }
        console.log("Consulta con éxito!\n");
        console.log("Reultado general:\n", resultB);
        //console.log("Resultado de resultB\n",resultB[0].Contraseña);

        console.log("Realizando comparacion de contraseñas!\n");
        const theyMatch = await bcrypt.compare(Contraseña, resultB[0].Contraseña);
        if (!theyMatch) {
            console.log("Credenciales incorrectas!");
            const [TiempoActual] = await pool.query("SELECT now() as now");
            console.log("FAIL!\nMostrando tiempo actual: \n", TiempoActual[0].now);
            console.log(logged);
            console.log("Finalizando login!\n logged en:", logged, " & logout:" + logout);
            return res.status(400).json({ message: "Credenciales incorrectas!" });
        }
        console.log("Contraseñas coinciden!\n");

        console.log("Creando acces Token:\n");
        const Token = await crearToken({ id: resultB[0].id }, 2);
        res.cookie("Token", Token);
        console.log("Mostrando resultados en el navegador!\n");
        const LastLogin = resultB[0].UltimoLogin;
        console.log("Ultimo login:\n", LastLogin);

        console.log("Realizando actualizacion de login\n");
        const resultUpdate = await pool.query("UPDATE Login SET UltimoLogin = now()  WHERE Email= ?",
            [Email]
        );
        console.log("Resultado de actualizacion:\n", resultUpdate);


        const [TiempoActual] = await pool.query("SELECT now() as now");
        console.log("ÉXITO!\nMostrando tiempo actual: \n", TiempoActual[0].now);
        logged = 1;
        logout = 0;
        console.log("Finalizando login!\n logged en:", logged, " & logout:" + logout);
        res.json({//Respuesta en el navegador!
            id: resultB[0].id,
            Email,
            LastLogin,
            Actual: TiempoActual[0].now,
            Contraseña: resultB[0].Contraseña,
            Token
        }
        );

    } catch (error) {
        console.log("Error en regisUser().\n", error);
        console.log("Finalizando funcion de login\nlogged:", logged, " & logout:" + logout);
        return res.status(500).json({ message: error.message });
    }
    console.log("Finalizando funcion de login\nlogged:", logged, " & logout:" + logout);
};

export const loginInv = async (req, res) => {
    try {
        /*
        console.log("Iniciando loginInv");
        console.log("Tu req.user da:", req.user);
        if (logged) {
            console.log("logged esta en:" + logged);
            console.log("logout esta en:" + logout);
            console.log("Ya estas logueado!!\nTerminando authClient\n");
            return res.status(401).json({ Advertencia: 'Usuario NO autorizado!!' });
        }
            */
        console.log("Iniciando login!\nCachando JSON:\n");
        console.log(req.body);
        console.log("\nExtrayendo datos del JSON!\n");
        const { Email, Contraseña } = req.body;
        console.log("Datos extraídos:\n", Email, Contraseña);
        console.log("Realizando busqueda del usuario\n");
        //throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        const [resultB] = await pool.query("SELECT * FROM Login WHERE Email= ?",
            [Email]
        );
        if (resultB.length == 0) {
            console.log("Usuario inexistente!");
            const [TiempoActual] = await pool.query("SELECT now() as now");
            console.log("FAIL!\nMostrando tiempo actual: \n", TiempoActual[0].now);
            console.log(logged);
            console.log("Finalizando login!\n logged en:", logged, " & logout:" + logout);
            console.log("logout esta en:" + logout);
            return res.status(404).json({ message: "Usuario inexistente!" });
        }
        console.log("Consulta con éxito!\n");
        console.log("Reultado general:\n", resultB);
        //console.log("Resultado de resultB\n",resultB[0].Contraseña);

        console.log("Realizando comparacion de contraseñas!\n");
        const theyMatch = await bcrypt.compare(Contraseña, resultB[0].Contraseña);
        if (!theyMatch) {
            console.log("Credenciales incorrectas!");
            const [TiempoActual] = await pool.query("SELECT now() as now");
            console.log("FAIL!\nMostrando tiempo actual: \n", TiempoActual[0].now);
            console.log(logged);
            console.log("Finalizando login!\n logged en:", logged, " & logout:" + logout);
            return res.status(400).json({ message: "Credenciales incorrectas!" });
        }
        console.log("Contraseñas coinciden!\n");

        console.log("Creando acces Token:\n");
        const Token = await crearToken({ id: resultB[0].id }, 3);
        res.cookie("Token", Token);
        console.log("Mostrando resultados en el navegador!\n");
        const LastLogin = resultB[0].UltimoLogin;
        console.log("Ultimo login:\n", LastLogin);

        console.log("Realizando actualizacion de login\n");
        const resultUpdate = await pool.query("UPDATE Login SET UltimoLogin = now()  WHERE Email= ?",
            [Email]
        );
        console.log("Resultado de actualizacion:\n", resultUpdate);


        const [TiempoActual] = await pool.query("SELECT now() as now");
        console.log("ÉXITO!\nMostrando tiempo actual: \n", TiempoActual[0].now);
        logged = 1;
        logout = 0;
        console.log("Finalizando login!\n logged en:", logged + " & logout:" + logout);
        res.json({//Respuesta en el navegador!
            id: resultB[0].id,
            Email,
            LastLogin,
            Actual: TiempoActual[0].now,
            Contraseña: resultB[0].Contraseña,
            Token
        }
        );

    } catch (error) {
        console.log("Error en regisUser().\n", error);
        console.log("Finalizando funcion de login\nlogged:", logged + " & logout:" + logout);
        return res.status(500).json({ message: error.message });
    }
    console.log("Finalizando funcion de login\nlogged:", logged + " & logout:" + logout);
};

export const logoutUserTest = (req, res) => {
    console.log("Dentro de logout!\n");
    console.log("Tu req.user da:");
    console.log(req.user);
    console.log("Y su length:");
    console.log([req.user].length);
    if ([req.user].length == 0) {
        console.log("Necesitas logearte!");
    }
    console.log("\nIniciando Logout\nlogged:" + logged + " & logout:" + logout);
    try {
        if ((logged == 1) && (logout == 0)) {
            console.log("Dentro de if!");
            logged = 0;
            logout = 1;
            console.log("Eliminando cookie!");
            res.cookie("Token", "", {
                expires: new Date(0),
            });
            console.log("Cookie eliminada!");
            //console.log("Finalizando Logout en if\n con logged en " + logged + " & logut" + logout, "y res.cookie: " + res.cookie.Token + "\n");
            //return res.json({ message: "Salido con éxito!" });
        }
        else {
            console.log("No estas logueado pero\n con logged en " + logged, "y logout en " + logout, "y res.cookie: " + res.cookie.Token + "\n");
            return res.json({ message: "Este no es tu sitio para salir!!" });
            //return throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        }

    } catch (error) {
        return console.log("Dafaq logged:" + logged + "\n", "y logout en " + logout + "\n", error);

    }
    logged = 0;
    logout = 1;
    req.user = 0;
    console.log("Finalizando logged:" + logged, " & logout:" + logout, "res.cookie:" + res.cookie, " & req.user:" + req.user);
    return res.json({ message: "Salido con éxito!" });
};

export const logoutUser = (req, res) => {
    console.log("Dentro de logout!\n");
    /*
    console.log("Tu req.user da:");
    console.log(req.user);
    console.log("Y su id: "+req.user.id);
    if (req.user.id == 0) {
        console.log("Necesitas logearte!");
    }
        */
    console.log("\nIniciando Logout\nlogged:" + logged + " & logout:" + logout);
    /*
    try {
        if ((logged == 1) && (logout == 0)) {
            console.log("Dentro de if!");
            logged = 0;
            logout = 1;
            */
            console.log("Eliminando cookie!");
            res.cookie("Token", "", {
                expires: new Date(0),
            });
            console.log("Cookie eliminada!");
            //console.log("Finalizando Logout en if\n con logged en " + logged + " & logut" + logout, "y res.cookie: " + res.cookie.Token + "\n");
            //return res.json({ message: "Salido con éxito!" });
        /*}
        else {
            console.log("No estas logueado pero\n con logged en " + logged, "y logout en " + logout, "y res.cookie: " + res.cookie.Token + "\n");
            return res.json({ message: "Este no es tu sitio para salir!!" });
            //return throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        }

    } catch (error) {
        return console.log("Dafaq logged:" + logged + "\n", "y logout en " + logout + "\n", error);

    }
        */
    logged = 0;
    logout = 1;
    req.user = 0;
    console.log("Finalizando logged:" + logged, " & logout:" + logout, "res.cookie:" + res.cookie, " & req.user:" + req.user);
    return res.json({ message: "Salido con éxito!" });
};

export const profileUser = async (req, res) => {
    try {
        const Usuario = await req.user;
        if (!Usuario) {
            //return res.status(500).json({message: "No se pudo logear"});
            return console.log("No se pudo loguear!\n");
        }
        console.log("logueado como: ", Usuario);
        console.log("Id:");
        console.log(Usuario.id);
        console.log("Realizando consulta\n");

        const userData = await pool.query("SELECT * FROM Usuarios WHERE id=?", [Usuario.id]);
        const userLogin = await pool.query("SELECT * FROM Login WHERE id=?", [Usuario.id]);

        console.log("Consulta con éxito!\n");
        console.log("Resultado: \n");
        console.log(userData[0]);
        console.log("\n")
        console.log(userLogin[0]);
        res.json({userData: userData[0],userLogin: userLogin[0]});

        //res.json({ "Mensaje": "Profile!", Usuario });
    }

    catch (error) {
        console.log("Error en Profile().\n", error);
        return console.log("Terminando...\n");
        //return res.status(500).json({message: error.message});
    }
    console.log("Finalizando funcion de profile");
}

/*
//TEST
export const regisUser = async (req,res) => {
    try {
        res.send('Registro!')
    } catch (error) {
        console.log("Error en regisUser().\n",error)
        return res.status(500).json({message: error.message});
    }
        console.log("Finalizando funcion de login\nlogged:",logged, " & logout:" + logout);
}


export const loginClient = async (req,res) => {
    try {
        res.send('Login!')
    } catch (error) {
        console.log("Error en loginClient().\n",error)
        return res.status(500).json({message: error.message});
    }
        console.log("Finalizando funcion de login\nlogged:",logged, " & logout:" + logout);
}
*/

/*
export const loginGen = async  (req,res) => {
    try {
        console.log("Iniciando authClient")
        console.log("Tu req.user da:",req.user)
        if(logged) {
            console.log("Ya estas logueado!!\nTerminando authClient\n")
            return res.status(401).json({Advertencia: 'Usuario NO autorizado!!'});
        }
        logged = 1
        console.log("Iniciando login!\nCachando JSON:\n")
        console.log(req.body)
        console.log("\nExtrayendo datos del JSON!\n");
        const {Email, Contraseña} = req.body;
        console.log("Datos extraídos:\n",Email, Contraseña)
        console.log("Realizando busqueda del usuario\n");
        //throw new Error("Error en getBooks(). No se pudo realizar la consulta select. Seguramente la tabla no existe.")
        const [resultB] = await pool.query("SELECT * FROM Login WHERE Email= ?",
            [Email]
        )
        if (resultB.length == 0) 
            {
                console.log("Usuario inexistente!")
                console.log("Finalizando funcion de login\nlogged:",logged, " & logout:" + logout);
                return res.status(404).json({ message: "Usuario inexistente!"})
            }
        console.log("Consulta con éxito!\n");
        console.log("Reultado general:\n",resultB);
        //console.log("Resultado de resultB\n",resultB[0].Contraseña);

        console.log("Realizando comparacion de contraseñas!\n");
        const theyMatch = await bcrypt.compare(Contraseña,resultB[0].Contraseña)
        if(!theyMatch) {
            console.log("Credenciales incorrectas!")
            console.log("Finalizando funcion de login\nlogged:",logged, " & logout:" + logout);
            return res.status(400).json({message: "Credenciales incorrectas!"});}
        console.log("Contraseñas coinciden!\n");
        
        
        console.log("Creando acces Token:\n");
        const Token = await crearToken({id: resultB[0].id},1)
        res.cookie("Token",Token);
        console.log("Mostrando resultados en el navegador!\n");
        const LastLogin = resultB[0].UltimoLogin
        console.log("Ultimo login:\n",LastLogin);

        console.log("Realizando actualizacion de login\n");
        const resultUpdate = await pool.query("UPDATE Login SET UltimoLogin = now()  WHERE Email= ?",
            [Email]
        )
        console.log("Resultado de actualizacion:\n",resultUpdate);
        
        
        const[TiempoActual]= await pool.query("SELECT now() as now");
        console.log("Mostrando tiempo actual: \n",TiempoActual[0].now);
        
        res.json({//Respuesta en el navegador!
            id: resultB[0].id,
            Email,
            LastLogin,
            Actual: TiempoActual[0].now,
            Contraseña: resultB[0].Contraseña,
            Token
            }
        )
        
    } catch (error) {
        console.log("Error en regisUser().\n",error)
        console.log("Finalizando funcion de login\nlogged:",logged, " & logout:" + logout);
        return res.status(500).json({message: error.message});
    }
        console.log("Finalizando funcion de login\nlogged:",logged, " & logout:" + logout);
}
*/
