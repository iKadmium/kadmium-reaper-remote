using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace kadmium_reaper_remote_dotnet.Util
{
    public class Settings
    {
        public string ReaperURI { get; private set; }
        public int HttpPort { get; private set; }
        public string LightingVenueURI { get; private set; }
        [JsonIgnore]
        public static Settings Instance { get; set; }

        public static async Task Initialize()
        {
            Instance = await FileAccess.LoadSettings();
        }

        public Settings()
        {
            ReaperURI = "http://localhost:9080/live.html";
            HttpPort = 80;
            LightingVenueURI = "http://localhost:5000/api/Venue/ActivateByName";
        }
    }
}