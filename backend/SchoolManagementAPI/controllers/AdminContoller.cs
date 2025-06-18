using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using SchoolManagementAPI.models;
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
        user.Email = dto.Email;
        user.PhoneNumber = dto.PhoneNumber;

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return NoContent();
    }//end of update controller

    



}//end

