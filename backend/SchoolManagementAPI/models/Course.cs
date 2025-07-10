using System;
using System.ComponentModel.DataAnnotations;

namespace SchoolManagementAPI.models
{
    public class Course

    {
        [Key]
        public string? CourseId { get; set; }
        public string? Title { get; set; } = string.Empty;
        public int Credits { get; set; }

        // Relationships
        public string? TeacherId { get; set; }
        public Teacher? Teacher { get; set; }


        public int Year { get; set; }
        public int Semester { get; set; }

        public ICollection<Student>? Students { get; set; }
       public ICollection<Enrollment>? Enrollments { get; set; } = new List<Enrollment>();
        public ICollection<Grade>? Grades { get; set; }
        public ICollection<Attendance>? Attendances { get; set; } = new List<Attendance>();
    }
}

