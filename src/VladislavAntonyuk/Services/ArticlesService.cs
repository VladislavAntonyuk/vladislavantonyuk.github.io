﻿using System.Net.Http.Json;
using Shared.Models;

namespace Shared;

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
        var categories = await _httpClient.GetFromJsonAsync<IEnumerable<Category>>("data/categories.json");
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
            return article;
        });
        
        if (!string.IsNullOrEmpty(searchParameter))
        {
            articles = articles.Where(x => x.Name.Contains(searchParameter, StringComparison.OrdinalIgnoreCase));
        }

        return articles.OrderByDescending(x=> x.Created).ToList();
    }

    public async Task<Article?> GetArticle(string articleName)
    {
        var categories = await _httpClient.GetFromJsonAsync<Category[]>("data/categories.json");
        if (categories is null)
        {
            return null;
        }
        
        var article = categories.SelectMany(x => x.Articles, (category, article) =>
        {
            article.CategoryName = category.Name;
            return article;
        }).SingleOrDefault(x => x.Name.Equals(articleName, StringComparison.OrdinalIgnoreCase));
        
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
        return article;
    }

    public async Task<IReadOnlyCollection<Article>?> GetSuggestions(string articleName, int limit)
    {
        var categories = await _httpClient.GetFromJsonAsync<Category[]>("data/categories.json");
        if (categories is null)
        {
            return new List<Article>();
        }
        
        var articles = categories.SelectMany(x => x.Articles, (category, article) =>
        {
            article.CategoryName = category.Name;
            return article;
        }).ToList();

        if (!string.IsNullOrEmpty(articleName))
        {
            var categoryName = articles.FirstOrDefault(x => x.Name == articleName)?.CategoryName;
            articles = articles.Where(x => x.CategoryName == categoryName).ToList();
        }

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