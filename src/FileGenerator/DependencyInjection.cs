namespace FileGenerator;

using Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
	public static void AddShared(IServiceCollection services)
	{
		services.AddScoped<ISitemapService, SitemapService>();
		services.AddScoped<IRssService, RssService>();
	}
}