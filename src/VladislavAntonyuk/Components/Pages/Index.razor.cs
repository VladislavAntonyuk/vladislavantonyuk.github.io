namespace VladislavAntonyuk.Components.Pages;

using Microsoft.AspNetCore.Components;
using Shared;

public partial class Index(IUrlCreator urlCreator, NavigationManager navigation) : VladislavAntonyukBaseComponent
{
	private void FilterCategory(string? categoryName)
	{
		navigation.NavigateTo($"{navigation.BaseUri}articles?categoryName={categoryName}");
	}
}