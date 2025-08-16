namespace FinancialManagementSystems.Models
{
    public enum ProjectStatus
    {
        NotStarted,
        InProgress,
        Completed
    }

    public class Project
    {
        public int Id { get; set; } // INT (PK)
        public string Name { get; set; } // VARCHAR
        public int ClientId { get; set; } // INT (FK)
        public ProjectStatus Status { get; set; } // ENUM
        public DateTime StartDate { get; set; } // DATE
        public DateTime EndDate { get; set; } // DATE
        public string? AssignedTeam { get; set; } // VARCHAR (Optional)

        // Navigation properties
        public virtual Client Client { get; set; }
        public virtual ICollection<ProjectTask> ProjectTasks { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}