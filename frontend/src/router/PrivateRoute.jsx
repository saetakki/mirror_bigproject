import { Navigate } from "react-router-dom";
import { LogIn, Test } from "@pages/client";
import { Layout } from "@templates";
import { useLocation } from "react-router-dom";

export const PrivateRoute = ({withAuth, children}) =>{

  const isAuthenticated = window.localStorage.getItem("isAuth");
  const isTest = useLocation().pathname;

  if(withAuth){
    return (isAuthenticated === null || isAuthenticated === "false") 
    ? <Navigate to="/login"/>
    : <Layout>{children}</Layout>  } 
  else {
    return (isAuthenticated === null || isAuthenticated === "false") 
    ? isTest === "/test" ? <Test/> : <LogIn/>
    : <Navigate to="/" replace />
  }
}

export default PrivateRoute;