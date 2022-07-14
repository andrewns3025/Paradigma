namespace TecnicaApi.Helpers.Logger
{
    public interface ILog
    {
        void LogDebug(string message);
        void LogError(Exception ex);
        void LogInfo(string Message, string Json);
        void LogWarn(string message);
        void Prueba(string file, string message);
    }
}