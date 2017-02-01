using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using kadmium_reaper_remote_dotnet.Util;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace kadmium_reaper_remote_dotnet.Controllers
{
    [Route("api/[controller]")]
    public class ReaperController : Controller
    {
        HttpClient commandClient;
        HttpClient refreshClient;

        public ReaperController()
        {
            commandClient = new HttpClient();
            refreshClient = new HttpClient();
        }

        [HttpGet("{id}")]
        public async Task Get(string command)
        {
            await SendCommands(command);
        }

        private async Task SendCommands(params string[] commands)
        {
            string commandString = GetCommandString(commands);
            var result = await commandClient.GetAsync(Database.Instance.ReaperURI + commandString);
        }

        private string GetCommandString(params string[] commands)
        {
            return string.Join(";", commands) + ";";
        }
    }
}
