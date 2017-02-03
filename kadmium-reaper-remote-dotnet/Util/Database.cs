using kadmium_reaper_remote_dotnet.Models;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kadmium_reaper_remote_dotnet.Util
{
    public class Database
    {
        public List<Song> Songs { get; private set; }
        public List<Set> Sets { get; private set; }

        public static Database Instance { get; private set; }

        public static async Task Initialize()
        {
            Instance = Load(await FileAccess.GetSongs(), await FileAccess.GetSets());
        }

        public Database()
        {
            Songs = new List<Song>();
            Sets = new List<Set>();
        }

        public JArray SerializeSongs()
        {
            JArray arr = new JArray(
                from song in Songs
                select song.Serialize()
            );

            return arr;
        }

        public JArray SerializeSets()
        {
            JArray arr = new JArray(
                from set in Sets
                select set.Serialize()
            );

            return arr;
        }

        public static Database Load(JArray songsJson, JArray setsJson)
        {
            Database database = new Database();
            var songs = from songData in songsJson.Values<JObject>()
                        select Song.Load(songData);
            var sets = from setData in setsJson.Values<JObject>()
                       select Set.Load(setData);

            database.Songs.AddRange(songs);
            database.Sets.AddRange(sets);

            return database;
        }
    }
}
