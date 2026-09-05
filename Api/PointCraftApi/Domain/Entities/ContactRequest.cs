namespace Domain.Entities;

public class ContactRequest
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = null!;
    public string Contact { get; private set; } = null!;
    public string? ProjectType { get; private set; }
    public string Message { get; private set; } = null!;
    public DateTime CreatedAtUtc { get; private set; }

    private ContactRequest() { }

    public static ContactRequest Create(string name, string contact, string? projectType, string message)
    {
        if (string.IsNullOrWhiteSpace(name)) throw new ArgumentException("Name is required.", nameof(name));
        if (string.IsNullOrWhiteSpace(contact)) throw new ArgumentException("Contact is required.", nameof(contact));
        if (string.IsNullOrWhiteSpace(message)) throw new ArgumentException("Message is required.", nameof(message));

        return new ContactRequest
        {
            Id = Guid.NewGuid(),
            Name = name.Trim(),
            Contact = contact.Trim(),
            ProjectType = string.IsNullOrWhiteSpace(projectType) ? null : projectType.Trim(),
            Message = message.Trim(),
            CreatedAtUtc = DateTime.UtcNow
        };
    }
}
