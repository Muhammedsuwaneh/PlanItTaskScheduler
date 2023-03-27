using EmployeeManagementSystemAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using XSystem.Security.Cryptography;

namespace EmployeeManagementSystemAPI.Encryption
{
    public static class Encrypt
    {
        public static string GenerateMD5HashedPassword(string password)
        {
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();

            byte[] arr = Encoding.UTF8.GetBytes(password);

            arr = md5.ComputeHash(arr);

            StringBuilder sb = new StringBuilder();

            foreach (byte ba in arr)
            {
                sb.Append(ba.ToString("x2").ToLower());
            }

            return sb.ToString();
        }

        public static string GenerateSessionToken(ApplicationUser user, IConfiguration _config)
        {
            // get security key from config
            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            // generate a credential based on security key using the HmacSha256 algorithm
            var credentials = new SigningCredentials
                (securityKey, SecurityAlgorithms.HmacSha256);

            // define claims
            var claims = new[]
            {
                new Claim(ClaimTypes.PrimarySid, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
            };

            // generate token
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"], claims, expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
