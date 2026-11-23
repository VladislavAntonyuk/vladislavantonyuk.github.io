namespace VladislavAntonyuk.Components;

using System.Globalization;
using System.Text;
using Shared.Models;

/// <summary>
/// Display helpers shared by the events timeline and the event details page.
/// </summary>
public static class EventPresentation
{
	private static readonly TimeSpan DefaultDuration = TimeSpan.FromHours(2);

	public static bool IsUpcoming(this Event @event) => @event.Date > DateTimeOffset.Now;

	public static bool HasRecording(this Event @event) => !@event.IsUpcoming() && !string.IsNullOrWhiteSpace(@event.RedirectUrl);

	public static string PriceLabel(this Event @event)
	{
		var price = @event.Price?.Trim();
		if (string.IsNullOrEmpty(price))
		{
			return "Free";
		}

		var amount = price.Split(' ', 2)[0];
		return decimal.TryParse(amount, NumberStyles.Number, CultureInfo.InvariantCulture, out var value) && value == 0 ? "Free" : price;
	}

	public static string? DateLabel(this Event @event) =>
		@event.Date?.ToString("dd MMMM yyyy, HH:mm 'UTC'zzz", CultureInfo.InvariantCulture);

	/// <summary>
	/// Builds an RFC 5545 calendar file as a data URI, so "Add to calendar" works without a server.
	/// Events have no end time in the data, so a two hour slot is assumed.
	/// </summary>
	public static string? CalendarDataUri(this Event @event, string pageUrl)
	{
		if (@event.Date is not { } start)
		{
			return null;
		}

		const string format = "yyyyMMdd'T'HHmmss'Z'";
		var ics = new StringBuilder()
			.Append("BEGIN:VCALENDAR\r\n")
			.Append("VERSION:2.0\r\n")
			.Append("PRODID:-//Vladislav Antonyuk//Events//EN\r\n")
			.Append("BEGIN:VEVENT\r\n")
			.Append($"UID:event-{@event.Id}@vladislavantonyuk.github.io\r\n")
			.Append($"DTSTAMP:{DateTime.UtcNow.ToString(format, CultureInfo.InvariantCulture)}\r\n")
			.Append($"DTSTART:{start.UtcDateTime.ToString(format, CultureInfo.InvariantCulture)}\r\n")
			.Append($"DTEND:{start.Add(DefaultDuration).UtcDateTime.ToString(format, CultureInfo.InvariantCulture)}\r\n")
			.Append($"SUMMARY:{Escape(@event.Name)}\r\n")
			.Append($"URL:{pageUrl}\r\n")
			.Append($"DESCRIPTION:{Escape(pageUrl)}\r\n");

		if (!string.IsNullOrWhiteSpace(@event.Location))
		{
			ics.Append($"LOCATION:{Escape(@event.Location)}\r\n");
		}

		ics.Append("END:VEVENT\r\n").Append("END:VCALENDAR\r\n");
		return "data:text/calendar;charset=utf-8," + Uri.EscapeDataString(ics.ToString());
	}

	public static string CalendarFileName(this Event @event)
	{
		var safe = string.Concat(@event.Name.Select(c => char.IsLetterOrDigit(c) ? c : '-')).Trim('-');
		return $"{safe}.ics";
	}

	private static string Escape(string value) =>
		value.Replace("\\", "\\\\").Replace(";", "\\;").Replace(",", "\\,").ReplaceLineEndings("\\n");
}
