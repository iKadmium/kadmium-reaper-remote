using kadmium_reaper_remote.WebAPI.Services;
using kadmium_reaper_remote_dotnet.Util;
using Moq;
using System;
using System.IO;
using System.Threading.Tasks;
using Xunit;

namespace kadmium_reaper_remote.WebAPI.Test
{
    public class SettingsServiceTests
    {
        [Fact]
        public async Task GetSettings_SettingsFileExists_SettingsAreReturned()
        {
            var settings = new Settings();
            var fileService = Mock.Of<IFileService>(x => x.GetJson<Settings>("settings.json") == Task.FromResult(settings));
            var settingsService = new SettingsService(fileService);
            var actual = await settingsService.GetSettings();
            Assert.Equal(settings, actual);
        }

        [Fact]
        public async Task GetSettings_SettingsFileDoesNotExist_NewSettingsAreReturned()
        {
            var settings = new Settings();
            var fileService = new Mock<IFileService>();
            fileService
                .Setup(x => x.GetJson<Settings>("settings.json"))
                .ThrowsAsync(new FileNotFoundException());
            var settingsService = new SettingsService(fileService.Object);
            var actual = await settingsService.GetSettings();
            Assert.Equal(settings, actual);
        }
    }
}
