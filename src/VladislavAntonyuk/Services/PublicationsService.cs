namespace VladislavAntonyuk.Services;

using System.Net.Http.Json;
using Shared;
using Shared.Models;

internal class PublicationsService(HttpClient httpClient) : IPublicationsService
{
	public async Task<List<Publication>> Get(string? searchParameter = null)
	{
		var publications = await httpClient.GetFromJsonAsync<IEnumerable<Publication>>("data/publications.json");
		if (publications is null)
		{
			return [];
		}

		if (!string.IsNullOrEmpty(searchParameter))
		{
			publications = publications.Where(x => x.Name.Contains(searchParameter, StringComparison.OrdinalIgnoreCase));
		}

		return publications.OrderBy(x => x.Id).ToList();
	}
}
