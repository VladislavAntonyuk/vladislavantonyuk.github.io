namespace VladislavAntonyuk;

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.JSInterop;

public class EditorBaseComponent : VladislavAntonyukBaseComponent
{
	[Inject]
	public required IJSRuntime JSRuntime { get; set; }

	public bool ForceNavigation { get; set; }

	protected async Task OnBeforeInternalNavigation(LocationChangingContext context)
	{
		if (!ForceNavigation && !await JSRuntime.InvokeAsync<bool>("confirm", "Are you sure you want to navigate?"))
		{
			context.PreventNavigation();
		}

		ForceNavigation = false;
	}
}