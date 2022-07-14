import {createContext} from "react";
import PokemonInterfaceState from "./PokemonInterfaceState";

const PokemonContext = createContext<PokemonInterfaceState>(undefined!);

export default PokemonContext;