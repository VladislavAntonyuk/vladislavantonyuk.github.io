using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace VladislavAntonyuk.Shared;

public partial class ArticleRenderer : VladislavAntonyukBaseComponent
{
	[Inject]
	public required IJSRuntime JsRuntime { get; set; }

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

	ValueTask EmbedCopyToClipboardCode()
	{
		return JsRuntime.InvokeVoidAsync("JsFunctions.embedCopyToClipboardCode");
	}
}