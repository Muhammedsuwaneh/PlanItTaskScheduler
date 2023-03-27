using EmployeeManagementSystemAPI.Context;
using EmployeeManagementSystemAPI.Models;
using EmployeeManagementSystemAPI.Encryption;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using XAct.Users;
using EmployeeManagementSystemAPI.Base;

namespace EmployeeManagementSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private static ApplicationDbContext? context { get; set; }
        private static IConfiguration? config { get; set; }

        public ApplicationUserController(ApplicationDbContext _context, IConfiguration _config)
        {
            context = _context;
            config = _config;
        }

        [HttpPost("authenticate")]
        [Produces("application/json")]
        public IActionResult AuthenticateApplicationUser(ApplicationUserAuth userAuth)
        {
            try
            {
                ApplicationUser _user = context.ApplicationUsers.FirstOrDefault(user => user.Email == userAuth.Email &&
                user.Password == Encrypt.GenerateMD5HashedPassword(userAuth.Password));

                if (_user != null)
                {
                    var token = Encrypt.GenerateSessionToken(_user, config);
                    var successfulAuthenticationResponse = 
                        new ApiResponse<ApplicationUser>(_user, "user authenticated successfully", token, 200);

                    return Ok(successfulAuthenticationResponse);
                }

                var userNotFoundResponse = 
                    new ApiResponse<ApplicationUser>(null, "user authenticated unsuccessfully", string.Empty, 400);

                return NotFound(userNotFoundResponse);

            } catch(Exception ex)
            {
                // log errors
                return BadRequest(ex);
            }
        }

        [HttpPost("register")]
        [Produces("application/json")]
        public IActionResult RegisterApplicationUser(ApplicationUser user)
        {
            try
            {
                ApplicationUser User = context.ApplicationUsers.FirstOrDefault(u => u.Username == user.Username ||
                u.Email == user.Email); 

                if(User != null)
                {
                    return BadRequest(new ApiResponse<ApplicationUser>
                    {
                        ResponseObject = null,
                        token = null,
                        message = "Oops! user exist. Please check entered credentials",
                        status = 401,
                    });
                }

                user.Password = Encrypt.GenerateMD5HashedPassword(user.Password);
                user.DateJoined = DateTime.Now.ToString();

                context.Add(user);
                context.SaveChanges();

                var token = Encrypt.GenerateSessionToken(user, config);

                return Ok(new ApiResponse<ApplicationUser>
                {
                    ResponseObject = user,
                    token = token,
                    message = "account created",
                    status = 201,
                });
            }
            catch(Exception ex)
            {
                return BadRequest(new ApiResponse<ApplicationUser>
                {
                    ResponseObject = null,
                    token = null,
                    message = "oops! something went wrong: " + ex.Message,
                    status = 500,
                });
            }
        }
    }
}
