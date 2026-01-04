namespace Shared.Models;

public class Project : BaseEntity
{
	public required string Name { get; set; }
	public string? Description { get; set; }
	public string? Image { get; set; }
	public string? Link { get; set; }
	public int StartYear { get; set; }
	public int? EndYear { get; set; }
}