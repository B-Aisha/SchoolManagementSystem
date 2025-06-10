using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using SchoolManagementAPI.models;

namespace SchoolManagementAPI.data 
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Parent> Parents { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Attendance> Attendance { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; } //might need to remove this
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //COmposite keys
            modelBuilder.Entity<Enrollment>()
                .HasKey(e => new { e.StudentId, e.CourseId });

            modelBuilder.Entity<Attendance>()
                .HasKey(e => new { e.StudentId, e.CourseId });

            // add fluent API configs if needed
            // One-to-One: ApplicationUser <-> Student
            modelBuilder.Entity<ApplicationUser>()
                .HasOne(a => a.Student)
                .WithOne(s => s.ApplicationUser)
                .HasForeignKey<Student>(s => s.ApplicationUserID)
                .OnDelete(DeleteBehavior.Cascade);

            // One-to-One: ApplicationUser <-> Teacher
            modelBuilder.Entity<ApplicationUser>()
                .HasOne(a => a.Teacher)
                .WithOne(t => t.ApplicationUser)
                .HasForeignKey<Teacher>(t => t.ApplicationUserId)
                .OnDelete(DeleteBehavior.Cascade);

            // One-to-One: ApplicationUser <-> Parent
            modelBuilder.Entity<ApplicationUser>()
                .HasOne(a => a.Parent)
                .WithOne(p => p.ApplicationUser)
                .HasForeignKey<Parent>(p => p.ApplicationUserId)
                .OnDelete(DeleteBehavior.Cascade);

                // One-to-Many: Teacher -> Courses
            modelBuilder.Entity<Teacher>()
                .HasMany(t => t.Courses)
                .WithOne(c => c.Teacher)
                .HasForeignKey(c => c.TeacherId);

            // One-to-Many: Student -> Attendances
            //modelBuilder.Entity<Student>()
                //.HasMany(s => s.Attendances)
                //.WithOne(a => a.Student)
                //.HasForeignKey(a => a.StudentId);

            // One-to-Many: Course -> Attendances
            modelBuilder.Entity<Course>()
                .HasMany(c => c.Attendances)
                .WithOne(a => a.Course)
                .HasForeignKey(a => a.CourseId);

            // One-to-Many: Student -> Grades
            //modelBuilder.Entity<Student>()
                //.HasMany(s => s.Grades)
                //.WithOne(g => g.Student)
                //.HasForeignKey(g => g.StudentId);

            // One-to-Many: Course -> Grades
            modelBuilder.Entity<Course>()
                .HasMany(c => c.Grades)
                .WithOne(g => g.Course)
                .HasForeignKey(g => g.CourseId);

            //One-to-Many Student -> Enrollments
            modelBuilder.Entity<Enrollment>()
                .HasOne(e => e.Student)
                .WithMany(s => s.Enrollments)
                .HasForeignKey(e => e.StudentId);

            // One-to-Many: Course -> Enrollment
            modelBuilder.Entity<Course>()
                .HasMany(c => c.Enrollments)
                .WithOne(a => a.Course)
                .HasForeignKey(a => a.CourseId);
        }
        
}   
}
