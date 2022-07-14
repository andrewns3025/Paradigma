using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicaApi.Helpers.Extensions
{
    public static class RestRequestExtensions
    {
        public static void AddQueryParameterDynamic(this RestRequest restRequest, object data)
        {
            var listData = data.GetType().GetProperties();
           
            foreach (var property in listData)
            {
                string value = property.GetValue(data)!.ToString()!;
                restRequest.AddQueryParameter(property.Name, value);
            }

        }
    }
}
