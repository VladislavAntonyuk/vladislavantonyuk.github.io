namespace VladislavAntonyuk.Components;

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

public partial class ArticleRenderer(IJSRuntime jsRuntime) : VladislavAntonyukBaseComponent
{
	[Parameter]
	[EditorRequired]
	public required string Content { get; set; }

	protected override async Task OnAfterRenderAsync(bool firstRender)
	{
		await base.OnAfterRenderAsync(firstRender);
		if (firstRender)
		{
			await Task.Delay(1000);
			await EmbedCopyToClipboardCode();
		}
	}

	private ValueTask EmbedCopyToClipboardCode()
	{
		return jsRuntime.InvokeVoidAsync("JsFunctions.embedCopyToClipboardCode");
	}
}