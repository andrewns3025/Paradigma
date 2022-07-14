﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicaApi.Models.Dtos.Pokemon
{
    public class PokemonDto
    {
        public int PokemonId { get; set; }
        public string Name { get; set; } = null!;
        public int Height { get; set; }
        public int Weight { get; set; }
        public string? UrlImage { get; set; }
        public string? Locations { get; set; }
        public string? Moves { get; set; }
        public string? Abilities { get; set; }
        public string? VideoId { get; set; }
        public int Popularity { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? ModificationDate { get; set; }
    }
}
