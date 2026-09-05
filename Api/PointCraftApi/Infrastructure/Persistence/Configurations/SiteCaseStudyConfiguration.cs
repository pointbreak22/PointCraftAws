using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class SiteCaseStudyConfiguration : IEntityTypeConfiguration<SiteCaseStudy>
{
    public void Configure(EntityTypeBuilder<SiteCaseStudy> builder)
    {
        builder.ToTable("SiteCaseStudies");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.TitleEn).IsRequired().HasMaxLength(300);
        builder.Property(x => x.TitleRu).IsRequired().HasMaxLength(300);
        builder.Property(x => x.TaskEn).IsRequired().HasMaxLength(1000);
        builder.Property(x => x.TaskRu).IsRequired().HasMaxLength(1000);
        builder.Property(x => x.SolutionEn).IsRequired().HasMaxLength(1000);
        builder.Property(x => x.SolutionRu).IsRequired().HasMaxLength(1000);

        builder.Property(x => x.Results)
            .HasConversion(JsonListConversion.Converter<CaseStudyResultValue>())
            .Metadata.SetValueComparer(JsonListConversion.Comparer<CaseStudyResultValue>());
    }
}
