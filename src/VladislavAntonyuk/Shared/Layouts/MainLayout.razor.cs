namespace VladislavAntonyuk.Shared.Layouts;

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using MudBlazor;

public partial class MainLayout : LayoutComponentBase
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

	[Inject]
	public required IDialogService DialogService { get; set; }

	[CascadingParameter]
	public required App.AppInfo ApplicationInfo { get; set; }

	//[Inject]
	//public required ILocationVerifier LocationVerifier { get; set; }

	[Inject]
	public required NavigationManager NavigationManager { get; set; }

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
		//	await DialogService.ShowAsync<War>("War in Ukraine");
		//}
	}

	private void ResetError()
	{
		errorBoundary?.Recover();
		NavigationManager.NavigateTo("/");
	}

	private void RssClicked()
	{
		NavigationManager.NavigateTo("/rss.xml", true);
	}
}