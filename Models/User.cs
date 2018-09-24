using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace React{
    public class User{
    
        public int UserId { get; set; } 
        public string  Username { get; set; }
        public string Password { get; set; }
    }
}