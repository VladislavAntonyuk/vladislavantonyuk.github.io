using Shared;
using Shared.Models;
using System.Text.Json;

namespace FileGenerator;

public class ArticlesService : IArticlesService
{
    private readonly string _path;

    public ArticlesService(string path)
    {
        _path = path;
    }
    public async Task<List<Article>> GetArticles(string? categoryName = null, string? searchParameter = null)
    {
        var content = await File.ReadAllTextAsync(_path + "categories.json");
        var categories = JsonSerializer.Deserialize<IEnumerable<Category>>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        if (categories is null)
        {
            return new List<Article>();
        }

        if (!string.IsNullOrEmpty(categoryName))
        {
            categories = categories.Where(x => x.Name.Equals(categoryName, StringComparison.OrdinalIgnoreCase));
        }

        var articles = categories.SelectMany(x => x.Articles, (category, article) =>
        {
            article.CategoryName = category.Name;
            article.Content = File.ReadAllText(_path + article.Name + ".md"); 
            return article;
        });

        if (!string.IsNullOrEmpty(searchParameter))
        {
            articles = articles.Where(x => x.Name.Contains(searchParameter, StringComparison.OrdinalIgnoreCase));
        }

        return articles.OrderByDescending(x => x.Created).ToList();
    }

    public Task<Article?> GetArticle(string articleName)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyCollection<Article>?> GetSuggestions(string articleName, int limit)
    {
        throw new NotImplementedException();
    }
}