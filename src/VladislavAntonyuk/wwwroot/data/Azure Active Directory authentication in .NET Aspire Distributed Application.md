Hello!

Let me discribe the problem. 
I have a default .NET Aspire app with frontend and API service. User should be able to sign in on UI and make calls to API service. Unfortunately API request from Blazor frontend to API Service returns 401.

The issue is rather common and I spent about 1 week to make a successful response from the API Service. So let's go step by step what you need to make it work.

If you don't have an Azure Active Directory, watch this video on how to set it up:

[![Azure Active Directory authentication in .NET MAUI](https://img.youtube.com/vi/3RGX5mVRXSs/0.jpg)](https://www.youtube.com/watch?v=3RGX5mVRXSs)
 
And Azure Active Directory (B2C):

[![Azure Active Directory B2C authentication in .NET MAUI](https://img.youtube.com/vi/sTPWF2O456U/0.jpg)](https://www.youtube.com/watch?v=sTPWF2O456U)

# API Service

Starting with configuration of API Service:

1. Create a new .NET Aspire project.
2. Install `Microsoft.Identity.Web` package.
3. Update `appsettings.json` with your AAD configuration:
```json
"AzureAdB2C": {
  "Instance": "https://{YOUR_APP}.b2clogin.com",
  "TenantId": "YOUR_TENANT_ID",
  "ClientId": "YOUR_CLIENT_ID",
  "CallbackPath": "/signin-oidc",
  "Domain": "{YOUR APP}.onmicrosoft.com",
  "SignedOutCallbackPath": "/signout",
  "SignUpSignInPolicyId": "B2C_1_SIGNUP_SIGNIN",
  "ClientSecret": "YOUR_CLIENT_SECRET"
}
```

4. Then modify `Program.cs` with registration of WebApi Authentication:
```xml
builder.Services.AddMicrosoftIdentityWebApiAuthentication(builder.Configuration, Constants.AzureAdB2C);
builder.Services.AddAuthorization();
```

5. Update your endpoints with `[Authorize]` attribute or call `.RequireAuthorization()` for minimal API.

API Service is ready.

# FrontEnd

1. Install the next packages in a Web project:
```xml
<ItemGroup>
    <PackageReference Include="Microsoft.Identity.Web.DownstreamApi" Version="3.0.1" />
    <PackageReference Include="Microsoft.Identity.Web.UI" Version="3.0.1" />
</ItemGroup>
```

2. Update `appsettings.json` with your AAD configuration:
```json
"AzureAdB2C": {
  "Instance": "https://{YOUR_APP}.b2clogin.com",
  "TenantId": "YOUR_TENANT_ID",
  "ClientId": "{YOUR_APP}",
  "CallbackPath": "/signin-oidc",
  "Domain": "{YOUR APP}.onmicrosoft.com",
  "SignedOutCallbackPath": "/signout",
  "SignUpSignInPolicyId": "B2C_1_SIGNUP_SIGNIN",
  "ClientSecret": "YOUR_CLIENT_SECRET",
  "AllowWebApiToBeAuthorizedByACL": true
},
"ApiClient": {
  "BaseUrl": "https+http://apiservice",
  "Scopes": [
    "https://{YOUR_APP}.onmicrosoft.com/YOUR_CLIENT_ID/.default",
    "https://{YOUR_APP}.onmicrosoft.com/YOUR_CLIENT_ID/Read"
  ]
}
```

**IMPORTANT**. Pay attention at scopes. It is required for the Downstream API. You'll get 401 Unauthorized if it is empty.

3. Update `Program.cs` to register required servvices:

```csharp
var scopes = builder.Configuration.GetSection("ApiClient:Scopes").Get<string[]>();
builder.Services.AddMicrosoftIdentityWebAppAuthentication(builder.Configuration, Microsoft.Identity.Web.Constants.AzureAdB2C)
	.EnableTokenAcquisitionToCallDownstreamApi(scopes)
	.AddDownstreamApi("ApiClient", builder.Configuration.GetSection("ApiClient"))
	.AddInMemoryTokenCaches();

builder.Services.AddControllersWithViews().AddMicrosoftIdentityUI();
builder.Services.AddCascadingAuthenticationState();
builder.Services.AddAuthorization();

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents()
    .AddMicrosoftIdentityConsentHandler();

...

var app = builder.Build();

...
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
...
```

# Downstream API

```csharp
public class WeatherApiClient(IDownstreamApi downstreamApi, MicrosoftIdentityConsentAndConditionalAccessHandler handler)
{
    public async Task<List<WeatherForecast>> GetWeatherAsync(CancellationToken cancellationToken = default)
    {
        List<WeatherForecast>? forecasts = null;

		try
		{
			forecasts = await downstreamApi.GetForUserAsync<List<WeatherForecast>>("ApiClient", options =>
			{
				options.RelativePath = "/weatherforecast";
			}, cancellationToken: cancellationToken);
		}
		catch (Exception e)
		{
			handler.HandleException(e);
		}

		return forecasts ?? [];
    }
}
```

We are done. Start the application and check the result.
![MAUI Auth](https://ik.imagekit.io/VladislavAntonyuk/vladislavantonyuk/articles/13/maui-auth.gif)

The full code can be found on [GitHub](https://github.com/VladislavAntonyuk/AspireSamples/tree/main/DistributedApplicationAuth){target="_blank"}.
