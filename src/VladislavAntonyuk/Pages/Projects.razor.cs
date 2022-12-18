namespace VladislavAntonyuk.Pages;

using global::Shared;
using global::Shared.Models;
using Microsoft.AspNetCore.Components;

public partial class Projects : VladislavAntonyukBaseComponent
{
	[Parameter]
	[SupplyParameterFromQuery]
	public int? Page { get; set; }

	[Inject]
	public required IUrlCreator UrlCreator { get; set; }

	[Inject]
	public required IProjectsService ProjectsService { get; set; }

	private async Task<PaginatedList<Project>> LoadProjects(int page, string? searchParameter)
	{
		const int pageSize = 10;
		var projects = await ProjectsService.GetProjects(searchParameter);

		var result = projects.Skip((page - 1) * pageSize).Take(pageSize).ToList();

		return new PaginatedList<Project>(result, projects.Count, page - 1, pageSize);
	}
}