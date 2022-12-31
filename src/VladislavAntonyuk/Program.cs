using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using MudBlazor.Services;
using Shared;
using StardustDL.RazorComponents.Markdown;
using Toolbelt.Blazor.Extensions.DependencyInjection;
using VladislavAntonyuk;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.Services.AddShared();
builder.Services.AddScoped<IArticlesService, ArticlesService>();
builder.Services.AddScoped<IProjectsService, ProjectsService>();
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");
builder.Services.AddMudServices();
builder.Services.AddMarkdownComponent();
builder.Services.AddPWAUpdater();

builder.Services.AddScoped(sp => new HttpClient
{
	BaseAddress = new Uri(builder.HostEnvironment.BaseAddress)
});

await builder.Build().RunAsync();