namespace Shared;

using Models;

public interface IProjectsService
{
	Task<List<Project>> Get(string? searchParameter = null);
}
