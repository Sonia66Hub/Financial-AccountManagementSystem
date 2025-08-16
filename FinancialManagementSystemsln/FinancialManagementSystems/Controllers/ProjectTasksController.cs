using FinancialManagementSystems.Data;
using FinancialManagementSystems.Models.DTOs;
using FinancialManagementSystems.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinancialManagementSystems.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // এই কন্ট্রোলারটি অথেনটিকেটেড ইউজারদের জন্য
    public class ProjectTasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProjectTasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ProjectTasks
        // সকল প্রজেক্ট টাস্কের তালিকা দেয়
        [HttpGet]
        public async Task<IActionResult> GetProjectTasks()
        {
            return Ok(await _context.ProjectTasks.ToListAsync());
        }

       
        [HttpGet("byproject/{projectId}")]
        public async Task<IActionResult> GetProjectTasksByProjectId(int projectId)
        {
            var projectTasks = await _context.ProjectTasks
                                            .Where(t => t.ProjectId == projectId)
                                            .ToListAsync();

            if (projectTasks == null || !projectTasks.Any())
            {
                return NotFound("No tasks found for this project.");
            }

            return Ok(projectTasks);
        }

        // GET: api/ProjectTasks/{id}
        // একটি নির্দিষ্ট আইডি দিয়ে প্রজেক্ট টাস্কের তথ্য দেয়
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectTask(int id)
        {
            var projectTask = await _context.ProjectTasks.FindAsync(id);

            if (projectTask == null)
            {
                return NotFound();
            }

            return Ok(projectTask);
        }

        // POST: api/ProjectTasks
        // একটি নতুন প্রজেক্ট টাস্ক তৈরি করে
        [HttpPost]
        public async Task<IActionResult> CreateProjectTask([FromBody] CreateProjectTaskDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var projectTask = new ProjectTask
            {
                ProjectId = model.ProjectId,
                Title = model.Title,
                Status = model.Status,
                DueDate = model.DueDate
            };

            _context.ProjectTasks.Add(projectTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProjectTask), new { id = projectTask.Id }, projectTask);
        }

        // PUT: api/ProjectTasks/{id}
        // একটি নির্দিষ্ট প্রজেক্ট টাস্কের তথ্য আপডেট করে
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProjectTask(int id, UpdateProjectTaskDto updateProjectTaskDto)
        {
            if (id != updateProjectTaskDto.Id)
            {
                return BadRequest();
            }

            var projectTask = await _context.ProjectTasks.FindAsync(id);
            if (projectTask == null)
            {
                return NotFound();
            }

            projectTask.ProjectId = updateProjectTaskDto.ProjectId;
            projectTask.Title = updateProjectTaskDto.Title;
            projectTask.Status = updateProjectTaskDto.Status;
            projectTask.DueDate = updateProjectTaskDto.DueDate;


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectTaskExists(id))
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

        // DELETE: api/ProjectTasks/{id}
        // একটি নির্দিষ্ট প্রজেক্ট টাস্ক ডিলিট করে
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectTask(int id)
        {
            var projectTask = await _context.ProjectTasks.FindAsync(id);
            if (projectTask == null)
            {
                return NotFound();
            }

            _context.ProjectTasks.Remove(projectTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectTaskExists(int id)
        {
            return _context.ProjectTasks.Any(e => e.Id == id);
        }
    }

}
