namespace Shared;

using System.Net;
using System.Text;

public interface IUrlCreator
{
	string CreateArticleUrl(string url, string? encodedPart = null);
	string? DecodeArticleUrl(string? url);
}

public class UrlCreator : IUrlCreator
{
	public string CreateArticleUrl(string url, string? encodedPart = null)
	{
		var urlBuilder = new StringBuilder($"{Constants.BaseUrl}{url}/");
		if (!string.IsNullOrWhiteSpace(encodedPart))
		{
			urlBuilder.Append(WebUtility.UrlEncode(encodedPart).Replace("+", "-"));
		}

		var result = urlBuilder.ToString().Trim('/');
		if (string.IsNullOrEmpty(url))
		{
			return result;
		}

		return result + '/';
	}

	public string? DecodeArticleUrl(string? url)
	{
		return WebUtility.UrlDecode(url?.Replace("-", "+"));
	}
}