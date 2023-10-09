namespace VladislavAntonyuk.Components.Pages;

using Microsoft.AspNetCore.Components;
using Shared;

public partial class Index : VladislavAntonyukBaseComponent
{
	[Inject]
	public required IUrlCreator UrlCreator { get; set; }
}