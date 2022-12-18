namespace VladislavAntonyuk;

using Microsoft.AspNetCore.Components;

public abstract class VladislavAntonyukBaseComponent : ComponentBase
{
	protected override async Task OnInitializedAsync()
	{
		await base.OnInitializedAsync();
	}
}