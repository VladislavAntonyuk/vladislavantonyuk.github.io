namespace Shared;

using Models;

public interface IPublicationsService
{
	Task<List<Publication>> Get(string? searchParameter = null);
}