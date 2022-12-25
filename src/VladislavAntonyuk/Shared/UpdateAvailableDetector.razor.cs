namespace VladislavAntonyuk.Shared;

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using MudBlazor;

public partial class UpdateAvailableDetector : VladislavAntonyukBaseComponent
{
	private bool newVersionAvailable;
	private MudDialog? dialog;

	[Inject]
	public required IJSRuntime JsRuntime { get; set; }

	protected override async Task OnInitializedAsync()
	{
		await base.OnInitializedAsync();
		await RegisterForUpdateAvailableNotification();
	}

	private async Task RegisterForUpdateAvailableNotification()
	{
		await JsRuntime.InvokeVoidAsync("registerForUpdateAvailableNotification",
		                                DotNetObjectReference.Create(this), nameof(OnUpdateAvailable));
	}

	[JSInvokable(nameof(OnUpdateAvailable))]
	public Task OnUpdateAvailable()
	{
		newVersionAvailable = true;
		StateHasChanged();
		dialog?.Show("Update available", new DialogOptions()
		{
			CloseButton = false,
			CloseOnEscapeKey = false,
			DisableBackdropClick = true,
			Position = DialogPosition.Center,
			NoHeader = true
		});

		return Task.CompletedTask;
	}

	async Task Reload()
	{
		await JsRuntime.InvokeVoidAsync("location.reload");
	}
}