using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicaApi.Models.Enums;

namespace TecnicaApi.Models.Message
{
    public class Messages
    {
        public int Code { get; set; }
        public TypeMessage Type { get; set; }
        public string Message { get; set; } = null!;
    }
}
