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
        
        public int Email { get; set; }


        //[Required]
        public string? ApplicationUserId { get; set; }

        //[ForeignKey("UserId")]
        public ApplicationUser? ApplicationUser { get; set; }


        // Relationships
        public ICollection<Student> Children { get; set; } = new List<Student>();
    }
}
