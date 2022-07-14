using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicaApi.Models.Dtos.Pokemon;
using TecnicaApi.Models.Entities;
using TecnicaApi.Models.Helpers;
using TecnicaApi.Models.PayLoads.Pokemons;

namespace TecnicaApi.Helpers.AutoMapping
{
    public class AutoMappingHelper : Profile
    {
        public AutoMappingHelper()
        {
            CreateMap<AndrewNorenaPokemonlist, PokemonDto>();
            CreateMap<Pagination<List<AndrewNorenaPokemonlist>>, Pagination<List<PokemonDto>>>();
        }
    }
}
