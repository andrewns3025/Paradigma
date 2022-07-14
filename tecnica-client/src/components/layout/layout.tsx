import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "../home/home";
import Login from "../login/login";
import NotFound from "../notfound/not-found";
import PrivateRoute from "./routes/private-route";
import PublicRoute from "./routes/public-route";
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import Nav from "./nav/nav";
import LoginContext from "../../context/login/LoginContext";
import useInit from "../../hooks/useInit";
import Pokemons from "../pokemons/pokemons";
import PokemonState from "../../context/pokemon/PokemonState";
import Pokemon from "../pokemons/pokemon/pokemon";
import EditPokemon from "../pokemons/pokemon/edit-pokemon/edit-pokemon";
import VideoYoutube from "../video-youtube/video-youtube";
const Layout = () =>{     
    const { validLogin } = useContext(LoginContext);

    const { authentication } = useContext(LoginContext);

    useInit(async() =>{
        validLogin();
    });

    return (
        
        <PokemonState>
           <div className="page-inner bg-brand-gradient">
            <div className="page-content-wrapper bg-transparent m-0">
                <div className="flex-1">
            {authentication && (<Nav />)}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login/>} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />                 
                    <Route path="/pokemons/:page" element={<Pokemons />} >
                        
                    </Route>       
                    <Route path="/pokemons/pokemon/:id" element={<Pokemon></Pokemon>} />          
                    <Route path="/pokemons/pokemon/edit/:id" element={<EditPokemon></EditPokemon>} />                              
                </Route>
                <Route path='/notfound' element={<NotFound/>} ></Route>
                <Route path="*" element={<NotFound/>} ></Route>
            </Routes>       
            </div>
            </div>
            </div>
                         
        </PokemonState>
    )
} 

export default Layout;