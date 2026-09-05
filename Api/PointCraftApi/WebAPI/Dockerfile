FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY Domain/Domain.csproj Domain/
COPY Application/Application.csproj Application/
COPY Infrastructure/Infrastructure.csproj Infrastructure/
COPY WebAPI/WebAPI.csproj WebAPI/
RUN dotnet restore WebAPI/WebAPI.csproj

COPY Domain/ Domain/
COPY Application/ Application/
COPY Infrastructure/ Infrastructure/
COPY WebAPI/ WebAPI/
RUN dotnet publish WebAPI/WebAPI.csproj -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

RUN useradd --user-group --create-home appuser
COPY --from=build /app .
RUN mkdir -p /data && chown appuser:appuser /data
USER appuser

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
VOLUME /data

ENTRYPOINT ["dotnet", "WebAPI.dll"]
