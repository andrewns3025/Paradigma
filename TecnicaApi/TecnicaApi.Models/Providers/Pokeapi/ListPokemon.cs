using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicaApi.Models.Providers.Pokeapi
{
    public class ListPokemon
    {        
        public int count { get; set; }
        public string next { get; set; } = null!;
        public string previous { get; set; } = null!;
        public List<ResultListPokemon> results { get; set; } = null!;
    }

    public class ResultListPokemon
    {
        public string name { get; set; } = null!;
        public string url { get; set; } = null!;
    }
}
