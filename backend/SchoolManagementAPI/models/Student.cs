using System;
namespace SchoolManagementAPI.models
{
    public class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int AdmNo { get; set; }

    // Relationships
    public string? TeacherId { get; set; }
    public ApplicationUser? Teacher { get; set; }

    public ICollection<Enrollment>? Enrollments { get; set; }
    public ICollection<Grade>? Grades { get; set; }
    public ICollection<Attendance>? Attendances { get; set; }
}
}

