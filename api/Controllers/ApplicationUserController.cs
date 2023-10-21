using PlanIT.Context;
using PlanIT.Models;
using PlanIT.Encryption;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using XAct.Users;
using PlanIT.Base;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using XAct;
using UserTaskManagerAPI.Models;

namespace PlanIT.Controllers
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
                        new ApiResponse<ApplicationUser>(_user, "authentication was successful", token, 200);

                    return Ok(successfulAuthenticationResponse);
                }

                var userNotFoundResponse = 
                    new ApiResponse<ApplicationUser>(null, "authentication was unsuccessful. please check your credentials and try again", string.Empty, 400);

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
                        status = 500,
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

        [Authorize]
        [HttpGet("user/")]
        [Produces("application/json")]
        public IActionResult GetApplicationUser()
        {
            try
            {
                // obtain user id from token
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {
                    try
                    {
                        var userClaims = identity.Claims;

                        var userId = (userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value);
                        var _id = userId.ToInt32();

                        var user = context?.ApplicationUsers.FirstOrDefault(u => u.Id == _id);

                        if(user == null)
                        {
                            return BadRequest(new ApiResponse<ApplicationUser>
                            {
                                ResponseObject = null,
                                message = "use not found",
                                token = null,
                                status = 401
                            });
                        }

                        user.Password = Encrypt.DecryptPassword(user.Password);

                        return Ok(new ApiResponse<ApplicationUser>
                        {
                            ResponseObject = user,
                            message = "request successful",
                            token = null,
                            status = 200
                        });
                    }
                    catch (Exception ex)
                    {
                        // log errors
                        return BadRequest(new ApiResponse<ApplicationUser>
                        {
                            ResponseObject = null,
                            message = "oops! something went wrong",
                            token = null,
                            status = 500
                        });
                    }
                } 

                else
                {
                    throw new Exception("oops something went wrong");
                }
            }
            catch (Exception ex)
            {
                // log errors
                return BadRequest(new ApiResponse<ApplicationUser>
                {
                    ResponseObject = null,
                    message = ex.Message,
                    token = null,
                    status = 500
                });
            }
        }

        [Authorize]
        [HttpPut("update/")]
        [Produces("application/json")]
        public IActionResult UpdateApplicationUser(ApplicationUser updatedUser)
        {
            try
            {
                // obtain user id from token
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {
                    try
                    {
                        var userClaims = identity.Claims;

                        var userId = (userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value);
                        var _id = userId.ToInt32();

                        var user = context?.ApplicationUsers.FirstOrDefault(u => u.Id == _id);

                        if (user == null)
                        {
                            return BadRequest(new ApiResponse<ApplicationUser>
                            {
                                ResponseObject = null,
                                message = "use not found",
                                token = null,
                                status = 401
                            });
                        }

                        user.Username = updatedUser.Username;
                        user.Email = updatedUser.Email;
                        user.Password = Encrypt.GenerateMD5HashedPassword(updatedUser.Password);

                        context?.SaveChanges();

                        return Ok(new ApiResponse<ApplicationUser>
                        {
                            ResponseObject = user,
                            message = "request successful",
                            token = null,
                            status = 200
                        });
                    }
                    catch (Exception ex)
                    {
                        // log errors
                        return BadRequest(new ApiResponse<ApplicationUser>
                        {
                            ResponseObject = null,
                            message = "oops! something went wrong",
                            token = null,
                            status = 500
                        });
                    }
                }

                else
                {
                    throw new Exception("oops something went wrong");
                }
            }
            catch (Exception ex)
            {
                // log errors
                return BadRequest(new ApiResponse<ApplicationUser>
                {
                    ResponseObject = null,
                    message = ex.Message,
                    token = null,
                    status = 500
                });
            }
        }

        [HttpDelete("delete/")]
        [Produces("application/json")]
        public IActionResult DeleteApplicationUser()
        {
            // obtain user id from token
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                try
                {
                    var userClaims = identity.Claims;

                    var userId = (userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value);
                    var _userId = userId.ToInt32();

                    var _user = context?.ApplicationUsers.FirstOrDefault(t => t.Id == _userId);
                    var _tasks = context?.UserTasks.Where(t => t.user == _userId).ToList();

                    if (_user == null)
                    {
                        return NotFound(new ApiResponse<UserTask>
                        {
                            ResponseObject = null,
                            message = "not found",
                            token = null,
                            status = 401
                        });
                    }

                    if(_tasks != null) context?.UserTasks.RemoveRange(_tasks);

                    context?.ApplicationUsers.Remove(_user);

                    context?.SaveChanges();

                    return Ok(new ApiResponse<int>
                    {
                        ResponseObject = _userId,
                        message = "account deletd",
                        token = null,
                        status = 200
                    });

                }
                catch (Exception ex)
                {
                    return BadRequest(new ApiResponse<UserTask>
                    {
                        ResponseObject = null,
                        message = "oops something went wrong: " + ex.Message,
                        token = null,
                        status = 500
                    });
                }
            }

            else
            {
                return BadRequest(new ApiResponse<UserTask>
                {
                    ResponseObject = null,
                    message = "request rejected",
                    token = null,
                    status = 401
                });
            }
        }

    }
}
