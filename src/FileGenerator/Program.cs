using FileGenerator;
using Microsoft.Extensions.DependencyInjection;
using Shared;

var path = Environment.CurrentDirectory + "/" + args[0] + "/wwwroot/data/";
var services = new ServiceCollection();
services.AddShared();
services.AddScoped<IRssService, RssService>();
services.AddScoped<ISitemapService, SitemapService>();
services.AddScoped<IArticlesService>(_ => new ArticlesService(path));

var container = services.BuildServiceProvider();
var rssService = container.GetRequiredService<IRssService>();
await rssService.GenerateRss();
var sitemapService = container.GetRequiredService<ISitemapService>();
await sitemapService.GenerateSitemap();