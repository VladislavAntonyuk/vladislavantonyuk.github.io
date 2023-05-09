namespace FileGenerator;

using System.Xml.Linq;
using Shared;
using X.Web.Sitemap;

public interface ISitemapService
{
	ValueTask<string> ParseSitemap();
	Task<string> GenerateSitemap();
}

public class SitemapService : ISitemapService
{
	private const string FilePath = "sitemap.xml";
	private readonly IArticlesService _articlesService;
	private readonly IUrlCreator _urlCreator;
	private Sitemap? sitemap = new();

	public SitemapService(IArticlesService articlesService, IUrlCreator urlCreator)
	{
		_articlesService = articlesService;
		_urlCreator = urlCreator;
	}

	public async ValueTask<string> ParseSitemap()
	{
		if (!File.Exists(FilePath))
		{
			return "File not found";
		}

		var xml = await File.ReadAllTextAsync(FilePath);
		Sitemap.TryParse(xml, out sitemap);
		return FormatXml(sitemap?.ToXml());
	}

	public async Task<string> GenerateSitemap()
	{
		const double priority = 0.8;
		sitemap = new Sitemap
		{
			CreateUrl("", 1, new DateTime(2021, 01, 01), ChangeFrequency.Weekly),
			CreateUrl("articles", priority, new DateTime(2021, 01, 01), ChangeFrequency.Weekly),
			CreateUrl("projects", priority, new DateTime(2021, 01, 01), ChangeFrequency.Monthly)
		};
		var articles = await _articlesService.GetArticles();
		sitemap.AddRange(articles.Select(article => CreateUrl("articles", priority,
		                                                      article.Created,
		                                                      ChangeFrequency.Monthly, article.Name)));

		await sitemap.SaveAsync(Environment.CurrentDirectory + "/" + FilePath);
		return await ParseSitemap();
	}

	private Url CreateUrl(string url,
		double priority,
		DateTime timestamp,
		ChangeFrequency changeFrequency,
		string? encodedPart = null)
	{
		return new Url
		{
			Location = _urlCreator.CreateArticleUrl(url, encodedPart),
			TimeStamp = timestamp,
			ChangeFrequency = changeFrequency,
			Priority = priority
		};
	}

	private static string FormatXml(string? xml)
	{
		xml ??= string.Empty;
		try
		{
			var doc = XDocument.Parse(xml);
			return doc.ToString();
		}
		catch (Exception)
		{
			return xml;
		}
	}
}