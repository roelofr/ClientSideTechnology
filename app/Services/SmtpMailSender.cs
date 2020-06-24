using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MailKit.Net.Smtp;
using MailKit.Security;
using MailKit;
using MimeKit;

namespace app.Services {
    class SmtpConfig {
        public static SmtpConfig FromConfiguration(IConfiguration configuration) {
            var section = configuration.GetSection("Smtp");
            var hasAuth = section.GetValue<bool>("HasAuthentication", false);
            var fromEmail = section.GetValue<string>("From", null);

            return new SmtpConfig {
                Hostname = section.GetValue<string>("Hostname", null),
                Port = section.GetValue<int>("Port", 587),
                UseAuthentication = hasAuth,
                Username = hasAuth ? section.GetValue<string>("Username", null) : null,
                Password = hasAuth ? section.GetValue<string>("Password", null) : null,
                FromName = section.GetValue<string>("FromName", fromEmail),
                FromEmail = fromEmail
            };
        }
        public string Hostname { get; set; }
        public int Port { get; set; }
        public bool UseAuthentication { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FromName { get; set; }
        public string FromEmail { get; set; }
    }

    public class SmtpMailSender : IEmailSender
    {
        private readonly ILogger _logger;
        private readonly SmtpConfig _configuration;
        public SmtpMailSender(
            IConfiguration configuration,
            ILogger<IEmailSender> logger
        )
        {
            _configuration = SmtpConfig.FromConfiguration(configuration);
            _logger = logger;
        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            // Prep message
            var message = new MimeMessage();

            // Add recipients
            message.From.Add(new MailboxAddress(_configuration.FromName, _configuration.FromEmail));
            message.To.Add(MailboxAddress.Parse(email));

            // Set subject
            message.Subject = subject;

            // Add body
            message.Body = (new BodyBuilder() {
                HtmlBody = htmlMessage
            }).ToMessageBody();

            // Get SMTP client
            using(var client = new SmtpClient()) {
                // Establish connection
                await client.ConnectAsync(_configuration.Hostname, _configuration.Port);

                // Login, if possible
                if (_configuration.UseAuthentication) {
                    try {
                        await client.AuthenticateAsync(_configuration.Username, _configuration.Password);
                    } catch (AuthenticationException ex) {
                        _logger.LogError(ex, "Failed to authenticate on SMTP server {Host}", new {
                            Host = _configuration.Hostname,
                            Username = _configuration.Username
                        });
                        return;
                    }
                }

                // Send message
                await client.SendAsync(message);

                // Disconnect
                await client.DisconnectAsync(true);
            }
        }
    }
}
