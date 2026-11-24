namespace FileGenerator;

using System.Text;
using Shared;

public interface ICalendarService
{
	Task GenerateCalendars();
}

/// <summary>
/// Writes one .ics file per dated event. They are served as text/calendar, which iOS Safari
/// opens in its native "Add to Calendar" sheet (it ignores data: URI downloads).
/// </summary>
internal class CalendarService(EventsService eventsService, IUrlCreator urlCreator, string outputFolder) : ICalendarService
{
	public async Task GenerateCalendars()
	{
		Directory.CreateDirectory(outputFolder);
		var stamp = DateTime.UtcNow;
		foreach (var @event in await eventsService.GetEvents())
		{
			var ics = EventCalendar.BuildIcs(@event, urlCreator.Encode("events", @event.Name), stamp);
			if (ics is null)
			{
				continue;
			}

			await File.WriteAllTextAsync(Path.Combine(outputFolder, EventCalendar.FileName(@event)), ics, new UTF8Encoding(false));
		}
	}
}
