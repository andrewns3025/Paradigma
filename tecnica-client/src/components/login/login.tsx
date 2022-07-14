import { useContext, useEffect, useRef } from "react";
import LoginContext from "../../context/login/LoginContext";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import useInit from "../../hooks/useInit";
import { LoginRequest } from "../../helpers/msal-config";
import { LoginLoad } from "../../models/PayLoads/Login/LoginLoad";
import { toast } from "react-toastify";
import PanelPrimary from "../generics/panels/panel-primary";
import ButtonPrimary from "../generics/buttons/button-primary";

const Login = () =>{
    const { instance, inProgress, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const firtMetho = useRef(true);    
    const {handleLogin} = useContext(LoginContext);

    const handleClick = async () =>{
        if (inProgress === InteractionStatus.None && !isAuthenticated) {
            instance.loginRedirect(LoginRequest).catch(e =>{
                console.log(e);
            });
        }        
    }

    useInit(async()=>{
        document.title = "Acceso";        
    });

    useEffect(()=>{
        if(isAuthenticated && inProgress === InteractionStatus.None){
            if(firtMetho.current){
                const id = toast.loading("Cargando...");         
                firtMetho.current = false;
                instance.acquireTokenSilent({
                    ...LoginRequest,
                    account: accounts[0]
                }).then((response) => {
                    var obj = {} as LoginLoad;
                    obj.tokenMicrosft = response.accessToken;

                    handleLogin(obj, id).then(e =>{
                        if(e === undefined){
                            instance.logoutRedirect({
                                onRedirectNavigate: (url) => {
                                    return false;
                                }
                            });
                        }
                            
                    });                
                }).catch((error)=>{
                    toast.update(id, { render: "Ocurrio un error de red, " + error, type: "error", isLoading: false, autoClose:5000 });            
                });
            }
           
        }
    },[isAuthenticated])


    return(

        <div style={{height:"100%"}}  className="container px-sm-0 d-flex flex-column justify-content-center">
            <div className="row justify-content-center">
                <PanelPrimary size="w-auto">              
                    <>
                        <h2 className="text-center color-primary strong my-sm-3">Hola, bienvenido de nuevo</h2>
                        <ButtonPrimary onClick={handleClick}>
                            <img alt=""  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxkZWZzPgogICAgICAgIDxmaWx0ZXIgaWQ9InByZWZpeF9fYSIgd2lkdGg9IjEwNS44JSIgaGVpZ2h0PSIxMDQuNSUiIHg9Ii0yLjklIiB5PSItMi4zJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR5PSIyIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiIHN0ZERldmlhdGlvbj0iMiIvPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCBpbj0ic2hhZG93Qmx1ck91dGVyMSIgcmVzdWx0PSJzaGFkb3dNYXRyaXhPdXRlcjEiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xNSAwIi8+CiAgICAgICAgICAgIDxmZU1lcmdlPgogICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSJzaGFkb3dNYXRyaXhPdXRlcjEiLz4KICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPgogICAgICAgICAgICA8L2ZlTWVyZ2U+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbHRlcj0idXJsKCNwcmVmaXhfX2EpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjggLTQyMCkiPgogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMyIDQyMikiPgogICAgICAgICAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iI0YyNTAyMiIgZD0iTTAgMEg5VjlIMHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUgNSkiLz4KICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiMwMEE0RUYiIGQ9Ik0wIDEwSDlWMTlIMHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUgNSkiLz4KICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiM3RkJBMDAiIGQ9Ik0xMCAwSDE5VjlIMTB6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1IDUpIi8+CiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjRkZCOTAwIiBkPSJNMTAgMTBIMTlWMTlIMTB6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1IDUpIi8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo="/>
                            Inicia sesión con Microsoft
                        </ButtonPrimary>                                    

                    </>
                </PanelPrimary>                        
            </div>                   
        </div>
              
        
    );
}

export default Login;
