using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicaApi.Models.Providers.Pokeapi
{
    public class Locations
    {
        public LocationArea location_area { get; set; } = null!;
    }
    public class LocationArea
    {
        public string name { get; set; } = null!;
    }
}
