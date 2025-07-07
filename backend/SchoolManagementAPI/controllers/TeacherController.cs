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
public class TeacherController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    private readonly IConfiguration _configuration;
    private readonly RoleManager<IdentityRole> _roleManager;

    public TeacherController(
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
    
    [HttpGet("profile/{teacherId}")]
public async Task<IActionResult> GetTeacherProfileByTeacherId(string teacherId)
{
    var teacher = await _context.Teachers
        .Include(t => t.ApplicationUser)
        .FirstOrDefaultAsync(t => t.TeacherId == teacherId);

    if (teacher == null)
        return NotFound("Teacher profile not found.");

    var profile = new TeacherProfileDto
    {
        TeacherId = teacher.TeacherId,
        FullName = teacher.FullName,
        Email = teacher.ApplicationUser?.Email,
        
    };

    return Ok(profile);
}

    //end of get student profile controller

}
