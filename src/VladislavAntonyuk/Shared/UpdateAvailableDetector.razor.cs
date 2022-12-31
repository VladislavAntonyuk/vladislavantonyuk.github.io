namespace VladislavAntonyuk.Shared;

using System;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using MudBlazor;
using Toolbelt.Blazor.PWA.Updater.Service;

public partial class UpdateAvailableDetector : VladislavAntonyukBaseComponent, IDisposable
{
	private bool newVersionAvailable;
	private MudDialog? dialog;

	[Inject]
	public required IPWAUpdaterService PWAUpdaterService { get; set; }

	protected override void OnAfterRender(bool firstRender)
	{
		if (firstRender)
		{
			this.PWAUpdaterService.NextVersionIsWaiting += PWAUpdaterService_NextVersionIsWaiting;
		}
	}

	private void PWAUpdaterService_NextVersionIsWaiting(object? sender, EventArgs e)
	{
		newVersionAvailable = true;
		dialog?.Show("Update available", new DialogOptions()
		{
			CloseButton = false,
			CloseOnEscapeKey = false,
			DisableBackdropClick = true,
			Position = DialogPosition.Center,
			NoHeader = true
		});
	}

	async Task Reload()
	{
		await this.PWAUpdaterService.SkipWaitingAsync();
	}

	void IDisposable.Dispose()
	{
		this.PWAUpdaterService.NextVersionIsWaiting -= PWAUpdaterService_NextVersionIsWaiting;
	}
}