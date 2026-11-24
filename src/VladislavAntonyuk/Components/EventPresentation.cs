namespace VladislavAntonyuk.Components;

using System.Globalization;
using Shared.Models;

/// <summary>
/// Display helpers shared by the events timeline and the event details page.
/// </summary>
public static class EventPresentation
{
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
}
