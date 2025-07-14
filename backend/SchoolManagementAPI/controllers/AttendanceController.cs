using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using SchoolManagementAPI.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using SchoolManagementAPI.Dto;
using SchoolManagementAPI.data;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

//[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/[controller]")]
public class AttendanceController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ApplicationDbContext _context;

    private readonly IConfiguration _configuration;

    public AttendanceController(
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager,
         IConfiguration configuration,
        ApplicationDbContext context
        )
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
        _context = context;
    }

    [HttpPost("mark-attendance")]
    public async Task<IActionResult> MarkAttendance([FromBody] List<AttendanceDto> attendanceList)
    {
        foreach (var record in attendanceList)
        {
            var existing = await _context.Attendance
                .FirstOrDefaultAsync(a => a.StudentId == record.StudentId &&
                                        a.CourseId == record.CourseId &&
                                        a.Date.Date == record.Date.Date);

            if (existing != null)
            {
                existing.Status = record.Status;  // Update existing record
            }
            else
            {
                _context.Attendance.Add(new Attendance
                {
                    StudentId = record.StudentId,
                    CourseId = record.CourseId,
                    Date = record.Date,
                    Status = record.Status
                });
            }
        }

        await _context.SaveChangesAsync();
        return Ok("Attendance marked successfully.");
    }//end of submit attendance controller


   









}//end

