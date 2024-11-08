namespace VladislavAntonyuk.Components.Navigation;

using Microsoft.AspNetCore.Components;
using Shared;
using Shared.Models;

public class EventsNavigationComponent (NavigationManager navigation, IEventsService eventsService): BaseNavigationComponent<Event>(navigation)
{
	public override string Title => "Events";

	protected override async Task<PaginatedList<Event>> GetData()
	{
		const int pageSize = 10;
		var events = await eventsService.Filter(SearchFilter);

		var result = events.Skip((Page - 1) * pageSize).Take(pageSize).ToList();

		return new PaginatedList<Event>(result, events.Count, Page - 1, pageSize);
	}
}