using AutoMapper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TecnicaApi.Helpers.Logger;
using TecnicaApi.Models.Dtos;
using TecnicaApi.Models.Dtos.Login;
using TecnicaApi.Models.Enums;
using TecnicaApi.Models.Helpers;
using TecnicaApi.Models.PayLoads.Login;
using TecnicaApi.Models.Providers.Microsoft;
using TecnicaApi.Providers.Microsoft;
using TecnicaApi.Services.Interfaces;

namespace TecnicaApi.Services
{
    public class LoginService : ILoginService
    {
        #region Fields
        private readonly JwtTokenSettings _jWTTokenSettings;
        private readonly IDataMicrosoft<InfoUserMicrosoft> _dataMicrosoft;
        private readonly IMapper _mapper;
        private readonly ILog _log;
        #endregion

        #region Ctor
        public LoginService(IOptions<JwtTokenSettings> jWTTokenSettings,
            IMapper mapper,
            ILog log,
            IDataMicrosoft<InfoUserMicrosoft> dataMicrosoft)
        {
            _jWTTokenSettings = jWTTokenSettings.Value;
            _mapper = mapper;
            _log = log;
            _dataMicrosoft = dataMicrosoft;
        }
        #endregion

        public async Task<ResponseServiceDto<UserDto>> Authorization(LoginLoad loginLoad)
        {
            ResponseServiceDto<UserDto> responseGen = new();
            try
            {
                ResponseServiceDto<InfoUserMicrosoft> responseMicrosft = await _dataMicrosoft.Get(loginLoad.TokenMicrosft);
                if (responseMicrosft.Code == TypeMessage.Succes)
                {
                    byte[] key = Encoding.ASCII.GetBytes(_jWTTokenSettings.ApiSecret);

                    SigningCredentials _signingCredentials = new SigningCredentials(
                            new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256
                        );
                    JwtHeader _Header = new JwtHeader(_signingCredentials);

                    // CREAMOS LOS CLAIMS //
                    Claim[] _Claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Email, responseMicrosft.Result!.userPrincipalName!),
                        new Claim(JwtRegisteredClaimNames.NameId, responseMicrosft.Result!.id!)
                    };

                    // CREAMOS EL PAYLOAD //
                    JwtPayload _Payload = new JwtPayload(
                            issuer: _jWTTokenSettings.Issuer,
                            audience: _jWTTokenSettings.Audience,
                            claims: _Claims,
                            notBefore: DateTime.Now,
                            expires: DateTime.Now.AddMinutes(_jWTTokenSettings.TokenExpireMins)
                        );

                    // GENERAMOS EL TOKEN //
                    JwtSecurityToken _Token = new JwtSecurityToken(
                            _Header,
                            _Payload
                        );
                    UserDto userDto = new()
                    {
                        UserId = responseMicrosft.Result!.id,
                        UserName = responseMicrosft.Result!.userPrincipalName,
                        UserType = responseMicrosft.Result!.jobTitle,
                        Name = responseMicrosft.Result!.givenName,
                        Surname = responseMicrosft.Result!.surname,
                        Token = new JwtSecurityTokenHandler().WriteToken(_Token),
                        TokenExpiracion = _Token.ValidTo
                    };

                    responseGen = await responseGen.GetResultSucces(userDto);
                    return responseGen;
                }
                else
                {
                    responseGen = await responseGen.GetResultError();

                    return responseGen;
                }


            }
            catch (Exception e)
            {
                _log.LogError(e);
                responseGen = await responseGen.GetResultError();
                return responseGen;
            }
        }

    }
}
