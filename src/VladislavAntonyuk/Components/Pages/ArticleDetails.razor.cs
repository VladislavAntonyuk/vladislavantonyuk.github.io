namespace VladislavAntonyuk.Components.Pages;

using Microsoft.AspNetCore.Components;
using Shared;
using Shared.Models;

public partial class ArticleDetails : VladislavAntonyukBaseComponent
{
	private Article? article;
	private ErrorModel? error;
	private IReadOnlyCollection<Article>? suggestions;

	[Parameter]
	public required string Id { get; set; }

	[Inject]
	public required IUrlCreator UrlCreator { get; set; }

	[Inject]
	public required NavigationManager Navigation { get; set; }

	[Inject]
	public required IArticlesService ArticlesService { get; set; }

	protected override async Task OnParametersSetAsync()
	{
		article = null;
		error = null;
		suggestions = null;
		var articleName = UrlCreator.DecodeArticleUrl(Id);
		if (string.IsNullOrEmpty(articleName))
		{
			Navigation.NavigateTo("/");
			return;
		}

		suggestions = await ArticlesService.GetSuggestions(articleName, 2);
		var result = await ArticlesService.GetArticle(articleName);
		if (result is null)
		{
			error = new ErrorModel
			{
				Message = "Page Not Found",
				Code = 404
			};
		}
		else
		{
			article = result;
		}
	}
}