using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

namespace app.Services
{
    class GoogleCaptchaService : ICaptchaService
    {
        private const string ApiEndpoint = "https://www.google.com/recaptcha/api/siteverify";
        private readonly string _siteKey;
        private readonly string _secretKey;
        private readonly IHttpClientFactory _httpFactory;
        private readonly ILogger _logger;
        public GoogleCaptchaService(
            IConfiguration configuration,
            IHttpClientFactory clientFactory,
            ILogger<ICaptchaService> logger
        )
        {
            // Get keys
            _siteKey = configuration["recaptcha:site-key"];
            _secretKey = configuration["recaptcha:secret-key"];

            // HTTP client
            _httpFactory = clientFactory;

            // Logger
            _logger = logger;
        }

        public async Task<bool> ValidateTokenAsync(string submitToken, string ipAddress)
        {
            // Get an HTTP client
            var client = _httpFactory.CreateClient();

            try
            {
                // Construct parameters
                var parameters = new Dictionary<string, string> {
                    {"secret", _secretKey},
                    {"response", submitToken},
                    {"remoteip", ipAddress}
                };

                // Log
                _logger.LogDebug("Validating {Token} with Google (from IP {Ip})", new { Token = submitToken, Ip = ipAddress });

                // Ask Google
                HttpResponseMessage response = await client.PostAsync(ApiEndpoint, new FormUrlEncodedContent(parameters));

                // Debug response
                _logger.LogDebug("Received Response code {Code} from Google", new { Code = response.StatusCode });

                // Cause a fuss when token failed
                response.EnsureSuccessStatusCode();

                // Read JSON response
                string apiResponse = await response.Content.ReadAsStringAsync();
                dynamic responseData = JObject.Parse(apiResponse);

                // Debug response
                _logger.LogDebug("Received {Result} from API", new { Result = responseData });

                // Check if true
                if (responseData.success == true)
                {
                    return true;
                }

                // Log if failed
                _logger.LogInformation("Ip address {Ip} failed Captcha", new { Ip = ipAddress, Token = submitToken, Result = responseData });
            }
            catch (HttpRequestException ex)
            {
                // Something went wrong with the API. Let the request through.
                _logger.LogError(ex, "Unexpected error calling reCAPTCHA api.");
            }

            // Fail
            return false;
        }

        public string getPublicToken() => _siteKey;
    }
}
