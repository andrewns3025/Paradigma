using TecnicaApi.Models.Dtos;
using TecnicaApi.Models.Dtos.Login;
using TecnicaApi.Models.PayLoads.Login;

namespace TecnicaApi.Services.Interfaces
{
    public interface ILoginService
    {
        Task<ResponseServiceDto<UserDto>> Authorization(LoginLoad loginLoad);
    }
}