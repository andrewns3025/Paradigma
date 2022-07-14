using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicaApi.Models.Helpers
{
    public class Pagination<T>
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int RowCount { get; set; }
        public int PageCount { get; set; }
        public T? Values { get; set; }
    }
}
