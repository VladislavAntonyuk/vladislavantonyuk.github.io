namespace VladislavAntonyuk;

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.JSInterop;
using MudBlazor;

public class EditorBaseComponent : VladislavAntonyukBaseComponent
{
	[Inject]
	public required IJSRuntime JsRuntime { get; set; }

	public bool ForceNavigation { get; set; }

	protected async Task OnBeforeInternalNavigation(LocationChangingContext context)
	{
		if (!ForceNavigation)
		{
			var confirm = await JsRuntime.InvokeAsyncWithErrorHandling<bool>("confirm", "Are you sure you want to navigate?");
			if (!confirm.value)
			{
				context.PreventNavigation();
			}
		}

		ForceNavigation = false;
	}
}