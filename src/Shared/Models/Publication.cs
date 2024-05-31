namespace Shared.Models;

public class Publication : BaseEntity
{
	public required string Name { get; set; }
	public string? Link { get; set; }
	public List<string> Authors { get; set; } = [];
	public string? Journal { get; set; }
	public string? Pages { get; set; }
	public DateOnly Date { get; set; }
	public string? DOI { get; set; }
	public List<string> Keywords { get; set; } = [];
}