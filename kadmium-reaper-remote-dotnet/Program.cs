using System.IO;
using kadmium_reaper_remote_dotnet.Util;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace kadmium_reaper_remote_dotnet
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
                .AddCommandLine(args)
                .AddEnvironmentVariables(prefix: "ASPNETCORE_")
                .Build();

            Settings.Initialize().Wait();
            Database.Initialize().Wait();

            var host = new WebHostBuilder()
                .UseConfiguration(config)
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .UseUrls("http://*:" + Settings.Instance.HttpPort)
                .Build();

            host.Run();
        }
    }
}
