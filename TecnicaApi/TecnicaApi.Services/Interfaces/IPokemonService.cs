using TecnicaApi.Models.Dtos;
using TecnicaApi.Models.Dtos.Pokemon;
using TecnicaApi.Models.Entities;
using TecnicaApi.Models.Helpers;
using TecnicaApi.Models.PayLoads.Pokemons;

namespace TecnicaApi.Services.Interfaces
{
    public interface IPokemonService
    {
        Task<ResponseServiceDto<bool>> DeletePokemon(int PokemonId);
        Task<ResponseServiceDto<bool>> EditPokemon(int PokemonId, PokemonLoad pokemonLoad);
        Task<ResponseServiceDto<PokemonDto>> GetPokemon(string name);
        Task<ResponseServiceDto<Pagination<List<PokemonDto>>>> GetPokemons(int page, int pageSize);
    }
}