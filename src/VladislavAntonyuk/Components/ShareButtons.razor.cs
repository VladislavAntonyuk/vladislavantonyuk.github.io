namespace VladislavAntonyuk.Components;

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using MudBlazor;

public partial class ShareButtons(NavigationManager navigationManager, IJSRuntime jsRuntime, ISnackbar snackbar) : VladislavAntonyukBaseComponent
{
	// The X (formerly Twitter) logo; MudBlazor only ships the old bird.
	private const string XIcon = "<path d=\"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z\"/>";

	[EditorRequired]
	[Parameter]
	public required string Url { get; set; }

	[Parameter]
	public string? Title { get; set; }

	private string AbsoluteUrl => navigationManager.ToAbsolute(Url);

	private string EncodedUrl => Uri.EscapeDataString(AbsoluteUrl);

	private string EncodedTitle => Uri.EscapeDataString(Title ?? string.Empty);

	private async Task CopyLink()
	{
		try
		{
			await jsRuntime.InvokeVoidAsync("navigator.clipboard.writeText", AbsoluteUrl);
			snackbar.Add("Link copied", Severity.Success);
		}
		catch (JSException)
		{
			snackbar.Add("Could not copy the link", Severity.Warning);
		}
	}
}
