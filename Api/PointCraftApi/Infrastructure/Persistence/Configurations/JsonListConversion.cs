using System.Text.Json;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Persistence.Configurations;

/// <summary>
/// SQLite has no native array/JSON column type, so list-valued properties (Features,
/// Technologies, a case study's Results) are stored as a JSON string. Shared here since the
/// same conversion is needed on 3 different entities.
/// </summary>
public static class JsonListConversion
{
    public static ValueConverter<List<T>, string> Converter<T>() => new(
        value => JsonSerializer.Serialize(value, (JsonSerializerOptions?)null),
        json => JsonSerializer.Deserialize<List<T>>(json, (JsonSerializerOptions?)null) ?? new List<T>());

    // EF Core can't tell a List<T> changed just by reference equality after mutation, so the
    // comparer below is required for change-tracking on Update to actually pick up edits.
    public static ValueComparer<List<T>> Comparer<T>() => new(
        (a, b) => (a ?? new List<T>()).SequenceEqual(b ?? new List<T>()),
        v => v.Aggregate(0, (hash, item) => HashCode.Combine(hash, item!.GetHashCode())),
        v => v.ToList());
}
