using System;
namespace SchoolManagementAPI.models
{
    public class Course

{
    public int CourseId { get; set; }
    public string Title { get; set; } = string.Empty;
    public int Credits { get; set; }

    // Relationships
    public string? TeacherId { get; set; }
    public ApplicationUser? Teacher { get; set; }

    public ICollection<Enrollment>? Enrollments { get; set; }
    public ICollection<Grade>? Grades { get; set; }
    public ICollection<Attendance>? Attendances { get; set; }
}
}

