using Microsoft.AspNetCore.Components;
using Shared;
using Shared.Models;

namespace VladislavAntonyuk.Pages;

public partial class Index : VladislavAntonyukBaseComponent
{
	[Parameter]
	[SupplyParameterFromQuery]
	public int? Page { get; set; }

	[Parameter]
	[SupplyParameterFromQuery]
	public string? CategoryName { get; set; }

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