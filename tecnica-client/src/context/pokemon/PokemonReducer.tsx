import { GetData, SetSession } from "../../helpers/functions";
import { LoginDto } from "../../models/Dtos/Login/LoginDto";
import { PokemonDto } from "../../models/Dtos/Pokemons/PokemonDto";
import { Pagination } from "../../models/Generics/Tables/Pagination";

type ActionType = | {type: 'SETPOKEMONS', payLoad:Pagination<PokemonDto>}
    | {type: 'SETSELECTPOKEMON', payLoad:PokemonDto};

const PokemonReducer = (state:any, action:ActionType) => {
    switch (action.type) {   
        case "SETPOKEMONS":
            if(action.payLoad){
                const data = action.payLoad as Pagination<PokemonDto>;
                return {
                    ...state, 
                    listPokemons: data,             
                };  
            }
            break;    
            
        case "SETSELECTPOKEMON":
            if(action.payLoad){
                const data = action.payLoad as PokemonDto;
                return {
                    ...state, 
                    pokemon: data,             
                };  
            }
            break;     
    
        default:
            return state;
    }
}
export default PokemonReducer;