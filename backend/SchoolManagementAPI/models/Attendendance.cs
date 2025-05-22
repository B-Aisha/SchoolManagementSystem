using System;
namespace SchoolManagementAPI.models
{
        public class Attendance
    {
        public int AttendanceId { get; set; }

        public string StudentId { get; set; }
        public ApplicationUser? Student { get; set; }

        public int CourseId { get; set; }
        public Course? Course { get; set; }

        public DateTime Date { get; set; }
        public string Status { get; set; } = "Present"; // or use enum
    }
}

