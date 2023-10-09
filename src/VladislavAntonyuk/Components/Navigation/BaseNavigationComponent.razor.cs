namespace VladislavAntonyuk.Components.Navigation;

using Microsoft.AspNetCore.Components;

public abstract partial class BaseNavigationComponent<T> : VladislavAntonyukBaseComponent
{
	private PaginatedList<T>? data;

	private bool isLoading;

	public string? SearchFilter { get; set; }

	[Parameter]
	[SupplyParameterFromQuery]
	public int Page { get; set; }

	public abstract string Title { get; }

	protected abstract Task<PaginatedList<T>> GetData();

	[Parameter]
	public required RenderFragment<IReadOnlyCollection<T>> ChildContent { get; set; }

	[Inject]
	public required NavigationManager Navigation { get; set; }

	protected async Task LoadData()
	{
		isLoading = true;
		data = await GetData();
		isLoading = false;
	}

	private Task SetPage(int page)
	{
		Navigation.NavigateTo(Navigation.GetUriWithQueryParameter(nameof(Page), page));
		Page = page;
		return LoadData();
	}

	private Task Search()
	{
		return SetPage(1);
	}

	protected override async Task OnInitializedAsync()
	{
		await base.OnInitializedAsync();
		await LoadData();
	}

	protected override async Task OnParametersSetAsync()
	{
		await base.OnParametersSetAsync();
		await LoadData();
	}
}