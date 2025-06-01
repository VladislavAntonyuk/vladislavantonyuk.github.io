namespace VladislavAntonyuk.Components.Pages;

using MudBlazor;
using Shared;
using Shared.Models;

public partial class Publications(IPublicationsService publicationsService) : VladislavAntonyukBaseComponent
{
	private MudTable<Publication>? articlesTable;
	private MudTable<Thesis>? thesesTable;

	private string? articlesSearchString;
	private string? thesisSearchString;

	private async Task<TableData<Publication>> ArticlesReload(TableState state, CancellationToken cancellationToken)
	{
		var data = await publicationsService.GetArticles(articlesSearchString, cancellationToken);
		
		var pagedData = data.Skip(state.Page * state.PageSize).Take(state.PageSize).ToList();

		return new TableData<Publication> { TotalItems = data.Count, Items = pagedData };
	}

	private async Task<TableData<Thesis>> ThesesReload(TableState state, CancellationToken cancellationToken)
	{
		var data = await publicationsService.GetTheses(thesisSearchString, cancellationToken);
		
		var pagedData = data.Skip(state.Page * state.PageSize).Take(state.PageSize).ToList();

		return new TableData<Thesis> { TotalItems = data.Count, Items = pagedData };
	}

	private void OnArticlesSearch(string text)
	{
		articlesSearchString = text;
		articlesTable?.ReloadServerData();
	}

	private void OnThesesSearch(string text)
	{
		thesisSearchString = text;
		thesesTable?.ReloadServerData();
	}
}