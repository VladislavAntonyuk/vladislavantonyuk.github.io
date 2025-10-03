namespace FileGenerator;

using System.Xml.Linq;
using Shared;
using X.Web.Sitemap;
using X.Web.Sitemap.Extensions;

public interface ISitemapService
{
	Task GenerateSitemap();
}

internal class SitemapService(ArticlesService articlesService, EventsService eventsService, IUrlCreator urlCreator) : ISitemapService
{
	private const string FilePath = "sitemap.xml";
	private Sitemap? sitemap = [];

	public async Task GenerateSitemap()
	{
		const double priority = 0.8;
		sitemap =
		[
			CreateUrl("", 1, new DateTime(2021, 01, 01), ChangeFrequency.Weekly),
			CreateUrl("articles", priority, new DateTime(2021, 01, 01), ChangeFrequency.Weekly),
			CreateUrl("projects", priority, new DateTime(2021, 01, 01), ChangeFrequency.Monthly),
			CreateUrl("events", priority, new DateTime(2021, 01, 01), ChangeFrequency.Monthly)
		];
		var articles = await articlesService.GetArticles();
		sitemap.AddRange(articles.Select(article => CreateUrl("articles", priority,
															  article.Created,
															  ChangeFrequency.Monthly, article.Name)));

		var events = await eventsService.GetEvents();
		sitemap.AddRange(events.Select(x => CreateUrl("events", priority,
															x.Date.GetValueOrDefault().UtcDateTime,
															ChangeFrequency.Monthly, x.Name)));

		await sitemap.SaveAsync(Environment.CurrentDirectory + "/" + FilePath);
	}

	private Url CreateUrl(string url,
		double priority,
		DateTime timestamp,
		ChangeFrequency changeFrequency,
		string? encodedPart = null)
	{
		return new Url
		{
			Location = urlCreator.Encode(url, encodedPart),
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