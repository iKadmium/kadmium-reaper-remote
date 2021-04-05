using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace kadmium_reaper_remote.WebAPI.Services
{
    public class FileService : IFileService
    {
        private static readonly string HomeFolder = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
        private static string DataLocation => Path.Combine(HomeFolder, "kadmium-reaper-remote/data");

        public async Task<T> GetJson<T>(string filename)
        {
            string path = Path.Combine(DataLocation, filename);
            string json = await Task.Factory.StartNew(() => File.ReadAllText(path));
            var value = JsonConvert.DeserializeObject<T>(json);
            return value;
        }

        public async Task SaveJson<T>(string filename, T file)
        {
            string path = Path.Combine(DataLocation, filename);
            var serializer = new JsonSerializer()
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            var settingsJson = JObject.FromObject(file, serializer);
            await Task.Factory.StartNew(() =>
            {
                Directory.CreateDirectory(Path.GetDirectoryName(DataLocation));
                File.WriteAllText(path, settingsJson.ToString());
            });
        }
    }
}
