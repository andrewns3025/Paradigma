using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicaApi.Models.Helpers
{
    public class JwtTokenSettings
    {
        public string ApiSecret { get; set; } = null!;
        public string Issuer { get; set; } = null!;
        public string Audience { get; set; } = null!;
        public int TokenExpireMins { get; set; }
    }
}
