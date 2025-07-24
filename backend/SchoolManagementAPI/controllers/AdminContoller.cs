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
public class AdminController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ApplicationDbContext _context;

    private readonly IConfiguration _configuration;

    public AdminController(
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

    // ✅ CREATE USER
    [HttpPost("create-user")]
    public async Task<IActionResult> CreateUser(RegisterRequest model)
    {
        var user = new ApplicationUser
        {
            UserName = model.Email,
            Email = model.Email,
            FirstName = model.FirstName,
            LastName = model.LastName,
            PhoneNumber = model.PhoneNumber,
            Role = model.Role // Optional if you handle roles via RoleManager
        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        if (!await _roleManager.RoleExistsAsync(model.Role))
            await _roleManager.CreateAsync(new IdentityRole(model.Role));

        await _userManager.AddToRoleAsync(user, model.Role);

        if (model.Role == "Student")
        {
            var student = new Student
            {
                StudentId = Guid.NewGuid().ToString(),
                ApplicationUserID = user.Id
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();
        }



        return Ok("User created successfully");
    }//for create user

    [HttpGet("all-users")]
    //[Authorize(Roles = "Admin")] // Optional, depending on your role-based setup
    public async Task<IActionResult> GetAllUsers()
    {
        var users = _userManager.Users.ToList();

        var userList = new List<UserWithRoleDto>();

        foreach (var user in users)

        {
            var Roles = await _userManager.GetRolesAsync(user);
            userList.Add(new UserWithRoleDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Roles = Roles.ToList()
            });
        }
        return Ok(userList);
    }//end of get all users controller

    [HttpGet("users-in-role/{roleName}")]
    //[Authorize(Roles = "Admin")] // Only Admin can fetch role-based users
    public async Task<IActionResult> GetUsersInRole(string roleName)
    {
        var usersInRole = await _userManager.GetUsersInRoleAsync(roleName);

        var userList = new List<UserWithRoleDto>();

        foreach (var user in usersInRole)
        {
            var roles = await _userManager.GetRolesAsync(user);
            userList.Add(new UserWithRoleDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Roles = roles.ToList()
            });
        }

        return Ok(userList);
    }//end of users in role controller

    [HttpGet("user/{id}")]
    //[Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetUserById(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();

        return Ok(new
        {
            user.Id,
            user.UserName,
            user.Email,
            user.PhoneNumber
        });
    }//end of get user by id controller 

    [HttpPut("user/{id}")]
    //[Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserDto dto)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();

        user.UserName = dto.UserName;
        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.Email = dto.Email;
        user.PhoneNumber = dto.PhoneNumber;

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return NoContent();
    }//end of update controller

    [HttpDelete("user/{id}")]
    //[Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
            return NotFound();

        var result = await _userManager.DeleteAsync(user);
        if (result.Succeeded)
            return Ok(new { message = "User deleted successfully" });

        return BadRequest(result.Errors);
    }//end of the delete user controller

    [HttpPost("assign-role")]
    //[Authorize(Roles = "Admin")]
    public async Task<IActionResult> AssignRole([FromBody] RoleAssignmentDto model)
    {
        var user = await _userManager.FindByIdAsync(model.UserId);
        if (user == null)
            return NotFound("User not found");

        //Remove from current ASP.NET Identity roles
        var currentRoles = await _userManager.GetRolesAsync(user);
        await _userManager.RemoveFromRolesAsync(user, currentRoles);
        await _userManager.AddToRoleAsync(user, model.Role);

        //  Update Role in ApplicationUser table
        user.Role = model.Role;
        await _userManager.UpdateAsync(user);

        //  Remove user from any old custom table
        var existingStudent = await _context.Students.FirstOrDefaultAsync(s => s.ApplicationUserID == user.Id);
        if (existingStudent != null)
        {
            _context.Students.Remove(existingStudent);
        }

        var existingTeacher = await _context.Teachers.FirstOrDefaultAsync(t => t.ApplicationUserID == user.Id);
        if (existingTeacher != null)
        {
            _context.Teachers.Remove(existingTeacher);
        }

        var existingParent = await _context.Parents.FirstOrDefaultAsync(p => p.ApplicationUserID == user.Id);
        if (existingParent != null)
        {
            _context.Parents.Remove(existingParent);
        }

        await _context.SaveChangesAsync();  // Save deletion of old records

        //  Add to new custom table based on role
        if (model.Role == "Student")
        {
            await CreateStudentProfile(user);
        }
        else if (model.Role == "Teacher")
        {
            await CreateTeacherProfile(user);
        }
        else if (model.Role == "Parent")
        {
            await CreateParentProfile(user);
        }
        


        return Ok("Role assigned successfully");
    }//end of assign role controller

    //  HELPER: Create custom Student record
    private async Task CreateStudentProfile(ApplicationUser user)
    {
        var exists = await _context.Students.AnyAsync(s => s.ApplicationUserID == user.Id);
        if (!exists)
        {
            var student = new Student
            {
                StudentId = Guid.NewGuid().ToString(),
                ApplicationUserID = user.Id,
                FullName = $"{user.FirstName} {user.LastName}",
                AdmNo = $"ADM{DateTime.Now.Ticks}",

            };
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
        }
    }

    private async Task CreateTeacherProfile(ApplicationUser user)
    {
        var exists = await _context.Teachers.AnyAsync(t => t.ApplicationUserID == user.Id);
        if (!exists)
        {
            var teacher = new Teacher
            {
                TeacherId = Guid.NewGuid().ToString(),
                ApplicationUserID = user.Id,
                FullName = $"{user.FirstName} {user.LastName}",
                Email = user.Email,

            };

            _context.Teachers.Add(teacher);
            await _context.SaveChangesAsync();
        }
    }


     private async Task CreateParentProfile(ApplicationUser user)
    {
        var exists = await _context.Parents.AnyAsync(p => p.ApplicationUserID == user.Id);
        if (!exists)
        {
            var parent = new Parent
            {
                ParentId = Guid.NewGuid().ToString(),
                ApplicationUserID = user.Id,
                FullName = $"{user.FirstName} {user.LastName}",
                Email = user.Email,
                

            };
            _context.Parents.Add(parent);
            await _context.SaveChangesAsync();
        }
    }


    [HttpGet("all-students")]
    public async Task<IActionResult> GetAllCustomStudents()
    {
        var students = await _context.Students
            .Include(s => s.ApplicationUser)
            .Select(s => new StudentWithUserDto
            {
                StudentId = s.StudentId,
                UserName = s.ApplicationUser.UserName,
                Email = s.ApplicationUser.Email,
                ApplicationUserId = s.ApplicationUserID
            })
            .ToListAsync();

        return Ok(students);
    }//end of get students controller

    [HttpGet("all-teachers")]
    public async Task<IActionResult> GetAllCustomTeachers()
    {
        var teachers = await _context.Teachers
            .Include(t => t.ApplicationUser)
            .Select(t => new TeacherWithUserDto
            {
                TeacherId = t.TeacherId,
                UserName = t.ApplicationUser.UserName,
                FullName = t.FullName,
                Email = t.ApplicationUser.Email,
                ApplicationUserId = t.ApplicationUserID
            })
            .ToListAsync();

        return Ok(teachers);
    }
//end of get all techers controller










}//end

