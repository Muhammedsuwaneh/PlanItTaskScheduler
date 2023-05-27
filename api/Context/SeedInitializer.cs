using EmployeeManagementSystemAPI.Encryption;
using EmployeeManagementSystemAPI.Models;

namespace EmployeeManagementSystemAPI.Context
{ 
    public class SeedInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            using(var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var _applicationContext = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();

                if(!_applicationContext.ApplicationUsers.Any())
                {
                    var defaultUser = new ApplicationUser
                    {
                        Username = "John Doe",
                        Email = "defaultuser45@gmail.com",
                        Password = Encrypt.GenerateMD5HashedPassword("454545"),
                        DateJoined = DateTime.Now.ToString()
                    };

                    _applicationContext.Add(defaultUser);
                    _applicationContext.SaveChanges();
                }
            }
        }
    }
}
