using System;

namespace kadmium_reaper_remote_dotnet.Models
{
    public class Set
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }
        public string Venue { get; set; }

        public Set()
        {
            Date = DateTime.Now;
            Venue = "";
        }
    }
}