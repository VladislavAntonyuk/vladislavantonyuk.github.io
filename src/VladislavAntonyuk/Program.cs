using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using MudBlazor;
using MudBlazor.Services;
using Shared;
using VladislavAntonyuk;
using VladislavAntonyuk.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");
ConfigureServices(builder.Services, builder.HostEnvironment.BaseAddress);

await builder.Build().RunAsync();

static void ConfigureServices(IServiceCollection services, string baseAddress)
{
	services.AddShared();
	services.AddMemoryCache();
	services.AddScoped<IArticlesService, ArticlesService>();
	services.AddScoped<IProjectsService, ProjectsService>();
	services.AddScoped<IPublicationsService, PublicationsService>();
	services.AddScoped<IEventsService, EventsService>();
	services.AddMudServices();
	services.AddMudMarkdownServices();

	services.AddScoped(sp => new HttpClient
	{
		BaseAddress = new Uri(baseAddress)
	});
}