using kadmium_reaper_remote_dotnet.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kadmium_reaper_remote_dotnet.Util
{
    public class DatabaseContext : DbContext
    {
        private static string ProductionConnectionString => "Filename=" + FileAccess.ProductionDatabasePath;
        private static string DebugConnectionString => "Filename=" + FileAccess.DebugDatabasePath;
        private static string TestingConnectionString => "Filename=" + FileAccess.TestingDatabasePath;

        public static Action<DbContextOptionsBuilder<DatabaseContext>> SetConnection { get; set; }

        public virtual DbSet<Set> Sets { get; set; }
        public virtual DbSet<Song> Songs { get; set; }
        public virtual DbSet<SetSongRelationship> SetSongRelationships { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        { }

        public static DatabaseContext GetContext()
        {
            var builder = new DbContextOptionsBuilder<DatabaseContext>();
            SetConnection(builder);
            var context = new DatabaseContext(builder.Options);
            return context;
        }

        public static void SetConnectionEnvironment(string environmentName)
        {
            switch (environmentName)
            {
                case "Development":
                    SetConnection = (builder) => builder.UseSqlite(DebugConnectionString);
                    break;

                case "Production":
                    SetConnection = (builder) => builder.UseSqlite(ProductionConnectionString);
                    break;
            }
        }

        public static void SetTestingConnectionString(string testName)
        {
            SetConnection = (builder) => builder.UseInMemoryDatabase(testName);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Song>()
                .HasMany<SetSongRelationship>()
                .WithOne()
                .HasForeignKey(x => x.SongId);

            modelBuilder.Entity<Song>()
                .HasAlternateKey(x => x.Name);

            modelBuilder.Entity<Set>()
                .HasMany<SetSongRelationship>()
                .WithOne()
                .HasForeignKey(x => x.SetId);

            modelBuilder.Entity<SetSongRelationship>()
                .HasKey(x => new { x.Order, x.SetId, x.SongId });
        }

        public async Task<Set> LoadSet(int id)
        {
            var set = await Sets.FindAsync(id);
            return set;
        }

        public async Task<Song> LoadSong(int id)
        {
            var song = await Songs.FindAsync(id);
            return song;
        }

        public async Task<List<Song>> LoadSongsForSet(int setId)
        {
            List<Song> songs = new List<Song>();
            foreach (var relationship in SetSongRelationships.Where(x => x.SetId == setId).OrderBy(x => x.Order))
            {
                songs.Add(await LoadSong(relationship.SongId));
            }
            return songs;
        }
    }

    public class SetSongRelationship
    {
        public int Order { get; set; }
        public int SongId { get; set; }
        public int SetId { get; set; }
    }

    public class DatabaseLogger : ILoggerProvider
    {
        public ILogger CreateLogger(string categoryName)
        {
            return new MyLogger();
        }

        public void Dispose()
        { }

        private class MyLogger : ILogger
        {
            public bool IsEnabled(LogLevel logLevel)
            {
                return true;
            }

            public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
            {
                Console.WriteLine(formatter(state, exception));
            }

            public IDisposable BeginScope<TState>(TState state)
            {
                return null;
            }
        }
    }
}