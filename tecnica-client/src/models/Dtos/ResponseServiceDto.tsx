import { ResponseServerType } from "../Enums/ResponseType";

export interface ResponseServiceDto<T>{
    code:ResponseServerType;
    message:string;    
    errors:string[]
    result:T;
}