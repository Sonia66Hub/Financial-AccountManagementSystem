using FinancialManagementSystems.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using TaskStatus = FinancialManagementSystems.Models.TaskStatus;

namespace FinancialManagementSystems.Data
{
    // IdentityDbContext থেকে inherit করা হয়েছে যাতে Identity table গুলো অন্তর্ভুক্ত হয়
    public class ApplicationDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectTask> ProjectTasks { get; set; }
        public DbSet<Invoice> Invoices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Client-এর জন্য সিড ডেটা, তোমার দেওয়া সংজ্ঞা অনুযায়ী
            modelBuilder.Entity<Client>().HasData(
                new Client
                {
                    Id = 1,
                    Name = "Test Client",
                    Email = "testclient@example.com",
                    Password = "TestPassword123!",
                    Company = "Test Corp",
                    Phone = "1234567890",
                    CreatedAt = new DateTime(2025, 08, 01, 10, 0, 0)
                }
            );

            // Account-এর জন্য সিড ডেটা
            modelBuilder.Entity<Account>().HasData(
                new Account
                {
                    Id = 1,
                    AccountName = "Savings Account",
                    Balance = 1000.50m,
                    ClientId = 1
                }
            );

            // Project-এর জন্য সিড ডেটা, তোমার দেওয়া সংজ্ঞা অনুযায়ী
            modelBuilder.Entity<Project>().HasData(
                new Project
                {
                    Id = 1,
                    Name = "Website Redesign",
                    ClientId = 1,
                    Status = ProjectStatus.InProgress,
                    StartDate = new DateTime(2025, 08, 01),
                    EndDate = new DateTime(2025, 10, 31),
                    AssignedTeam = "Design Team"
                }
            );

            // ProjectTask-এর জন্য সিড ডেটা, তোমার দেওয়া সংজ্ঞা অনুযায়ী
            modelBuilder.Entity<ProjectTask>().HasData(
                new ProjectTask
                {
                    Id = 1,
                    Title = "Homepage Wireframe",
                    ProjectId = 1,
                    Status = TaskStatus.InProgress,
                    DueDate = new DateTime(2025, 08, 15)
                }
            );

            // Invoice-এর জন্য সিড ডেটা, তোমার দেওয়া সংজ্ঞা অনুযায়ী
            modelBuilder.Entity<Invoice>().HasData(
                new Invoice
                {
                    Id = 1,
                    ProjectId = 1,
                    Amount = 1500.00m,
                    Status = InvoiceStatus.Unpaid,
                    IssueDate = new DateTime(2025, 08, 12),
                    DueDate = new DateTime(2025, 09, 11),
                    InvoiceFile = "invoice_2025_001.pdf"
                }
            );
        }
    }
}
