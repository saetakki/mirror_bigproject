import { Navigate } from "react-router-dom";
import { Test } from "@pages/client";
import { Layout } from "@templates";

export const PrivateRoute = ({withAuth, children}) =>{

  const isAuthenticated = window.localStorage.getItem("isAuth");

  if(withAuth){
    return (isAuthenticated === null || isAuthenticated === "false") 
    ? <Navigate to="/test" /> 
    : <Layout>{children}</Layout>  } 
  else {
    return (isAuthenticated === null || isAuthenticated === "false") 
    ? <Test/>
    : <Navigate to="/" replace />
  }
}

export default PrivateRoute;