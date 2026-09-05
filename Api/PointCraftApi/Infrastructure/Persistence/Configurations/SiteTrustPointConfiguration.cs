using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class SiteTrustPointConfiguration : IEntityTypeConfiguration<SiteTrustPoint>
{
    public void Configure(EntityTypeBuilder<SiteTrustPoint> builder)
    {
        builder.ToTable("SiteTrustPoints");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Icon).IsRequired().HasMaxLength(50);
        builder.Property(x => x.LabelEn).IsRequired().HasMaxLength(300);
        builder.Property(x => x.LabelRu).IsRequired().HasMaxLength(300);
    }
}
