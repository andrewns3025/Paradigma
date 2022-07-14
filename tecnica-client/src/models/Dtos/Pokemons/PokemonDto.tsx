export interface PokemonDto {
    pokemonId: number;
    name: string;
    height: number;
    weight: number;
    urlImage: string;
    locations: string;
    moves: string;
    abilities: string;
    videoId:string;
    popularity:number
    creationDate: Date;
    modificationDate: Date;
}