using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SchoolManagementAPI.data;
using SchoolManagementAPI.models;
using SchoolManagementAPI.Dto;
using Microsoft.EntityFrameworkCore;

namespace SchoolManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public CourseController(
            ApplicationDbContext context,
            IConfiguration configuration
            )
        {
            _context = context;
            _configuration =configuration;
        }

        // CREATE
        [HttpPost("create")]
        public async Task<IActionResult> CreateCourse(CourseDto dto)
        {
            var course = new Course
            {
                CourseId = Guid.NewGuid().ToString(),
                Title = dto.Title,
                Credits = dto.Credits,
                TeacherId = dto.TeacherId
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();
            return Ok("Course created successfully");
        }//end of create course controller

        
    }
}
