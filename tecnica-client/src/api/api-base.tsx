import axios, { AxiosInstance } from "axios";
import JsonConfig from "../assets/configs/config.json";
import { Config }  from "../assets/configs/config";
import { GetToken, RemoveSession } from "../helpers/functions";
import { ResponseServiceDto } from "../models/Dtos/ResponseServiceDto";

const config = JsonConfig as Config;
const baseUrl = config.urlApi;
let API: AxiosInstance = undefined!;

API = axios.create({
  timeout: 1560000,
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",    
    "Access-Control-Allow-Origin": config.OriginCors
  },
});


API.interceptors.request.use(
  
  (config) => {
    const token = GetToken();
    
    if (token !== null && token!== undefined) {

      config.headers!.authorization = `Bearer ${token!}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const GetEnpoint = async <T extends {}> (method:string) =>{
    const result = await API.get<ResponseServiceDto<T>>(`${method}`); 
    return result.data;     
}
  
export const PostEnpoint = async <T extends {}> (method:string, data:any) =>{  
    const result = await API.post<ResponseServiceDto<T>>(`${method}`, data); 
    return result.data;
}

export const PutEnpoint = async <T extends {}> (method:string, id:number, data:any) =>{
  const result = await API.put<ResponseServiceDto<T>>(`${method}/${id}`, data); 
  return result.data;     
}

export const DeleteEnpoint = async <T extends {}> (method:string, id:number) =>{
  const result = await API.delete<ResponseServiceDto<T>>(`${method}/${id}`); 
  return result.data;     
}


API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response != null && 401 === error.response.status) {
        RemoveSession();
        window.location.href = "/";
    } else {
      return Promise.reject(error);
    }
  }
);
