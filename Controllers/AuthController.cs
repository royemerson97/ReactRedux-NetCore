using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace React.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;
        public AuthController(IConfiguration configuration, AppDbContext context)
        {
            _context = context;
            _configuration = configuration;
        }
        [AllowAnonymous]
        [HttpPost("RequestToken")]
        public async Task<IActionResult> RequestTokenAsync([FromBody] User user)
        {
            var encrypter = new Encrypter();
            var isUserRegistered = await _context.Users
                                        .Where(x => x.Username == user.Username 
                                        && x.Password == encrypter.CalculateHash(user.Password))
                                        .FirstOrDefaultAsync();
            if (isUserRegistered != null)
            {
                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, user.Username)
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SecurityKey"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    issuer: "yourdomain.com",
                    audience: "yourdomain.com",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(2),
                    signingCredentials: creds);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            return BadRequest("Could not verify username and password");
        }

        [HttpGet("Test")]
        public IActionResult Test()
        {
            return Ok("Super secret content, I hope you've got clearance for this...");
        }

        [AllowAnonymous]
        [HttpPost("RegisterUser")]
        public async Task<IActionResult> RegisterUserAsync([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            var encrypter = new Encrypter();
            /*var doesUserExist = from users in _context.Users
                                where users.Username == user.Username && users.Password == encryptor.CalculateHash(user.Password)
                                select users;*/
            var isUserRegistered = await _context.Users
                                            .Where(x => x.Username == user.Username 
                                            && x.Password == encrypter.CalculateHash(user.Password))
                                            .FirstOrDefaultAsync();
            if (isUserRegistered != null)
            {
                return StatusCode(200, "Already created");
            }
            await _context.Users.AddAsync(new User
            {
                Username = user.Username,
                Password = encrypter.CalculateHash(user.Password)
            });
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
