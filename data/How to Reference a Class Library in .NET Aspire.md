.NET Aspire is a cloud-native development stack for .NET, designed to simplify distributed application development.

In Aspire, you may want to reference a class library for shared code or types, but not include it as a deployable resource in your Aspire solution. This is common for utility libraries, shared models, or code needed only for compilation, not deployment.

You may ask why reference a library without deploying it.
Let's take a look at example.

You have an API to manage users, where only admin can add new users. So such user needs to be predefined and exist in your database. The simple solution is create a default admin user when the application starts. You can add the user as part of migration, but do you really want to store password hash and salt in your migration files? Doesn't matter if it is a development or production user.

Also, you want to reuse the code to seed data in multiple places (main project and test project), so having it in a shared library makes sense.

So, you have Initializer in some class library (let's call it Shared). Your initializer may look like this:

```csharp
namespace Shared;

public static class Initializer
{
    public static async Task SeedAdminUser(string? connectionString, Authentication defaultUserAuth, CancellationToken token)
    {
        await using var connection = new SqlConnection(connectionString);
        await connection.OpenAsync(token);

        const string sql = """
                           IF NOT EXISTS (SELECT 1 FROM dbo.Users WHERE Email = @email)
                           BEGIN
                               INSERT INTO dbo.Users (Id, Email, PasswordHash, PasswordSalt) VALUES (@id, @email, @hash, @salt)
                               INSERT INTO dbo.UserRoles (UserId, Role) VALUES (@id, 'Admin')
                           END
                           """;

        await using var command = new SqlCommand(sql, connection);
        command.Parameters.Add(new SqlParameter("@id", SqlDbType.UniqueIdentifier)
        {
            Value = Guid.CreateVersion7()
        });
        command.Parameters.Add(new SqlParameter("@email", SqlDbType.NVarChar, 256)
        {
            Value = defaultUserAuth.Email
        });
        CreatePasswordHash(defaultUserAuth.Password, out var hash, out var salt);
        command.Parameters.Add(new SqlParameter("@hash", SqlDbType.VarBinary)
        {
            Value = hash
        });
        command.Parameters.Add(new SqlParameter("@salt", SqlDbType.VarBinary)
        {
            Value = salt
        });

        await command.ExecuteNonQueryAsync(token);
    }

    private static void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
    {
        using var rng = RandomNumberGenerator.Create();
        salt = new byte[16];
        rng.GetBytes(salt);

        hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, 100_000, HashAlgorithmName.SHA256, 32);
    }
}
```

Now, you want to call the initializer when your application starts. As usual, you reference the Shared project in your Aspire AppHost and call the initializer in the `OnResourceReady` callback:

```csharp
builder.AddProject<Projects.WebApi>("webapi")
    .WithReference(database)
    .WaitFor(database)
    .OnResourceReady(async (resource, @event, token) =>
    {
        var dbConnectionString = await database.Resource.ConnectionStringExpression.GetValueAsync(token);
        await Initializer.SeedData(dbConnectionString, defaultUserAuth, token);
    });
```

But what we see, `Cannot resolve symbol 'Initializer'`. This is because Aspire treat Shared project as an Aspire Project Resource, so it is compiled into the AppHost.

## How to Reference a Class Library in .NET Aspire

So you have a solution with the following projects:

- `AspireAppHost` (your .NET Aspire project)
- `Shared` (a class library project)

You want `AspireAppHost` to reference `Shared` for code, but not treat `Shared` as a deployable resource in Aspire.

### Add a Project Reference with IsAspireProjectResource

In your `AspireAppHost` project, add a reference to `Shared` and set the `IsAspireProjectResource` metadata to `false`:

```xml
<ItemGroup>
  <ProjectReference Include="..\Shared\Shared.csproj" IsAspireProjectResource="false"/>
</ItemGroup>
```

This allows you to use types and code from `Shared` in `AspireAppHost`, but Aspire will not treat `Shared` as a resource to deploy or manage.

## Summary

- Add a project reference to your library in the consuming project, and set `IsAspireProjectResource` to false.
- The library will be available for code reuse, but not built or deployed as a separate service or resource.

This approach keeps your Aspire solution clean and focused, while allowing you to share code across projects without unnecessary deployment.
