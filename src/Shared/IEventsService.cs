namespace Shared;

using Models;

public interface IEventsService
{
	Task<Event?> Get(string name);
	Task<List<Event>> Filter(string? searchParameter);
}
