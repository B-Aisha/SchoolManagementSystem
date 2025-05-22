using System;
namespace SchoolManagementAPI.models
{
    
public class Grade
{
    public int GradeId { get; set; }
    public string StudentId { get; set; }
    public ApplicationUser? Student { get; set; }

    public int CourseId { get; set; }
    public Course? Course { get; set; }

    public decimal Value { get; set; }
    public DateTime DateAwarded { get; set; }
}
}
