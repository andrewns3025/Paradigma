import { useReducer } from "react";
import LoginContext from "./LoginContext";
import LoginReducer from "./LoginReducer";
import { initialState } from "./LoginInterfaceState"
import { Id, toast } from "react-toastify";
import { LoginDto } from "../../models/Dtos/Login/LoginDto";
import { ResponseServerType } from "../../models/Enums/ResponseType";
import { PostEnpoint } from "../../api/api-base";
import { LoginLoad } from "../../models/PayLoads/Login/LoginLoad";
import { GetAuthentication, GetToken, RemoveSession } from "../../helpers/functions";

const LoginState = (props: any) => {       
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(LoginReducer, initialState)
    // Funciones
    //#region  Funciones
    const handleLogin = async (datos:LoginLoad, id: Id) =>{    
        
        try {
            const data = await PostEnpoint<LoginDto>("/login/Authorization", datos); 
            if(data.code === ResponseServerType.Succes){
                distpatchLogin(data.result);
                toast.update(id, { render: "Bienvenido!", type: "success", isLoading: false, autoClose:2000 });
            }          
            else{
                toast.update(id, { render: data?.message, type: "warning", isLoading: false, autoClose:5000 });
            } 
            
            return data;
            
        } catch (error) {
            toast.update(id, { render: "Ocurrio un error de red, " + error, type: "error", isLoading: false, autoClose:5000 });            
        }          
    }  
    const validLogin = () => {
        const token = GetToken();
        const authentication = GetAuthentication();
        if(token){
            if(authentication){
                dispatch({
                    type: "VALIDLOGIN",     
                });
                return true;
            }          
        }        
        return false;
    }

    const distpatchLogin = (loginDto:LoginDto) => {
        dispatch({
            type: "LOGINSUBMIT",     
            payLoad: loginDto,    
        });
    }

    const handleSalir = async () => {
        RemoveSession();
        dispatch({
            type: "CLOSELOGIN",     
        });
        
        return true;
    }

    //#endregion
    
    var childrens = props.children;
    return (
        <LoginContext.Provider value={{
            authentication: state.authentication,
            loginLoad: state.loginLoad,           
            loader:state.loader,
            loginDto: state.loginDto,
            handleLogin,           
            validLogin,
            handleSalir        
        }}>
            {childrens}
        </LoginContext.Provider>
    )
}

export default LoginState;
