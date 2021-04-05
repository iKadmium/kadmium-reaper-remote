using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kadmium_reaper_remote.WebAPI.Services
{
    public interface IFileService
    {
        Task<T> GetJson<T>(string filename);
        Task SaveJson<T>(string filename, T file);
    }
}
