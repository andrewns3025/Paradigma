using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicaApi.Models.Providers.Pokeapi
{
    public class InfoPokemon
    {
        public List<Abilities> abilities { get; set; } = null!;
        public int height { get; set; }
        public int id { get; set; }
        public string location_area_encounters { get; set; } = null!;
        public string name { get; set; } = null!;
        public int order { get; set; }
        public int weight { get; set; }
        public Sprites sprites { get; set; } = null!;
        public List<Moves> moves { get; set; } = null!;
    }

    public class Abilities
    {
        public Ability ability { get; set; } = null!;
    }

    public class Ability
    {
        public string name { get; set; } = null!;
        public string url { get; set; } = null!;
    }

    public class Sprites
    {
        public Other other { get; set; } = null!;
    }

    public class Other
    {

        [JsonProperty("official-artwork")]
        public OfficialArtwork OfficialArtwork { get; set; } = null!;
    }

    public class OfficialArtwork
    {
        public string front_default { get; set; } = null!;
    }

    public class Moves
    {
        public Move move { get; set; } = null!;
    }

    public class Move
    {
        public string name { get; set; } = null!;
        public string url { get; set; } = null!;
    }
}
