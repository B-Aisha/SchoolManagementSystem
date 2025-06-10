using System;
using System.ComponentModel.DataAnnotations;

namespace SchoolManagementAPI.models
{

    public enum AttendanceStatus
    {
        Present,
        Absent,
        Late
    }

    public class Attendance
    {
        [Key]
        public string? AttendanceId { get; set; }

        public string? StudentId { get; set; }
        public Student? Student { get; set; }

        public string? CourseId { get; set; }
        public Course? Course { get; set; }

        public DateTime Date { get; set; }
        
    }
}

