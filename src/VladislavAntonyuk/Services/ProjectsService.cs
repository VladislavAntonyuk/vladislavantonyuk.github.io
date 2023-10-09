namespace VladislavAntonyuk.Services;

using System.Net.Http.Json;
using Shared;
using Shared.Models;

internal class ProjectsService(HttpClient httpClient) : IProjectsService
{
	public async Task<List<Project>> GetProjects(string? searchParameter = null)
	{
		var projects = await httpClient.GetFromJsonAsync<IEnumerable<Project>>("data/projects.json");
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
