using System;

namespace PrisonSystemManagement.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        // Add more properties as needed

        // Optional: You can also include any additional methods or logic within the model
        public string GetFullName()
        {
            return $"{FirstName} {LastName}";
        }
    }
}
