namespace VladislavAntonyuk;

public class PaginatedList<T>(IReadOnlyCollection<T> items, int totalCount, int pageIndex, int pageSize)
{
	public IReadOnlyCollection<T> Items { get; } = items;
	public int PageIndex { get; } = pageIndex;
	public int TotalPages { get; } = (int)Math.Ceiling(totalCount / (double)pageSize);
	public int TotalCount { get; } = totalCount;
}