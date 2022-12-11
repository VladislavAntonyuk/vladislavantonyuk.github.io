using Microsoft.AspNetCore.Components;

namespace VladislavAntonyuk.Shared;

public partial class Head : VladislavAntonyukBaseComponent
{
	[Inject]
	public required NavigationManager NavigationManager { get; set; }

	[Parameter]
	public string Title { get; set; } = "VladislavAntonyuk";

	[Parameter]
	public string Description { get; set; } = "VladislavAntonyuk";

	[Parameter]
	public string Image { get; set; } = "favicon.ico";

	[Parameter]
	public string Keywords { get; set; } = "VladislavAntonyuk";
}