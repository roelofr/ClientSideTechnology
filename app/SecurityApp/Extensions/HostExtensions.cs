using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SecurityApp.Data;

namespace SecurityApp.Extensions {

    public static class WebExtensions
    {
        public static IHost MigrateDatabase(this IHost host)
        {
            var serviceScopeFactory = (IServiceScopeFactory)host.Services.GetService(typeof(IServiceScopeFactory));

            using (var scope = serviceScopeFactory.CreateScope())
            {
                // Get provider
                var services = scope.ServiceProvider;

                // Get managers
                var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
                var userManager = services.GetRequiredService<UserManager<IdentityUser>>();

                // Get context
                var dbContext = services.GetRequiredService<ApplicationDbContext>();

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
        public static IHostBuilder AlwaysAddSecrets(this IHostBuilder builder)
        {
            return builder
                .ConfigureAppConfiguration((hostContext, builder) =>
                {
                    if (hostContext.HostingEnvironment.IsDevelopment())
                    {
                        builder.AddUserSecrets<Program>();
                    }
                });
        }
    }
}
