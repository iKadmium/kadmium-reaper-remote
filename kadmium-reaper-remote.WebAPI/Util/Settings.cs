using System;

namespace kadmium_reaper_remote_dotnet.Util
{
    public class Settings : IEquatable<Settings>
    {
        public string ReaperURI { get; set; }
        public int HttpPort { get; set; }
        public string LightingVenueURI { get; set; }
        public string TestingFileCommand { get; set; }
        public TestingFileFrequency TestingFileFrequency { get; set; }

        public Settings()
        {
            ReaperURI = "http://localhost:9080/live.html";
            HttpPort = 80;
            LightingVenueURI = "http://localhost:5000/api/Venue/ActivateByName";
            TestingFileCommand = "";
            TestingFileFrequency = TestingFileFrequency.Never;
        }

        public bool Equals(Settings other)
        {
            return this.ReaperURI == other.ReaperURI &&
                this.HttpPort == other.HttpPort &&
                this.LightingVenueURI == other.LightingVenueURI &&
                this.TestingFileCommand == other.TestingFileCommand &&
                this.TestingFileFrequency == other.TestingFileFrequency;
        }
    }
}