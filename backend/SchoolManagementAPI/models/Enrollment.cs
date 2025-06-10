using System;
using System.ComponentModel.DataAnnotations;

namespace SchoolManagementAPI.models
{
    public class Enrollment
    {
        [Key]
        public string? EnrollmentId { get; set; }

        public string? StudentId { get; set; }
        public Student? Student { get; set; }

        public string? CourseId { get; set; }
        public Course? Course { get; set; }

        public DateTime EnrolledOn { get; set; }
    
        public ICollection<Grade>? Grades { get; set; } = new List<Grade>();
    }
}

