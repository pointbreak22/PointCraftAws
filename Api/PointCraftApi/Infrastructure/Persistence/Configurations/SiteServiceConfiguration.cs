using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class SiteServiceConfiguration : IEntityTypeConfiguration<SiteService>
{
    public void Configure(EntityTypeBuilder<SiteService> builder)
    {
        builder.ToTable("SiteServices");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Icon).IsRequired().HasMaxLength(50);
        builder.Property(x => x.TitleEn).IsRequired().HasMaxLength(300);
        builder.Property(x => x.TitleRu).IsRequired().HasMaxLength(300);
        builder.Property(x => x.DescriptionEn).IsRequired().HasMaxLength(1000);
        builder.Property(x => x.DescriptionRu).IsRequired().HasMaxLength(1000);
        builder.Property(x => x.AudienceEn).IsRequired().HasMaxLength(300);
        builder.Property(x => x.AudienceRu).IsRequired().HasMaxLength(300);

        builder.Property(x => x.FeaturesEn)
            .HasConversion(JsonListConversion.Converter<string>())
            .Metadata.SetValueComparer(JsonListConversion.Comparer<string>());
        builder.Property(x => x.FeaturesRu)
            .HasConversion(JsonListConversion.Converter<string>())
            .Metadata.SetValueComparer(JsonListConversion.Comparer<string>());
    }
}
