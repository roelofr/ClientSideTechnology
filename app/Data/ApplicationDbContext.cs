using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace app.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            // noop
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Forward to parent
            base.OnModelCreating(builder);

            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            // Seed roles
            var roles = new IdentityRole[] {
                new IdentityRole { Id = "1ad2863b-3b20-4385-a79b-793ed63c6a96", Name = "User" },
                new IdentityRole { Id = "91fc9ea8-5ae8-4bd4-a026-7306da8bd126", Name = "Moderator" },
                new IdentityRole { Id = "13b68006-065f-4b6e-a6e4-4c2c007eeceb", Name = "Administrator" }
            };

            foreach (var role in roles)
            {
                // Add normalized name
                role.NormalizedName = role.Name.ToUpper();

                // Add to DB
                builder.Entity<IdentityRole>().HasData(role);
            }
        }
    }
}
