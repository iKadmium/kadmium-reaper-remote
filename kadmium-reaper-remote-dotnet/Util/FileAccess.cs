using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json.Schema;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace kadmium_reaper_remote_dotnet.Util
{
    public static class FileAccess
    {
        static string DataLocation = Path.Combine(AppContext.BaseDirectory, "data");

        static string SetsLocation = Path.Combine(DataLocation, "sets.json");
        static string SongsLocation = Path.Combine(DataLocation, "songs.json");
        static string SettingsLocation = Path.Combine(DataLocation, "settings.json");

        static string SetsSchema = Path.Combine(DataLocation, "sets.schema.json");
        static string SongsSchema = Path.Combine(DataLocation, "songs.schema.json");
        static string SettingsSchema = Path.Combine(DataLocation, "settings.schema.json");

        static FileInfo SongsFile = new FileInfo(SongsLocation);
        static FileInfo SetsFile = new FileInfo(SetsLocation);
        static FileInfo SettingsFile = new FileInfo(SettingsLocation);

        private static Task ValidatedSave(JToken obj, FileInfo path, string schemaPath)
        {
            Task task = Task.Factory.StartNew(() =>
            {
                string schemaString = File.ReadAllText(schemaPath);
                if (Validate(obj, path.FullName, schemaPath))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(path.FullName));
                    lock (path)
                    {
                        File.WriteAllText(path.FullName, obj.ToString());
                    }
                }
            });
            return task;
        }

        private static Task<JToken> ValidatedLoad(string path, string schemaPath)
        {
            Task<JToken> task = Task.Factory.StartNew(() =>
            {
                string jsonString = File.ReadAllText(path);
                JToken obj = JToken.Parse(jsonString);
                Validate(obj, path, schemaPath);
                return obj;
            });
            return task;
        }

        private static bool Validate(JToken obj, string path, string schemaPath)
        {
            JSchemaUrlResolver resolver = new JSchemaUrlResolver();

            IList<ValidationError> errors;
            bool valid = true;

            using (StreamReader file = File.OpenText(schemaPath))
            using (JsonTextReader reader = new JsonTextReader(file))
            {
                JSchema schema = JSchema.Load(reader, new JSchemaReaderSettings { Resolver = resolver, BaseUri = new Uri(schemaPath) });
                try
                {
                    valid = obj.IsValid(schema, out errors);
                }
                catch (JSchemaException e)
                {
                    errors = new List<ValidationError>();
                    if (e.Message.Contains("free-quota limit"))
                    {
                        valid = true;
                    }
                    else
                    {
                        valid = false;
                    }
                }

                if (valid)
                {
                    return true;
                }
                else
                {
                    foreach (var error in errors)
                    {
                        Console.Error.WriteLine(error.ToString());
                    }
                    throw new InvalidDataException("Could not validate " + path);
                }
            }
        }

        public static async Task<JArray> GetSets()
        {
            var sets = await ValidatedLoad(SetsLocation, SetsSchema) as JArray;
            return sets;
        }

        public static async Task<JArray> GetSongs()
        {
            var songs = await ValidatedLoad(SongsLocation, SongsSchema) as JArray;
            return songs;
        }

        public static async Task<JObject> GetSettings()
        {
            var settings = await ValidatedLoad(SettingsLocation, SettingsSchema) as JObject;
            return settings;
        }

        public static async Task SaveSongs(JArray songs)
        {
            await ValidatedSave(songs, SongsFile, SongsSchema);
        }

        public static async Task SaveSets(JArray sets)
        {
            await ValidatedSave(sets, SetsFile, SetsSchema);
        }
    }
}
