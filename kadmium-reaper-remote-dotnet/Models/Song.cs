using System;
using Newtonsoft.Json.Linq;

namespace kadmium_reaper_remote_dotnet.Models
{
    public class Song
    {
        public string Name { get; set; }
        public TimeSpan Duration { get; set; }
        public string Command { get; set; }

        public static Song Load(JObject jObject)
        {
            Song song = new Song()
            {
                Name = (string)jObject["name"],
                Duration = TimeSpan.Parse((string)jObject["duration"]),
                Command = (string)jObject["command"]
            };
            return song;
        }

        public JObject Serialize()
        {
            JObject obj = new JObject
            {
                { "name", Name },
                { "duration", Duration},
                { "command", Command}
            };
            return obj;
        }
    }
}
