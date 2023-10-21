using PlanIT.Base;
using PlanIT.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
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
        private readonly IMemoryCache _memoryCache;

        public UserTasksController(ApplicationDbContext context, IConfiguration config, IMemoryCache memoryCache)
        {
            _context = context;
            _config = config;
            _memoryCache = memoryCache;
        }

        private int UserClaims()
        {
            // obtain user id from token
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity == null) return -1;

            var userClaims = identity.Claims;

            var userId = (userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value);
            var id = userId.ToInt32();

            return id;
        }

        [HttpGet]
        [Produces("application/json")]
        public async Task<IActionResult> GetUserTasks()
        {
            var id = UserClaims();
            var cacheKey = "UserTasks_" + id;

            if (_memoryCache.TryGetValue(cacheKey, out List<UserTask>? tasks))
            {
                return Ok(new ApiResponse<List<UserTask>>
                {
                    ResponseObject = tasks,
                    message = "request successful (from cache)",
                    token = null,
                    status = 200,
                });
            }

            if (id != -1)
            {
                try
                {
                    var _tasks = await _context.UserTasks
                        .Where(t => t.user == id)
                        .OrderBy(t => t.DateAdded)
                        .ToListAsync();

                    return Ok(new ApiResponse<List<UserTask>>
                    {
                        ResponseObject = _tasks,
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

        [HttpGet("usertaskbydate/{date}")]
        [Produces("application/json")]
        public async Task<IActionResult> GetUserTasksByDate(string date)
        {
            // obtain user id from token
            var id = UserClaims();

            if (id != -1)
            {
                try
                {
                    var tasks = await _context.UserTasks.Where(t => t.user == id && t.DateAdded == date)
                        .OrderBy(t => t.DateAdded).ToListAsync();

                    return Ok(new ApiResponse<List<UserTask>>
                    {
                        ResponseObject = tasks,
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



        [HttpPost("new")]
        [Produces("application/json")]
        public async Task<IActionResult> NewUserTasks(UserTask task)
        {
            // obtain user id from token
            var id = UserClaims();

            if (id != -1)
            {
                try
                {
                    var _task = new UserTask
                    {
                        Title = task.Title,
                        Description = task.Description,
                        DateAdded = task.DateAdded,
                        Status = "Ongoing",
                        StartTime = task.StartTime,
                        EndTime = task.EndTime,
                        user = id,
                    };

                    _context.Add(_task);

                    await _context.SaveChangesAsync();

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
            var _userId = UserClaims();

            if (_userId != -1)
            {
                try
                {
                    var _task = _context.UserTasks.FirstOrDefault(t => t.Id == id && t.user == _userId);

                    if (_task == null)
                    {
                        return NotFound(new ApiResponse<UserTask>
                        {
                            ResponseObject = null,
                            message = "not found",
                            token = null,
                            status = 401
                        });
                    }

                    _context.UserTasks.Remove(_task);

                    _context.SaveChanges();

                    return Ok(new ApiResponse<UserTask>
                    {
                        ResponseObject = _task,
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
        public async Task<IActionResult> GetStatistics()
        {

            var id = UserClaims();

            if (id != -1)
            {
                try
                {
                    // users's count tasks base on status
                    var userTasks = await _context.UserTasks.Where(t => t.user == id).ToListAsync();

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

        [HttpPut("update/{id}")]
        [Produces("application/json")]
        public async Task<IActionResult> UpdateUserTasks(UserTask task, int id)
        {
            // obtain user id from token

            var _id = UserClaims();

            if (_id != -1)
            {
                try
                {
                    var _task = await _context.UserTasks.FirstOrDefaultAsync(task => task.Id == id && _id == task.user);

                    if(_task == null)
                    {
                        return NotFound(new ApiResponse<UserTask>
                        {
                            ResponseObject = null,
                            message = "not found",
                            token = null,
                            status = 401
                        });
                    }

                    _task.Title = task.Title;
                    _task.Description = task.Description;
                    _task.DateAdded = task.DateAdded;
                    _task.StartTime = task.StartTime;
                    _task.EndTime = task.EndTime;

                    _context.SaveChanges();

                    return Ok(new ApiResponse<UserTask>
                    {
                        ResponseObject = _task,
                        message = "task updated",
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


        [HttpGet("totaltaskeverymonth")]
        [Produces("application/json")]
        public async Task<IActionResult> GetTotalTaskEveryMonth()
        {
            var _id = UserClaims();

            if (_id != -1)
            {
                try
                {
                    var userTasks = await _context.UserTasks.Where(t => t.user == _id).ToListAsync();

                    // set value of all months to zero
                    Dictionary<int, int> monthlyStatistics = Enumerable.Range(1, 12).ToDictionary(key => key, value => 0);

                    if (userTasks != null)
                    {

                        // get task count of every month
                        var taskCountEveryMonth =
                       userTasks.GroupBy(x => new { Month = int.Parse(x.DateAdded.Split('-')[1]) })
                       .Select(g => new
                       {
                           Month = g.Key.Month,
                           Count = g.Count()
                       })
                       .OrderBy(x => x.Month)
                       .ToDictionary(x => x.Month, x => x.Count);

                        // update the date statistics values
                        foreach (var keyValue in taskCountEveryMonth)
                        {
                            if (monthlyStatistics.ContainsKey(keyValue.Key))
                            {
                                monthlyStatistics[keyValue.Key] = keyValue.Value;
                            }
                        }
                    }
                   
                    return Ok(new ApiResponse<Dictionary<int, int>>
                    {
                        ResponseObject = monthlyStatistics,
                        message = "task retrieved",
                        token = null,
                        status = 200
                    });
                }
                catch(Exception ex)
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

        [HttpPut("marktaskascomplete/{id}")]
        [Produces("application/json")]
        public IActionResult MarkTaskAsComplete(int id)
        {
            var _userId = UserClaims();

            if(_userId != -1)
            {
                var task = _context.UserTasks.FirstOrDefault(t => t.user == _userId && t.Id == id);

                if(task == null)
                {
                    return BadRequest(new ApiResponse<UserTask>
                    {
                        ResponseObject = null,
                        message = "Task not found",
                        token = null,
                        status = 401
                    });
                }

                task.Status = "Completed";
                _context.SaveChanges();

                return Ok(new ApiResponse<UserTask>
                {
                    ResponseObject = task,
                    message = "Task status updated",
                    token = null,
                    status = 200
                });
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
