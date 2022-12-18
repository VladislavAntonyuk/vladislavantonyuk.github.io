namespace Shared;

using Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
	public static void AddShared(this IServiceCollection services)
	{
		services.AddSingleton<IUrlCreator, UrlCreator>();
	}
}