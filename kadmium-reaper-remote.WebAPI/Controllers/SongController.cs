using kadmium_reaper_remote_dotnet.Models;
using kadmium_reaper_remote_dotnet.Util;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace kadmium_reaper_remote_dotnet.Controllers
{
    [Route("api/[controller]")]
    public class SongController : Controller
    {
        private DatabaseContext _context;

        public SongController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Song> Get()
        {
            var songs = _context.Songs.OrderBy(x => x.Name);
            return songs;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<Song> Get(int id)
        {
            var song = await _context.LoadSong(id);
            return song;
        }

        // POST api/values
        [HttpPost]
        public async Task<int> Post([FromBody]Song value)
        {
            await _context.Songs.AddAsync(value);
            await _context.SaveChangesAsync();
            return value.Id;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]Song value)
        {
            _context.Songs.Update(value);
            await _context.SaveChangesAsync();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            var song = await _context.LoadSong(id);
            _context.Songs.Remove(song);
            var relationships = _context.SetSongRelationships.Where(x => x.SongId == id);
            _context.SetSongRelationships.RemoveRange(relationships);
            await _context.SaveChangesAsync();
        }
    }
}