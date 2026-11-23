namespace VladislavAntonyuk.Components.Navigation;

using Microsoft.AspNetCore.Components;
using Shared;
using Shared.Models;

public class ArticlesNavigationComponent(NavigationManager navigation, IArticlesService articlesService) : BaseNavigationComponent<Article>(navigation)
{
	protected override async Task<PaginatedList<Article>> GetData()
	{
		const int pageSize = 9;
		var articles = await articlesService.GetArticles(CategoryName, SearchFilter);

		var result = articles.Skip((Page - 1) * pageSize).Take(pageSize).ToList();

		return new PaginatedList<Article>(result, articles.Count, Page - 1, pageSize);
	}

	[Parameter]
	[SupplyParameterFromQuery]
	public string? CategoryName { get; set; }
}