using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace kadmium_reaper_remote.WebAPI.Services
{
    public class ReaperService : IReaperService
    {
        private HttpClient commandClient;
        private ISettingsService Settings { get; }

        public ReaperService(ISettingsService settings)
        {
            commandClient = new HttpClient();
            Settings = settings;
        }

        public async Task SendCommands(params string[] commands)
        {
            string commandString = GetCommandString(commands);
            var settings = await Settings.GetSettings();
            Uri uri = new Uri(settings.ReaperURI);
            string path = uri.Scheme + "://" + uri.Host + ":" + uri.Port + "/_/" + commandString;
            var result = await commandClient.GetAsync(path);
        }

        private string GetCommandString(params string[] commands)
        {
            return string.Join(";", commands) + ";";
        }
    }
}
