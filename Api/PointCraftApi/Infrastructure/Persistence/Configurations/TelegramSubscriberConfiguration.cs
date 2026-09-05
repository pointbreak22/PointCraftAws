using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class TelegramSubscriberConfiguration : IEntityTypeConfiguration<TelegramSubscriber>
{
    public void Configure(EntityTypeBuilder<TelegramSubscriber> builder)
    {
        builder.ToTable("TelegramSubscribers");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).IsRequired().HasMaxLength(200);
        builder.Property(x => x.Username).HasMaxLength(200);
        builder.Property(x => x.ChatId).IsRequired().HasMaxLength(50);
        builder.Property(x => x.Type).HasConversion<string>().HasMaxLength(20);
    }
}
