using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using SchoolManagementAPI.models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using SchoolManagementAPI.Dto;
using SchoolManagementAPI.data;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AdminController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
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

        return Ok("User created successfully");
    }

    // ✅ GET ALL USERS
    [HttpGet("all-users")]
    public IActionResult GetAllUsers()
    {
       var users = _userManager.Users.Select(u => new
    {
        u.Id,
        u.UserName,
        u.Email,
        u.FirstName,
        u.LastName,
        u.PhoneNumber,
        u.Role,
        u.CreatedAt
    }).ToList();

    return Ok(users); 
    }

    // ✅ DELETE USER
    [HttpDelete("delete-user/{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();

        var result = await _userManager.DeleteAsync(user);
        return result.Succeeded ? Ok($"User {user.UserName} deleted") : BadRequest("Failed to delete user.");
    }

    // ✅ UPDATE USER (basic example)
    [HttpPut("update-user/{id}")]
    public async Task<IActionResult> UpdateUser(string id, UpdateUserDto model)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();

        user.FirstName = model.FirstName;
        user.LastName = model.LastName;
        user.Email = model.Email;

        var result = await _userManager.UpdateAsync(user);
        return result.Succeeded ? Ok("Updated") : BadRequest("Error updating");
    }
}
