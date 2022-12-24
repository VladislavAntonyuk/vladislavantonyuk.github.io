namespace VladislavAntonyuk.Shared;

using Microsoft.AspNetCore.Components;

public partial class BaseNavigationComponent<T> : VladislavAntonyukBaseComponent
{
	private PaginatedList<T>? data;

	private bool isLoading;

	private IReadOnlyList<T>? items;

	private string? searchFilter;

	[Parameter]
	public int Page { get; set; }

	[Parameter]
	public required string Title { get; set; }

	[Parameter]
	public required Func<int, string?, Task<PaginatedList<T>>> Action { get; set; }

	[Parameter]
	public required RenderFragment<IReadOnlyList<T>> ChildContent { get; set; }

	[Inject]
	public required NavigationManager Navigation { get; set; }

	public async Task LoadData()
	{
		isLoading = true;
		data = await Action(Page, searchFilter);
		items = data.Items.ToList();
		isLoading = false;
	}

	private Task SetPage(int page)
	{
		Navigation.NavigateTo(Navigation.GetUriWithQueryParameter(nameof(Page), page));
		Page = page;
		return LoadData();
	}

	protected override async Task OnInitializedAsync()
	{
		await base.OnInitializedAsync();
		await LoadData();
	}
}