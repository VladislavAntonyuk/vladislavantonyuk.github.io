namespace FileGenerator;

using System.Text.Json;
using Shared.Models;

internal class ArticlesService(string path)
{
	private static readonly JsonSerializerOptions Options = new(JsonSerializerDefaults.Web);

	public async Task<List<Article>> GetArticles()
	{
		var content = await File.ReadAllTextAsync(path + "categories.json");
		var categories = JsonSerializer.Deserialize<IEnumerable<Category>>(content, Options);
		if (categories is null)
		{
			return [];
		}

		return categories
			   .SelectMany(x => x.Articles, (category, article) =>
						  {
							  article.CategoryName = category.Name;
							  return article;
						  })
			   .DistinctBy(x => x.Name)
			   .Where(x => x.Created <= DateTime.UtcNow)
			   .Select(x =>
			   {
				   x.Content = File.ReadAllText(path + x.Name + ".md");
				   return x;
			   })
			   .OrderByDescending(x => x.Created)
			   .ThenBy(x => x.Id)
			   .ToList();
	}
}