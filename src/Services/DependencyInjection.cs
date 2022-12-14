using Microsoft.Extensions.DependencyInjection;

namespace Shared;

public static class DependencyInjection
{
    public static void AddShared(this IServiceCollection services)
    {
        services.AddSingleton<IUrlCreator, UrlCreator>();
    }
}