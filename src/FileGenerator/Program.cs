using FileGenerator;
using Microsoft.Extensions.DependencyInjection;
using Shared;

var path = args[0] + "/data/categories.json";
var services = new ServiceCollection();
services.AddShared();
services.AddScoped<IRssService, RssService>();
services.AddScoped<ISitemapService, SitemapService>();
services.AddScoped<IArticlesService>(_=> new ArticlesService(path));

var container = services.BuildServiceProvider();
var rssService = container.GetRequiredService<IRssService>();
rssService.GenerateRss();
var sitemapService = container.GetRequiredService<ISitemapService>();
sitemapService.GenerateSitemap();