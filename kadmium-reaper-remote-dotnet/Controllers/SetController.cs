using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using kadmium_reaper_remote_dotnet.Util;
using kadmium_reaper_remote_dotnet.Models;
using System.Linq;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace kadmium_reaper_remote_dotnet.Controllers
{
    [Route("api/[controller]")]
    public class SetController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Set> Get()
        {
            return Database.Instance.Sets.OrderByDescending(x => x.Date);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Set Get(DateTime id)
        {
            var set = Database.Instance.Sets.Single(x => x.Date == id);
            return set;
        }

        // POST api/values
        [HttpPost]
        public async Task Post([FromBody]JObject value)
        {
            Database.Instance.Sets.Add(Set.Load(value));
            await FileAccess.SaveSets(Database.Instance.SerializeSets());
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task Put(DateTime id, [FromBody]JObject value)
        {
            Set original = Database.Instance.Sets.Single(x => x.Date == id);
            Database.Instance.Sets.Remove(original);
            Database.Instance.Sets.Add(Set.Load(value));
            await FileAccess.SaveSets(Database.Instance.SerializeSets());
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(DateTime id)
        {
            Set set = Database.Instance.Sets.Single(x => x.Date == id);
            Database.Instance.Sets.Remove(set);
            await FileAccess.SaveSets(Database.Instance.SerializeSets());
        }
    }
}
