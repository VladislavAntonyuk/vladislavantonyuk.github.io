namespace Shared;

using System.Net.Http.Json;
using Models;

internal class ProjectsService : IProjectsService
{
	private readonly HttpClient _httpClient;

	public ProjectsService(HttpClient httpClient)
	{
		_httpClient = httpClient;
	}

	public async Task<List<Project>> GetProjects(string? searchParameter = null)
	{
		var projects = await _httpClient.GetFromJsonAsync<IEnumerable<Project>>("data/projects.json");
		if (projects is null)
		{
			return new List<Project>();
		}

		if (!string.IsNullOrEmpty(searchParameter))
		{
			projects = projects.Where(x => x.Name.Contains(searchParameter, StringComparison.OrdinalIgnoreCase));
		}

		return projects.OrderBy(x => x.Id).ToList();
	}
}
