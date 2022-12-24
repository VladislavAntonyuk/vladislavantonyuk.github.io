namespace VladislavAntonyuk.Pages;

using global::Shared;
using global::Shared.Models;
using Microsoft.AspNetCore.Components;
using Shared;

public partial class Index : VladislavAntonyukBaseComponent
{
	private BaseNavigationComponent<Article>? baseNav;

	[Parameter]
	[SupplyParameterFromQuery]
	public int? Page { get; set; }
	
	bool categoryNameUpdated = true;
	string? categoryName;

	[Parameter]
	[SupplyParameterFromQuery]
	public string? CategoryName
	{
		get => categoryName;
		set
		{
			if (categoryName != value)
			{
				categoryName = value;
				categoryNameUpdated = true;
			}
		}
	}

	protected override async Task OnParametersSetAsync()
	{
		await base.OnParametersSetAsync();
		if (categoryNameUpdated)
		{
			categoryNameUpdated = false;
			if (baseNav != null)
			{
				await baseNav.LoadData();
			}
		}
	}

	[Inject]
	public required IUrlCreator UrlCreator { get; set; }

	[Inject]
	public required IArticlesService ArticlesService { get; set; }

	private async Task<PaginatedList<Article>> LoadArticles(int page, string? searchParameter)
	{
		const int pageSize = 10;
		var articles = await ArticlesService.GetArticles(CategoryName, searchParameter);

		var result = articles.Skip((page - 1) * pageSize).Take(pageSize).ToList();

		return new PaginatedList<Article>(result, articles.Count, page - 1, pageSize);
	}
}