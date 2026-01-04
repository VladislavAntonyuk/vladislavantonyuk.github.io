namespace VladislavAntonyuk.Components.Navigation;

using Microsoft.AspNetCore.Components;
using Shared;
using Shared.Models;

public class ProjectsNavigationComponent(NavigationManager navigation, IProjectsService projectsService) : BaseNavigationComponent<Project>(navigation)
{
	public override string Title => "Projects";

	protected override async Task<PaginatedList<Project>> GetData()
	{
		const int pageSize = 10;
		var projects = await projectsService.Get(SearchFilter);

		var result = projects.OrderByDescending(x => x.EndYear).ThenBy(x => x.Id).Skip((Page - 1) * pageSize).Take(pageSize).ToList();

		return new PaginatedList<Project>(result, projects.Count, Page - 1, pageSize);
	}
}