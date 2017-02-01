using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using kadmium_reaper_remote_dotnet.Util;
using kadmium_reaper_remote_dotnet.Models;
using System.Linq;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

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
        public void Post([FromBody]JObject value)
        {
            Database.Instance.Sets.Add(Set.Load(value));
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(DateTime id, [FromBody]JObject value)
        {
            Delete(id);
            Database.Instance.Sets.Add(Set.Load(value));
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(DateTime id)
        {
            Set set = Database.Instance.Sets.Single(x => x.Date == id);
            Database.Instance.Sets.Remove(set);
        }
    }
}
