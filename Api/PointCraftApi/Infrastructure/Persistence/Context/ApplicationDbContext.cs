using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<ContactRequest> ContactRequests => Set<ContactRequest>();
    public DbSet<TelegramSubscriber> TelegramSubscribers => Set<TelegramSubscriber>();

    public DbSet<SiteTrustPoint> SiteTrustPoints => Set<SiteTrustPoint>();
    public DbSet<SiteService> SiteServices => Set<SiteService>();
    public DbSet<SiteTechStackArea> SiteTechStackAreas => Set<SiteTechStackArea>();
    public DbSet<SiteProcessStep> SiteProcessSteps => Set<SiteProcessStep>();
    public DbSet<SiteCaseStudy> SiteCaseStudies => Set<SiteCaseStudy>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}
