// Dtos/LoginRequest.cs
using System.ComponentModel.DataAnnotations;

namespace SchoolManagementAPI.Dto
{
    public class GradeDto
    {
        [Required]
    public string StudentId { get; set; }

    [Required]
    public string CourseId { get; set; }

    [Range(0, 30, ErrorMessage = "CAT marks must be between 0 and 30.")]
    public int CatMarks { get; set; }

    [Range(0, 70, ErrorMessage = "Exam marks must be between 0 and 70.")]
    public int ExamMarks { get; set; }
    }

}

