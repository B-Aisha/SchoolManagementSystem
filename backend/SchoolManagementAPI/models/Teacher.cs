using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagementAPI.models
{
    public class Teacher
    {
        [Key]
        public string? TeacherId { get; set; }
        public string? FullName { get; set; } 
        public string? Email { get; set; }

        [ForeignKey("ApplicationUser")]
        public string? ApplicationUserID { get; set; } 
        public ApplicationUser? ApplicationUser { get; set; }

        public ICollection<Enrollment>? Enrollments { get; set; }
        public ICollection<Grade>? Grades { get; set; }
        public ICollection<Attendance>? Attendances { get; set; } = new List<Attendance>();
        public ICollection<Course>? Courses { get; set; } = new List<Course>();
}
}


