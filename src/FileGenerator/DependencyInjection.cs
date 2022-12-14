using Microsoft.Extensions.DependencyInjection;

namespace FileGenerator;

public  static class DependencyInjection
{
    public static void AddShared(IServiceCollection services)
    {
        services.AddScoped<ISitemapService, SitemapService>();
        services.AddScoped<IRssService, RssService>();
    }
}