using TecnicaApi.Models.Dtos;

namespace TecnicaApi.Providers.Pokeapi
{
    public interface IDataPokeapi<T>
    {
        Task<ResponseServiceDto<T>> GetQueryParameter(string EndPoint, object data);
        Task<ResponseServiceDto<T>> GetUrlParam(string EndPoint, string valor);
    }
}