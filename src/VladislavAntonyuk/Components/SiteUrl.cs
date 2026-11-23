namespace VladislavAntonyuk.Components;

using global::Shared;
using Microsoft.AspNetCore.Components;

public static class SiteUrl
{
	/// <summary>
	/// Resolves a relative or absolute URL against the published site origin. CI sets
	/// <see cref="Constants.BaseUrl"/> to that origin, so prerendered HTML never carries the
	/// prerendering server's localhost address; locally it falls back to the current origin.
	/// </summary>
	public static string ToAbsolute(this NavigationManager navigationManager, string url)
	{
		// Locally BaseUrl is "/", which Uri parses as an absolute file:/// URI, so require http(s).
		var baseUri = Uri.TryCreate(Constants.BaseUrl, UriKind.Absolute, out var site) && (site.Scheme == Uri.UriSchemeHttps || site.Scheme == Uri.UriSchemeHttp)
			? site
			: new Uri(navigationManager.BaseUri);
		return new Uri(baseUri, url).ToString();
	}

	public static string CurrentAbsolute(this NavigationManager navigationManager) =>
		navigationManager.ToAbsolute(navigationManager.ToBaseRelativePath(navigationManager.Uri));
}
