namespace Shared.Models;

public class Event : BaseEntity
{
	public required string Name { get; set; }
	public string? Description { get; set; }
	public string? RedirectUrl { get; set; }
	public string? Image { get; set; }
}
