using kadmium_reaper_remote_dotnet.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kadmium_reaper_remote.WebAPI.Services
{
    public interface ISettingsService
    {
        Task<Settings> GetSettings();
        Task SaveSettings(Settings settings);
    }
}
