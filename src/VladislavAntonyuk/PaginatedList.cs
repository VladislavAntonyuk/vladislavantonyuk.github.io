namespace VladislavAntonyuk.Application.UseCases;

public class PaginatedList<T>
{
	public PaginatedList(IReadOnlyCollection<T> items, int totalCount, int pageIndex, int pageSize)
	{
		PageIndex = pageIndex;
		TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
		TotalCount = totalCount;
		Items = items;
	}

	public bool HasPreviousPage => PageIndex > 1;

	public bool HasNextPage => PageIndex < TotalPages;

	public IReadOnlyCollection<T> Items { get; }
	public int PageIndex { get; }
	public int TotalPages { get; }
	public int TotalCount { get; }
}