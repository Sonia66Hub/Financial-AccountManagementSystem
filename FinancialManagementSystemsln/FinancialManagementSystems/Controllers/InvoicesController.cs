
using FinancialManagementSystems.Data;
using FinancialManagementSystems.Models.DTOs;
using FinancialManagementSystems.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinancialManagementSystems.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InvoicesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public InvoicesController(ApplicationDbContext context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }

        private string GetFileUrl(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
            {
                return null;
            }
            // Create a full URL for the image
            var request = HttpContext.Request;
            var baseUrl = $"{request.Scheme}://{request.Host}{request.PathBase}";
            return $"{baseUrl}/images/{fileName}";
        }

        // GET: api/Invoices
        [HttpGet]
        public async Task<IActionResult> GetInvoices()
        {
            var invoices = await _context.Invoices.ToListAsync();
            var invoiceDtos = invoices.Select(i => new
            {
                i.Id,
                i.ProjectId,
                i.Amount,
                i.Status,
                i.IssueDate,
                i.DueDate,
                InvoiceFile = GetFileUrl(i.InvoiceFile) // Generate full URL
            }).ToList();

            return Ok(invoiceDtos);
        }

        // GET: api/Invoices/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);

            if (invoice == null)
            {
                return NotFound();
            }

            // Generate full URL before returning
            var invoiceDto = new
            {
                invoice.Id,
                invoice.ProjectId,
                invoice.Amount,
                invoice.Status,
                invoice.IssueDate,
                invoice.DueDate,
                InvoiceFile = GetFileUrl(invoice.InvoiceFile)
            };

            return Ok(invoiceDto);
        }

        // POST: api/Invoices
        [HttpPost]
        public async Task<IActionResult> CreateInvoice([FromForm] CreateInvoiceDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var invoice = new Invoice
            {
                ProjectId = model.ProjectId,
                Amount = model.Amount,
                Status = model.Status,
                IssueDate = model.IssueDate,
                DueDate = model.DueDate,
            };

            try
            {
                if (model.InvoiceFile != null && model.InvoiceFile.Length > 0)
                {
                    var uploadsFolder = Path.Combine(_hostingEnvironment.WebRootPath, "images"); // Consistent folder path
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + model.InvoiceFile.FileName;
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.InvoiceFile.CopyToAsync(fileStream);
                    }
                    invoice.InvoiceFile = uniqueFileName;
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"File upload failed: {ex.Message}");
            }

            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetInvoice), new { id = invoice.Id }, invoice);
        }

        // PUT: api/Invoices/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInvoice(int id, [FromForm] UpdateInvoiceDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            try
            {
                if (model.InvoiceFile != null && model.InvoiceFile.Length > 0)
                {
                    if (!string.IsNullOrEmpty(invoice.InvoiceFile))
                    {
                        var oldFilePath = Path.Combine(_hostingEnvironment.WebRootPath, "images", invoice.InvoiceFile); // Consistent folder path
                        if (System.IO.File.Exists(oldFilePath))
                        {
                            System.IO.File.Delete(oldFilePath);
                        }
                    }

                    var uploadsFolder = Path.Combine(_hostingEnvironment.WebRootPath, "images"); // Consistent folder path
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }
                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + model.InvoiceFile.FileName;
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.InvoiceFile.CopyToAsync(fileStream);
                    }
                    invoice.InvoiceFile = uniqueFileName;
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"File update failed: {ex.Message}");
            }

            invoice.ProjectId = model.ProjectId;
            invoice.Amount = model.Amount;
            invoice.Status = model.Status;
            invoice.IssueDate = model.IssueDate;
            invoice.DueDate = model.DueDate;

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Invoices/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }
            try
            {
                if (!string.IsNullOrEmpty(invoice.InvoiceFile))
                {
                    var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "images", invoice.InvoiceFile); // Consistent folder path
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"File deletion failed: {ex.Message}");
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceExists(int id)
        {
            return _context.Invoices.Any(e => e.Id == id);
        }
    }
}