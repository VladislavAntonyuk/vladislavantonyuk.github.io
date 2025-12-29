namespace VladislavAntonyuk.Components.Layouts;

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using MudBlazor;

public partial class MainLayout(NavigationManager navigationManager) : LayoutComponentBase
{
	private readonly MudTheme theme = new()
	{
		PaletteLight = new PaletteLight()
		{
			Primary = "#5F7FFF",
			PrimaryContrastText = Colors.Shades.White,
			Secondary = "#00C2FF",
			SecondaryContrastText = Colors.Shades.White,
			Info = "#3b82f6",
			Success = "#22c55e",
			Warning = "#eab308",
			Error = "#ef4444",
			Dark = "#0f172a",
			Background = "#f5f7fb",
			Surface = "#ffffff",
			AppbarBackground = "#5F7FFF",
			AppbarText = Colors.Shades.White,
			DrawerBackground = "#ffffff",
		},
		PaletteDark = new PaletteDark()
		{
			Primary = "#5F7FFF",
			PrimaryContrastText = Colors.Shades.White,
			Secondary = "#00C2FF",
			SecondaryContrastText = Colors.Shades.White,
			Info = "#818cf8",
			Success = "#34d399",
			Warning = "#fbbf24",
			Error = "#f87171",
			Dark = "#020617",
			Background = "#020617",
			Surface = "#0f172a",
			AppbarBackground = "#5F7FFF",
			AppbarText = Colors.Shades.White,
			DrawerBackground = "#0f172a",
		},
		Typography = new Typography
		{
			H1 = new H1Typography
			{
				FontSize = "2.55rem",
				FontWeight = "700",
				LetterSpacing = "0.5px"
			},
			H2 = new H2Typography
			{
				FontSize = "2.05rem",
				FontWeight = "700"
			},
			H3 = new H3Typography
			{
				FontSize = "1.78rem",
				FontWeight = "600"
			},
			H4 = new H4Typography
			{
				FontSize = "1.52rem",
				FontWeight = "600"
			},
			H5 = new H5Typography
			{
				FontSize = "1.28rem",
				FontWeight = "600"
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

	private void ToggleTheme()
	{
		isDarkMode = !isDarkMode;
		StateHasChanged();
	}

	protected override async Task OnAfterRenderAsync(bool firstRender)
	{
		await base.OnAfterRenderAsync(firstRender);
		if (firstRender)
		{
			if (mudThemeProvider is not null)
			{
				var isDarkSystemPreference = await mudThemeProvider.GetSystemDarkModeAsync();
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