namespace FileGenerator;

using System.Xml.Serialization;
using Models;
using Shared;
using Shared.Models;

public interface IRssService
{
	Task GenerateRss();
}

internal class RssService(ArticlesService articlesService, EventsService eventsService, IUrlCreator urlCreator) : IRssService
{
	private const string FilePath = "rss.xml";

	public async Task GenerateRss()
	{
		Rss rss = new()
		{
			Channel = new Channel
			{
				LastBuildDate = DateTime.UtcNow.ToString("R"),
				Link = urlCreator.Encode(""),
				Link2 = new Link
				{
					Href = urlCreator.Encode("rss"),
					Rel = "self",
					Type = "application/rss+xml"
				},
				Description = $"{Constants.ProductName} - Personal Website",
				Title = Constants.ProductName,
				Items = []
			}
		};
		var articles = await articlesService.GetArticles();
		if (articles.Count == 0)
		{
			return;
		}

		rss.Channel.Items.AddRange(articles.Select(CreateItem));

		var events = await eventsService.GetEvents();
		if (events.Count > 0)
		{
			rss.Channel.Items.AddRange(events.Select(CreateItem));
		}

		var ns = new XmlSerializerNamespaces();
		ns.Add("content", "http://purl.org/rss/1.0/modules/content/");
		ns.Add("atom", "http://www.w3.org/2005/Atom");
		ns.Add("dc", "http://purl.org/dc/elements/1.1/");
		var serializer = new XmlSerializer(typeof(Rss));
		await using var writer = new StreamWriter(FilePath);
		serializer.Serialize(writer, rss, ns);
		writer.Close();
	}

	private Item CreateItem(Article article)
	{
		var url = urlCreator.Encode("articles", article.Name);
		var content = $"<p>{article.Description}</p><a href='{url}'>{url}</a>";
		return new Item
		{
			Link = url,
			Guid = url,
			Description = article.Description,
			Content = content,
			Creator = Constants.ProductName,
			Title = article.Name,
			PubDate = article.Created.ToString("R")
		};
	}

	private Item CreateItem(Event @event)
	{
		var url = urlCreator.Encode("events", @event.Name);
		var content = $"<p>{Markdig.Markdown.ToHtml(@event.Description)}</p><a href='{url}'>{url}</a>";
		return new Item
		{
			Link = url,
			Guid = url,
			Description = @event.Description,
			Content = content,
			Creator = Constants.ProductName,
			Title = @event.Name,
			PubDate = (@event.Date - TimeSpan.FromDays(30)).GetValueOrDefault().DateTime.ToString("R")
		};
	}
}