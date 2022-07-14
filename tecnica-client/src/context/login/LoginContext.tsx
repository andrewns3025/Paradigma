import {createContext} from "react";
import LoginInterfaceState from "./LoginInterfaceState"

const LoginContext = createContext<LoginInterfaceState>(undefined!);

export default LoginContext;