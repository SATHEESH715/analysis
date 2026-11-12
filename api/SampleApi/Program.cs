var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// The Angular build is copied into wwwroot at deploy time, so one site serves both the page and the API.
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api/reports", () => StripeData.GetAll());
app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));

app.Run();

public record StripeItem(Guid Id, int Number, string Name, string Detail, string Status);

public static class StripeData
{
    public static IReadOnlyList<StripeItem> GetAll() =>
    [
        new(Guid.Parse("11111111-1111-1111-1111-111111111111"), 3001, "Void turnaround", "Q3 2026", "Published"),
        new(Guid.Parse("22222222-2222-2222-2222-222222222222"), 3002, "Rent arrears trend", "Q3 2026", "Draft"),
        new(Guid.Parse("33333333-3333-3333-3333-333333333333"), 3003, "Repairs backlog", "Q3 2026", "Published"),
    ];
}
