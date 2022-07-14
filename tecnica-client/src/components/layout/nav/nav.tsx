import { useMsal } from "@azure/msal-react";
import { useContext, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import LoginContext from "../../../context/login/LoginContext";

const Nav = () =>{

    const { handleSalir, loginDto } = useContext(LoginContext);
    
    const { instance } = useMsal();
    const { pathname } = useLocation();

    const onHandleSalir = () =>{
        instance.logoutRedirect({
            onRedirectNavigate: (url) => {
                // Return false if you would like to stop navigation after local logout
                return false;
            }
        });
        handleSalir();  
    }    
    
    useEffect(() =>{
        window.scrollTo(0, 0); 

        var path = pathname.split("/");

        var nav =  document.getElementById("navtecnica");
        nav?.getElementsByClassName("active").item(0)?.classList.remove('active');       
        document.getElementById("nav" + path[1])?.classList.add('active');
        
    },[pathname]);

    return (
        <>  
        
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <NavLink className="navbar-brand press-scale-down" to="/">Tecnica Client</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navtecnica">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navtecnica">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link press-scale-down" id="nav" to="/">
                                    Inicio
                                </Link>                           
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link press-scale-down" id="navpokemons" to="/pokemons/1">
                                    Pokemons
                                </Link>                           
                            </li>                            
                        </ul>
                        <div className="d-flex">
                            <a className="menu-a press-scale-down"  href="/cerrar" onClick={e =>{e.preventDefault();onHandleSalir(); }}>
                                <span data-i18n="drpdwn.page-logout">Cerrar sesión</span>                                
                            </a>
                        </div>
                    </div>
                </div>
            </nav>       
        </>
    );

}

export default Nav;