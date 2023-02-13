import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { Navigate } from "react-router-dom";

export const AuthContex = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadingStoreData = async () => {
            const storageUser = localStorage.getItem("@Auth:user");
            const storagetoken = localStorage.getItem("@Auth:token");

            if (storageUser && storagetoken) {

                setUser(storageUser);

            }
        }
        loadingStoreData();
    }, []);



    const SingIn = async ({ email, password }) => {

        const response = await api.post("/auth", {
            email, password
        })

        if (response.data.error) {
            alert(response.data.error)
        } else {
            const { token, user } = response.data;
            setUser(user);

            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${token}`
            localStorage.setItem("@Auth:token", token);
            localStorage.setItem("@Auth:user", JSON.stringify(user));
        }
    }

    const signOut = () => {
        localStorage.removeItem("@Auth:token");
        localStorage.removeItem("@Auth:user");
        setUser(null)
        return <Navigate to="/" />
    }

    return (
        <AuthContex.Provider value={{
            user,
            Signed: !!user,
            SingIn,
            signOut,
        }}>
            {children}
        </AuthContex.Provider>
    )

}