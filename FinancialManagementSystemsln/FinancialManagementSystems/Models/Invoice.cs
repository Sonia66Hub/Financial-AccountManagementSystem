namespace FinancialManagementSystems.Models
{
    public enum InvoiceStatus
    {
        Paid,
        Unpaid,
        Partial
    }

    public class Invoice
    {
        public int Id { get; set; } // INT (PK)
        public int ProjectId { get; set;} // INT (FK)
        public decimal Amount { get; set; } // DECIMAL
        public InvoiceStatus? Status { get; set; } // ENUM
        public DateTime IssueDate { get; set; } // DATE
        public DateTime DueDate { get; set; } // DATE
        public string? InvoiceFile { get; set; } // TEXT (File path)

        // Navigation properties
        public virtual Project Project { get; set; }
    }
}