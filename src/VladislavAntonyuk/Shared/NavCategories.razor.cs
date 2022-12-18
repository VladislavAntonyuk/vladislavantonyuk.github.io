namespace VladislavAntonyuk.Shared;

using global::Shared;
using global::Shared.Models;
using Microsoft.AspNetCore.Components;

public partial class NavCategories : VladislavAntonyukBaseComponent
{
	private List<Category> categories = new();

	[Inject]
	public required NavigationManager Navigation { get; set; }

	[Inject]
	public required IArticlesService ArticleService { get; set; }

	protected override async Task OnInitializedAsync()
	{
		await base.OnInitializedAsync();

		categories = await ArticleService.GetCategories();
	}

	private void FilterCategory(string categoryName)
	{
		Navigation.NavigateTo($"{Navigation.BaseUri}articles?categoryName={categoryName}", true);
	}
}