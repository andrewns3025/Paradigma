using NLog.Web;
using Swashbuckle.AspNetCore.Filters;
using System.Reflection;
using TecnicaApi.Helpers.AutoMapping;
using TecnicaApi.Helpers.Configurations;
using TecnicaApi.Helpers.Logger;
using TecnicaApi.Helpers.Middlewares;
using TecnicaApi.Providers.Microsoft;
using TecnicaApi.Services.Interfaces;
using TecnicaApi.Services;
using TecnicaApi.Providers.Pokeapi;
using TecnicaApi.DataAccess.Contexts;
using TecnicaApi.DataAccess.Repositories;

var builder = WebApplication.CreateBuilder(args);
IConfiguration Configuration = builder.Configuration;
NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
// Add services to the container.
builder.Services.AddDbContext<ParadigmaContext>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
builder.Services.AddSwaggerCustom(xmlPath);
builder.Services.AddSwaggerExamplesFromAssemblies(Assembly.GetEntryAssembly());
builder.Services.AddCorsCoustoms(Configuration);
builder.Services.AddToken(Configuration);

#region Transient

builder.Services.AddTransient<ILog, Log>();
builder.Services.AddTransient(typeof(IParadigmaRepository<>), typeof(ParadigmaRepository<>));
builder.Services.AddTransient(typeof(IDataMicrosoft<>), typeof(DataMicrosoft<>));
builder.Services.AddTransient(typeof(IDataPokeapi<>), typeof(DataPokeapi<>));

builder.Services.AddTransient<ILoginService, LoginService>();
builder.Services.AddTransient<ISyncUpService, SyncUpService>();
builder.Services.AddTransient<IPokemonService, PokemonService>();
#endregion
builder.Services.AddAutoMapper(c => c.AddProfile<AutoMappingHelper>(), typeof(Program).Assembly);
builder.Services.AddHttpContextAccessor();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseSwagger(c => c.SerializeAsV2 = false);
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.Json", "TecnicaApi v1"));

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseCors("AllowOrigin");
app.UseAuthorization();

app.MapControllers();
//app.UseCustomMiddleware();
app.Run();

