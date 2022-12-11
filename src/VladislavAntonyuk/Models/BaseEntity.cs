namespace VladislavAntonyuk.Models;

public abstract class BaseEntity
{
	public int Id { get; set; }
	public DateOnly Created { get; set; }
}