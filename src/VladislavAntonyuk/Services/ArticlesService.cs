using System.Net.Http.Json;
using VladislavAntonyuk.Models;

namespace VladislavAntonyuk.Services;

public interface IArticlesService
{
    Task<List<Article>> GetArticles(string? categoryName = null, string? searchParameter = null);
    Task<Article?> GetArticle(string articleName);
    Task<IReadOnlyCollection<Article>?> GetSuggestions(string articleName, int limit);
}

class ArticlesService : IArticlesService
{
    private readonly HttpClient _httpClient;

    public ArticlesService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
    public async Task<List<Article>> GetArticles(string? categoryName = null, string? searchParameter = null)
    {
        var categories = await _httpClient.GetFromJsonAsync<Category[]>("data/categories.json");
        if (categories is null)
        {
            return new List<Article>();
        }

        var articles = string.IsNullOrEmpty(categoryName) ?
            categories.SelectMany(x => x.Articles) :
            categories.Where(x => x.Name.Equals(categoryName, StringComparison.OrdinalIgnoreCase)).SelectMany(x => x.Articles);

        if (!string.IsNullOrEmpty(searchParameter))
        {
            articles = articles.Where(x => x.Name.Contains(searchParameter, StringComparison.OrdinalIgnoreCase));
        }

        return articles.ToList();
    }

    public async Task<Article?> GetArticle(string articleName)
    {
        var categories = await _httpClient.GetFromJsonAsync<Category[]>("data/categories.json");

        var category = categories?.FirstOrDefault(x => x.Articles.FirstOrDefault(y => y.Name.Equals(articleName, StringComparison.OrdinalIgnoreCase)) != null);

        if (category is null)
        {
            return null;
        }

        var article = category.Articles.SingleOrDefault(x => x.Name.Equals(articleName, StringComparison.OrdinalIgnoreCase));
        if (article is null)
        {
            return null;
        }

        var contentResponseMessage = await _httpClient.GetAsync($"./data/{articleName}.md");
        if (!contentResponseMessage.IsSuccessStatusCode)
        {
            return null;
        }

        article.Content = await contentResponseMessage.Content.ReadAsStringAsync();
        article.CategoryName = category.Name;
        return article;
    }

    public async Task<IReadOnlyCollection<Article>?> GetSuggestions(string articleName, int limit)
    {
        var categories = await _httpClient.GetFromJsonAsync<Category[]>("data/categories.json");
        if (categories is null)
        {
            return new List<Article>();
        }

        var category = categories.FirstOrDefault(x => x.Articles.FirstOrDefault(y => y.Name.Equals(articleName, StringComparison.OrdinalIgnoreCase)) != null);
        var articles = string.IsNullOrEmpty(category?.Name) ?
            categories.SelectMany(x => x.Articles) :
            category.Articles;

        var allSuggestions = articles.Where(x => !x.Name.EndsWith(articleName, StringComparison.OrdinalIgnoreCase)).OrderBy(q => q.Id).ToList();

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
}