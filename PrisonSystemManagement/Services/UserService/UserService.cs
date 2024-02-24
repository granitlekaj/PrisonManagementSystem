using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace PrisonSystemManagement.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        public UserService(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        public string GetMyName()
        {
            var result = string.Empty;
            if (_httpContextAccessor.HttpContext != null)
            {
                result = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.GivenName);
            }
            return result;
        }

        public string GetUserData()
        {
            var result = string.Empty;
            if (_httpContextAccessor.HttpContext != null)
            {
                var username = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.GivenName);
                var name = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
                var surname = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Surname);
                var email = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
                result = $"Username: {username}\nName: {name}\nSurname: {surname}\nEmail: {email}";
            }
            return result;
        }
    }
}