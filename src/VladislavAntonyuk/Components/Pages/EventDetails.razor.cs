namespace VladislavAntonyuk.Components.Pages;

using Microsoft.AspNetCore.Components;
using MudBlazor;
using Shared;
using Shared.Models;

public partial class EventDetails(IEventsService eventsService, NavigationManager navigationManager, ISnackbar snackbar, IUrlCreator urlCreator) : VladislavAntonyukBaseComponent
{
	[EditorRequired]
	[Parameter]
	public required string EventName { get; set; }

	private Event? @event;

	protected override async Task OnParametersSetAsync()
	{
		var name = urlCreator.Decode(EventName);
		if (string.IsNullOrEmpty(name))
		{
			snackbar.Add("Event not found", Severity.Error);
			navigationManager.NavigateTo("/");
			return;
		}

		var result = await eventsService.Get(name);
		if (result is null)
		{
			snackbar.Add("Event not found", Severity.Error);
			navigationManager.NavigateTo("/");
		}
		else if (!string.IsNullOrEmpty(result.RedirectUrl))
		{
			navigationManager.NavigateTo(result.RedirectUrl);
		}
		else
		{
			@event = result;
		}
	}
}