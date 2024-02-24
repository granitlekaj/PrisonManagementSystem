namespace PrisonSystemManagement.Model
{
    public class RegisterRequest
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }

        // Add any other properties required for user registration
    }
}
