namespace VladislavAntonyuk.Components.Layouts;

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using MudBlazor;

public partial class MainLayout(NavigationManager navigationManager) : LayoutComponentBase
{
	private static readonly string[] FontFamily = ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"];

	private readonly MudTheme theme = new()
	{
		PaletteLight = new MudMarkdownPaletteLight()
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
			Background = "#f6f7fb",
			BackgroundGray = "#eef1f8",
			Surface = "#ffffff",
			TextPrimary = "#0f172a",
			TextSecondary = "#475569",
			LinesDefault = "#e5e8f0",
			Divider = "#e5e8f0",
			AppbarBackground = "rgba(255,255,255,0.8)",
			AppbarText = "#0f172a",
			DrawerBackground = "#f6f7fb",
			DrawerText = "#334155",
			DrawerIcon = "#64748b",
			CodeHighlight = MudCodeHighlightThemes.Light.GitHub
		},
		PaletteDark = new MudMarkdownPaletteDark()
		{
			Primary = "#7C93FF",
			PrimaryContrastText = Colors.Shades.White,
			Secondary = "#00C2FF",
			SecondaryContrastText = Colors.Shades.White,
			Info = "#818cf8",
			Success = "#34d399",
			Warning = "#fbbf24",
			Error = "#f87171",
			Dark = "#020617",
			Background = "#0b1020",
			BackgroundGray = "#111831",
			Surface = "#121a30",
			TextPrimary = "#e6e9f2",
			TextSecondary = "#9aa4bf",
			LinesDefault = "rgba(148,163,184,0.14)",
			Divider = "rgba(148,163,184,0.14)",
			ActionDefault = "#9aa4bf",
			AppbarBackground = "rgba(11,16,32,0.75)",
			AppbarText = "#e6e9f2",
			DrawerBackground = "#0b1020",
			DrawerText = "#c7cde0",
			DrawerIcon = "#8b95b2",
			CodeHighlight = MudCodeHighlightThemes.Dark.GitHub
		},
		LayoutProperties = new LayoutProperties
		{
			DefaultBorderRadius = "12px"
		},
		Typography = new Typography
		{
			Default = new DefaultTypography
			{
				FontFamily = FontFamily,
				LineHeight = "1.6"
			},
			Button = new ButtonTypography
			{
				FontFamily = FontFamily,
				FontWeight = "600",
				TextTransform = "none",
				LetterSpacing = "0"
			},
			H1 = new H1Typography
			{
				FontFamily = FontFamily,
				FontSize = "2.55rem",
				FontWeight = "800",
				LetterSpacing = "-0.02em",
				LineHeight = "1.15"
			},
			H2 = new H2Typography
			{
				FontFamily = FontFamily,
				FontSize = "2.05rem",
				FontWeight = "700"
			},
			H3 = new H3Typography
			{
				FontFamily = FontFamily,
				FontSize = "1.78rem",
				FontWeight = "600"
			},
			H4 = new H4Typography
			{
				FontFamily = FontFamily,
				FontSize = "1.52rem",
				FontWeight = "600"
			},
			H5 = new H5Typography
			{
				FontFamily = FontFamily,
				FontSize = "1.28rem",
				FontWeight = "600"
			},
			H6 = new H6Typography { FontFamily = FontFamily, FontWeight = "600" },
			Subtitle1 = new Subtitle1Typography { FontFamily = FontFamily },
			Subtitle2 = new Subtitle2Typography { FontFamily = FontFamily },
			Body1 = new Body1Typography { FontFamily = FontFamily },
			Body2 = new Body2Typography { FontFamily = FontFamily },
			Caption = new CaptionTypography { FontFamily = FontFamily },
			Overline = new OverlineTypography { FontFamily = FontFamily, FontWeight = "700", LetterSpacing = "0.08em" }
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