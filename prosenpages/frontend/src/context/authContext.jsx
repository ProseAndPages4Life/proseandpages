import { createContext, useContext, useEffect, useState } from "react";
import { createCarrito, getAdminBookReq, getClientaBookReq, getClientBookReq, loginAdminReq, loginClientReq, loginInvReq, regisClientReq, verifyTokenAdminReq, verifyTokenClientReq, verifyTokenInvReq } from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth de usarse dentro de AuthProvider!");
    }
    return context;
};

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAutenAdmin, setIsAutenAdmin] = useState(false);
    const [isAutenClient, setIsAutenClient] = useState(false);
    const [isAutenInv, setIsAutenInv] = useState(false);
    const [isRegistrado, setIsRegistrado] = useState(false);
    const [errorsBack, setErrors] = useState([]);

    const [booksList, setBooks] = useState([]);
    const [bookList, setaBook] = useState([]);

    const [formCarrito, setCarrito] = useState([]);


    const loginAdmin = async (user) => {
        try {

            console.log(user);
            const res = await loginAdminReq(user);
            console.log(res.data);
            setUser(res.data);
            setIsAutenAdmin(true);
        } catch (error) {
            /*
            console.log("error:")
            console.log(error)
            console.log("error.response")
            console.log(error.response)
            console.log("error.response.data")
            console.log(error.response.data)
            console.log("error.response.data.message")
            console.log(error.response.data.message)
            */
            if (Array.isArray(error.response.data)) {
                /*
                console.log("Es array")
                console.log("Creo que solo hubo un error")
                */
                setErrors(error.response.data);
            } else {
                /*
                console.log("No es array");
                console.log("Es objeto al parecer");
                console.log("Seguro viene del backend");
                console.log("error.response.data.Error");
                console.log(error.response.data.Error);
                */
                setErrors(error.response.data.Error);
            }


        }
    };

    const loginClient = async (user) => {
        try {

            console.log(user);
            const res = await loginClientReq(user);
            console.log(res.data);
            setUser(res.data);
            setIsAutenClient(true);
        } catch (error) {

            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            } else {

                setErrors(error.response.data.Error);
            }


        }
    };

    const loginInv = async (user) => {
        try {
            console.log(user);
            const res = await loginInvReq(user);
            console.log(res.data);
            setUser(res.data);
            setIsAutenInv(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {

                setErrors(error.response.data);
            } else {

                setErrors(error.response.data.Error);
            }
        }
    };

    const regisClient = async (user) => {
        //export const regisClientReq = user => axios.post(`${ipBack}/register`, user);
        try {
            const res = await regisClientReq(user);
            console.log("Imprimiendo respuesta!");
            console.log(res);
            console.log("Ya se registro! Cambiando estado de registro a true");
            setIsRegistrado(true);
        } catch (error) {
            console.log("Viendo error!");
            console.log(error);

            console.log("error.response");
            console.log(error.response);
            console.log("error.response.data");
            console.log(error.response.data);
            console.log("error.response.data.message");
            console.log(error.response.data.message);

            if (Array.isArray(error.response.data)) {

                console.log("Es array");
                console.log("Creo que solo hubo un error");

                setErrors(error.response.data);
            } else {

                console.log("No es array");
                console.log("Es objeto al parecer");
                console.log("Seguro viene del backend");
                console.log("error.response.data.Error");
                console.log(error.response.data.Error);

                setErrors(error.response.data.Error);
            }
        }

    };

    const getBooks = async (booksList) => {
        console.log("Iniciando getBooks");
        try {
            /* console.log("Dentro de try");
            console.log("Mostrando booksList");
            console.log(booksList); */
            //booksList = [];
            const res = await getClientBookReq();
            /* console.log("Viendo solicitud!");
            console.log(res);
            console.log("Viendo res.data");
            console.log(res.data);
            console.log("Es array?");
            console.log(Array.isArray(res.data)); */
            setBooks(res.data);
            /* console.log("Viendo booksList var");
            console.log(booksList); */
        } catch (error) {
            /* console.log("Viendo error en getBooks");
            console.log(error); */
        }
    };

    const getaBook = async (id) => {
        /* console.log("Iniciando getBooks"); */
        try {
            /* console.log("Dentro de try");
            console.log("Mostrando a bookList");
            console.log(id); */
            //booksList = [];
            const res = await getClientaBookReq(id);
            /* console.log("Viendo solicitud!");
            console.log(res);
            console.log("Viendo res.data");
            console.log(res.data);
            console.log("Es array?");
            console.log(Array.isArray(res.data)); */
            setaBook(res.data);
            /* console.log("Viendo booksList var");
            console.log(bookList); */
        } catch (error) {
            console.log("Viendo error en getBooks");
            console.log(error);
        }
    };

    const pushCarrito = async (formCarrito) => {
        console.log("Iniciando pushCarrito");

        try {
            console.log("Dentro de try");
            console.log("Mostrando a form");
            console.log(formCarrito);
            console.log("Realizando solicitud");
            const res = await createCarrito(formCarrito);
            console.log("Mostrando respuesta!");
            console.log(res);
            setCarrito(formCarrito);
        } catch (error) {
            console.log("Viendo error en pushCarrito");
            console.log(error);

        }
    };


    //Limpiando mensajes de error despues de 5 segundos
    useEffect(() => {
        if (errorsBack.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }
    );

    useEffect(() => {
        let validUser = 0;
        let type = "0";
        let userData = {};
        async function checkAdmin() {
            const cookies = Cookies.get();
            console.log("mostrando cookies");
            console.log(cookies);

            if (!cookies.Token) {
                console.log("No hay token!");
                validUser = 0;
                //return res.status(401).json(["No autorizado!"]);
            }
            else {
                try {
                    console.log("iniciando try");
                    console.log("mostrando Token");
                    console.log(cookies.Token);
                    console.log("Enviando token!");
                    const resA = await verifyTokenAdminReq();
                    /* const resC = await verifyTokenClientReq();
                    const resI = await verifyTokenInvReq(); */

                    console.log("mostrnado respuesta");
                    console.log(resA);
                    if (resA) {
                        validUser = 1;
                        type = "A";
                        userData = resA;
                    }
                    /* console.log(resC)
                    console.log(resI) */
                } catch (error) {
                    console.log("hubo un error");
                    console.log(error);
                }
            }
        }

        async function checkClient() {
            const cookies = Cookies.get();
            console.log("mostrando cookies");
            console.log(cookies);

            if (!cookies.Token) {
                console.log("No hay token!");
                validUser = 0;
                //return res.status(401).json(["No autorizado!"]);
            }
            else {
                try {
                    console.log("iniciando try");
                    console.log("mostrando Token");
                    console.log(cookies.Token);
                    console.log("Enviando token!");
                    const resA = await verifyTokenClientReq();
                    /* const resC = await verifyTokenClientReq();
                    const resI = await verifyTokenInvReq(); */

                    console.log("mostrnado respuesta");
                    console.log(resA);
                    if (resA) {
                        validUser = 1;
                        type = "C";
                        userData = resA;

                    }
                    /* console.log(resC)
                    console.log(resI) */
                } catch (error) {
                    console.log("hubo un error");
                    console.log(error);
                }
            }
        }

        async function checkInv() {
            const cookies = Cookies.get();
            console.log("mostrando cookies");
            console.log(cookies);

            if (!cookies.Token) {
                console.log("No hay token!");
                validUser = 0;
                //return res.status(401).json(["No autorizado!"]);
            }
            else {
                try {
                    console.log("iniciando try");
                    console.log("mostrando Token");
                    console.log(cookies.Token);
                    console.log("Enviando token!");
                    const resA = await verifyTokenInvReq();
                    /* const resC = await verifyTokenClientReq();
                    const resI = await verifyTokenInvReq(); */

                    console.log("mostrnado respuesta");
                    console.log(resA);
                    if (resA) {
                        validUser = 1;
                        type = "I";
                        userData = resA;

                    }
                    /* console.log(resC)
                    console.log(resI) */
                } catch (error) {
                    console.log("hubo un error");
                    console.log(error);
                }
            }
        }


        async function checkValid() {
            let stopped = 0;
            await checkAdmin();
            await checkInv();
            await checkClient();


            stopped = 1;
            if ((validUser == 1) && stopped == 1) {
                console.log("Es un usuario valido!");
                console.log("eqv a res.data:");
                console.log(userData.data);
                switch (type) {
                    case "A":
                        console.log("Es admin");
                        setIsAutenAdmin(true);
                        setUser(userData.data);
                        break;
                    case "C":
                        console.log("Es cliente");
                        setIsAutenClient(true);
                        setUser(userData.data);
                        break;
                    case "I":
                        console.log("Es inv");
                        setIsAutenInv(true);
                        setUser(userData.data);
                        break;
                }
            } else {
                console.log("No es valido!!");
                setIsAutenAdmin(false);
                setIsAutenClient(false);
                setIsAutenInv(false);
                setUser(null);
            }
        }
        checkValid();
    }, []);


    return (
        <AuthContext.Provider value={{
            loginAdmin,
            loginClient,
            loginInv,
            regisClient,
            //getBooks
            getBooks,
            getaBook,
            pushCarrito,
            user,
            isAutenAdmin,
            isAutenClient,
            isAutenInv,
            isRegistrado,
            //getBooks
            booksList,
            bookList,
            errorsBack

        }}>
            {children}
        </AuthContext.Provider>
    );
};