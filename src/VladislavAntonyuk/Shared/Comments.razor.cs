namespace VladislavAntonyuk.Shared;

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Services;

public partial class Comments : VladislavAntonyukBaseComponent
{
	private ElementReference disqusBody;

	[Inject]
	public required IJSRuntime JsRuntime { get; set; }

	[Inject]
	public required NavigationManager Navigation { get; set; }

	[Parameter]
	[EditorRequired]
	public string Id { get; set; } = string.Empty;

	[Parameter]
	[EditorRequired]
	public string Title { get; set; } = string.Empty;

	protected override async Task OnAfterRenderAsync(bool firstRender)
	{
		await base.OnAfterRenderAsync(firstRender);
		if (firstRender)
		{
			await DisqusInterop.CreateDisqus(JsRuntime, disqusBody);

			await DisqusInterop.ResetDisqus(JsRuntime, Id, Navigation.Uri, Title);
		}
	}
}