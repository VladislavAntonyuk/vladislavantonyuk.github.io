using Microsoft.AspNetCore.Components;
using VladislavAntonyuk.Models;
using VladislavAntonyuk.Services;

namespace VladislavAntonyuk.Pages;

public partial class ArticleDetails : VladislavAntonyukBaseComponent
{
    private Article? article;
    //private ErrorModel? error;
    private IReadOnlyCollection<Article>? suggestions;

    [Parameter]
    public string Id { get; set; } = string.Empty;

    [Inject]
    public required IUrlCreator UrlCreator { get; set; }

    [Inject]
    public required NavigationManager Navigation { get; set; }
    
    [Inject]
    public required HttpClient HttpClient { get; set; }

    //[Inject]
    //public required IQueryDispatcher QueryDispatcher { get; set; }

    //[Inject]
    //public required ICache Cache { get; set; }

    protected override async Task OnParametersSetAsync()
    {
        try
        {
            var urlId = UrlCreator.DecodeArticleUrl(Id);
            if (string.IsNullOrEmpty(urlId))
            {
                Navigation.NavigateTo("/");
                return;
            }

            article = new Article()
            {
                Content = await HttpClient.GetStringAsync("./data/" + urlId + ".md"),
                Name = urlId
            };
            //var result = await Cache.GetOrSetAsync($"ArticleDetails_{urlId}", () =>
            //	                                       QueryDispatcher
            //		                                       .SendAsync<DetailedArticleDto, GetArticleByNameQuery>(
            //			                                       new GetArticleByNameQuery(urlId)
            //			                                       {
            //				                                       AllowInactive = isAuthenticated
            //			                                       }, CancellationToken.None), TimeSpan.FromMinutes(30));

            //if (result.IsSuccessful)
            //{
            //	article = result.Value;
            //}
            //else
            //{
            //error = new ErrorModel
            //{
            //	Message = "Page Not Found",
            //	Code = 404
            //};
            //}

            //var suggestionsResult = await Cache.GetOrSetAsync($"ArticleDetails_Suggestions_{isAuthenticated}_{urlId}",
            //                                                  () => QueryDispatcher
            //	                                                  .SendAsync<GetArticleByFilterResponse,
            //		                                                  GetSuggestionsQuery>(new GetSuggestionsQuery
            //	                                                  {
            //		                                                  Limit = 2,
            //		                                                  Name = result.Value?.Name,
            //		                                                  CategoryName = result.Value?.Category.Name,
            //		                                                  AllowInactive = isAuthenticated
            //	                                                  }, CancellationToken.None), TimeSpan.FromHours(1));
            //if (suggestionsResult.IsSuccessful)
            //{
            //	suggestions = suggestionsResult.Value.Items;
            //}
        }
        catch (Exception e)
        {
            //error = new ErrorModel
            //{
            //	Message = e.Message,
            //	Code = 500
            //};
        }
    }
}