
import { enforce, test } from "vest";
import InputLabel from "../models/Generics/Inputs/InputLabel";
export const GetValidationRequerid =  (array: InputLabel[], data:any) =>{

    array.forEach((item:InputLabel)=>{
        test(item.name, 'Campo ' + item.title.toLowerCase() + ' es obligatorio', () => {
            enforce(data[item.name]).isNotEmpty();
        });
    });
} 