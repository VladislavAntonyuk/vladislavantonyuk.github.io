namespace VladislavAntonyuk.Components.Layouts;

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using MudBlazor;

public partial class MainLayout(NavigationManager navigationManager) : LayoutComponentBase
{
	private readonly MudTheme theme = new()
	{
		Typography = new Typography
		{
			H1 = new H1
			{
				FontSize = "2.5rem"
			},
			H2 = new H2
			{
				FontSize = "2rem"
			}
			,
			H3 = new H3
			{
				FontSize = "1.75rem"
			},
			H4 = new H4
			{
				FontSize = "1.5rem"
			},
			H5 = new H5
			{
				FontSize = "1.25rem"
			}
		}
	};

	private bool drawerOpen = true;
	private ErrorBoundary? errorBoundary;
	private bool isDarkMode = true;
	private MudThemeProvider? mudThemeProvider;

	private void DrawerToggle()
	{
		drawerOpen = !drawerOpen;
	}

	protected override async Task OnAfterRenderAsync(bool firstRender)
	{
		await base.OnAfterRenderAsync(firstRender);
		if (firstRender)
		{
			if (mudThemeProvider is not null)
			{
				var isDarkSystemPreference = await mudThemeProvider.GetSystemPreference();
				if (isDarkMode != isDarkSystemPreference)
				{
					isDarkMode = isDarkSystemPreference;
					StateHasChanged();
				}
			}
		}
		//var isForbiddenLocation = await LocationVerifier.IsForbidden(ApplicationInfo.UserInfo.RemoteIpAddress);
		//if (isForbiddenLocation)
		//{
		//	await dialogService.ShowAsync<War>("War in Ukraine");
		//}
	}

	private void ResetError()
	{
		errorBoundary?.Recover();
		navigationManager.NavigateTo("/");
	}

	private void RssClicked()
	{
		navigationManager.NavigateTo("/rss.xml", true);
	}
}