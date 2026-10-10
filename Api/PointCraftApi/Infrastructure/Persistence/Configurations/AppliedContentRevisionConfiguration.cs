using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class AppliedContentRevisionConfiguration : IEntityTypeConfiguration<AppliedContentRevision>
{
    public void Configure(EntityTypeBuilder<AppliedContentRevision> builder)
    {
        builder.ToTable("AppliedContentRevisions");
        builder.HasKey(x => x.Revision);
        builder.Property(x => x.Revision).ValueGeneratedNever();
    }
}
