using Microsoft.AspNetCore.Components;

namespace VladislavAntonyuk.Shared;

public partial class Error : VladislavAntonyukBaseComponent
{
	[Parameter]
	public int ErrorCode { get; set; }

	[Parameter]
	public string? ErrorTitle { get; set; }

	[Parameter]
	public string? ErrorText { get; set; }
}