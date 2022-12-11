using Microsoft.AspNetCore.Components;
using VladislavAntonyuk.Models;

namespace VladislavAntonyuk.Shared;

public partial class NavCategories : VladislavAntonyukBaseComponent
{
	private List<Category> categories = new();

	[Inject]
	public required NavigationManager Navigation { get; set; }

	//[Inject]
	//public required IQueryDispatcher QueryDispatcher { get; set; }

	//[Inject]
	//public required ICache Cache { get; set; }

	protected override async Task OnInitializedAsync()
	{
		await base.OnInitializedAsync();
		
		//var categoriesResponse = await Cache.GetOrSetAsync($"Categories", () =>
		//	                                                   QueryDispatcher
		//		                                                   .SendAsync<IEnumerable<DetailedCategoryDto>,
		//			                                                   GetAllCategoriesWithArticlesQuery>(
		//			                                                   new GetAllCategoriesWithArticlesQuery(), CancellationToken.None),
		//                                                   TimeSpan.FromHours(1));
		//if (categoriesResponse.IsSuccessful)
		//{
		//	categories = categoriesResponse.Value.ToList();
		//}
	}

	private void FilterCategory(string categoryName)
	{
		Navigation.NavigateTo($"{Navigation.BaseUri}articles?categoryName={categoryName}", true);
	}
}