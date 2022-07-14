# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build
WORKDIR /source
COPY . .

RUN dotnet restore "./TecnicaApi.WebApi/TecnicaApi.WebApi.csproj" --disable-parallel
RUN dotnet publish "./TecnicaApi.WebApi/TecnicaApi.WebApi.csproj" -c realease -o /app --no-restore

# Serve Stage
FROM mcr.microsoft.com/dotnet/sdk:6.0-focal 
WORKDIR /app
COPY --from=build /app ./

EXPOSE 5000

ENTRYPOINT ["dotnet", "TecnicaApi.WebApi.dll"]