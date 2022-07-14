using TecnicaApi.Models.Dtos;

namespace TecnicaApi.Providers.Microsoft
{
    public interface IDataMicrosoft<T>
    {
        Task<ResponseServiceDto<T>> Get(string token);
    }
}