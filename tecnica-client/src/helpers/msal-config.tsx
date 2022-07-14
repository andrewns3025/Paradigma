import { LogLevel } from "@azure/msal-browser";
import { Configs } from "./functions";

const { ConfigMicrosoft } = Configs;

export const MsalConfig = {
    auth: {
        clientId: ConfigMicrosoft.clientId,
        authority: ConfigMicrosoft.authority,
        redirectUri: ConfigMicrosoft.redirectUri,
        postLogoutRedirectUri: ConfigMicrosoft.postLogoutRedirectUri
    },
    cache: {
        cacheLocation: ConfigMicrosoft.cacheLocation,
        storeAuthStateInCookie: false,       
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level:LogLevel, message:any, containsPii:any) => {	
                if (containsPii) {		
                    return;		
                }	
                if(ConfigMicrosoft.logDebug){
                    switch (level) {		
                        case LogLevel.Error:		
                            console.error(message);		
                            return;		
                        case LogLevel.Info:		
                            console.info(message);		
                            return;		
                        case LogLevel.Verbose:		
                            console.debug(message);		
                            return;		
                        case LogLevel.Warning:		
                            console.warn(message);		
                            return;		
                    }	
                }
            }	
        }	
    },
    telemetry: {
        application: {
            appName: Configs.NameApp,
            appVersion: "1.0.0"
        }
    }
};

export const LoginRequest = {
    scopes: ["User.Read"]
};