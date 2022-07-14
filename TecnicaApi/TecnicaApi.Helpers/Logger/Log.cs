using NLog.Fluent;
using NLog;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace TecnicaApi.Helpers.Logger
{
    public class Log : ILog
    {
        /// <summary>
        /// Instance of NLog
        /// </summary>
        private static ILogger logger = LogManager.GetCurrentClassLogger();
        private string _class { get; set; } = null!;
        private string _method { get; set; } = null!;

        /// <summary>
        /// Debug type message
        /// </summary>
        /// <param name="message">Message</param>
        public void LogDebug(string message)
        {
            MethodBase methodBase = new StackTrace().GetFrame(1)!.GetMethod()!;
            GetConfiguration(methodBase);
            logger.Debug($"{_class}.{_method}:\t{message}");
        }

        /// <summary>
        /// Warn type message
        /// </summary>
        /// <param name="message">Message</param>
        public void LogWarn(string message)
        {
            MethodBase methodBase = new StackTrace().GetFrame(1)!.GetMethod()!;
            GetConfiguration(methodBase);
            logger.Warn($"{_class}.{_method}:\t{message}");
        }

        /// <summary>
        /// Error type message
        /// </summary>
        /// <param name="ex"></param>
        public void LogError(Exception ex)
        {
            MethodBase methodBase = new StackTrace().GetFrame(1)!.GetMethod()!;
            GetConfiguration(methodBase);

            string mensaje = ex.Message;
            Exception innerException = ex.InnerException!;
            while (innerException != null)
            {
                mensaje = $"{mensaje}; {innerException.Message}";
                innerException = innerException.InnerException!;
            }

            logger.Error($"{_class}.{_method}:\t{mensaje}\n{innerException}");
        }

        public void LogInfo(string Message, string Json)
        {
            MethodBase methodBase = new StackTrace()!.GetFrame(1)!.GetMethod()!;
            GetConfiguration(methodBase);
            logger.Info($"{_class}.{_method}:\t{Message}\n{Json}");
        }

        public void Prueba(string file, string message)
        {
            MethodBase methodBase = new StackTrace().GetFrame(1)!.GetMethod()!;
            GetConfiguration(methodBase);
            var prueba = LogManager.GetLogger(file);
            prueba.Info($"{_class}.{_method}:\t{message}");
        }

        private void GetConfiguration(MethodBase methodBase)
        {

            _class = methodBase.ReflectedType!.Name.Split('<')[1].Split('>').FirstOrDefault()!;
            _method = methodBase.ReflectedType!.ReflectedType!.Name;
        }
    }
}
