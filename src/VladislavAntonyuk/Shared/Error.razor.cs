namespace VladislavAntonyuk.Shared;

using Microsoft.AspNetCore.Components;

public partial class Error : VladislavAntonyukBaseComponent
{
	[Parameter]
	public int ErrorCode { get; set; }

	[Parameter]
	public string? ErrorTitle { get; set; }

	[Parameter]
	public string? ErrorText { get; set; }
}