using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using app.Models;
using app.Data;

namespace app
{
    static class WebExtension {
        public static IHost MigrateDatabase(this IHost host)
        {
            var serviceScopeFactory = (IServiceScopeFactory) host.Services.GetService(typeof(IServiceScopeFactory));

            using (var scope = serviceScopeFactory.CreateScope())
            {
                // Get provider
                var services = scope.ServiceProvider;

                // Get managers
                var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
                var userManager = services.GetRequiredService<UserManager<IdentityUser>>();

                // Get context
                var dbContext = services.GetRequiredService<LoginDbContext>();

                // Get env
                var env = services.GetRequiredService<IHostEnvironment>();

                dbContext.Database.Migrate();
                dbContext.SaveChanges();

                // Add roles
                SeedData.SeedRoles(services, roleManager);
                dbContext.SaveChanges();

                // Add users in test
                if (!env.IsProduction())
                {
                    SeedData.SeedUsers(services, userManager);
                    dbContext.SaveChanges();
                }

            }

            return host;
        }
    }
    public class Program
    {
        public static void Main(string[] args)
        {
            // Map host
            CreateHostBuilder(args)
                .Build()
                .MigrateDatabase()
                .Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) {
            return Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
        }
    }
}
