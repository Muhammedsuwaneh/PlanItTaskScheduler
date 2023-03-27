using EmployeeManagementSystemAPI.Models;
using Microsoft.EntityFrameworkCore;
using UserTaskManagerAPI.Models;

namespace EmployeeManagementSystemAPI.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() {}
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}
        public virtual DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public virtual DbSet<UserTask> UserTasks { get; set; }
    }
}
