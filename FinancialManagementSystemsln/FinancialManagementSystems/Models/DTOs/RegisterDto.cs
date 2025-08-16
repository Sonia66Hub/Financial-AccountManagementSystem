using System.ComponentModel.DataAnnotations;

namespace FinancialManagementSystems.Models.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 6)]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; } = "Client"; // Default role is Client
    }

    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class CreateClientDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Company { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 50 characters")]
        public string Password { get; set; } // নতুন Password ফিল্ড যুক্ত করা হয়েছে
    }

    public class UpdateClientDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Company { get; set; }

        [Required]
        public string Phone { get; set; }
    }


    public class CreateAccountDto
    {
        [Required]
        [StringLength(100)]
        public string AccountName { get; set; }

        [Required]
        public decimal Balance { get; set; }

        [Required]
        public int ClientId { get; set; }
    }

    public class UpdateAccountDto
    {
        [Required]
        [StringLength(100)]
        public string AccountName { get; set; }

        [Required]
        public decimal Balance { get; set; }

        [Required]
        public int ClientId { get; set; }
    }

    public class CreateProjectDto
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [Required]
        public int ClientId { get; set; }

        [Required]
        public ProjectStatus Status { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [StringLength(100)]
        public string? AssignedTeam { get; set; }
    }

    public class UpdateProjectDto
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [Required]
        public int ClientId { get; set; }

        [Required]
        public ProjectStatus Status { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [StringLength(100)]
        public string? AssignedTeam { get; set; }
    }
    public class CreateProjectTaskDto
    {
        [Required]
        public int ProjectId { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        [Required]
        public TaskStatus Status { get; set; }

        [Required]
        public DateTime DueDate { get; set; }
    }

    public class UpdateProjectTaskDto
    {
        [Required]
        public int Id { get; set; } // This is the ID of the task to be updated

        [Required]
        public int ProjectId { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        [Required]
        public TaskStatus Status { get; set; }

        [Required]
        public DateTime DueDate { get; set; }
    }

    public class CreateInvoiceDto
    {
        [Required]
        public int ProjectId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public InvoiceStatus? Status { get; set; }

        [Required]
        public DateTime IssueDate { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        // ফাইল আপলোডের জন্য IFormFile ব্যবহার করা হচ্ছে
        public IFormFile? InvoiceFile { get; set; }
    }

    public class UpdateInvoiceDto
    {
        [Required]
        public int ProjectId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public InvoiceStatus? Status { get; set; }

        [Required]
        public DateTime IssueDate { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        // ফাইল আপলোডের জন্য IFormFile ব্যবহার করা হচ্ছে
        public IFormFile? InvoiceFile { get; set; }
    }
}
