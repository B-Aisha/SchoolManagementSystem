using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagementAPI.models
{
    public class Student
    {
        [Key]
        public string? StudentId { get; set; }

        public string? AdmNo { get; set; }


        [ForeignKey("ApplicationUser")]

         public string? ApplicationUserID { get; set; }

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

