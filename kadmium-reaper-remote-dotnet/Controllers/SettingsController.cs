using Microsoft.AspNetCore.Mvc;
using kadmium_reaper_remote_dotnet.Util;
using kadmium_reaper_remote_dotnet.Models;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace kadmium_reaper_remote_dotnet.Controllers
{
    [Route("api/[controller]")]
    public class SettingsController : Controller
    {
        // GET: api/values
        [HttpGet]
        public Settings Get()
        {
            return Settings.Instance;
        }

        // POST api/values
        [HttpPut]
        public async Task Put([FromBody]JObject value)
        {
            Settings.Initialize(value);
            Database.Instance.Sets.Add(Set.Load(value));
            await FileAccess.SaveSets(Database.Instance.SerializeSets());
        }
    }
}
