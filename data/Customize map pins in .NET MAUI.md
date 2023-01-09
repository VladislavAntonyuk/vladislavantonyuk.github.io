Hello!

.NET MAUI's next major release is closer and closer. It brings a lot of bug fixes and new features. One of them is Maps control.

This article is devoted to the customization of standard map pins. We want to display a custom image instead of a standard pin icon.

Let's start!

## Custom Pin

First of all, we need to create a new control:

```csharp
public class CustomPin : Pin
{
	public static readonly BindableProperty ImageSourceProperty =
		BindableProperty.Create(nameof(ImageSource), typeof(ImageSource), typeof(CustomPin),
		                        propertyChanged: OnImageSourceChanged);

	public ImageSource? ImageSource
	{
		get => (ImageSource?)GetValue(ImageSourceProperty);
		set => SetValue(ImageSourceProperty, value);
	}

	public Microsoft.Maui.Maps.IMap? Map { get; set; }

	static async void OnImageSourceChanged(BindableObject bindable, object oldValue, object newValue)
	{
		var control = (CustomPin)bindable;
		if (control.Handler?.PlatformView is null)
		{
			// Workaround for when this executes the Handler and PlatformView is null
			control.HandlerChanged += OnHandlerChanged;
			return;
		}

#if IOS || MACCATALYST
		await control.AddAnnotation();
#else
		await Task.CompletedTask;
#endif

		void OnHandlerChanged(object? s, EventArgs e)
		{
			OnImageSourceChanged(control, oldValue, newValue);
			control.HandlerChanged -= OnHandlerChanged;
		}
	}
}
```

This control has a bindable property `ImageSource` that allows us to choose any image source to store our pin icon.

## Customize pin on Android

To be able to add, update, and remove map elements we need to store them in memory. To do that, let's create a `CustomMapHandler`:

```csharp
public class CustomMapHandler : MapHandler
{
	public static readonly IPropertyMapper<IMap, IMapHandler> CustomMapper =
		new PropertyMapper<IMap, IMapHandler>(Mapper)
		{
			[nameof(IMap.Pins)] = MapPins,
		};

	public CustomMapHandler() : base(CustomMapper, CommandMapper)
	{
	}

	public CustomMapHandler(IPropertyMapper? mapper = null, CommandMapper? commandMapper = null) : base(
		mapper ?? CustomMapper, commandMapper ?? CommandMapper)
	{
	}

	public List<Marker>? Markers { get; private set; }

	protected override void ConnectHandler(MapView platformView)
	{
		base.ConnectHandler(platformView);
		var mapReady = new MapCallbackHandler(this);
		PlatformView.GetMapAsync(mapReady);
	}

	private static new async void MapPins(IMapHandler handler, IMap map)
	{
		if (handler is CustomMapHandler mapHandler)
		{
			if (mapHandler.Markers != null)
			{
				foreach (var marker in mapHandler.Markers)
				{
					marker.Remove();
				}

				mapHandler.Markers = null;
			}

			await mapHandler.AddPins(map.Pins);
		}
	}

	private async Task AddPins(IEnumerable<IMapPin> mapPins)
	{
		if (Map is null || MauiContext is null)
		{
			return;
		}

		Markers ??= new List<Marker>();
		foreach (var pin in mapPins)
		{
			var pinHandler = pin.ToHandler(MauiContext);
			if (pinHandler is IMapPinHandler mapPinHandler)
			{
				var markerOption = mapPinHandler.PlatformView;
				if (pin is CustomPin cp)
				{
					var imageSourceHandler = new ImageLoaderSourceHandler();
					var bitmap = await imageSourceHandler.LoadImageAsync(cp.ImageSource, Application.Context);
					markerOption?.SetIcon(bitmap is null
						                      ? BitmapDescriptorFactory.DefaultMarker()
						                      : BitmapDescriptorFactory.FromBitmap(bitmap));
				}

				var marker = Map.AddMarker(markerOption);
				pin.MarkerId = marker.Id;
				Markers.Add(marker);
			}
		}
	}
}
```

The next step is notifying the handler that our pins are updated. We should do it when the map is ready:

```csharp
class MapCallbackHandler : Java.Lang.Object, IOnMapReadyCallback
{
	private readonly IMapHandler mapHandler;

	public MapCallbackHandler(IMapHandler mapHandler)
	{
		this.mapHandler = mapHandler;
	}

	public void OnMapReady(GoogleMap googleMap)
	{
		mapHandler.UpdateValue(nameof(IMap.Pins));
	}
}
```

The final step is registering our handler:

```csharp
builder.ConfigureMauiHandlers(handlers=>
		{
#if ANDROID
			handlers.AddHandler<Microsoft.Maui.Controls.Maps.Map, CustomMapHandler>();
#endif
		});
```

## Customize pin on iOS/MacCatalyst

iOS/MacCatalyst requires a bit more customization.

First, we need to create a new class `CustomAnnotation`. It stores an `UIImage` of our pin icon.

```csharp
public class CustomAnnotation : MKPointAnnotation
{
	public Guid Identifier { get; init; }
	public UIImage? Image { get; init; }
	public required IMapPin Pin { get; init; }
}
```

Then create the `MapExtensions` class with `AddAnnotation` method:

```csharp
public static partial class MapExtensions
{
	private static UIView? lastTouchedView;

	public static async Task AddAnnotation(this CustomPin pin)
	{
		var imageSourceHandler = new ImageLoaderSourceHandler();
		var image = await imageSourceHandler.LoadImageAsync(pin.ImageSource);
		var annotation = new CustomAnnotation()
		{
			Identifier = pin.Id,
			Image = image,
			Title = pin.Label,
			Subtitle = pin.Address,
			Coordinate = new CLLocationCoordinate2D(pin.Location.Latitude, pin.Location.Longitude),
			Pin = pin
		};
		pin.MarkerId = annotation;

		var nativeMap = (MauiMKMapView?)pin.Map?.Handler?.PlatformView;
		if (nativeMap is not null)
		{
			var customAnnotations = nativeMap.Annotations.OfType<CustomAnnotation>().Where(x => x.Identifier == annotation.Identifier).ToArray();
			nativeMap.RemoveAnnotations(customAnnotations);
			nativeMap.GetViewForAnnotation += GetViewForAnnotations;
			nativeMap.AddAnnotation(annotation);
		}
	}

	private static void OnCalloutClicked(IMKAnnotation annotation)
	{
		var pin = GetPinForAnnotation(annotation);
		if (lastTouchedView is MKAnnotationView)
			return;
		pin?.SendInfoWindowClick();
	}

	private static MKAnnotationView GetViewForAnnotations(MKMapView mapView, IMKAnnotation annotation)
	{
		MKAnnotationView? annotationView = null;

		if (annotation is CustomAnnotation customAnnotation)
		{
			annotationView = mapView.DequeueReusableAnnotation(customAnnotation.Identifier.ToString()) ??
							 new MKAnnotationView(annotation, customAnnotation.Identifier.ToString());
			annotationView.Image = customAnnotation.Image;
			annotationView.CanShowCallout = true;
		}

		var result = annotationView ?? new MKAnnotationView(annotation, null);
		AttachGestureToPin(result, annotation);
		return result;
	}

	static void AttachGestureToPin(MKAnnotationView mapPin, IMKAnnotation annotation)
	{
		var recognizers = mapPin.GestureRecognizers;

		if (recognizers != null)
		{
			foreach (var r in recognizers)
			{
				mapPin.RemoveGestureRecognizer(r);
			}
		}

		var recognizer = new UITapGestureRecognizer(g => OnCalloutClicked(annotation))
		{
			ShouldReceiveTouch = (gestureRecognizer, touch) =>
			{
				lastTouchedView = touch.View;
				return true;
			}
		};

		mapPin.AddGestureRecognizer(recognizer);
	}

	static IMapPin? GetPinForAnnotation(IMKAnnotation? annotation)
	{
		if (annotation is CustomAnnotation customAnnotation)
		{
			return customAnnotation.Pin;
		}

		return null;
	}
}
```

It's responsible for loading images and adding an annotation to the map.

That's all we need to customize .NET MAUI Map pins. Run the application and see the result:

![.NET MAUI Custom pins](https://ik.imagekit.io/VladislavAntonyuk/vladislavantonyuk/articles/30/android-pins.png)

The full code can be found on [GitHub](https://github.com/VladislavAntonyuk/MauiSamples/tree/main/MauiMaps){target="_blank"}.

Happy coding!