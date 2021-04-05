using kadmium_reaper_remote.WebAPI.Services;
using kadmium_reaper_remote_dotnet.Util;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System.IO;

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

            var settings = new SettingsService(new FileService()).GetSettings().GetAwaiter().GetResult();

            var host = new WebHostBuilder()
                .UseConfiguration(config)
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .UseUrls("http://*:" + settings.HttpPort)
                .Build();

            host.Run();
        }
    }
}