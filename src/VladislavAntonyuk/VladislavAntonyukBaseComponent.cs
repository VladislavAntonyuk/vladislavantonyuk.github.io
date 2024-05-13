namespace VladislavAntonyuk;

using Microsoft.AspNetCore.Components;
using MudBlazor;

public abstract class VladislavAntonyukBaseComponent : MudComponentBase
{
	protected override async Task OnInitializedAsync()
	{
		await base.OnInitializedAsync();
	}
}