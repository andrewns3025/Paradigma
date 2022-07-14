import { Config } from "../assets/configs/config";
import JsonConfig from "../assets/configs/config.json";
import { LoginDto } from "../models/Dtos/Login/LoginDto";
import { Descript, Encript } from "./crypto-helper";

export const Configs = JsonConfig as Config;

export const GetToken =  () =>{
    const tokenJson = Descript(localStorage.getItem(Encript("token")));
	const token = tokenJson ? JSON.parse(tokenJson!)  : tokenJson;

    return token;
} 

export const GetAuthentication=  () =>{
    const authenticationJson = Descript(localStorage.getItem(Encript("authentication")));
	const authentication = authenticationJson ? JSON.parse(authenticationJson!)  : authenticationJson;

    return authentication;
} 

export const GetData = () =>{
    const dataJson = Descript(localStorage.getItem(Encript("data")));
	const authentication = dataJson ? JSON.parse(dataJson!)  : dataJson;

    return authentication as LoginDto;
} 

export const SetSession = (data:LoginDto) =>{
    localStorage.setItem(Encript("token"), Encript(data.token) );
    localStorage.setItem(Encript("authentication"), Encript("true"));    

    localStorage.setItem(Encript("data"), Encript(data));
}

export const RemoveSession = () =>{
    localStorage.removeItem(Encript("token"));
    localStorage.removeItem(Encript("authentication"));    

    localStorage.removeItem(Encript("data"));
}


export const getYouTubeVideoIdFromUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;    
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : undefined;
};


export const ValidateUrlYoutube = (url: string) => {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)){
        return true;
    }
    return false;
}

export const validateNumberKeyPress = (e:any) => {
    const regex = /^[0-9]{1,20}$/;
    if(regex.test(e.key)){
        
    }else{
        e.preventDefault();
    }
}

export const validateNumberDrag = (e:any) => {
    const regex = /^[0-9]{1,20}$/;
    var textData = e.dataTransfer.getData('text');

    if(regex.test(textData)){
        
    }else{
        e.preventDefault();
    }
}

