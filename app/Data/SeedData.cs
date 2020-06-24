using System;
using System.Threading;
using app.Data;
using app.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;


namespace app.Data
{
    class SeedUser
    {
        public string Email;
        public string UserName;
        public string[] Roles;
        public string Password;
    }

    public static class SeedData
    {
        static readonly string[] AppRoles = new string[] {
            "Administrator",
            "Moderator",
            "Normal"
        };

        static readonly SeedUser[] AppUsers = new SeedUser[] {
            new SeedUser() {
                UserName = "Admin",
                Email = "admin@example.com",
                Password = "Random-password",
                Roles = new string[] {"Administrator", "Moderator", "Normal"}
            },
            new SeedUser() {
                UserName = "Moderator",
                Email = "mod@example.com",
                Password = "Random-password",
                Roles = new string[] {"Moderator", "Normal"}
            },
            new SeedUser() {
                UserName = "Normal",
                Email = "user@example.com",
                Password = "Random-password",
                Roles = new string[] {"Normal"}
            },
        };

        public static void SeedRoles(IServiceProvider container, RoleManager<IdentityRole> roleManager)
        {
            // Get container
            var logger = container.GetRequiredService<ILogger<Program>>();

            // Start
            logger.LogInformation("Starting seeding roles");

            // Add each user
            foreach (var roleName in AppRoles)
            {
                // Find each email
                logger.LogDebug("Looking up role {Role}", new { Role = roleName });
                var roleModel = roleManager.FindByNameAsync(roleName).Result;

                // Create if missing
                if (roleModel != null)
                {
                    continue;
                }

                roleModel = new IdentityRole {
                    Name = roleName,
                    NormalizedName = roleName.ToUpper()
                };

                logger.LogDebug("Adding new role {Role}", new { Role = roleModel });
                var result = roleManager.CreateAsync(roleModel).Result;

                if (!result.Succeeded)
                {
                    logger.LogWarning("Failed to create role {Role}", new { Role = roleModel });
                    continue;
                }

                logger.LogInformation("Added new role {Role}", new { Role = roleModel });
            }

            // Finish
            logger.LogInformation("Finished seeding roles");
        }

        public static void SeedUsers(IServiceProvider container, UserManager<IdentityUser> userManager)
        {
            // Get container
            var logger = container.GetRequiredService<ILogger<Program>>();

            // Start
            logger.LogInformation("Starting seeding users");

            // Add each user
            foreach (var userData in AppUsers)
            {
                // Find each email
                logger.LogDebug("Looking up user {User}", new { User = userData });
                var userModel = userManager.FindByEmailAsync(userData.Email).Result;

                // Create if missing
                if (userModel == null)
                {
                    userModel = new IdentityUser
                    {
                        UserName = userData.UserName,
                        Email = userData.Email,
                        EmailConfirmed = true,
                    };

                    logger.LogDebug("Adding new user {User}", new { User = userModel });
                    var result = userManager.CreateAsync(userModel, userData.Password).Result;

                    if (!result.Succeeded)
                    {
                        logger.LogWarning("Failed to create user {Email}", userModel);
                        continue;
                    }

                    logger.LogInformation("Added new user {User}", new { User = userModel });
                }

                logger.LogDebug("Adding user {User} to {Roles}", new { User = userModel, Roles = userData.Roles });
                userManager.AddToRolesAsync(userModel, userData.Roles).Wait();

                logger.LogInformation("Added user {User}", new { User = userData.Email });
            }

            // Finish
            logger.LogInformation("Finished seeding users");
        }
    }
}
