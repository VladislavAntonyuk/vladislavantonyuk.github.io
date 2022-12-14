using System.Net;
using System.Text;

namespace Shared;

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

        return urlBuilder.ToString().Trim('/');
    }

    public string? DecodeArticleUrl(string? url)
    {
        return WebUtility.UrlDecode(url?.Replace("-", "+"));
    }
}