using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using app.Extensions;

namespace app
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Build host with secrets
            var host = CreateHostBuilder(args)
                .AlwaysAddSecrets()
                .Build();

            // Start host after migrations
            host
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
