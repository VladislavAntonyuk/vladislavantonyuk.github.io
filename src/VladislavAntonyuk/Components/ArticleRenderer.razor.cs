namespace VladislavAntonyuk.Components;

using Microsoft.AspNetCore.Components;

public partial class ArticleRenderer : VladislavAntonyukBaseComponent
{
	[Parameter]
	[EditorRequired]
	public required string Content { get; set; }
}