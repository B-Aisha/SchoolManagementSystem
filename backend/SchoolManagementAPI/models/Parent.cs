using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagementAPI.models
{

    public class Parent
    {
        [Key]
        public string? ParentId { get; set; }
        
        public string?  Email { get; set; }
        
        public string? FullName { get; set; }


        [ForeignKey("ApplicationUser")]

         public string? ApplicationUserID { get; set; }

        public ApplicationUser? ApplicationUser { get; set; }

        // Relationships
        public ICollection<Student> Students { get; set; } = new List<Student>();
    }
}
