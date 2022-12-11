using Microsoft.AspNetCore.Components;

namespace VladislavAntonyuk.Shared;

public partial class PreviewArticleDialog : VladislavAntonyukBaseComponent
{
	[Parameter]
	[EditorRequired]
	public required string Content { get; set; }
}