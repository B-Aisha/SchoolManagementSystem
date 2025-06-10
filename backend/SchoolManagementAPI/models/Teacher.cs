using System;
using System.ComponentModel.DataAnnotations;

namespace SchoolManagementAPI.models
{
    public class Teacher
    {
        [Key]
        public string? TeacherId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Email { get; set; }

        [Required]
        public string? ApplicationUserId { get; set; }

        //[ForeignKey("UserId")]
        public ApplicationUser? ApplicationUser { get; set; }

        public ICollection<Enrollment>? Enrollments { get; set; }
        public ICollection<Grade>? Grades { get; set; }
        public ICollection<Attendance>? Attendances { get; set; } = new List<Attendance>();
        public ICollection<Course>? Courses { get; set; } = new List<Course>();
}
}


