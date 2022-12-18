namespace Shared.Models;

public class Project : BaseEntity
{
	public required string Name { get; set; }
	public string? Description { get; set; }
	public string? Image { get; set; }
	public string? Link { get; set; }
}