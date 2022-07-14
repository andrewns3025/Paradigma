import axios, { AxiosInstance } from "axios";
import JsonConfig from "../assets/configs/config.json";
import { Config }  from "../assets/configs/config";

const config = JsonConfig as Config;
const baseUrl = config.urlPokemon;
let API: AxiosInstance = undefined!;

API = axios.create({
  timeout: 1560000,
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json"    
  },
});


export const GetEnpointPokemon = async (method:string) =>{
    const result = await API.get(`${method}`); 
    return result.data;     
}
  
export const PostEnpointPokemon = async (method:string, data:any) =>{  
    const result = await API.post(`${method}`, data); 
    return result.data;
}
