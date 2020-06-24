using System.Threading.Tasks;

namespace app.Services
{
    public interface ICaptchaService {
        Task<bool> ValidateTokenAsync(string submitToken, string ipAddress);
        string getPublicToken();
    }
}
