using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateGradeModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Value",
                table: "Grades");

            migrationBuilder.AddColumn<double>(
                name: "CatMarks",
                table: "Grades",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ExamMarks",
                table: "Grades",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "GradeLetter",
                table: "Grades",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CatMarks",
                table: "Grades");

            migrationBuilder.DropColumn(
                name: "ExamMarks",
                table: "Grades");

            migrationBuilder.DropColumn(
                name: "GradeLetter",
                table: "Grades");

            migrationBuilder.AddColumn<string>(
                name: "Value",
                table: "Grades",
                type: "nvarchar(1)",
                nullable: false,
                defaultValue: "");
        }
    }
}
