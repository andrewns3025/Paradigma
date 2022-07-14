import { PokemonDto } from "../../models/Dtos/Pokemons/PokemonDto"
import { ResponseServiceDto } from "../../models/Dtos/ResponseServiceDto"
import { Pagination } from "../../models/Generics/Tables/Pagination"

export default interface PokemonInterfaceState{
    listPokemons: Pagination<PokemonDto>,
    pokemon: PokemonDto,
    getAllPokemons: (page: number, pageSize: number) => Promise<ResponseServiceDto<Pagination<PokemonDto>>>,
    getLocations: () => Promise<any>,
    getMoves: () => Promise<any>,
    getAbilities: () => Promise<any>,
    editPokemon: (pokemonId: number, pokemon: PokemonDto) => Promise<ResponseServiceDto<boolean>>,
    getPokemon: (name: string) => Promise<ResponseServiceDto<PokemonDto>>,
    deletePokemon: (pokemonId: number) => Promise<ResponseServiceDto<boolean>>,
    setPokemons: (pokemons: Pagination<PokemonDto>) => void,
    setPokemon: (pokemon: PokemonDto) => void,
}


export const initialState = {
    listPokemons:null,
    pokemon:null
}