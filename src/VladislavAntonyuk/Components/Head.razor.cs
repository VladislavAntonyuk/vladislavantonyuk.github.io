namespace VladislavAntonyuk.Components;

using Microsoft.AspNetCore.Components;

public partial class Head(NavigationManager navigationManager) : VladislavAntonyukBaseComponent
{
	[Parameter]
	public string Title { get; set; } = "VladislavAntonyuk";

	[Parameter]
	public string Description { get; set; } = "VladislavAntonyuk";

	[Parameter]
	public string Image { get; set; } = "favicon.ico";

	[Parameter]
	public string Keywords { get; set; } = "VladislavAntonyuk";
}