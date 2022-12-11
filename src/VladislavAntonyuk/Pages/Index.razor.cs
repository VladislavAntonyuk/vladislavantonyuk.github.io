using System.Net.Http.Json;
using Microsoft.AspNetCore.Components;
using MudBlazor;
using VladislavAntonyuk.Application.UseCases;
using VladislavAntonyuk.Models;
using VladislavAntonyuk.Services;

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
	public required HttpClient HttpClient { get; set; }

	[Inject]
	public required ISnackbar Snackbar { get; set; }

	//[Inject]
	//public required ICache Cache { get; set; }
	
	private async Task<PaginatedList<Article>> LoadArticles(int page, string? searchParameter)
	{
		var result = await HttpClient.GetFromJsonAsync<Article[]>("data/articles.json");
        //var result = await Cache.GetOrSetAsync($"Articles_{page}_{CategoryName}_{searchParameter}",
        //                                       () => QueryDispatcher
        //	                                       .SendAsync<GetArticleByFilterResponse, GetArticleQuery>(
        //		                                       new GetArticleQuery
        //		                                       {
        //			                                       Offset = page - 1,
        //			                                       Limit = 10,
        //			                                       Name = searchParameter,
        //			                                       CategoryName = CategoryName,
        //			                                       AllowInactive = isAuthenticated
        //		                                       }, CancellationToken.None), TimeSpan.FromHours(1));

        //if (result.IsSuccessful)
        //{
        //	return new PaginatedList<Article>(result.Value.Items, result.Value.TotalCount, result.Value.PageIndex, 10);
        //}

        //Snackbar.Add(string.Join(Environment.NewLine, result.Errors));
        return new PaginatedList<Article>(result, result.Length, 0, 10);
	}
}