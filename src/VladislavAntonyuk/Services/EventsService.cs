namespace VladislavAntonyuk.Services;

using System.Net.Http.Json;
using System.Text.Json;
using Shared;
using Shared.Models;

internal class EventsService(HttpClient httpClient) : IEventsService
{
	private static readonly JsonSerializerOptions Options = new(JsonSerializerDefaults.Web);

	public async Task<Event?> Get(string name)
	{
		var events = await httpClient.GetFromJsonAsync<IEnumerable<Event>>("data/events.json", Options);
		if (events is null)
		{
			return null;
		}

		return events.FirstOrDefault(x => x.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
	}

	public async Task<List<Event>> Filter(string? searchParameter)
	{
		var events = await httpClient.GetFromJsonAsync<IEnumerable<Event>>("data/events.json", Options);
		if (events is null)
		{
			return [];
		}

		if (!string.IsNullOrEmpty(searchParameter))
		{
			events = events.Where(x => x.Name.Contains(searchParameter, StringComparison.OrdinalIgnoreCase));
		}

		return events.OrderByDescending(x => x.Date).ToList();
	}
}