using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace kadmium_reaper_remote_dotnet.Util
{
    public class Settings
    {
        public string ReaperURI { get; private set; }
        public int HttpPort { get; private set; }
        public static Settings Instance { get; private set; }

        public static async Task Initialize()
        {
            Instance = Load(await FileAccess.GetSettings());
        }

        public static void Initialize(JObject settingsJson)
        {
            Instance = Load(settingsJson);
        }

        public static Settings Load(JObject settingsJson)
        {
            Settings settings = new Settings();
            settings.ReaperURI = (string)settingsJson["reaperWebUri"];
            settings.HttpPort = (int)settingsJson["httpPort"];
            return settings;
        }
    }
}