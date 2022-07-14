import { Fragment, useContext, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import LoginContext from "../../../context/login/LoginContext";
import { GetToken } from "../../../helpers/functions";
const PrivateRoute = () =>{
    const { authentication } = useContext(LoginContext);
    const user = !!GetToken();   
  
    useEffect(() =>{
        
    },[authentication]);
  

    if (!user) {    
        return <Navigate to="/login" />;
    }

  

    return(
        <Fragment>
            <Outlet />       
        </Fragment>
    );
}

export default PrivateRoute;