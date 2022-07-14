using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TecnicaApi.Models.Dtos.Login;
using TecnicaApi.Models.Dtos;
using TecnicaApi.Models.PayLoads.Login;
using TecnicaApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace TecnicaApi.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SyncUpController : ControllerBase
    {
        private readonly ISyncUpService _syncUpService;

        public SyncUpController(ISyncUpService syncUpService)
        {
            _syncUpService = syncUpService;
        }

        /// <summary>
        /// Sincroniza la data de la base de datos con https://pokeapi.co
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Consumes("application/json")]
        [Produces("application/json")]
        [Route("{limit}/{offset}")]
        public async Task<IActionResult> SyncUpData(int limit, int offset)
        {
            ResponseServiceDto<bool> responseGenericDto = await _syncUpService.SyncUpData(limit, offset);
            return Ok(responseGenericDto);
        }
    }
}
