Hello from sunny July! As a good tradition, it's time for [MAUI UI July 2025](https://goforgoldman.com/posts/mauiuijuly-25/). Thanks to Matt Goldman for the organization.

IP cameras are essential tools for surveillance, monitoring, and live streaming applications. With .NET MAUI, developers can create powerful cross-platform applications that transform mobile devices into fully functional IP cameras. This article explores two innovative approaches to implementing IP camera functionality using the .NET MAUI Community Toolkit Camera: `MJPEG streaming` for real-time image capture and `Video recording` for continuous video streaming.

🔄 **Give Your Old Phone a Second Life!** If you have an old smartphone lying around, don't throw it away! This IP camera implementation is perfect for repurposing older devices into dedicated security cameras or monitoring systems. Install your MAUI IP camera app and place the device wherever you need surveillance coverage.

## Setting up the Project

Before implementing IP camera functionality, let's set up the basic project structure and dependencies.

### 1. Install Required NuGet Packages

Add the CommunityToolkit.Maui.Camera package to your .NET MAUI project:

```xml
<PackageReference Include="CommunityToolkit.Maui.Camera" Version="3.0.1" />
```

### 2. Configure MauiProgram.cs

Update your `MauiProgram.cs` to register the camera services:

```csharp
public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .UseMauiCommunityToolkit()
            .UseMauiCommunityToolkitCamera();

        builder.Services.AddSingleton<CameraViewModel>();
        builder.Services.AddSingleton<ILocalIpService, LocalIpService>();

        return builder.Build();
    }
}
```

### 3. Platform-specific IP Address Services

To broadcast the camera stream over the network, we need to detect the device's local IP address on each platform.

**ILocalIpService.cs** (Shared):

```csharp
public interface ILocalIpService
{
    IPAddress GetLocalIpAddress();
}
```

**Android Implementation**:
```csharp
public class LocalIpService : ILocalIpService
{
    public IPAddress GetLocalIpAddress()
    {
        var context = Android.App.Application.Context;
        var wifiManager = (WifiManager)context.GetSystemService(Context.WifiService);
        var ip = wifiManager?.ConnectionInfo?.IpAddress ?? 0;

        var ipAddress = string.Format(
            "{0}.{1}.{2}.{3}",
            (ip & 0xFF),
            (ip >> 8) & 0xFF,
            (ip >> 16) & 0xFF,
            (ip >> 24) & 0xFF
        );

        return IPAddress.Parse(ipAddress);
    }
}
```

**Windows Implementation**:
```csharp
public class LocalIpService : ILocalIpService
{
    public IPAddress GetLocalIpAddress()
    {
        return NetworkInterface.GetAllNetworkInterfaces()
                               .SelectMany(x => x.GetIPProperties().UnicastAddresses)
                               .Where(x => x.Address.AddressFamily == AddressFamily.InterNetwork && x.IsDnsEligible)
                               .Select(x => x.Address)
                               .FirstOrDefault(IPAddress.Loopback);
    }
}
```

## Approach 1: MJPEG Streaming

MJPEG (Motion JPEG) streaming enables real-time video by capturing sequential JPEG images at a specified frame rate. This approach is perfect for applications requiring low latency and is compatible with most web browsers.

### Implementation

The MJPEG approach captures images from the camera at regular intervals and streams them to connected clients using the HTTP multipart/x-mixed-replace content type.

#### CameraViewModel

```csharp
public partial class CameraViewModel : ObservableObject
{
    private const int Port = 5555;
    private const int Frequency = 100;
    private readonly string ipAddress;
    private readonly LocalHttpServer server;

    public CameraViewModel(ILocalIpService localIpService)
    {
        var localIp = localIpService.GetLocalIpAddress();
        server = new LocalHttpServer(localIp, Port, Frequency);
        IpAddressText = ipAddress = $"{localIp}:{Port}";
        AvailableResolutions = new ObservableCollection<Size>();
    }

    [ObservableProperty]
    public partial string IpAddressText { get; set; }

    public ObservableCollection<Size> AvailableResolutions { get; }

    [ObservableProperty]
    public partial Size SelectedResolution { get; set; } = new(800, 600);

    [RelayCommand(AllowConcurrentExecutions = false, IncludeCancelCommand = true)]
    private async Task StartMjpegStream(CameraView cameraView, CancellationToken cancellationToken)
    {
        IpAddressText = $"http://{ipAddress}/mjpeg";
        DeviceDisplay.KeepScreenOn = true;
        _ = server.StartAsync(MaxConnectionsCount, cancellationToken);
        await CaptureMjpegAsync(cameraView, cancellationToken);
        DeviceDisplay.KeepScreenOn = false;
    }

    private async Task CaptureMjpegAsync(CameraView cameraView, CancellationToken cancellationToken)
    {
        cameraView.ImageCaptureResolution = SelectedResolution;
        await cameraView.StartCameraPreview(cancellationToken);

        while (!cancellationToken.IsCancellationRequested)
        {
            await using var stream = await cameraView.CaptureImage(CancellationToken.None);
            server.SetMjpegStream(stream);
            await Task.Delay(Frequency, CancellationToken.None);
        }

        cameraView.StopCameraPreview();
        server.Stop();
    }
}
```

#### HTTP Server for MJPEG

The `LocalHttpServer` handles client connections and streams JPEG images:

```csharp
public class LocalHttpServer(IPAddress ipAddress, int port, int frequency)
{
    private TcpListener? listener;
    private byte[]? currentMjpegFrame;
    private long mjpegFrameTimestamp;
    private readonly ConcurrentDictionary<NetworkStream, byte> activeClients = new();

    public void SetMjpegStream(Stream stream)
    {
        if (stream.Length == 0 || activeClients.IsEmpty)
            return;

        var buffer = new byte[stream.Length];
        stream.Position = 0;
        stream.ReadExactly(buffer, 0, buffer.Length);

        currentMjpegFrame = buffer;
        mjpegFrameTimestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
    }

    private async Task SendMjpegStreamAsync(NetworkStream stream, CancellationToken token)
    {
        var boundary = $"mjpeg-{Guid.NewGuid():N}";
        var header = $"HTTP/1.1 200 OK\r\n" +
                     $"Content-Type: multipart/x-mixed-replace; boundary={boundary}\r\n" +
                     "Connection: keep-alive\r\n" +
                     "Cache-Control: no-cache\r\n" +
                     "Pragma: no-cache\r\n\r\n";

        await stream.WriteAsync(Encoding.UTF8.GetBytes(header), token);

        var lastTimestamp = 0L;

        while (!token.IsCancellationRequested)
        {
            var frame = currentMjpegFrame;
            var timestamp = mjpegFrameTimestamp;

            if (frame == null || timestamp <= lastTimestamp)
            {
                await Task.Delay(frequency, token);
                continue;
            }

            var partHeader = $"--{boundary}\r\n" +
                             $"Content-Type: image/jpeg\r\n" +
                             $"Content-Length: {frame.Length}\r\n\r\n";

            await stream.WriteAsync(Encoding.UTF8.GetBytes(partHeader), token);
            await stream.WriteAsync(frame, token);
            await stream.FlushAsync(token);

            lastTimestamp = timestamp;
        }
    }
}
```

## Approach 2: Video Recording Stream

The second approach leverages the [upcoming](https://github.com/CommunityToolkit/Maui/pull/2710) .NET MAUI Community Toolkit Camera video recording capabilities. This method records continuous video segments and streams them as MP4 files, providing both video and audio streaming for a complete surveillance solution.

> 🎵 **Audio Support**: Unlike MJPEG streaming which only handles images, the video recording approach captures both video and audio, making it perfect for applications requiring full audiovisual monitoring.

### Implementation

```csharp
[RelayCommand(AllowConcurrentExecutions = false, IncludeCancelCommand = true)]
private async Task StartVideoStream(CameraView cameraView, CancellationToken cancellationToken)
{
    IpAddressText = $"http://{ipAddress}/player";
    DeviceDisplay.KeepScreenOn = true;
    _ = server.StartAsync(MaxConnectionsCount, cancellationToken);
    await CaptureVideoAsync(cameraView, cancellationToken);
    DeviceDisplay.KeepScreenOn = false;
}

private async Task CaptureVideoAsync(CameraView cameraView, CancellationToken cancellationToken)
{
    cameraView.ImageCaptureResolution = SelectedResolution;
    await cameraView.StartCameraPreview(cancellationToken);

    while (!cancellationToken.IsCancellationRequested)
    {
        using var stream = new MemoryStream();
        await cameraView.StartVideoRecording(stream, CancellationToken.None);
        await Task.Delay(VideoDurationMs, CancellationToken.None);
        await cameraView.StopVideoRecording(CancellationToken.None);
        server.SetVideoStream(stream);
    }

    cameraView.StopCameraPreview();
    server.Stop();
}
```

#### Video Stream HTTP Server

The server serves video segments with an HTML5 player:

```csharp
private async Task SendVideoStreamAsync(NetworkStream stream, CancellationToken token)
{
    if (videoStreamBytes == null)
    {
        const string errorResponse = "HTTP/1.1 404 Not Found\r\n\r\nVideo stream not available";
        await stream.WriteAsync(Encoding.UTF8.GetBytes(errorResponse), token);
        return;
    }

    var header = $"HTTP/1.1 200 OK\r\n" +
                 $"Content-Type: video/mp4\r\n" +
                 $"Content-Length: {videoStreamBytes.Length}\r\n" +
                 "Connection: close\r\n" +
                 "Cache-Control: no-cache\r\n" +
                 "Pragma: no-cache\r\n\r\n";

    await stream.WriteAsync(Encoding.UTF8.GetBytes(header), token);
    await stream.WriteAsync(videoStreamBytes, token);
    await stream.FlushAsync(token);

    stream.Close();
}

private async Task SendPlayerAsync(NetworkStream stream, CancellationToken token)
{
    var header = $"HTTP/1.1 200 OK\r\n" +
                 $"Content-Type: text/html\r\n" +
                 "Connection: close\r\n" +
                 "Cache-Control: no-cache\r\n" +
                 "Pragma: no-cache\r\n\r\n";

    await stream.WriteAsync(Encoding.UTF8.GetBytes(header), token);

    await stream.WriteAsync(
        """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>MAUI IP Camera Video player</title>
            <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #000; }
                video { max-width: 100%; max-height: 100vh; }
                .controls { position: fixed; bottom: 10px; width: 100%; text-align: center; }
                button { background: rgba(255,255,255,0.7); border: none; padding: 8px 16px; border-radius: 4px; margin: 0 5px; }
            </style>
        </head>
        <body>
            <video id="videoPlayer" controls playsinline webkit-playsinline></video>
            <div class="controls">
                <button id="refreshBtn">Refresh Video</button>
            </div>

            <script>
                const video = document.getElementById('videoPlayer');
                const refreshBtn = document.getElementById('refreshBtn');
                let timestamp = new Date().getTime();

                function loadVideo() {
                    timestamp = new Date().getTime();
                    video.src = `/stream?t=${timestamp}`;
                    video.load();
                    video.play().catch(err => {
                        console.error('Error playing video:', err);
                    });
                }

                loadVideo();

                video.addEventListener('ended', loadVideo);
                video.addEventListener('error', (e) => {
                    console.error('Video error:', e);
                    setTimeout(loadVideo, 2000);
                });

                refreshBtn.addEventListener('click', loadVideo);
            </script>
        </body>
        </html>
        """u8.ToArray(), token);

    await stream.FlushAsync(token);
    stream.Close();
}
```

## Camera Page Implementation

The camera page integrates both approaches:

```csharp
public partial class CommunityToolkitCameraPage
{
    private readonly CameraViewModel viewModel;

    public CommunityToolkitCameraPage(CameraViewModel viewModel)
    {
        InitializeComponent();
        BindingContext = this.viewModel = viewModel;
    }

    protected override async void OnNavigatedTo(NavigatedToEventArgs args)
    {
        base.OnNavigatedTo(args);
        var cameraRequest = await Permissions.RequestAsync<Permissions.Camera>();
        var microphoneRequest = await Permissions.RequestAsync<Permissions.Microphone>();
        
        if (cameraRequest != PermissionStatus.Granted || microphoneRequest != PermissionStatus.Granted)
        {
            await DisplayAlert("Permission Denied", "Camera permission is required to use this feature.", "OK");
            return;
        }

        await viewModel.InitializeCameraAsync(ToolkitCameraView);
    }

    protected override void OnNavigatedFrom(NavigatedFromEventArgs args)
    {
        viewModel.StartMjpegStreamCancelCommand.Execute(null);
        viewModel.StartVideoStreamCancelCommand.Execute(null);
        base.OnNavigatedFrom(args);
    }
}
```

## XAML Layout

```xml
<ContentPage x:Class="MauiIpCamera.CommunityToolkitCameraPage">
    <Grid RowDefinitions="*, Auto, Auto">
        <toolkit:CameraView x:Name="ToolkitCameraView" Grid.Row="0" />
        
        <StackLayout Grid.Row="1" Orientation="Horizontal" HorizontalOptions="Center">
            <Button Text="Start MJPEG Stream" 
                    Command="{Binding StartMjpegStreamCommand}" 
                    CommandParameter="{x:Reference ToolkitCameraView}" />
            <Button Text="Start Video Stream" 
                    Command="{Binding StartVideoStreamCommand}" 
                    CommandParameter="{x:Reference ToolkitCameraView}" />
        </StackLayout>
        
        <Label Grid.Row="2" 
               Text="{Binding IpAddressText}" 
               HorizontalOptions="Center" 
               FontSize="16" />
    </Grid>
</ContentPage>
```

<video width="100%" controls>
  <source src="https://ik.imagekit.io/VladislavAntonyuk/vladislavantonyuk/articles/66/maui-ip-camera.mp4" type="video/mp4">
</video>

## Key Features

### Advanced Camera Features

1. **Night Mode Detection**: Automatically switches camera modes based on time of day
2. **Resolution Selection**: Support for multiple camera resolutions
3. **Cross-platform**: Works on Android, iOS, Windows, and macOS

### Network Streaming

1. **MJPEG**: Real-time image streaming with low latency
2. **Video Recording**: Continuous video segments for smooth playback with audio support
3. **HTML5 Player**: Built-in web player for video streams
4. **Multiple Clients**: Support for concurrent connections

## Conclusion

Both approaches offer unique advantages for different use cases. The MJPEG streaming approach provides excellent real-time performance with wide browser compatibility, making it ideal for live surveillance applications. The video recording approach offers better video quality and smoother playback with full audio support, perfect for applications requiring high-quality audiovisual streaming.

The .NET MAUI Community Toolkit Camera proves to be a powerful solution for creating sophisticated IP camera applications, providing developers with the tools needed to build professional-grade surveillance and streaming applications. Whether you're repurposing an old device or building a new monitoring system, these implementations offer flexible and robust solutions for any IP camera needs.

The full code can be found on [GitHub](https://github.com/VladislavAntonyuk/MauiSamples/tree/main/MauiIpCamera){target="_blank"}.

Happy coding!