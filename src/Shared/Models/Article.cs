namespace Shared.Models;

public class Article : BaseEntity
{
    public required string Name { get; set; }
	public string? Content { get; set; }
	public string? Description { get; set; }
	public string? Keywords { get; set; }
	public string? Image { get; set; }
    public DateOnly Created { get; set; }
    public string? CategoryName { get; set; }
}

public class ErrorModel
{
    public string? Message { get; set; }
    public int Code { get; set; }
}