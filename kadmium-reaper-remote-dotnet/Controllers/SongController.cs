using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using kadmium_reaper_remote_dotnet.Models;
using kadmium_reaper_remote_dotnet.Util;
using System.Linq;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace kadmium_reaper_remote_dotnet.Controllers
{
    [Route("api/[controller]")]
    public class SongController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Song> Get()
        {
            var songs = Database.Instance.Songs.OrderBy(x => x.Name);
            return songs;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Song Get(string id)
        {
            var song = Database.Instance.Songs.Single(x => x.Name == id);
            return song;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]JObject value)
        {
            Database.Instance.Songs.Add(Song.Load(value));
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody]JObject value)
        {
            Delete(id);
            Database.Instance.Songs.Add(Song.Load(value));
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            var song = Get(id);
            Database.Instance.Songs.Remove(song);
        }
    }
}
