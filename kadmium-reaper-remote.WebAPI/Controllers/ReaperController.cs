using kadmium_reaper_remote_dotnet.Util;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace kadmium_reaper_remote_dotnet.Controllers
{
    [Route("api/[controller]")]
    public class ReaperController : Controller
    {
        private HttpClient commandClient;

        public ReaperController()
        {
            commandClient = new HttpClient();
        }

        [HttpPost("{id}")]
        public async Task Post(string id)
        {
            await SendCommands(id);
        }

        private async Task SendCommands(params string[] commands)
        {
            string commandString = GetCommandString(commands);
            Uri uri = new Uri(Settings.Instance.ReaperURI);
            string path = uri.Scheme + "://" + uri.Host + ":" + uri.Port + "/_/" + commandString;
            var result = await commandClient.GetAsync(path);
        }

        private string GetCommandString(params string[] commands)
        {
            return string.Join(";", commands) + ";";
        }
    }
}