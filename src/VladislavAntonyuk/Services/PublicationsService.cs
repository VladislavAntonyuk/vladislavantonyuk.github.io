namespace VladislavAntonyuk.Services;

using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Shared;
using Shared.Models;

internal class PublicationsService(HttpClient httpClient) : IPublicationsService
{
	private static readonly JsonSerializerOptions Options = new(JsonSerializerDefaults.Web)
	{
		Converters = { new JsonStringEnumConverter<JournalCategory>() }
	};

	public async Task<List<Publication>> GetArticles(string? searchParameter = null, CancellationToken cancellationToken = default)
	{
		var publications = await httpClient.GetFromJsonAsync<IEnumerable<Publication>>("data/publications.json", Options, cancellationToken);
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

	public async Task<List<Thesis>> GetTheses(string? searchParameter = null, CancellationToken cancellationToken = default)
	{
		var publications = await httpClient.GetFromJsonAsync<IEnumerable<Thesis>>("data/theses.json", cancellationToken);
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
