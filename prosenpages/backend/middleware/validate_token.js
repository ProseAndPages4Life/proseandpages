import jwt from 'jsonwebtoken';
import { secretToken, secretTokenAdmin, secretTokenInv } from '../config.js';

export const authGen = (tipoUser) => (req, res, next) => {
    try {
        console.log("Iniciando authGen");
        const { Token } = req.cookies;
        if (!Token) {
            console.log("No Token!\nTerminando authClient\n");
            return res.status(401).json({ Advertencia: 'Usuario NO autorizado!!' });
        }
        switch (tipoUser) {
            case 1:
                toquencito = secretToken;
                break;
            case 2:
                toquencito = secretTokenAdmin;
                break;
            case 3:
                toquencito = secretTokenInv;
                break;
            default:
                toquencito = secretToken;
                break;
        }
        console.log(toquencito);

        jwt.verify(Token, toquencito, (error, id_user) => {
            //try {
            if (error) {
                console.log("Token inválido!");
                console.log("Terminando authClient\n");
                return res.status(401).json({ Advertencia: 'Token inválido!!' });
                //return console.log("Advertencia: 'Token inválido!!'");
            }
            console.log(id_user);
            req.user = id_user;
            console.log(Token, "\nAutorizado!");
            /*
            } catch (error) {
                console.log("Error en verify!\n");
                console.log("Terminando authClient\n");
                //return res.status(401).json({ Advertencia: 'Error en verify!!' });
                return console.log("Advertencia: 'Error en verify!!'");
            }
                */
        });

        console.log("Terminando authClient\n");
        return next();
    } catch (error) {
        console.log("Terminando authClient\n");
        return res.status(401).json({ Advertencia: 'Error en authClient!!' });
    }
};

export const authClient = (req, res, next) => {
    try {
        console.log("Iniciando authClient");
        const { Token } = req.cookies;
        if (!Token) {
            console.log("No Token!\nTerminando authClient\n");
            return res.status(401).json({ Advertencia: 'Usuario NO autorizado!!' });
        }
        jwt.verify(Token, secretToken, (error, id_user) => {
            //try {
            if (error) {
                console.log("Token inválido!");
                console.log("Terminando authClient\n");
                return res.status(401).json({ Advertencia: 'Token inválido!!' });
                //return console.log("Advertencia: 'Token inválido!!'");
            }
            console.log(id_user);
            req.user = id_user;
            console.log(Token, "\nAutorizado!");
            /*
            } catch (error) {
                console.log("Error en verify!\n");
                console.log("Terminando authClient\n");
                //return res.status(401).json({ Advertencia: 'Error en verify!!' });
                return console.log("Advertencia: 'Error en verify!!'");
            }
                */
        });


    } catch (error) {
        console.log("Terminando authClient\n");
        //return res.status(401).json({ Advertencia: 'Error en authClient!!' });
        return console.log("Advertencia: 'Error en authClient!!'");
    }
    console.log("Terminando authClient\n");
    return next();
};

export const authAdmin = (req, res, next) => {
    try {
        console.log("Iniciando authAdmin");
        console.log("req.user en:")
        console.log(req.user)
        console.log(req.user)
        const { Token } = req.cookies;
        if (!Token) {
            console.log("No Token!\nTerminando authAdmin\n");
            return res.status(401).json({ Advertencia: 'Usuario NO autorizado!!' });
        }
        jwt.verify(Token, secretTokenAdmin, (error, id_user) => {
            //try {
            if (error) {
                console.log("Token inválido!");
                console.log("Terminando authClient\n");
                return res.status(401).json({ Advertencia: 'Token inválido!!' });
                //return console.log("Advertencia: 'Token inválido!!'");
            }
            console.log(id_user);
            req.user = id_user;
            console.log(Token, "\nAutorizado!");
            /*
            } catch (error) {
                console.log("Error en verify!\n");
                console.log("Terminando authClient\n");
                //return res.status(401).json({ Advertencia: 'Error en verify!!' });
                return console.log("Advertencia: 'Error en verify!!'");
            }
                */
        });

        console.log("Terminando authAdmin\n");
        return next();
    } catch (error) {
        console.log("Terminando authAdmin\n");
        return res.status(401).json({ Advertencia: 'Error en authAdmin!!' });
    }
};

export const authInv = (req, res, next) => {
    try {
        console.log("Iniciando authInv");
        const { Token } = req.cookies;
        if (!Token) {
            console.log("No Token!\nTerminando authInv\n");
            return res.status(401).json({ Advertencia: 'Usuario NO autorizado!!' });
        }
        jwt.verify(Token, secretTokenInv, (error, id_user) => {
            //try {
            if (error) {
                console.log("Token inválido!");
                console.log("Terminando authClient\n");
                return res.status(401).json({ Advertencia: 'Token inválido!!' });
                //return console.log("Advertencia: 'Token inválido!!'");
            }
            console.log(id_user);
            req.user = id_user;
            console.log(Token, "\nAutorizado!");
            /*
            } catch (error) {
                console.log("Error en verify!\n");
                console.log("Terminando authClient\n");
                //return res.status(401).json({ Advertencia: 'Error en verify!!' });
                return console.log("Advertencia: 'Error en verify!!'");
            }
                */
        });

        console.log("Terminando authInv\n");
        return next();
    } catch (error) {
        console.log("ERROR!\nTerminando authInv\n");
        return res.status(401).json({ Advertencia: 'Error en authInv!!' });
    }
};