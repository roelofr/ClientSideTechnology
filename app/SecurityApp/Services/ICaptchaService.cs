using System.Threading.Tasks;

namespace SecurityApp.Services
{
    public interface ICaptchaService {
        Task<bool> ValidateTokenAsync(string submitToken, string ipAddress);
        string getPublicToken();
    }
}
