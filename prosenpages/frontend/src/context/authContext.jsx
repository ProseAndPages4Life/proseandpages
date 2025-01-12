import { createContext, useContext, useEffect, useState } from "react";
import { loginAdminReq, loginClientReq, loginInvReq, regisClientReq } from "../api/auth";


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
    const [isAutenticado, setIsAutenticado] = useState(false);
    const [isRegistrado, setIsRegistrado] = useState(false);
    const [errorsBack, setErrors] = useState([]);


    const loginAdmin = async (user) => {
        try {

            console.log(user);
            const res = await loginAdminReq(user);
            console.log(res.data);
            setUser(res.data);
            setIsAutenticado(true);
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
            setIsAutenticado(true);
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
            setIsAutenticado(true);
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

    useEffect(() => {
        if (errorsBack.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }
    );

    return (
        <AuthContext.Provider value={{
            loginAdmin,
            loginClient,
            loginInv,
            regisClient,
            user,
            isAutenticado,
            isRegistrado,
            errorsBack

        }}>
            {children}
        </AuthContext.Provider>
    );
};