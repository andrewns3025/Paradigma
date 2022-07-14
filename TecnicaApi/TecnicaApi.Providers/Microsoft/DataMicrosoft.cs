using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using TecnicaApi.Models.Dtos;

namespace TecnicaApi.Providers.Microsoft
{
    public class DataMicrosoft<T> : IDataMicrosoft<T>
    {
        public async Task<ResponseServiceDto<T>> Get(string token)
        {

            ResponseServiceDto<T?> result = new ResponseServiceDto<T?>();
            RestClient _RestClient = ConexionWebAPis(token);
            RestRequest request = new RestRequest($"/me", Method.Get);
            request.Timeout = 10000000;

            RestResponse response = await _RestClient.ExecuteAsync(request);

            if (response.StatusCode == HttpStatusCode.OK)
            {

                T obj = JsonConvert.DeserializeObject<T?>(response.Content!)!;
                result = await result.GetResultSucces(obj);
            }
            else
            {
                result = await result.GetResultError();
                result.Message = response.StatusCode.ToString();
            }
            return result!;
        }

        private RestClient ConexionWebAPis(string token)
        {
            RestClient _RestClient = new("https://graph.microsoft.com/v1.0");
            _RestClient.AddDefaultHeader("Accept", "application/json");
            _RestClient.AddDefaultHeader("authorization", "Bearer " + token);
            return _RestClient;
        }
    }
}
