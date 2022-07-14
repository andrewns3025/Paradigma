import { GetData, SetSession } from "../../helpers/functions";
import { LoginDto } from "../../models/Dtos/Login/LoginDto";

type ActionType = | {type: 'LOGINSUBMIT', payLoad:LoginDto}
    | {type: 'VALIDLOGIN'}
    | {type: 'CLOSELOGIN'}
    | {type: 'SETDATA', payLoad:LoginDto}
    | {type: 'SETLOADER', payLoad:boolean}
;

const LoginReducer = (state:any, action:ActionType) => {
    switch (action.type) {   
        case "LOGINSUBMIT":
            if(action.payLoad){
                const data = action.payLoad as LoginDto;
                SetSession(data);
                return {
                    ...state, 
                    loginDto: data,
                    authentication: true              
                };  
            }
            break;
            
        case "VALIDLOGIN":
            const datos = GetData();
            return {
                ...state, 
                loginDto: datos,
                authentication: true                   
            }; 

        case "CLOSELOGIN":
            return {
                ...state, 
                authentication: false,
                loginDto: null                    
            };

        default:
            return state;
    }
}
export default LoginReducer;