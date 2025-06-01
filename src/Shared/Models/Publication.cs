namespace Shared.Models;

public enum JournalCategory
{
	A,
	B
}

public class Publication : BaseEntity
{
	public List<string> Authors { get; set; } = [];
	public required string Name { get; set; }
	public string? Journal { get; set; }
	public JournalCategory JournalCategory { get; set; }
	public string? Volume { get; set; }
	public string? Pages { get; set; }
	public required string Date { get; set; }
	public string? Doi { get; set; }
	public List<string> Keywords { get; set; } = [];
	public string? Link { get; set; }
}

public class Thesis : BaseEntity
{
	public List<string> Authors { get; set; } = [];
	public required string Name { get; set; }
	public string? Journal { get; set; }
	public string? Volume { get; set; }
	public string? Pages { get; set; }
	public required string Date { get; set; }
	public List<string> Keywords { get; set; } = [];
	public string? Link { get; set; }
}