namespace VladislavAntonyuk.Shared;

using Microsoft.AspNetCore.Components;

public partial class PreviewArticleDialog : VladislavAntonyukBaseComponent
{
	[Parameter]
	[EditorRequired]
	public required string Content { get; set; }
}