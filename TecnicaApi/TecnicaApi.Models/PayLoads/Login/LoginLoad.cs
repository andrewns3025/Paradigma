using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicaApi.Models.PayLoads.Login
{
    public class LoginLoad
    {
        /// <summary>
        /// Token generado por microsoft
        /// </summary>
        public string TokenMicrosft { get; set; } = null!;
    }
}
