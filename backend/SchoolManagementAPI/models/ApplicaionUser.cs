using Microsoft.AspNetCore.Identity;

namespace SchoolManagementAPI.models
{
    public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; }

    // Navigation Properties
    public Student Student { get; set; }
    public Teacher Teacher { get; set; }
    public Parent Parent { get; set; }

}
}

