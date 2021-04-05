using kadmium_reaper_remote.WebAPI.Services;
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
        private IReaperService ReaperService { get; }

        public ReaperController(IReaperService reaperService)
        {
            ReaperService = reaperService;
        }

        [HttpPost("{id}")]
        public async Task Post(string id)
        {
            await ReaperService.SendCommands(id);
        }
    }
}