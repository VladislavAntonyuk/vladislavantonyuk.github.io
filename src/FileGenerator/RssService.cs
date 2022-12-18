namespace FileGenerator;

using System.Xml.Linq;
using System.Xml.Serialization;
using Markdig;
using Markdig.Extensions.MediaLinks;
using Models;
using Shared;
using Shared.Models;

public interface IRssService
{
	ValueTask<string> ParseRss();
	Task<string> GenerateRss();
}

public class RssService : IRssService
{
	private const string FilePath = "rss.xml";
	private readonly IArticlesService _articlesService;
	private readonly IUrlCreator _urlCreator;

	public RssService(IArticlesService articlesService, IUrlCreator urlCreator)
	{
		_articlesService = articlesService;
		_urlCreator = urlCreator;
	}

	public async ValueTask<string> ParseRss()
	{
		return File.Exists(FilePath) ? FormatXml(await File.ReadAllTextAsync(FilePath)) : "File not found";
	}

	public async Task<string> GenerateRss()
	{
		Rss rss = new()
		{
			Channel = new Channel
			{
				LastBuildDate = DateTime.UtcNow.ToString("R"),
				Link = _urlCreator.CreateArticleUrl(""),
				Link2 = new Link
				{
					Href = _urlCreator.CreateArticleUrl("rss"),
					Rel = "self",
					Type = "application/rss+xml"
				},
				Description = $"{Constants.ProductName} - Articles",
				Title = Constants.ProductName,
				Items = new List<Item>()
			}
		};
		var articles = await _articlesService.GetArticles();
		if (articles.Count == 0)
		{
			return string.Empty;
		}

		rss.Channel.Items.AddRange(articles.Select(CreateItem));

		var ns = new XmlSerializerNamespaces();
		ns.Add("content", "http://purl.org/rss/1.0/modules/content/");
		ns.Add("atom", "http://www.w3.org/2005/Atom");
		ns.Add("dc", "http://purl.org/dc/elements/1.1/");
		var serializer = new XmlSerializer(typeof(Rss));
		await using var writer = new StreamWriter(FilePath);
		serializer.Serialize(writer, rss, ns);
		writer.Close();
		return await ParseRss();
	}

	private Item CreateItem(Article article)
	{
		return new Item
		{
			Link = _urlCreator.CreateArticleUrl("articles", article.Name),
			Guid = _urlCreator.CreateArticleUrl("articles", article.Name),
			Description = article.Description,
			Content = Markdown.ToHtml(article.Content ?? string.Empty, GetPipeline()),
			Creator = "Vladislav Antonyuk",
			Title = article.Name,
			PubDate = article.Created.ToString("R")
		};
	}

	private static string FormatXml(string xml)
	{
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

	private static MarkdownPipeline GetPipeline()
	{
		var mediaOptions = new MediaOptions();

		var builder = new MarkdownPipelineBuilder();
		builder.UseAbbreviations()
		       .UseAutoIdentifiers()
		       .UseCitations()
		       .UseCustomContainers()
		       .UseDefinitionLists()
		       .UseEmphasisExtras()
		       .UseFigures()
		       .UseFooters()
		       .UseFootnotes()
		       .UseGridTables()
		       .UseMediaLinks(mediaOptions)
		       .UsePipeTables()
		       .UseListExtras()
		       .UseTaskLists()
		       .UseAutoLinks()
		       .UseSmartyPants()
		       .UseEmojiAndSmiley();
		builder.UseMathematics();
		builder.UseDiagrams();

		builder.UseGenericAttributes(); // Must be last as it is one parser that is modifying other parsers
		return builder.Build();
	}
}