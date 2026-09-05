using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class SiteProcessStepConfiguration : IEntityTypeConfiguration<SiteProcessStep>
{
    public void Configure(EntityTypeBuilder<SiteProcessStep> builder)
    {
        builder.ToTable("SiteProcessSteps");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.TitleEn).IsRequired().HasMaxLength(200);
        builder.Property(x => x.TitleRu).IsRequired().HasMaxLength(200);
        builder.Property(x => x.DescriptionEn).IsRequired().HasMaxLength(500);
        builder.Property(x => x.DescriptionRu).IsRequired().HasMaxLength(500);
    }
}
