import { Id } from "react-toastify";
import { LoginDto } from "../../models/Dtos/Login/LoginDto";
import { ResponseServiceDto } from "../../models/Dtos/ResponseServiceDto";
import { LoginLoad } from "../../models/PayLoads/Login/LoginLoad";

export default interface LoginInterfaceState{
    authentication: boolean,
    loginLoad: LoginLoad,    
    loader: boolean,
    loginDto:LoginDto,
    handleLogin: (datos: LoginLoad, id: Id) => Promise<ResponseServiceDto<LoginDto> | undefined>,   
    validLogin: () => boolean,
    handleSalir: () => Promise<boolean>
}


export const initialState = {
    authentication: false,
    loginLoad: null,   
    loader: false,
    loginDto: null
}