using TecnicaApi.Models.Dtos;

namespace TecnicaApi.Services.Interfaces
{
    public interface ISyncUpService
    {
        Task<ResponseServiceDto<bool>> SyncUpData(int limit, int offset);
    }
}