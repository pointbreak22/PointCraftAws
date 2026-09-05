using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class SiteTechStackAreaConfiguration : IEntityTypeConfiguration<SiteTechStackArea>
{
    public void Configure(EntityTypeBuilder<SiteTechStackArea> builder)
    {
        builder.ToTable("SiteTechStackAreas");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Icon).IsRequired().HasMaxLength(50);
        builder.Property(x => x.AreaEn).IsRequired().HasMaxLength(200);
        builder.Property(x => x.AreaRu).IsRequired().HasMaxLength(200);
        builder.Property(x => x.BenefitEn).IsRequired().HasMaxLength(500);
        builder.Property(x => x.BenefitRu).IsRequired().HasMaxLength(500);

        builder.Property(x => x.Technologies)
            .HasConversion(JsonListConversion.Converter<string>())
            .Metadata.SetValueComparer(JsonListConversion.Comparer<string>());
    }
}
