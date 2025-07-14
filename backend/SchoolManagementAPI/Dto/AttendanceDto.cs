// Dtos/LoginRequest.cs
namespace SchoolManagementAPI.Dto
{
  public class AttendanceDto
{
    public string? StudentId { get; set; }
    public string? CourseId { get; set; }
    public DateTime Date { get; set; }
    public string? Status { get; set; }
}
  
}
