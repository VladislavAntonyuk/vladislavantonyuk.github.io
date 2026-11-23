namespace VladislavAntonyuk.Components.Pages;

using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Shared;
using Shared.Models;

public partial class ArticleDetails(IUrlCreator urlCreator, NavigationManager navigation, IArticlesService articlesService, IJSRuntime jsRuntime) : VladislavAntonyukBaseComponent
{
	private const int WordsPerMinute = 220;
	private const int MinimumTocEntries = 3;

	private Article? article;
	private ErrorModel? error;
	private IReadOnlyCollection<Article> suggestions = [];
	private Article? previousArticle;
	private Article? nextArticle;
	private IReadOnlyList<TocEntry> toc = [];
	private bool tocPending;

	[Parameter]
	public required string Id { get; set; }

	protected override async Task OnParametersSetAsync()
	{
		article = null;
		error = null;
		suggestions = [];
		previousArticle = null;
		nextArticle = null;
		toc = [];
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
			(previousArticle, nextArticle) = await articlesService.GetAdjacent(result.Name);
			tocPending = true;
		}
	}

	protected override async Task OnAfterRenderAsync(bool firstRender)
	{
		await base.OnAfterRenderAsync(firstRender);
		if (!tocPending || article is null)
		{
			return;
		}

		tocPending = false;
		try
		{
			// MudMarkdown generates the heading ids, so read them from the rendered page.
			var headings = await jsRuntime.InvokeAsync<TocEntry[]>("JsFunctions.getHeadings", ".article-body h2, .article-body h3");
			// Indent a heading only under a shallower one; some articles open with h3 before any h2.
			toc = headings.Length >= MinimumTocEntries
				? headings.Select((h, i) => h with { Indented = headings.Take(i).Any(p => p.Level < h.Level) }).ToList()
				: [];
			StateHasChanged();
		}
		catch (JSException)
		{
			toc = [];
		}
		catch (InvalidOperationException)
		{
			// JS interop is not available while prerendering.
		}
	}

	private static int ReadingMinutes(string? content)
	{
		if (string.IsNullOrWhiteSpace(content))
		{
			return 1;
		}

		var words = WordRegex().Count(content);
		return Math.Max(1, (int)Math.Round(words / (double)WordsPerMinute));
	}

	private async Task ScrollTo(string id)
	{
		try
		{
			await jsRuntime.InvokeVoidAsync("JsFunctions.scrollToId", id);
		}
		catch (JSException)
		{
			// Scrolling is a convenience; the heading stays reachable by normal scrolling.
		}
	}

	private void FilterCategory(string? categoryName)
	{
		navigation.NavigateTo($"{navigation.BaseUri}articles?categoryName={categoryName}");
	}

	[GeneratedRegex(@"\S+")]
	private static partial Regex WordRegex();

	private sealed record TocEntry(string Id, string Text, int Level)
	{
		public bool Indented { get; init; }
	}
}
