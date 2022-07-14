import { useReducer } from "react";
import { Id, toast } from "react-toastify";
import { LoginDto } from "../../models/Dtos/Login/LoginDto";
import { ResponseServerType } from "../../models/Enums/ResponseType";
import { DeleteEnpoint, GetEnpoint, PostEnpoint, PutEnpoint } from "../../api/api-base";
import { LoginLoad } from "../../models/PayLoads/Login/LoginLoad";
import { GetAuthentication, GetToken, RemoveSession } from "../../helpers/functions";
import { initialState } from "./PokemonInterfaceState";
import PokemonContext from "./PokemonContext";
import PokemonReducer from "./PokemonReducer";
import { Pagination } from "../../models/Generics/Tables/Pagination";
import { PokemonDto } from "../../models/Dtos/Pokemons/PokemonDto";
import { GetEnpointPokemon } from "../../api/api-pokemon";

const PokemonState = (props: any) => {       
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(PokemonReducer, initialState)
    // Funciones
    //#region  Funciones
    const getAllPokemons = async (page:number, pageSize:number) =>{    
        const data = await GetEnpoint<Pagination<PokemonDto>>(`/Pokemons/${page}/${pageSize}`); 
        if(data.code === ResponseServerType.Succes){
            setPokemons(data.result);
        }
        return data;                  
    }  

    const getLocations = async () =>{    
        const data = await GetEnpointPokemon(`/location-area?offset=0&limit=1000`); 
        return data;                  
    }  

    const getMoves = async () =>{    
        const data = await GetEnpointPokemon(`/move?offset=0&limit=1000`); 
        return data;                  
    }  

    const getAbilities = async () =>{    
        const data = await GetEnpointPokemon(`/ability?offset=0&limit=1000`); 
        return data;                  
    }  

    const editPokemon = async (pokemonId:number, pokemon:PokemonDto) =>{    
        const data = await PutEnpoint<boolean>(`/Pokemons`, pokemonId, pokemon); 
        return data;                  
    }      

    const getPokemon = async (name:string) =>{    
        const data = await GetEnpoint<PokemonDto>(`/Pokemons/GetPokemon/${name}`); 
        return data;                  
    } 

    const deletePokemon = async (pokemonId:number) =>{    
        const data = await DeleteEnpoint<boolean>(`/Pokemons`, pokemonId); 
        return data;                  
    }
    
    const setPokemons = (pokemons:Pagination<PokemonDto>) => {
        dispatch({
            type: "SETPOKEMONS",     
            payLoad: pokemons,    
        });
    }

    const setPokemon = (pokemon:PokemonDto) => {
        dispatch({
            type: "SETSELECTPOKEMON",     
            payLoad: pokemon,    
        });
    }
   
    //#endregion
    
    var childrens = props.children;
    return (
        <PokemonContext.Provider value={{
            listPokemons: state.listPokemons,
            pokemon: state.pokemon,
            getAllPokemons, 
            getLocations,
            getMoves,
            getAbilities,
            editPokemon,
            getPokemon,
            deletePokemon,
            setPokemons,
            setPokemon                 
        }}>
            {childrens}
        </PokemonContext.Provider>
    )
}

export default PokemonState;
