namespace Shared;

using System.Text.Json;

/// <summary>
/// Serializer settings for the hand-edited files in wwwroot/data. They tolerate trailing commas and
/// comments, so a small editing slip does not take a whole page down.
/// </summary>
public static class DataJson
{
	public static JsonSerializerOptions Options { get; } = Create();

	public static JsonSerializerOptions Create() => new(JsonSerializerDefaults.Web)
	{
		AllowTrailingCommas = true,
		ReadCommentHandling = JsonCommentHandling.Skip
	};
}
