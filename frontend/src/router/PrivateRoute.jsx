import { Navigate } from "react-router-dom";
import { LogIn } from "@pages/client";
import { Layout } from "@templates";

export const PrivateRoute = ({withAuth, children}) =>{

  const isAuthenticated = window.localStorage.getItem("isAuth");

  if(withAuth){
    return (isAuthenticated === null || isAuthenticated === "false") 
    ? <Navigate to="/login" /> 
    : <Layout>{children}</Layout>  } 
  else {
    return (isAuthenticated === null || isAuthenticated === "false") 
    ? <LogIn/>
    : <Navigate to="/" replace />
  }
}

export default PrivateRoute;