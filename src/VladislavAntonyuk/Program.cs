using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using MudBlazor.Services;
using Shared;
using StardustDL.RazorComponents.Markdown;
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
	services.AddScoped<IArticlesService, ArticlesService>();
	services.AddScoped<IProjectsService, ProjectsService>();
	services.AddMudServices();
	services.AddMarkdownComponent();

	services.AddScoped(sp => new HttpClient
	{
		BaseAddress = new Uri(baseAddress)
	});
}