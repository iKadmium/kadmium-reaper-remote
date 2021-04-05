using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using kadmium_reaper_remote_dotnet.Util;

namespace kadmium_reaper_remote.WebAPI.Services
{
    public class SettingsService : ISettingsService
    {
        private static string Filename => "settings.json";

        private IFileService FileService { get; }

        public SettingsService(IFileService fileService)
        {
            FileService = fileService;
        }

        public async Task<Settings> GetSettings()
        {
            try
            {
                Settings settings = await FileService.GetJson<Settings>(Filename);
                return settings;
            }
            catch(FileNotFoundException)
            {
                return new Settings();
            }
        }

        public async Task SaveSettings(Settings settings)
        {
            await FileService.SaveJson(Filename, settings);
        }
    }
}
