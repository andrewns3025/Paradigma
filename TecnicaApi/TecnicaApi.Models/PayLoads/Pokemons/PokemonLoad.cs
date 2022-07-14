using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicaApi.Models.PayLoads.Pokemons
{
    public class PokemonLoad
    {        
        public int Height { get; set; }
        public int Weight { get; set; }
        public string? Locations { get; set; }
        public string? Moves { get; set; }
        public string? Abilities { get; set; }
        public string? VideoId { get; set; }
    }
}
