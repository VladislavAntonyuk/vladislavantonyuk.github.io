using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using MudBlazor.Services;
using StardustDL.RazorComponents.Markdown;
using VladislavAntonyuk;
using VladislavAntonyuk.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.Services.AddSingleton<IUrlCreator, UrlCreator>();
builder.Services.AddScoped<IArticlesService, ArticlesService>();
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");
builder.Services.AddMudServices();
builder.Services.AddMarkdownComponent();

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

await builder.Build().RunAsync();
