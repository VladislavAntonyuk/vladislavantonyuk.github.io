namespace Shared;

using Models;

public interface IProjectsService
{
	Task<List<Project>> GetProjects(string? searchParameter = null);
}