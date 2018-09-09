using kadmium_reaper_remote_dotnet.Util;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;

namespace kadmiumreaperremotedotnet.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1");

            modelBuilder.Entity("kadmium_reaper_remote_dotnet.Models.Set", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<string>("Venue");

                    b.HasKey("Id");

                    b.ToTable("Sets");
                });

            modelBuilder.Entity("kadmium_reaper_remote_dotnet.Models.Song", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Command");

                    b.Property<TimeSpan>("Duration");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasAlternateKey("Name");

                    b.ToTable("Songs");
                });

            modelBuilder.Entity("kadmium_reaper_remote_dotnet.Util.SetSongRelationship", b =>
                {
                    b.Property<int>("Order");

                    b.Property<int>("SetId");

                    b.Property<int>("SongId");

                    b.HasKey("Order", "SetId", "SongId");

                    b.HasIndex("SetId");

                    b.HasIndex("SongId");

                    b.ToTable("SetSongRelationships");
                });

            modelBuilder.Entity("kadmium_reaper_remote_dotnet.Util.SetSongRelationship", b =>
                {
                    b.HasOne("kadmium_reaper_remote_dotnet.Models.Set")
                        .WithMany()
                        .HasForeignKey("SetId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("kadmium_reaper_remote_dotnet.Models.Song")
                        .WithMany()
                        .HasForeignKey("SongId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}