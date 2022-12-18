namespace VladislavAntonyuk.Shared;

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

public partial class UpdateAvailableDetector : VladislavAntonyukBaseComponent
{
	private bool _newVersionAvailable;

	[Inject]
	public required IJSRuntime JsRuntime { get; set; }

	protected override async Task OnInitializedAsync()
	{
		await base.OnInitializedAsync();
		await RegisterForUpdateAvailableNotification();
	}

	private async Task RegisterForUpdateAvailableNotification()
	{
		await JsRuntime.InvokeAsync<object>("registerForUpdateAvailableNotification",
		                                    DotNetObjectReference.Create(this), nameof(OnUpdateAvailable));
	}

	[JSInvokable(nameof(OnUpdateAvailable))]
	public Task OnUpdateAvailable()
	{
		_newVersionAvailable = true;

		StateHasChanged();

		return Task.CompletedTask;
	}
}