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
            _configuration = configuration;
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

        // GET: api/course/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _context.Courses
                .Include(c => c.Teacher) // Optional: includes related teacher info
                .ToListAsync();

            var courseDtos = courses.Select(c => new CourseDto
            {
                CourseId = c.CourseId,
                Title = c.Title,
                Credits = c.Credits,
                TeacherId = c.TeacherId
            }).ToList();

            return Ok(courseDtos);
        }//end of course list controller

        // UPDATE
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCourse(string id, [FromBody] CourseDto dto)
        {
            var existingCourse = await _context.Courses.FindAsync(id);
            if (existingCourse == null)
            {
                return NotFound("Course not found.");
            }

            // Update the fields
            existingCourse.Title = dto.Title;
            existingCourse.Credits = dto.Credits;
            existingCourse.TeacherId = dto.TeacherId;

            _context.Courses.Update(existingCourse);
            await _context.SaveChangesAsync();

            return Ok("Course updated successfully.");
        }//end of update course controller

        // DELETE: api/course/delete/{id}
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCourse(string id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound("Course not found");
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return Ok("Course deleted successfully");
        }//end of delete course controller

        [HttpPost("assign-course")]
        public async Task<IActionResult> AssignCourseToStudent([FromBody] CourseAssignmentDto dto)
        {
            var student = await _context.Students.FindAsync(dto.StudentId);
            var course = await _context.Courses.FindAsync(dto.CourseId);

            if (student == null || course == null)
                return NotFound("Student or course not found.");

            var enrollment = new Enrollment
            {
                EnrollmentId = Guid.NewGuid().ToString(),
                StudentId = dto.StudentId,
                CourseId = dto.CourseId
            };

            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();

            return Ok("Course assigned to student successfully.");
        }//end of enrollment controller

        [HttpGet("{courseId}/enrolled-students")]
public async Task<IActionResult> GetEnrolledStudents(string courseId)
{
    var enrolledStudents = await _context.Enrollments
        .Where(e => e.CourseId == courseId)
        .Include(e => e.Student)
        .ThenInclude(s => s.ApplicationUser)
        .Select(e => new
        {
            StudentId = e.StudentId,
            UserName = e.Student.ApplicationUser.UserName,
            Email = e.Student.ApplicationUser.Email
        })
        .ToListAsync();

    return Ok(enrolledStudents);
}





    }
}
