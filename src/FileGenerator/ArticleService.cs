namespace FileGenerator;

using System.Text.Json;
using Shared;
using Shared.Models;

internal class ArticlesService(string path) : IArticlesService
{
	public async Task<List<Article>> GetArticles(string? categoryName = null, string? searchParameter = null)
	{
		var content = await File.ReadAllTextAsync(path + "categories.json");
		var categories = JsonSerializer.Deserialize<IEnumerable<Category>>(content, new JsonSerializerOptions
		{
			PropertyNameCaseInsensitive = true
		});
		if (categories is null)
		{
			return [];
		}

		return categories
		       .SelectMany(x => x.Articles, (category, article) =>
		                  {
			                  article.CategoryName = category.Name;
			                  article.Content = File.ReadAllText(path + article.Name + ".md");
			                  return article;
		                  })
			   .DistinctBy(x => x.Name)
			   .OrderByDescending(x => x.Created)
			   .ThenBy(x => x.Id)
		       .ToList();
	}

	public Task<Article?> GetArticle(string articleName)
	{
		throw new NotImplementedException();
	}

	public Task<IReadOnlyCollection<Article>?> GetSuggestions(string articleName, int limit)
	{
		throw new NotImplementedException();
	}

	public Task<List<Category>> GetCategories()
	{
		throw new NotImplementedException();
	}
}