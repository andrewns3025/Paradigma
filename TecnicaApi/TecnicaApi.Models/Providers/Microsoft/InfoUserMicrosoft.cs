using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicaApi.Models.Providers.Microsoft
{
    public class InfoUserMicrosoft
    {
        public InfoUserMicrosoft()
        {
            businessPhones = new List<string>();
        }
        public List<string> businessPhones { get; set; }
        public string displayName { get; set; } = null!;
        public string givenName { get; set; } = null!;
        public string jobTitle { get; set; } = null!;
        public string mail { get; set; } = null!;
        public string mobilePhone { get; set; } = null!;
        public string officeLocation { get; set; } = null!;
        public string preferredLanguage { get; set; } = null!;
        public string surname { get; set; } = null!;
        public string userPrincipalName { get; set; } = null!;
        public string id { get; set; } = null!;
    }
}
