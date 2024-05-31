namespace VladislavAntonyuk.Components.Monetization;

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

public partial class Ads(IJSRuntime jsRuntime) : VladislavAntonyukBaseComponent
{
	private bool isEnabled;

	[Parameter]
	[EditorRequired]
	public string Slot { get; set; } = string.Empty;

	[Parameter]
	public string Format { get; set; } = "auto";

	[Parameter]
	public string? LayoutKey { get; set; }

	[Parameter]
	public string ClientId { get; set; } = "ca-pub-2260920996164852";

	protected override void OnInitialized()
	{
		base.OnInitialized();
		isEnabled = bool.Parse(Environment.GetEnvironmentVariable("IsAdsEnabled") ?? bool.TrueString);
	}

	protected override async Task OnAfterRenderAsync(bool firstRender)
	{
		await base.OnAfterRenderAsync(firstRender);
		if (firstRender)
		{
			await jsRuntime.InvokeVoidAsync("JsFunctions.initAds");
		}
	}
}