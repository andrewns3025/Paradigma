export interface Config{
    urlApi:string;
    urlPokemon:string;
    OriginCors:string;
    NameApp:string;
    ConfigMicrosoft:ConfigMicrosoft;
}

export interface ConfigMicrosoft{
    clientId:string
    authority:string
    redirectUri:string
    postLogoutRedirectUri:string
    cacheLocation:string
    logDebug:boolean
}