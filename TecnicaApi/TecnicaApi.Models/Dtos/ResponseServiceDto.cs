using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using TecnicaApi.Models.Enums;
using TecnicaApi.Models.Message;

namespace TecnicaApi.Models.Dtos
{
    public class ResponseServiceDto<T>
    {
        public TypeMessage Code { get; set; }
        public string? Message { get; set; }
        public List<string>? Errors { get; set; }
        public T? Result { get; set; }

        #region Methods Succes

        public async Task<ResponseServiceDto<T>> GetResultSucces()
        {
            Messages message = await Configuration(ResponseMessages.MESSAGE1);
            ResponseServiceDto<T> result = new ResponseServiceDto<T>()
            {
                Code = TypeMessage.Succes,
                Message = message.Message
            };
            return result;
        }

        public async Task<ResponseServiceDto<T>> GetResultSucces(T param)
        {
            Messages message = await Configuration(ResponseMessages.MESSAGE1);
            ResponseServiceDto<T> result = new ResponseServiceDto<T>()
            {
                Code = TypeMessage.Succes,
                Message = message.Message,
                Result = param
            };
            return result;
        }

        #endregion

        #region Methods error

        public async Task<ResponseServiceDto<T>> GetResultError()
        {
            Messages message = await Configuration(ResponseMessages.MESSAGE2);
            ResponseServiceDto<T> result = new ResponseServiceDto<T>()
            {
                Code = TypeMessage.Error,
                Message = message.Message
            };
            return result;
        }

        public async Task<ResponseServiceDto<T>> GetResultError(T param)
        {
            Messages message = await Configuration(ResponseMessages.MESSAGE2);
            ResponseServiceDto<T> result = new ResponseServiceDto<T>()
            {
                Code = TypeMessage.Error,
                Message = message.Message,
                Result = param
            };
            return result;
        }

        #endregion

        #region Message dynamic

        public async Task<ResponseServiceDto<T>> GetResult(ResponseMessages responseMessages)
        {
            Messages message = await Configuration(responseMessages);
            ResponseServiceDto<T> result = new()
            {
                Code = TypeMessage.Succes,
                Message = message.Message
            };
            return result;
        }

        public async Task<ResponseServiceDto<T>> GetResult(ResponseMessages responseMessages, T param)
        {
            Messages message = await Configuration(responseMessages);
            ResponseServiceDto<T> result = new()
            {
                Code = message.Type,
                Message = message.Message,
                Result = param
            };
            return result;
        }

        #endregion

        private async static Task<Messages> Configuration(ResponseMessages responseMessagesEnum)
        {
            string runDir = Path.GetDirectoryName(Assembly.GetEntryAssembly()!.Location) + "/Message/Message.json";
            string Text = await File.ReadAllTextAsync(runDir);
            Messages message = JsonConvert.DeserializeObject<List<Messages>>(Text)!.FirstOrDefault(x => x.Code == (int)responseMessagesEnum)!;
            return message;
        }
    }
}
