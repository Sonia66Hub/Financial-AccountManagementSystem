namespace FinancialManagementSystems.Models
{
    public enum TaskStatus
    {
        Pending,
        InProgress,
        Done
    }

    public class ProjectTask
    {
        public int Id { get; set; } // INT (PK)
        public int ProjectId { get; set; } // INT (FK)
        public string Title { get; set; } // VARCHAR (Task name)
        public TaskStatus Status { get; set; } // ENUM
        public DateTime DueDate { get; set; } // DATE

        // Navigation properties
        public virtual Project Project { get; set; }
    }
}