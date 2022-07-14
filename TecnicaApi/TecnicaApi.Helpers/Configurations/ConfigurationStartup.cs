using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TecnicaApi.Models.Dtos;
using TecnicaApi.Models.Enums;
using TecnicaApi.Models.Helpers;

namespace TecnicaApi.Helpers.Configurations
{
    public static class ConfigurationStartup
    {
        public static void AddCorsCoustoms(this IServiceCollection services, IConfiguration configuration)
        {
            var HostsSection = configuration.GetSection("AppSettings:AvailableOrigins");
            var HostsArray = HostsSection.Value!.Split(';');
            services.AddCors(opt =>
            {

                opt.AddPolicy("AllowOrigin", o =>
                {
                    o.WithOrigins(HostsArray)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
                });
            });
        }

        public static void AddToken(this IServiceCollection services, IConfiguration Configuration)
        {
            var sectionSetting = Configuration.GetSection("JWTTokenSettings");
            services.Configure<JwtTokenSettings>(sectionSetting);

            JwtTokenSettings jWTTokenSettings = sectionSetting.Get<JwtTokenSettings>()!;
            byte[] key = Encoding.ASCII.GetBytes(jWTTokenSettings.ApiSecret);

            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {

                options.Events = new JwtBearerEvents
                {
                    OnChallenge = context =>
                    {
                        context.Response.OnStarting(async () =>
                        {
                            context.Response.ContentType = "application/json";
                            await context.Response.WriteAsync(JsonSerializer.Serialize(new ResponseServiceDto<bool>()
                            {
                                Code = TypeMessage.Error,
                                Message = "El token no es válido",
                                Result = false
                            }));
                        });

                        return Task.CompletedTask;
                    }
                };

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jWTTokenSettings.Issuer,
                    ValidAudience = jWTTokenSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };
            });

        }

        public static void AddSwaggerCustom(this IServiceCollection services, string xmlPath)
        {
            services.AddSwaggerGen(c =>
            {
                c.ExampleFilters();
                c.SwaggerDoc("v1", new OpenApiInfo

                {
                    Title = "TecnicaApi",
                    Version = "v1",
                    Description = "Servicios correspondientes TecnicaApi",
                    Contact = new OpenApiContact
                    {
                        Name = "TecnicaApi",
                        Email = "andrewns.30@gmail.com",
                    }
                });

                c.OperationFilter<AddResponseHeadersFilter>();
                c.OperationFilter<AppendAuthorizeToSummaryOperationFilter>();
                c.OperationFilter<SecurityRequirementsOperationFilter>();


                c.IncludeXmlComments(xmlPath, true);

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            new string[] {}

                    }
                });

                c.EnableAnnotations();
            });
        }
    }
}
