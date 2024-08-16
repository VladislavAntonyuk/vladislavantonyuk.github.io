namespace VladislavAntonyuk.Components.Pages;

using MudBlazor;
using Shared;
using Shared.Models;

public partial class Publications(IPublicationsService publicationsService) : VladislavAntonyukBaseComponent
{
	private IEnumerable<Publication>? pagedData;
	private MudTable<Publication>? table;

	private string? searchString;

	private async Task<TableData<Publication>> ServerReload(TableState state, CancellationToken cancellationToken)
	{
		var data = await publicationsService.Get(searchString);
		
		pagedData = data.Skip(state.Page * state.PageSize).Take(state.PageSize).ToList();

		return new TableData<Publication> { TotalItems = data.Count, Items = pagedData };
	}

	private void OnSearch(string text)
	{
		searchString = text;
		table?.ReloadServerData();
	}
}