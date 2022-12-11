using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace VladislavAntonyuk.Services;

public static class DisqusInterop
{
	public static ValueTask<bool> CreateDisqus(IJSRuntime jsRuntime, ElementReference disqusThreadElement)
	{
		return jsRuntime.InvokeAsync<bool>("DisqusFunctions.createDisqus", CancellationToken.None, disqusThreadElement);
	}

	public static ValueTask<bool> ResetDisqus(IJSRuntime jsRuntime,
		string newIdentifier,
		string newUrl,
		string newTitle)
	{
		return jsRuntime.InvokeAsync<bool>("DisqusFunctions.resetDisqus", CancellationToken.None, newIdentifier, newUrl,
		                                   newTitle);
	}
}