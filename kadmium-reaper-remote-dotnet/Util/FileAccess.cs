using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json.Schema;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using Newtonsoft.Json.Serialization;

namespace kadmium_reaper_remote_dotnet.Util
{
    public static class FileAccess
    {
        static string HomeFolder = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
        private static string DataLocation => Path.Combine(HomeFolder, "kadmium-reaper-remote/data");

        private static string DatabaseFilename => "ReaperRemote.db";
        public static string ProductionDatabasePath => Path.Combine(DataLocation, DatabaseFilename);
        public static string DebugDatabasePath => Path.Combine(AppContext.BaseDirectory, DatabaseFilename);
        public static string TestingDatabasePath => Path.Combine(AppContext.BaseDirectory, "test-" + DatabaseFilename);

        static string SettingsLocation = Path.Combine(DataLocation, "settings.json");

        public static async Task<Settings> LoadSettings()
        {
            Console.WriteLine("Searching for settings file in " + SettingsLocation);
            if (!File.Exists(SettingsLocation))
            {
                var settings = new Settings();
                await SaveSettings(settings);
                return settings;
            }
            else
            {
                string settingsJson = await Task.Factory.StartNew(() => File.ReadAllText(SettingsLocation));
                var settings = JsonConvert.DeserializeObject<Settings>(settingsJson);
                return settings;
            }
        }

        public static async Task SaveSettings(Settings settings)
        {
            var serializer = new JsonSerializer()
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            var settingsJson = JObject.FromObject(settings, serializer);
            await Task.Factory.StartNew(() =>
            {
                Directory.CreateDirectory(Path.GetDirectoryName(SettingsLocation));
                File.WriteAllText(SettingsLocation, settingsJson.ToString());
            });
        }

    }
}
