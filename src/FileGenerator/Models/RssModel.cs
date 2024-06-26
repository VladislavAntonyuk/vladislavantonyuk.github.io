﻿namespace FileGenerator.Models;

using System.Xml;
using System.Xml.Schema;
using System.Xml.Serialization;

[XmlRoot(ElementName = "link", Namespace = "http://www.w3.org/2005/Atom")]
public class Link
{
	[XmlAttribute(AttributeName = "href")]
	public string? Href { get; set; }

	[XmlAttribute(AttributeName = "rel")]
	public string? Rel { get; set; }

	[XmlAttribute(AttributeName = "type")]
	public string? Type { get; set; }
}

[XmlRoot(ElementName = "item")]
public class Item
{
	[XmlElement(ElementName = "title")]
	public CData? Title { get; set; }

	[XmlElement(ElementName = "link")]
	public string? Link { get; set; }

	[XmlElement(ElementName = "pubDate")]
	public string? PubDate { get; set; }

	[XmlElement(ElementName = "guid")]
	public string? Guid { get; set; }

	[XmlElement(ElementName = "description")]
	public CData? Description { get; set; }

	[XmlElement(ElementName = "encoded", Namespace = "http://purl.org/rss/1.0/modules/content/")]
	public CData? Content { get; set; }

	[XmlElement(ElementName = "creator", Namespace = "http://purl.org/dc/elements/1.1/")]
	public CData? Creator { get; set; }
}

[XmlRoot(ElementName = "channel")]
public class Channel
{
	[XmlElement(ElementName = "title")]
	public CData? Title { get; set; }

	[XmlElement(ElementName = "link")]
	public string? Link { get; set; }

	[XmlElement(ElementName = "link", Namespace = "http://www.w3.org/2005/Atom")]
	public Link? Link2 { get; set; }

	[XmlElement(ElementName = "description")]
	public CData? Description { get; set; }

	[XmlElement(ElementName = "lastBuildDate")]
	public string? LastBuildDate { get; set; }

	[XmlElement(ElementName = "item")]
	public List<Item> Items { get; set; } = [];
}

[XmlRoot(ElementName = "rss")]
public class Rss
{
	[XmlElement(ElementName = "channel")]
	public Channel? Channel { get; set; }

	[XmlAttribute(AttributeName = "version")]
	public string Version { get; set; } = "2.0";

}

public class CData(string? value) : IXmlSerializable
{
	private string? value = value;

	public CData() : this(string.Empty)
	{
	}

	public XmlSchema? GetSchema()
	{
		return null;
	}

	public void ReadXml(XmlReader reader)
	{
		value = reader.ReadElementString();
	}

	public void WriteXml(XmlWriter writer)
	{
		writer.WriteCData(value);
	}

	public static implicit operator CData(string? value)
	{
		return new CData(value);
	}

	public static implicit operator string?(CData cdata)
	{
		return cdata.value;
	}

	public override string? ToString()
	{
		return value;
	}
}