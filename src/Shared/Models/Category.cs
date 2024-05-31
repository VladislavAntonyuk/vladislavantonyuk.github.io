namespace Shared.Models;

public class Category : BaseEntity
{
	public string Name { get; set; } = string.Empty;
	public string? Description { get; set; }
	public List<Article> Articles { get; set; } = [];
}