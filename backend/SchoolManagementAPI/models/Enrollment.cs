using System;
namespace SchoolManagementAPI.models
{
    public class Enrollment
{
    public int EnrollmentId { get; set; }

    public string StudentId { get; set; }
    public ApplicationUser? Student { get; set; }

    public int CourseId { get; set; }
    public Course? Course { get; set; }

    public DateTime EnrolledOn { get; set; }
}
}

