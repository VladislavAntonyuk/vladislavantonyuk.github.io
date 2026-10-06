User-facing applications increasingly expect flexible theming: light/dark modes, branded palettes, and accessibility-friendly variants. Implementing that cleanly in .NET MAUI often becomes boilerplate-heavy because you must manage multiple `ResourceDictionary` objects, merge resources, and wire up updates.

**Plugin.Maui.Theme** by [Illya Rybak](https://www.linkedin.com/in/illya-rybak-24442923a/) is a small library that centralizes theme management for MAUI apps. It provides a `ThemeService` singleton that registers `ResourceDictionary`-based themes, initializes them, and lets you switch at runtime with change notifications. This article provides a review, practical integration steps, examples, and best practices.

## Installation

Installation is simple via NuGet Package Manager or CLI:

```bash
dotnet add package Plugin.Maui.Theme --version 9.0.1
```

---

## Minimal Integration Example

To integrate the plugin, initialize it in `App.xaml.cs` (or your main window), register your themes, and handle theme changes. This allows runtime switching and persistence.

```csharp
using Plugin.Maui.Theme;
using Microsoft.Maui.Controls;
using Microsoft.Maui.Storage;

public partial class App : Application
{
    public App()
    {
        InitializeComponent();

        // Initialize ThemeService with app resources
        ThemeService.Current.InitAppResources(Resources);

        // Register themes
        ThemeService.Current.AddTheme(0, new LightTheme());
        ThemeService.Current.AddTheme(1, new DarkTheme());
        ThemeService.Current.AddTheme(2, new BrandTheme(), true); // default

        // Activate the service
        ThemeService.Current.InitService();

        // Subscribe to theme changes
        ThemeService.Current.ThemeChanged += Current_ThemeChanged;

        MainPage = new AppShell();
    }

    private void Current_ThemeChanged(object? sender, ThemeChangedEventArgs e)
    {
        // Persist the selected theme key
        Preferences.Default.Set("themeKey", e.Key);
    }

    // Example method to switch theme at runtime
    public void ChangeUserTheme(int key)
    {
        ThemeService.Current.ChangeTheme(key);
    }

    // Restore previously saved theme
    public void RestoreTheme()
    {
        int savedKey = Preferences.Default.Get("themeKey", 2);
        ThemeService.Current.ChangeTheme(savedKey);
    }
}
```

---

## Example ResourceDictionaries

**LightTheme.xaml**

```xml
<ResourceDictionary xmlns="http://schemas.microsoft.com/dotnet/2021/maui">
  <Color x:Key="AppBackground">#FFFFFF</Color>
  <Color x:Key="AppText">#222222</Color>

  <Style TargetType="Label">
    <Setter Property="TextColor" Value="{StaticResource AppText}" />
  </Style>
</ResourceDictionary>
```

**DarkTheme.xaml**

```xml
<ResourceDictionary xmlns="http://schemas.microsoft.com/dotnet/2021/maui">
  <Color x:Key="AppBackground">#121212</Color>
  <Color x:Key="AppText">#EAEAEA</Color>

  <Style TargetType="Label">
    <Setter Property="TextColor" Value="{StaticResource AppText}" />
  </Style>
</ResourceDictionary>
```

---

## Strengths

- Simple and focused API.  
- Real-time theme switching.  
- Event-driven for MVVM integration.  
- Cross-platform support.  

---

## Limitations

- Requires predefined `ResourceDictionary` themes.
- Integer keys may reduce readability if not wrapped.
- Automatic system theme sync must be implemented manually.

---

## Developer Notes

- Always use **resource keys**; hard-coded values won’t update dynamically.  
- Wrap integer theme keys in an **enum** or constants for clarity.  
- Keep dictionaries **modular** for maintainability.  
- Persist user-selected themes and restore on startup.  
- Subscribe to `ThemeChanged` for MVVM or non-visual logic updates.  
- Optimize large dictionaries to avoid minor UI performance spikes.

---

## Verdict

**Plugin.Maui.Theme** makes runtime theming in .NET MAUI simple, centralized, and event-driven. It reduces boilerplate, allows dynamic switching, and integrates well with MVVM patterns. While structured `ResourceDictionary` themes are still required, this plugin is an excellent choice for applications needing multiple visual styles or user-controlled theme selection.