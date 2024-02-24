using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PrisonSystemManagement.Services.UserService;
using System.Security.Claims;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IUserService _userService;

        public ProfileController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("name")]
        [Authorize]
        public ActionResult<object> GetMe()
        {
            var userName = _userService.GetMyName();
            var response = new { username = userName }; // Create an object with the username property

            // Get the current user's token
            var token = HttpContext.Request.Headers["Authorization"];

            // Set the Authorization header in the response
            Response.Headers.Add("Authorization", token);

            // Expose the Authorization header to the frontend
            Response.Headers.Add("Access-Control-Expose-Headers", "Authorization");

            return Ok(response); // Return the response object as JSON
        }

        //[HttpGet("additional-data")]
        //[Authorize]
        [HttpGet("user-data")]
        [Authorize]
        public ActionResult<string> GetUserData()
        {
            var userData = _userService.GetUserData();
       
            // Get the current user's token
            var token = HttpContext.Request.Headers["Authorization"];
       
            // Set the Authorization header in the response
            Response.Headers.Add("Authorization", token);
       
            // Expose the Authorization header to the frontend
            Response.Headers.Add("Access-Control-Expose-Headers", "Authorization");
       
            return Ok(userData);
        }

    }
}
