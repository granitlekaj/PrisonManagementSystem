using PrisonSystemManagement.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using PrisonSystemManagement.Model;
using PrisonSystemManagement.DTO;
using System.Text;
using PrisonSystemManagement.Data;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static Users users = new Users();
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private DataContext _context;

        public AuthController(IConfiguration configuration, IUserService userService, DataContext context)
        {
            _configuration = configuration;
            _userService = userService;
            _context = context;
        }
        


        [HttpGet]
        public async Task<ActionResult<List<Users>>> Get()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<List<Users>>> Get(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
                return BadRequest("User not found.");
            return Ok(users);
        }

        [HttpPost("register")]
        public async Task<ActionResult<Users>> Register(RegisterDto request)
        {
            request.Password = hashPassword(request.Password);
            users.userId = 0;
            users.username = request.UserName;
            users.firstName = request.firstName;
            users.lastName = request.lastName;
            users.email = request.Email;
            users.password = request.Password;
            users.roleName = request.Role;
            users.Created_at = request.Created_at;
            users.Updated_at=request.Updated_at;
            hashPassword(request.Password);

            _context.Users.Add(users);
            await _context.SaveChangesAsync();

            return Ok(users);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Users>>> UpdateUser(string id, RegisterDto request)
        {
            var dbRegister = await _context.Users.FirstOrDefaultAsync(request => request.username == id);
            if (dbRegister == null)
                return BadRequest("User not found.");

            request.Password = hashPassword(request.Password);
            dbRegister.username = request.UserName;
            dbRegister.firstName = request.firstName;
            dbRegister.lastName = request.lastName;
            dbRegister.email = request.Email;
            dbRegister.password = request.Password;
            dbRegister.roleName = request.Role;
            dbRegister.Created_at = request.Created_at;
            dbRegister.Updated_at = request.Updated_at;
            hashPassword(request.Password);

            await _context.SaveChangesAsync();
       
            return Ok(await _context.Users.ToListAsync());
        }

        // [HttpPost("login")]
        // public async Task<ActionResult<string>> Login(LoginDto request)
        // {
        //     try
        //     {
        //         string password = hashPassword(request.password);
        //         var dbUser = _context.Users.FirstOrDefault(u => u.username == request.username && u.password == password);
        //         if (dbUser == null)
        //         {
        //             return BadRequest("Username or password is incorrect");
        //         }
        //
        //         string token = CreateToken(dbUser);
        //         var refreshToken = GenerateRefreshToken();
        //         SetRefreshToken(refreshToken, dbUser); // Update the user's RefreshToken and token-related properties
        //         await _context.SaveChangesAsync(); // Save changes to the database
        //
        //         return Ok(token);
        //     }
        //     catch (Exception e)
        //     {
        //         return BadRequest(e.Message);
        //     }
        //   }

        [HttpPost("login")]
        public async Task<ActionResult<object>> Login(LoginDto request)
        {
            try
            {
                string password = hashPassword(request.password);
                var dbUser = _context.Users.FirstOrDefault(u => u.username == request.username && u.password == password);
                if (dbUser == null)
                {
                    return BadRequest("Username or password is incorrect");
                }

                string token = CreateToken(dbUser);
                var refreshToken = GenerateRefreshToken();
                SetRefreshToken(refreshToken, dbUser); // Update the user's RefreshToken and token-related properties
                await _context.SaveChangesAsync(); // Save changes to the database

                var response = new { token, role = dbUser.roleName }; // Create a response object containing the token
                return Ok(response);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }





        private void SetRefreshToken(RefreshToken newRefreshToken, Users user)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            user.RefreshToken = newRefreshToken.Token;
            user.TokenCreated = newRefreshToken.Created;
            user.TokenExpires = newRefreshToken.Expires;
        }


        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }

        private void SetRefreshToken(RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            users.RefreshToken = newRefreshToken.Token;
            users.TokenCreated = newRefreshToken.Created;
            users.TokenExpires = newRefreshToken.Expires;
        }

        //private string CreateToken(Users users)
        //{
        //    List<Claim> claims = new List<Claim>
        //    {
        //        new Claim("userId", users.userId.ToString()),
        //        new Claim(ClaimTypes.SerialNumber, users.userId.ToString()),
        //        new Claim("username", users.username),
        //        new Claim(ClaimTypes.GivenName, users.username),
        //        new Claim("name", users.name),
        //        new Claim(ClaimTypes.Name, users.name),
        //        new Claim("surname", users.surname),
        //        new Claim(ClaimTypes.Surname, users.surname),
        //        new Claim("role", users.roleName),
        //        new Claim(ClaimTypes.Role, users.roleName),
        //        new Claim("email", users.email),
        //        new Claim(ClaimTypes.Email, users.email)
        //
        //
        //    };
        //
        //    var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
        //        _configuration.GetSection("AppSettings:Token").Value));
        //
        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        //
        //    var token = new JwtSecurityToken(
        //        claims: claims,
        //        expires: DateTime.Now.AddDays(1),
        //        signingCredentials: creds);
        //
        //    var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        //
        //    return jwt;
        //}
        private string CreateToken(Users user)
{
    List<Claim> claims = new List<Claim>
    {
        new Claim("userId", user.userId.ToString()),
        new Claim(ClaimTypes.SerialNumber, user.userId.ToString()),
        new Claim("username", user.username),
        new Claim(ClaimTypes.GivenName, user.username),
        new Claim("name", user.firstName),
        new Claim(ClaimTypes.Name, user.firstName),
        new Claim("surname", user.lastName),
        new Claim(ClaimTypes.Surname, user.lastName),
        new Claim("role", user.roleName),
        new Claim(ClaimTypes.Role, user.roleName),
        new Claim("email", user.email),
        new Claim(ClaimTypes.Email, user.email)
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

    var token = new JwtSecurityToken(
        claims: claims,
        expires: DateTime.Now.AddDays(1),
        signingCredentials: creds
    );

    var jwt = new JwtSecurityTokenHandler().WriteToken(token);

    return jwt;
}


        static string hashPassword(string password)
        {
            var sha = SHA256.Create();
            var asByteArray = Encoding.Default.GetBytes(password);
            var hashedPassword = sha.ComputeHash(asByteArray);
            return Convert.ToBase64String(hashedPassword);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var dbUsers = await _context.Users.FindAsync(id);
            if (dbUsers == null)
                return BadRequest("User not found.");

            _context.Users.Remove(dbUsers);
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }


    }
}
