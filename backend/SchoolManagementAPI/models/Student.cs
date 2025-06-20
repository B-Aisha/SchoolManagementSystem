using System;
using System.ComponentModel.DataAnnotations;
namespace SchoolManagementAPI.models
{
    public class Student
    {
        [Key]
        public string? StudentId { get; set; }

        public string? AdmNo { get; set; }

        //Required
        public string? ApplicationUserID { get; set; }

        //[ForeignKey("ApplicationUserId")]
        public ApplicationUser? ApplicationUser { get; set; }

        public string? ParentId { get; set; }
        public Parent? Parent { get; set; }

        public ICollection<Course>? Courses { get; set; }
        public ICollection<Enrollment>? Enrollments { get; set; } = new List<Enrollment>();
        public ICollection<Attendance>? Attendances { get; set; } = new List<Attendance>();

        
    //public ICollection<Grade>? Grades { get; set; }
        // public ICollection<Attendance>? Attendances { get; set; }
    }
}

