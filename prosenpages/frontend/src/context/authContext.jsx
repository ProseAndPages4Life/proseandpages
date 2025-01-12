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

            setErrors(error.response.data)
            
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