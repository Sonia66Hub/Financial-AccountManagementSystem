namespace FinancialManagementSystems.Models
{
    public class Client
    {
        public int Id { get; set; } // INT (PK)
        public string Name { get; set; } // VARCHAR (Full name)
        public string Email { get; set; } // VARCHAR (Unique login email)
        public string Password { get; set; } // VARCHAR (Hashed)
        public string? Company { get; set; } // VARCHAR (Optional)
        public string? Phone { get; set; } // VARCHAR
        public DateTime CreatedAt { get; set; } // TIMESTAMP

        // Navigation properties
        public virtual ICollection<Project> Projects { get; set; }
    }
}
