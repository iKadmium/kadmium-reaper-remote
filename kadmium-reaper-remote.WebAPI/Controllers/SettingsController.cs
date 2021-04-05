using kadmium_reaper_remote.WebAPI.Services;
using kadmium_reaper_remote_dotnet.Util;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace kadmium_reaper_remote_dotnet.Controllers
{
    [Route("api/[controller]")]
    public class SettingsController : Controller
    {
        private ISettingsService SettingsService { get; }
        public SettingsController(ISettingsService settingsService)
        {
            SettingsService = settingsService;
        }
        // GET: api/values
        [HttpGet]
        public async Task<Settings> Get()
        {
            var settings = await SettingsService.GetSettings();
            return settings;
        }

        // POST api/values
        [HttpPut]
        public async Task Put([FromBody]Settings value)
        {
            await SettingsService.SaveSettings(value);
        }
    }
}