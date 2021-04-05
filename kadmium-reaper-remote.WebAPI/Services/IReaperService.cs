using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kadmium_reaper_remote.WebAPI.Services
{
    public interface IReaperService
    {
        Task SendCommands(params string[] commands);
    }
}
