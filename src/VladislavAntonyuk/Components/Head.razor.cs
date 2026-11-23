namespace VladislavAntonyuk.Components;

using Microsoft.AspNetCore.Components;

public partial class Head(NavigationManager navigationManager) : VladislavAntonyukBaseComponent
{
	private const string DefaultImage = "icon-512.png";

	[Parameter]
	public string Title { get; set; } = "VladislavAntonyuk";

	[Parameter]
	public string Description { get; set; } = "VladislavAntonyuk";

	[Parameter]
	public string? Image { get; set; }

	[Parameter]
	public string Keywords { get; set; } = "VladislavAntonyuk";

	/// <summary>Open Graph type, for example "website" or "article".</summary>
	[Parameter]
	public string Type { get; set; } = "website";

	[Parameter]
	public DateTime? PublishedTime { get; set; }

	[Parameter]
	public string? Section { get; set; }

	private bool HasCustomImage => !string.IsNullOrWhiteSpace(Image);

	// Social networks ignore relative image URLs, so always publish absolute ones.
	private string AbsoluteImage => navigationManager.ToAbsolute(HasCustomImage ? Image! : DefaultImage);

	private string PageUrl => navigationManager.CurrentAbsolute();
}
