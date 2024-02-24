using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Serialization; 

namespace PrisonSystemManagement.DTO
{
    public class UserDto
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int userId { get; set; }
        public string? username { get; set; }
        public string? firstName { get; set; } = string.Empty;
        public string? lastName { get; set; } = string.Empty;

        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail is not valid")]
        public string email { get; set; } = string.Empty;
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{6,}$", ErrorMessage = "The password must contain an uppercase letter, a number, a symbol, and be at least 6 characters long.")]
        public string password { get; set; }
        public string roleName { get; set; }
        public string Token { get; internal set; }
    }
}
