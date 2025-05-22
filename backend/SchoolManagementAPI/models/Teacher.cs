using System;
namespace SchoolManagementAPI.models
{
    public class Teacher
{
    public int TeacherId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Email { get; set; }

    // Relationships
    public string? StudentId { get; set; }
    public ApplicationUser? Student { get; set; }

    public ICollection<Enrollment>? Enrollments { get; set; }
    public ICollection<Grade>? Grades { get; set; }
    public ICollection<Attendance>? Attendances { get; set; }
}
}


