namespace Shared;

using Models;

public interface IPublicationsService
{
	Task<List<Publication>> GetArticles(string? searchParameter = null, CancellationToken cancellationToken = default);
	Task<List<Thesis>> GetTheses(string? searchParameter = null, CancellationToken cancellationToken = default);
}