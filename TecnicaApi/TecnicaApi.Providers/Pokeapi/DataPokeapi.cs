using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using TecnicaApi.Helpers.Extensions;
using TecnicaApi.Models.Dtos;

namespace TecnicaApi.Providers.Pokeapi
{
    public class DataPokeapi<T> : IDataPokeapi<T>
    {
        public async Task<ResponseServiceDto<T>> GetQueryParameter(string EndPoint, object data)
        {
            ResponseServiceDto<T?> result = new ResponseServiceDto<T?>();
            RestClient _RestClient = ConexionWebAPis();
            RestRequest request = new RestRequest(EndPoint, Method.Get);
            request.AddQueryParameterDynamic(data);
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

        public async Task<ResponseServiceDto<T>> GetUrlParam(string EndPoint, string valor)
        {
            ResponseServiceDto<T?> result = new ResponseServiceDto<T?>();
            RestClient _RestClient = ConexionWebAPis();
            RestRequest request = new RestRequest($"{EndPoint}/{valor}", Method.Get);
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


        private RestClient ConexionWebAPis()
        {
            RestClient _RestClient = new("https://pokeapi.co/api/v2");
            _RestClient.AddDefaultHeader("Accept", "application/json");
            return _RestClient;
        }
    }
}
