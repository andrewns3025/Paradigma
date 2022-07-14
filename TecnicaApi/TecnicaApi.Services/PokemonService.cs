using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicaApi.DataAccess.Repositories;
using TecnicaApi.Helpers.Logger;
using TecnicaApi.Models.Dtos;
using TecnicaApi.Models.Dtos.Pokemon;
using TecnicaApi.Models.Entities;
using TecnicaApi.Models.Enums;
using TecnicaApi.Models.Helpers;
using TecnicaApi.Models.PayLoads.Pokemons;
using TecnicaApi.Services.Interfaces;

namespace TecnicaApi.Services
{
    public class PokemonService : IPokemonService
    {
        private readonly IParadigmaRepository<AndrewNorenaPokemonlist> _paradigmaRepository;
        private readonly ILog _log;
        private readonly IMapper _mapper;


        public PokemonService(IParadigmaRepository<AndrewNorenaPokemonlist> paradigmaRepository, ILog log, IMapper mapper)
        {
            _paradigmaRepository = paradigmaRepository;
            _log = log;
            _mapper = mapper;
        }

        public async Task<ResponseServiceDto<Pagination<List<PokemonDto>>>> GetPokemons(int page, int pageSize)
        {
            ResponseServiceDto<Pagination<List<PokemonDto>>> response = new ResponseServiceDto<Pagination<List<PokemonDto>>>();
            try
            {
                Pagination<List<AndrewNorenaPokemonlist>> andrewNorenaPokemonlists = await _paradigmaRepository.ListPagination(page, pageSize);                


                return await response.GetResultSucces(_mapper.Map<Pagination<List<PokemonDto>>>(andrewNorenaPokemonlists));
            }
            catch (Exception e)
            {
                _log.LogError(e);
                return await response.GetResultError();
            }
        }

        public async Task<ResponseServiceDto<bool>> EditPokemon(int PokemonId, PokemonLoad pokemonLoad)
        {
            ResponseServiceDto<bool> response = new ResponseServiceDto<bool>();
            try
            {
                AndrewNorenaPokemonlist andrewNorenaPokemonlists = await _paradigmaRepository.ListFirts(x => x.PokemonId == PokemonId);
                if (andrewNorenaPokemonlists != null)
                {
                    andrewNorenaPokemonlists.Height = pokemonLoad.Height;
                    andrewNorenaPokemonlists.Weight = pokemonLoad.Weight;
                    andrewNorenaPokemonlists.Locations = pokemonLoad.Locations;
                    andrewNorenaPokemonlists.Moves = pokemonLoad.Moves;
                    andrewNorenaPokemonlists.Abilities = pokemonLoad.Abilities;
                    andrewNorenaPokemonlists.ModificationDate = DateTime.Now;
                    andrewNorenaPokemonlists.VideoId = pokemonLoad.VideoId;

                    return await response.GetResultSucces(await _paradigmaRepository.Update(andrewNorenaPokemonlists));
                }
                else
                {
                    return await response.GetResultError();
                }
            }
            catch (Exception e)
            {
                _log.LogError(e);
                return await response.GetResultError();
            }
        }

        public async Task<ResponseServiceDto<PokemonDto>> GetPokemon(string name)
        {
            ResponseServiceDto<PokemonDto> response = new ResponseServiceDto<PokemonDto>();
            try
            {
                AndrewNorenaPokemonlist andrewNorenaPokemonlists = await _paradigmaRepository.ListFirts(x => x.Name == name);

                return await response.GetResultSucces(_mapper.Map<PokemonDto>(andrewNorenaPokemonlists));
            }
            catch (Exception e)
            {
                _log.LogError(e);
                return await response.GetResultError();
            }
        }

        public async Task<ResponseServiceDto<bool>> DeletePokemon(int PokemonId)
        {
            ResponseServiceDto<bool> response = new ResponseServiceDto<bool>();
            try
            {
                AndrewNorenaPokemonlist andrewNorenaPokemonlists = await _paradigmaRepository.ListFirts(x => x.PokemonId == PokemonId);
                if (andrewNorenaPokemonlists != null)
                {
                    
                    return await response.GetResultSucces(await _paradigmaRepository.Delete(andrewNorenaPokemonlists));
                }
                else
                {
                    return await response.GetResult(ResponseMessages.MESSAGE3);
                }
            }
            catch (Exception e)
            {
                _log.LogError(e);
                return await response.GetResultError();
            }
        }
    }
}
