namespace Shared;

using Models;

public interface IArticlesService
{
	Task<List<Article>> GetArticles(string? categoryName = null, string? searchParameter = null);
	Task<Article?> GetArticle(string articleName);
	Task<IReadOnlyCollection<Article>?> GetSuggestions(string articleName, int limit);
	Task<List<Category>> GetCategories();
}
