import { createContext, useContext, useState } from "react";
import { loginAdminReq } from "../api/auth";


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
    const [errorsLogin, setErrors] = useState([]);


    const loginUser = async (user) => {
        try {
            console.log(user);
            const res = await loginAdminReq(user);
            console.log(res.data);
            setUser(res.data);
            setIsAutenticado(true);
        } catch (error) {
            console.log("error:")
            console.log(error)
            console.log("error.response")
            console.log(error.response)
            console.log("error.response.data")
            console.log(error.response.data)
            console.log("error.response.data.message")
            console.log(error.response.data.message)
            if(Array.isArray(error.response.data)){
                console.log("Es array")
                console.log("Creo que solo hubo un error")
                setErrors(error.response.data)
            }else{
                console.log("No es array")
                console.log("Es objeto al parecer")
                console.log("error.response.data.message")
            console.log(error.response.data.message)
            console.log("error.response.data.Error")
            console.log(error.response.data.Error)
            setErrors(error.response.data.Error)
            }
            
            
        }
    };
    return (
        <AuthContext.Provider value={{
            loginUser,
            user,
            isAutenticado,
            errorsLogin

        }}>
            {children}
        </AuthContext.Provider>
    );
};