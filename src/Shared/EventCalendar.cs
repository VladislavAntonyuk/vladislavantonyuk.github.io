namespace Shared;

using System.Globalization;
using System.Text;
using Models;

/// <summary>
/// Calendar exports for events, shared by the site (links) and the FileGenerator (static .ics files).
/// Events have no end time in the data, so a two hour slot is assumed.
/// </summary>
public static class EventCalendar
{
	/// <summary>Site-relative folder the FileGenerator writes the .ics files to.</summary>
	public const string Folder = "calendar";

	private const int MaxLineOctets = 75;
	private const string UtcFormat = "yyyyMMdd'T'HHmmss'Z'";
	private static readonly TimeSpan DefaultDuration = TimeSpan.FromHours(2);

	public static string FileName(Event @event)
	{
		var slug = new StringBuilder();
		foreach (var c in @event.Name)
		{
			if (char.IsAsciiLetterOrDigit(c))
			{
				slug.Append(c);
			}
			else if (slug.Length > 0 && slug[^1] != '-')
			{
				slug.Append('-');
			}
		}

		return $"{slug.ToString().Trim('-')}.ics";
	}

	/// <summary>Site-relative path of the generated .ics file, for example "calendar/NET-Conf-2026-Ukraine.ics".</summary>
	public static string FilePath(Event @event) => $"{Folder}/{FileName(@event)}";

	/// <summary>Builds an RFC 5545 calendar with a single event.</summary>
	public static string? BuildIcs(Event @event, string pageUrl, DateTime stamp)
	{
		if (@event.Date is not { } start)
		{
			return null;
		}

		var ics = new StringBuilder();
		AppendLine(ics, "BEGIN:VCALENDAR");
		AppendLine(ics, "VERSION:2.0");
		AppendLine(ics, $"PRODID:-//{Constants.ProductName}//Events//EN");
		AppendLine(ics, "CALSCALE:GREGORIAN");
		AppendLine(ics, "METHOD:PUBLISH");
		AppendLine(ics, "BEGIN:VEVENT");
		AppendLine(ics, $"UID:event-{@event.Id}@vladislavantonyuk.github.io");
		AppendLine(ics, $"DTSTAMP:{stamp.ToUniversalTime().ToString(UtcFormat, CultureInfo.InvariantCulture)}");
		AppendLine(ics, $"DTSTART:{start.UtcDateTime.ToString(UtcFormat, CultureInfo.InvariantCulture)}");
		AppendLine(ics, $"DTEND:{start.Add(DefaultDuration).UtcDateTime.ToString(UtcFormat, CultureInfo.InvariantCulture)}");
		AppendLine(ics, $"SUMMARY:{Escape(@event.Name)}");
		AppendLine(ics, $"URL:{pageUrl}");
		AppendLine(ics, $"DESCRIPTION:{Escape(pageUrl)}");
		if (!string.IsNullOrWhiteSpace(@event.Location))
		{
			AppendLine(ics, $"LOCATION:{Escape(@event.Location)}");
		}

		AppendLine(ics, "END:VEVENT");
		AppendLine(ics, "END:VCALENDAR");
		return ics.ToString();
	}

	public static string? GoogleCalendarUrl(Event @event, string pageUrl)
	{
		if (@event.Date is not { } start)
		{
			return null;
		}

		var dates = $"{start.UtcDateTime.ToString(UtcFormat, CultureInfo.InvariantCulture)}/{start.Add(DefaultDuration).UtcDateTime.ToString(UtcFormat, CultureInfo.InvariantCulture)}";
		return "https://calendar.google.com/calendar/render?action=TEMPLATE" +
		       $"&text={Uri.EscapeDataString(@event.Name)}" +
		       $"&dates={dates}" +
		       $"&details={Uri.EscapeDataString(pageUrl)}" +
		       $"&location={Uri.EscapeDataString(@event.Location ?? string.Empty)}";
	}

	public static string? OutlookUrl(Event @event, string pageUrl)
	{
		if (@event.Date is not { } start)
		{
			return null;
		}

		const string isoFormat = "yyyy-MM-dd'T'HH:mm:ss'Z'";
		return "https://outlook.live.com/calendar/0/action/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent" +
		       $"&subject={Uri.EscapeDataString(@event.Name)}" +
		       $"&startdt={Uri.EscapeDataString(start.UtcDateTime.ToString(isoFormat, CultureInfo.InvariantCulture))}" +
		       $"&enddt={Uri.EscapeDataString(start.Add(DefaultDuration).UtcDateTime.ToString(isoFormat, CultureInfo.InvariantCulture))}" +
		       $"&body={Uri.EscapeDataString(pageUrl)}" +
		       $"&location={Uri.EscapeDataString(@event.Location ?? string.Empty)}";
	}

	private static string Escape(string value) =>
		value.Replace("\\", "\\\\").Replace(";", "\\;").Replace(",", "\\,").ReplaceLineEndings("\\n");

	/// <summary>
	/// Appends a content line folded at 75 octets (RFC 5545 section 3.1). Apple Calendar is strict about
	/// this, and non-ASCII text such as Ukrainian addresses quickly exceeds the limit.
	/// </summary>
	private static void AppendLine(StringBuilder ics, string line)
	{
		var octets = 0;
		var limit = MaxLineOctets;
		foreach (var rune in line.EnumerateRunes())
		{
			var size = rune.Utf8SequenceLength;
			if (octets + size > limit)
			{
				ics.Append("\r\n ");
				octets = 0;
				limit = MaxLineOctets - 1; // continuation lines start with a space
			}

			ics.Append(rune.ToString());
			octets += size;
		}

		ics.Append("\r\n");
	}
}
