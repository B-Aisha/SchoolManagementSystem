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

[ApiController]
[Route("api/[controller]")]
public class StudentController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    private readonly IConfiguration _configuration;
    private readonly RoleManager<IdentityRole> _roleManager;

    public StudentController(
        ApplicationDbContext context,
        UserManager<ApplicationUser> userManager,
         RoleManager<IdentityRole> roleManager,
         IConfiguration configuration

        )
    {
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
    }
    
    [HttpGet("profile/{studentId}")]
public async Task<IActionResult> GetStudentProfileByStudentId(string studentId)
{
    var student = await _context.Students
        .Include(s => s.ApplicationUser)
        .FirstOrDefaultAsync(s => s.StudentId == studentId);

    if (student == null)
        return NotFound("Student profile not found.");

    var profile = new StudentProfileDto
    {
        StudentId = student.StudentId,
        FullName = student.FullName,
        Email = student.ApplicationUser?.Email,
        AdmNo = student.AdmNo
    };

    return Ok(profile);
}

    //end of get student profile controller

}
