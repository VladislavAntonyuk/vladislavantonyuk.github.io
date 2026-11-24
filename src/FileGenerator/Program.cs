using FileGenerator;
using Microsoft.Extensions.DependencyInjection;
using Shared;

var wwwroot = Environment.CurrentDirectory + "/" + args.FirstOrDefault() + "/wwwroot/";
var path = wwwroot + "data/";
var services = new ServiceCollection();
services.AddShared();
services.AddScoped<IRssService, RssService>();
services.AddScoped<ISitemapService, SitemapService>();
services.AddScoped(_ => new ArticlesService(path));
services.AddScoped(_ => new EventsService(path));
services.AddScoped<ICalendarService>(sp => new CalendarService(sp.GetRequiredService<EventsService>(), sp.GetRequiredService<IUrlCreator>(), wwwroot + EventCalendar.Folder));

var container = services.BuildServiceProvider();
var rssService = container.GetRequiredService<IRssService>();
await rssService.GenerateRss();
var sitemapService = container.GetRequiredService<ISitemapService>();
await sitemapService.GenerateSitemap();
var calendarService = container.GetRequiredService<ICalendarService>();
await calendarService.GenerateCalendars();
