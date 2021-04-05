using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kadmium_reaper_remote_dotnet.Util
{
    public class DatabaseContextFactory : IDesignTimeDbContextFactory<DatabaseContext>
    {
        public DatabaseContext CreateDbContext(string[] args)
        {
            DatabaseContext.SetConnectionEnvironment("Production");
            return DatabaseContext.GetContext();
        }
    }
}
