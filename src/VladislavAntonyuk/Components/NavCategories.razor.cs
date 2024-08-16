namespace VladislavAntonyuk.Components;

using Microsoft.AspNetCore.Components;
using Shared;
using Shared.Models;

public partial class NavCategories(NavigationManager navigation, IArticlesService articleService) : VladislavAntonyukBaseComponent
{
	private List<Category> categories = [];

	protected override async Task OnInitializedAsync()
	{
		await base.OnInitializedAsync();

		categories = await articleService.GetCategories();
	}

	private void FilterCategory(string categoryName)
	{
		navigation.NavigateTo($"{navigation.BaseUri}articles?categoryName={categoryName}");
	}
}