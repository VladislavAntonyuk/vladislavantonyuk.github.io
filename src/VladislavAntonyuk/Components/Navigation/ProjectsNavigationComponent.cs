namespace VladislavAntonyuk.Components.Navigation;

using Microsoft.AspNetCore.Components;
using Shared;
using Shared.Models;

public class ProjectsNavigationComponent : BaseNavigationComponent<Project>
{

	[Inject]
	public required IProjectsService ProjectsService { get; set; }

	public override string Title => "Projects";

	protected override async Task<PaginatedList<Project>> GetData()
	{
		const int pageSize = 10;
		var projects = await ProjectsService.Get(SearchFilter);

		var result = projects.Skip((Page - 1) * pageSize).Take(pageSize).ToList();

		return new PaginatedList<Project>(result, projects.Count, Page - 1, pageSize);
	}
}