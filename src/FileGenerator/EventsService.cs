namespace FileGenerator;

using System.Text.Json;
using Shared.Models;

internal class EventsService(string path)
{
	private static readonly JsonSerializerOptions Options = new(JsonSerializerDefaults.Web);

	public async Task<List<Event>> GetEvents()
	{
		var content = await File.ReadAllTextAsync(path + "events.json");
		var events = JsonSerializer.Deserialize<IEnumerable<Event>>(content, Options);
		if (events is null)
		{
			return [];
		}

		return events
		       .DistinctBy(x => x.Name)
		       .OrderByDescending(x => x.Date)
		       .ThenBy(x => x.Id)
		       .ToList();
	}
}