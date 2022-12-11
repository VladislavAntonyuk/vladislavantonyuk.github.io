using Microsoft.AspNetCore.Components;

namespace VladislavAntonyuk;

public abstract class VladislavAntonyukBaseComponent : ComponentBase
{
	protected override async Task OnInitializedAsync()
	{
		await base.OnInitializedAsync();
	}
}