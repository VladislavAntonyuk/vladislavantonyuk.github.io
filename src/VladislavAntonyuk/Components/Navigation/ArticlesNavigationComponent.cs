namespace VladislavAntonyuk.Components.Navigation;

using Microsoft.AspNetCore.Components;
using Shared;
using Shared.Models;

public class ArticlesNavigationComponent : BaseNavigationComponent<Article>
{
	public override string Title => "Articles";

	protected override async Task<PaginatedList<Article>> GetData()
	{
		const int pageSize = 10;
		var articles = await ArticlesService.GetArticles(CategoryName, SearchFilter);

		var result = articles.Skip((Page - 1) * pageSize).Take(pageSize).ToList();

		return new PaginatedList<Article>(result, articles.Count, Page - 1, pageSize);
	}

	[Inject]
	public required IArticlesService ArticlesService { get; set; }

	[Parameter]
	[SupplyParameterFromQuery]
	public string? CategoryName { get; set; }

	protected override async Task OnParametersSetAsync()
	{
		await base.OnParametersSetAsync();
		await LoadData();
	}
}