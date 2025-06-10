using System;
using System.ComponentModel.DataAnnotations;

namespace SchoolManagementAPI.models
{
    
public class Grade
{
    [Key]
    public string? GradeId { get; set; }
    public string? StudentId { get; set; }
    public Student? Student { get; set; }

    public string? CourseId { get; set; }
    public Course? Course { get; set; }

    public char Value { get; set; }
    public DateTime DateAwarded { get; set; }
}
}
