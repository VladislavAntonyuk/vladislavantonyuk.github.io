namespace Shared.Models;

public class Thesis : BaseEntity
{
	public List<string> Authors { get; set; } = [];
	public required string Name { get; set; }
	public string? Journal { get; set; }
	public string? Pages { get; set; }
	public required string Date { get; set; }
	public string? Link { get; set; }
}