import { useContext } from "react"
import { AuthContex } from "../context/authContext"
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () =>{
    
const {Signed} = useContext(AuthContex);

return Signed ? <Outlet/> : <Navigate to="/"/>;

}