using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TecnicaApi.Models.Dtos;
using TecnicaApi.Models.Dtos.Login;
using TecnicaApi.Models.PayLoads.Login;
using TecnicaApi.Services.Interfaces;

namespace TecnicaApi.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        /// <summary>
        /// Metodo para el inicio de sesión con el token generado por microsoft
        /// </summary>
        /// <param name="loginLoad"></param>
        /// <returns></returns>
        [HttpPost]
        [Consumes("application/json")]
        [Produces("application/json")]
        [Route("Authorization")]
        public async Task<IActionResult> Authorization(LoginLoad loginLoad)
        {
            ResponseServiceDto<UserDto> responseGenericDto = await _loginService.Authorization(loginLoad);
            return Ok(responseGenericDto);
        }
    }
}
