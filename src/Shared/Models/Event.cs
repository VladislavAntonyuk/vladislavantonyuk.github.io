namespace Shared.Models;

public class Event : BaseEntity
{
	public required string Name { get; set; }
	public required string Description { get; set; }
	public string? RedirectUrl { get; set; }
	public string? Image { get; set; }
	public string? Location { get; set; }
	public DateTimeOffset? Date { get; set; }
	public string? Price { get; set; }
}
