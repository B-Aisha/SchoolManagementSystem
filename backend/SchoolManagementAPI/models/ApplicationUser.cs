using Microsoft.AspNetCore.Identity;

namespace SchoolManagementAPI.models
{
    public class ApplicationUser : IdentityUser
    {
        // You can still add custom fields here
         public string? FirstName { get; set; }

          public string? LastName{ get; set; }
        public string? Role { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Navigation properties (optional)
        public Student? Student { get; set; }
        public Teacher? Teacher { get; set; }
        public Parent? Parent { get; set; }  
    }
}
