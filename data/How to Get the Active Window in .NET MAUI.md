.NET MAUI introduces a powerful multi-window feature that enables developers to create rich, multi-window experiences across different platforms. This allows users to open multiple windows within the application, enhancing productivity and flexibility. However, one key feature missing from the framework is the ability to retrieve the currently active window. This limitation can be challenging when trying to display popups, manage UI state dynamically, or interact with the user's current window context.

This article aims to provide a simple, cross-platform way to overcome this limitation by implementing a custom solution that tracks the active window in .NET MAUI.

## Implementing a Custom Window Class

To track the active window, we can extend the `Window` class. Create a custom Window class `WindowEx`.

```csharp
public class WindowEx(Page page) : Window(page)
{
    public bool IsActive { get; private set; }

    protected override void OnActivated()
    {
        base.OnActivated();
        IsActive = true;
    }

    protected override void OnDeactivated()
    {
        IsActive = false;
        base.OnDeactivated();
    }
}
```

In this implementation, the `WindowEx` class exposes an `IsActive` property that indicates whether the window is currently active. The `OnActivated` and `OnDeactivated` methods are overridden to update the `IsActive` property accordingly.

That's it! We have a custom `WindowEx` class that tracks the active window state. Now, whenever you need to create a new window, use the `WindowEx` class instead of the default `Window` class.

Let's also create some extension methods.

```csharp
public static partial class WindowExtensions
{
    public static bool IsActive(this Window window)
    {
        return window is WindowEx { IsActive: true };
    }

    public static Window GetActiveWindow(this IApplication application)
    {
        return application.Windows.OfType<WindowEx>().First(x => x.IsActive);
    }
}
```

The `IsActive` extension method checks if the window is an instance of `WindowEx` and if it is active. The `GetActiveWindow` method retrieves the first active window from the application's window collection.

## Platform-Specific Considerations

While there is no direct cross-platform API to obtain the active window, this can be achieved using platform-specific implementations. For example, on Android, you can access the current activity's window using:

```csharp
var currentWindow = Platform.CurrentActivity?.Window;
```

Since MAUI aims to provide a unified experience, the approach in this article offers a simple and effective cross-platform solution without relying on platform-specific code.

## Conclusion

By extending the `Window` class and implementing the `WindowEx` subclass, we can reliably track the active window in .NET MAUI. The provided extension methods make it easy to check for the currently active window and use it dynamically within your application, ensuring a seamless multi-window experience.

You can find the source code on [GitHub](https://github.com/VladislavAntonyuk/MauiSamples/tree/main/MauiMultiWindow){target="_blank"}.