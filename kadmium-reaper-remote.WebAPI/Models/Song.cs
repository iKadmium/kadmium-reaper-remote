using System;

namespace kadmium_reaper_remote_dotnet.Models
{
    public class Song
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public TimeSpan Duration { get; set; }
        public string Command { get; set; }

        public Song()
        {
            Name = "";
            Duration = TimeSpan.FromMilliseconds(0);
            Command = "";
        }
    }
}