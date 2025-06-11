namespace VladislavAntonyuk.Components.Pages;

using Microsoft.AspNetCore.Components;
using MudBlazor;
using Shared;
using Shared.Models;

public partial class ArticleDetails(IUrlCreator urlCreator, NavigationManager navigation, IArticlesService articlesService) : VladislavAntonyukBaseComponent
{
	private Article? article;
	private ErrorModel? error;
	private IReadOnlyCollection<Article>? suggestions;
	private readonly MudMarkdownStyling markdownStyle = new();

	[Parameter]
	public required string Id { get; set; }

	protected override void OnInitialized()
	{
		base.OnInitialized();
		markdownStyle.CodeBlock.Theme = CodeBlockTheme.Vs2015;
	}

	protected override async Task OnParametersSetAsync()
	{
		article = null;
		error = null;
		suggestions = null;
		var articleName = urlCreator.Decode(Id);
		if (string.IsNullOrEmpty(articleName))
		{
			navigation.NavigateTo("/");
			return;
		}

		suggestions = await articlesService.GetSuggestions(articleName, 2);
		var result = await articlesService.GetArticle(articleName);
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