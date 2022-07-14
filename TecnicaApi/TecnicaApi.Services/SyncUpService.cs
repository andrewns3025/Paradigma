using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicaApi.DataAccess.Repositories;
using TecnicaApi.Helpers.Logger;
using TecnicaApi.Models.Dtos;
using TecnicaApi.Models.Dtos.Login;
using TecnicaApi.Models.Entities;
using TecnicaApi.Models.Enums;
using TecnicaApi.Models.Providers.Pokeapi;
using TecnicaApi.Providers.Pokeapi;
using TecnicaApi.Services.Interfaces;

namespace TecnicaApi.Services
{
    public class SyncUpService : ISyncUpService
    {
        private readonly IDataPokeapi<ListPokemon> _dataListPokemon;
        private readonly IDataPokeapi<InfoPokemon> _dataInfoPokemon;
        private readonly IDataPokeapi<List<Locations>> _dataLocations;
        private readonly IParadigmaRepository<AndrewNorenaPokemonlist> _paradigmaRepository;
        private readonly ILog _log;
        private const string EndPoint = "pokemon";
        private const string Separate = ", ";

        public SyncUpService(IDataPokeapi<ListPokemon> dataListPokemon, IDataPokeapi<InfoPokemon> dataInfoPokemon, IParadigmaRepository<AndrewNorenaPokemonlist> paradigmaRepository, IDataPokeapi<List<Locations>> dataLocations, ILog log)
        {
            _dataListPokemon = dataListPokemon;
            _dataInfoPokemon = dataInfoPokemon;
            _paradigmaRepository = paradigmaRepository;
            _dataLocations = dataLocations;
            _log = log;
        }

        public async Task<ResponseServiceDto<bool>> SyncUpData(int limit, int offset)
        {
            ResponseServiceDto<bool> result = new ResponseServiceDto<bool>();
            List<AndrewNorenaPokemonlist> listInsert = new List<AndrewNorenaPokemonlist>(); 
            List<AndrewNorenaPokemonlist> listUpdate = new List<AndrewNorenaPokemonlist>(); 
            try
            {
                ResponseServiceDto<ListPokemon> listPokemon = await _dataListPokemon.GetQueryParameter(EndPoint, new { limit = limit, offset = offset, });
                if(listPokemon.Code == TypeMessage.Succes)
                {
                    foreach (var item in listPokemon.Result!.results)
                    {
                        ResponseServiceDto<InfoPokemon> infoPokemon = await _dataInfoPokemon.GetUrlParam(EndPoint, item.name);
                        if(listPokemon.Code == TypeMessage.Succes)
                        {
                            AndrewNorenaPokemonlist andrewNorenaPokemonlist = await _paradigmaRepository.ListFirts(x => x.PokemonId == infoPokemon.Result!.id);
                            if (andrewNorenaPokemonlist != null)
                            {
                                listUpdate.Add(await GetData(infoPokemon.Result!, andrewNorenaPokemonlist));
                            }
                            else
                            {
                                listInsert.Add(await GetData(infoPokemon.Result!));
                            }
                        }
                       
                    }

                    await _paradigmaRepository.UpdateRange(listUpdate);
                    await _paradigmaRepository.AddRange(listInsert);

                    result = await result.GetResultSucces();
                    return result;
                }
                else
                {
                    result = await result.GetResultError();
                    return result;
                }
            }
            catch (Exception e)
            {
                _log.LogError(e);
                result = await result.GetResultError();
                return result;
            }
        }

        private async Task<AndrewNorenaPokemonlist> GetData(InfoPokemon infoPokemon, AndrewNorenaPokemonlist andrewNorenaPokemonlist = null!)
        {
            string[] array = infoPokemon.location_area_encounters.Split("/");
            string endPointLocation = Path.Combine(array[array.Length - 2], array[array.Length - 1]);
            return new AndrewNorenaPokemonlist()
            {
                PokemonId = infoPokemon.id,
                Name = infoPokemon.name,
                Height = infoPokemon.height,
                Weight = infoPokemon.weight,
                UrlImage = infoPokemon.sprites.other.OfficialArtwork.front_default,
                Moves = string.Join(Separate, infoPokemon.moves.Select(x => x.move).Select(x => x.name)),
                Abilities = string.Join(Separate, infoPokemon.abilities.Select(x => x.ability).Select(x => x.name)),
                Locations = string.Join(Separate, (await _dataLocations.GetUrlParam(EndPoint, endPointLocation)).Result!.Select(x => x.location_area.name)),
                CreationDate = andrewNorenaPokemonlist != null ? andrewNorenaPokemonlist.CreationDate : DateTime.Now,
                ModificationDate = andrewNorenaPokemonlist != null ? DateTime.Now : null,
            };
        }
    }
}
