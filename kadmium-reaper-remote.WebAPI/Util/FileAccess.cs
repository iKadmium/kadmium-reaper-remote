using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.IO;
using System.Threading.Tasks;

namespace kadmium_reaper_remote_dotnet.Util
{
    public static class FileAccess
    {
        private static readonly string HomeFolder = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
        private static string DataLocation => Path.Combine(HomeFolder, "kadmium-reaper-remote/data");

        private static string DatabaseFilename => "ReaperRemote.db";
        public static string ProductionDatabasePath => Path.Combine(DataLocation, DatabaseFilename);
        public static string DebugDatabasePath => Path.Combine(AppContext.BaseDirectory, DatabaseFilename);
        public static string TestingDatabasePath => Path.Combine(AppContext.BaseDirectory, "test-" + DatabaseFilename);

    }
}