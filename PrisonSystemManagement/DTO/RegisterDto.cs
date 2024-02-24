using System.ComponentModel.DataAnnotations;

namespace PrisonSystemManagement.DTO
{
    public class RegisterDto
    {
        public string? UserName { get; set; }
        public string? firstName { get; set; }
        public string? lastName { get; set; }

        
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail is not valid")]
        public string? Email { get; set; }

        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{6,}$", ErrorMessage = "The password must contain an uppercase letter, a number, a symbol, and be at least 6 characters long.")]
        public string? Password { get; set; }
        public string? Role { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }

    }
}
