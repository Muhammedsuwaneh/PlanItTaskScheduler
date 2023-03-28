using EmployeeManagementSystemAPI.Base;
using EmployeeManagementSystemAPI.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using UserTaskManagerAPI.Models;
using XAct;

namespace UserTaskManagerAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserTasksController : ControllerBase
    {
        private ApplicationDbContext _context;
        private IConfiguration _config;

        public UserTasksController(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }


        [HttpGet]
        [Produces("application/json")]
        public IActionResult GetUserTasks()
        {
            // obtain user id from token
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                try
                {
                    var userClaims = identity.Claims;

                    var userId = (userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value);
                    var id = userId.ToInt32();

                    var tasks = _context.UserTasks.Where(t => t.user == id).ToList();

                    tasks.Reverse();

                    return Ok(new ApiResponse<List<UserTask>>
                    {
                        ResponseObject = tasks,
                        message = "request successful",
                        token = null,
                        status = 200
                    });

                } catch(Exception ex)
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


        [HttpPost("new")]
        [Produces("application/json")]
        public IActionResult NewUserTasks(UserTask task)
        {
            // obtain user id from token
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                try
                {
                    var userClaims = identity.Claims;

                    var userId = (userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value);
                    var id = userId.ToInt32();

                    var _task = new UserTask
                    {
                        Title = task.Title,
                        Description = task.Description,
                        DateAdded = DateTime.Now.ToString(),
                        Status = "Pending",
                        user = id,
                    };

                    _context.Add(_task);

                    _context.SaveChanges();

                    return Ok(new ApiResponse<UserTask>
                    {
                        ResponseObject = _task,
                        message = "task created",
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

        [HttpDelete("delete/{id}")]
        [Produces("application/json")]
        public IActionResult DeleteUserTasks(int id)
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

                    var _task = _context.UserTasks.FirstOrDefault(t => t.Id == id && t.user == _userId);

                    _context.UserTasks.Remove(_task);

                    _context.SaveChanges();

                    return Ok(new ApiResponse<UserTask>
                    {
                        ResponseObject = null,
                        message = "task removed",
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

        [HttpGet("statistics")]
        [Produces("application/json")]
        public IActionResult GetStatistics()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                try
                {
                    var userClaims = identity.Claims;

                    var userId = (userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value);
                    var id = userId.ToInt32();


                    // users's count tasks base on status
                    var userTasks = _context.UserTasks.Where(t => t.user == id).ToList();

                    Dictionary<string, int> taskCounts = userTasks.GroupBy(t => t.Status)
                        .Select(g => new { Status = g.Key, Count = g.Count() })
                        .ToDictionary(x => x.Status, x => x.Count);

                    return Ok(new ApiResponse<Dictionary<string, int>>
                    {
                        ResponseObject = taskCounts,
                        message = "request successful",
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
