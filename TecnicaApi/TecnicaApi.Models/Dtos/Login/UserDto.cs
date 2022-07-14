using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicaApi.Models.Dtos.Login
{
    public class UserDto
    {
        public string UserId { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string UserType { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public string Token { get; set; } = null!;
        public DateTime TokenExpiracion { get; set; }
    }
}
