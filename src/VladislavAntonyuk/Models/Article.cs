namespace VladislavAntonyuk.Models;

public class Article : BaseEntity
{
    public string Name { get; set; } = "";
	public string? Content { get; set; }
	public string? Description { get; set; }
	public string? Keywords { get; set; }
	public string? ImageUrl { get; set; }
	public bool IsActive { get; set; }
    public Category Category { get; set; } = new();
}