using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace kadmium_reaper_remote_dotnet.Models
{
    public class Set
    {
        public DateTime Date { get; set; }
        public string Venue { get; set; }
        public IEnumerable<string> Songs { get; set; }

        public static Set Load(JObject jObject)
        {
            Set set = new Set()
            {
                Date = DateTime.Parse((string)jObject["date"]),
                Venue = (string)jObject["venue"],
                Songs = jObject["songs"].Values<string>()
            };

            return set;
        }

        public JObject Serialize()
        {
            JObject obj = new JObject
            {
                {"date", Date },
                {"venue", Venue },
                {"songs", new JArray { Songs } }
            };

            return obj;
        }
    }
}
