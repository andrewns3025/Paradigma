using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TecnicaApi.Models.Dtos;
using TecnicaApi.Models.Dtos.Pokemon;
using TecnicaApi.Models.Entities;
using TecnicaApi.Models.Helpers;
using TecnicaApi.Models.PayLoads.Pokemons;
using TecnicaApi.Services.Interfaces;

namespace TecnicaApi.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PokemonsController : ControllerBase
    {
        private readonly IPokemonService _pokemonService;

        public PokemonsController(IPokemonService pokemonService)
        {
            _pokemonService = pokemonService;
        }

        /// <summary>
        /// Obtiene la lista de pokemons
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        [HttpGet]
        [Consumes("application/json")]
        [Produces("application/json")]
        [Route("{page}/{pageSize}")]
        public async Task<IActionResult> GetPokemons(int page, int pageSize)
        {
            ResponseServiceDto<Pagination<List<PokemonDto>>> responseGenericDto = await _pokemonService.GetPokemons(page, pageSize);
            return Ok(responseGenericDto);
        }

        /// <summary>
        /// Edita la data de un pokemon
        /// </summary>
        /// <param name="pokemonId">Id del pokemon</param>
        /// <param name="pokemonLoad"></param>
        /// <returns></returns>
        [HttpPut]
        [Consumes("application/json")]
        [Produces("application/json")]
        [Route("{pokemonId}")]
        public async Task<IActionResult> EditPokemon(int pokemonId, PokemonLoad pokemonLoad)
        {
            ResponseServiceDto<bool> responseGenericDto = await _pokemonService.EditPokemon(pokemonId, pokemonLoad);
            return Ok(responseGenericDto);
        }

        /// <summary>
        /// Obtiene la informacion de un pokemon
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpGet]
        [Consumes("application/json")]
        [Produces("application/json")]
        [Route("GetPokemon/{name}")]
        public async Task<IActionResult> GetPokemon(string name)
        {
            ResponseServiceDto<PokemonDto> responseGenericDto = await _pokemonService.GetPokemon(name);
            return Ok(responseGenericDto);
        }

        /// <summary>
        /// Elimina el pokemon
        /// </summary>
        /// <param name="pokemonId"></param>
        /// <returns></returns>
        [HttpDelete]
        [Consumes("application/json")]
        [Produces("application/json")]
        [Route("{pokemonId}")]
        public async Task<IActionResult> DeletePokemon(int pokemonId)
        {
            ResponseServiceDto<bool> responseGenericDto = await _pokemonService.DeletePokemon(pokemonId);
            return Ok(responseGenericDto);
        }
    }
}
