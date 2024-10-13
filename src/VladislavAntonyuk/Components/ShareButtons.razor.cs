namespace VladislavAntonyuk.Components;

using Microsoft.AspNetCore.Components;

public partial class ShareButtons : VladislavAntonyukBaseComponent
{
	[EditorRequired]
	[Parameter]
	public required string Url { get; set; }
}