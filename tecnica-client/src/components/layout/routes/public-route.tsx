import { Fragment, useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoginContext from "../../../context/login/LoginContext";
import { GetToken } from "../../../helpers/functions";


const PublicRoute = () =>{
    const { authentication } = useContext(LoginContext);
    const user = !!GetToken();

    useEffect(() =>{
        
    },[authentication]);

    if (user) {
        return <Navigate to="/" />;
    }    

    return(
        <Fragment>
            <Outlet />
        </Fragment>
    );
}

export default PublicRoute;