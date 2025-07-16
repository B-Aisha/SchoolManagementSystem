using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagementAPI.data;
using SchoolManagementAPI.Dto;
using SchoolManagementAPI.models;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace SchoolManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GradeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GradeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/grade/assign
        [HttpPost("assign")]
        public async Task<IActionResult> AssignGrades([FromBody] List<GradeDto> gradeList)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            foreach (var dto in gradeList)
            {
                var total = dto.CatMarks + dto.ExamMarks;
                var letter = CalculateGradeLetter(total);

                var existing = await _context.Grades
                    .FirstOrDefaultAsync(g => g.StudentId == dto.StudentId && g.CourseId == dto.CourseId);

                if (existing != null)
                {
                    // Update existing grade
                    existing.CatMarks = dto.CatMarks;
                    existing.ExamMarks = dto.ExamMarks;
                    existing.GradeLetter = letter;
                    existing.DateAwarded = DateTime.UtcNow;
                }
                else
                {
                    // Create new
                    _context.Grades.Add(new Grade
                    {
                        GradeId = Guid.NewGuid().ToString(),
                        StudentId = dto.StudentId,
                        CourseId = dto.CourseId,
                        CatMarks = dto.CatMarks,
                        ExamMarks = dto.ExamMarks,
                        GradeLetter = letter,
                        DateAwarded = DateTime.UtcNow
                    });
                }
            }

            await _context.SaveChangesAsync();
            return Ok("Grades assigned successfully.");
        }//end of assign grade controller,

        // Helper
        private string CalculateGradeLetter(double total)
        {
            if (total >= 70) return "A";
            else if (total >= 60) return "B";
            else if (total >= 50) return "C";
            else if (total >= 40) return "D";
            else return "F";
        } // Helper to determine grade based on total marks

        [HttpGet("course/{courseId}/students")]
        public async Task<IActionResult> GetStudentsForGrading(string courseId)
        {
            var students = await _context.Enrollments
                .Where(e => e.CourseId == courseId)
                .Include(e => e.Student)
                .ThenInclude(s => s.ApplicationUser)
                .Select(e => new
                {
                    e.StudentId,
                    FullName = e.Student.FullName,
                    AdmNo = e.Student.AdmNo
                })
                .ToListAsync();

            return Ok(students);
        }//end of get student for grading controller

    [HttpGet("course/{courseId}/grades")]
    public async Task<IActionResult> GetGradesForCourse(string courseId)
    {
        var grades = await _context.Grades
            .Where(g => g.CourseId == courseId)
            .Include(g => g.Student)
            .ThenInclude(s => s.ApplicationUser)
            .Select(g => new
            {
                g.StudentId,
                FullName = g.Student.FullName,
                AdmNo = g.Student.AdmNo,
                g.CatMarks,
                g.ExamMarks,
                Total = g.CatMarks + g.ExamMarks,
                g.GradeLetter
            })
            .ToListAsync();

        return Ok(grades);
    }//end of get grades for courses controller



    }
}
