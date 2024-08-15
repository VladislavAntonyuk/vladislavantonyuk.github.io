namespace VladislavAntonyuk.Services;

using System.Net.Http.Json;
using System.Text.Json;
using Shared;
using Shared.Models;

internal class ArticlesService(HttpClient httpClient) : IArticlesService
{
	public async Task<List<Article>> GetArticles(string? categoryName = null, string? searchParameter = null)
	{
		var categories = await httpClient.GetFromJsonAsync<IEnumerable<Category>>("data/categories.json", new JsonSerializerOptions
		{
			PropertyNameCaseInsensitive = true
		});
		if (categories is null)
		{
			return [];
		}

		if (!string.IsNullOrEmpty(categoryName))
		{
			categories = categories.Where(x => x.Name.Equals(categoryName, StringComparison.OrdinalIgnoreCase));
		}

		var articles = categories.SelectMany(x => x.Articles, (category, article) =>
		{
			article.CategoryName = category.Name;
			return article;
		});

		if (!string.IsNullOrEmpty(searchParameter))
		{
			articles = articles.Where(x => x.Name.Contains(searchParameter, StringComparison.OrdinalIgnoreCase));
		}

		return articles.DistinctBy(x => x.Name).OrderByDescending(x => x.Created).ThenBy(x => x.Id).ToList();
	}

	public async Task<Article?> GetArticle(string articleName)
	{
		var categories = await httpClient.GetFromJsonAsync<Category[]>("data/categories.json");

		var article = categories?.SelectMany(x => x.Articles, (category, article) =>
		                        {
			                        article.CategoryName = category.Name;
			                        return article;
		                        })
		                        .FirstOrDefault(x => x.Name.Equals(articleName, StringComparison.OrdinalIgnoreCase));

		if (article is null)
		{
			return null;
		}

		var contentResponseMessage = await httpClient.GetAsync($"./data/{articleName}.md");
		if (!contentResponseMessage.IsSuccessStatusCode)
		{
			return null;
		}

		article.Content = await contentResponseMessage.Content.ReadAsStringAsync();
		return article;
	}

	public async Task<IReadOnlyCollection<Article>?> GetSuggestions(string articleName, int limit)
	{
		var categories = await httpClient.GetFromJsonAsync<Category[]>("data/categories.json");
		if (categories is null)
		{
			return new List<Article>();
		}

		var articles = categories.SelectMany(x => x.Articles, (category, article) =>
		                         {
			                         article.CategoryName = category.Name;
			                         return article;
		                         })
		                         .ToList();

		if (!string.IsNullOrEmpty(articleName))
		{
			var categoryName = articles.FirstOrDefault(x => x.Name == articleName)?.CategoryName;
			articles = articles.Where(x => x.CategoryName == categoryName).ToList();
		}

		var allSuggestions = articles.Where(x => !x.Name.EndsWith(articleName, StringComparison.OrdinalIgnoreCase))
		                             .OrderBy(q => q.Id)
		                             .ToList();

		if (allSuggestions.Count == 0)
		{
			return new List<Article>();
		}

		var randomIds = Enumerable.Range(0, allSuggestions.Count)
		                          .OrderBy(t => Random.Shared.Next())
		                          .Take(limit)
		                          .ToArray();

		return randomIds.Select(t => allSuggestions[t]).ToList();
	}

	public async Task<List<Category>> GetCategories()
	{
		var categories = await httpClient.GetFromJsonAsync<IEnumerable<Category>>("data/categories.json");
		return categories is null ? [] : categories.ToList();
	}
}