using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using SchoolManagementAPI.models;
using Microsoft.Extensions.Configuration;
using SchoolManagementAPI.Dto;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using System.Linq;
using System.Threading.Tasks;
using SchoolManagementAPI.data;

namespace SchoolManagementAPI.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public UsersController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration,
            ApplicationDbContext context
            )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _context = context;
        }

        // ✅ REGISTER (Sign Up)
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            var existingUser = await _userManager.FindByEmailAsync(model.Email);
            if (existingUser != null)
            {
                return BadRequest("Email already in use.");
            }

            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Email = model.Email,
                
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNumber = model.PhoneNumber,

            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);
                return BadRequest(new { Errors = errors });
            }



            return Ok(new {message = "User registered successfully."});
        }


        //  LOGIN: Leave this for later
        // Controllers/AuthController.cs
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                return Unauthorized(new { error = "Email not found." });
            }

            if (!await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return Unauthorized(new { error = "Incorrect password." });
            }



            // CHECK if user has been assigned a role
            var roles = await _userManager.GetRolesAsync(user);
            if (roles == null || !roles.Any())
            {
                return Unauthorized(new { error = "Your account has not been assigned a role yet. Please contact the administrator." });
            }

            var role = roles.FirstOrDefault() ?? "User";


            //generate JWT claims
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, role),
                new Claim("id", user.Id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            //fetch studentid and teacherid in 
            string? studentId = null;
            string? teacherId = null;
            string? parentId = null;

            if (role == "Student")
            {
                var student = await _context.Students.FirstOrDefaultAsync(s => s.ApplicationUserID == user.Id);
                if (student != null)
                    studentId = student.StudentId;
            }
            else if (role == "Teacher")
            {
                var teacher = await _context.Teachers.FirstOrDefaultAsync(t => t.ApplicationUserID == user.Id);
                if (teacher != null)
                    teacherId = teacher.TeacherId;
            }
            else if (role == "Parent")
            {
                var parent = await _context.Parents.FirstOrDefaultAsync(p => p.ApplicationUserID == user.Id);
                if (parent != null)
                    parentId = parent.ParentId;
            }


            return Ok(new
            {
                token = tokenString,
                role,
                studentId,
                teacherId,
                parentId
            });
        }
//end of loggin logic


    }
}


