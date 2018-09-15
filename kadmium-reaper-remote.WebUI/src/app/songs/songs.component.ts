import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { NotificationsService } from "../services/notifications.service";
import { ReaperService, ReaperCommands } from "../services/reaper.service";
import { SongService } from "../services/song.service";
import { Song, SongData } from "../song";
import { StatusCode } from "../status-code.enum";
import { FileReaderService } from '../services/file-reader.service';

@Component({
    selector: 'app-songs',
    templateUrl: './songs.component.html',
    styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit
{
    public activeSong: Song;
    public songs: Song[];

    constructor(
        private songService: SongService,
        private reaperService: ReaperService,
        private title: Title,
        private notificationsService: NotificationsService,
        private fileReaderService: FileReaderService)
    {
        this.songService.getSongs().then(songs =>
        {
            this.songs = songs;
        });
    }

    ngOnInit()
    {
        this.title.setTitle("Songs");
        try
        {
            this.songService.getSongs().then(songs =>
            {
                this.songs = songs;
            });
        }
        catch (reason)
        {
            this.notificationsService.add(StatusCode.Error, reason);
        }
    }

    public async activate(song: Song): Promise<void>
    {
        try
        {
            await this.reaperService.runCommand(ReaperCommands.OpenNewTab); //open a new tab
            await this.reaperService.runCommand(song.command); //open the song
        }
        catch (error)
        {
            this.notificationsService.add(StatusCode.Error, error);
        }
    }

    public delete(index: number): void
    {
        if (window.confirm("Are you sure you want to delete this set?"))
        {
            let song = this.songs[index];
            this.songService.removeSong(song.id).then(response =>
            {
                this.songs.splice(index, 1);
            })
        }
    }

    public async importFilesSelected(files: File[]): Promise<void>
    {
        if (files.length > 0)
        {
            let songs = await this.fileReaderService.deserialize<SongData[]>(files[0]);
            for (let songData of songs)
            {
                try
                {
                    let song = new Song();
                    song.load(songData);
                    if (this.songs.find(value => value.name == song.name))
                    {
                        this.notificationsService.add(StatusCode.Warning, song.name + " already exists; skipping.");
                    }
                    else
                    {
                        let id = await this.songService.postSong(song);
                        this.notificationsService.add(StatusCode.Success, "Successfully added " + song.name);
                        song.id = id;
                        this.songs.push(song);
                    }
                }
                catch (reason)
                {
                    this.notificationsService.add(StatusCode.Error, reason);
                }
            }
        }
    }

    public async keymapFilesSelected(files: File[]): Promise<void>
    {
        if (files.length > 0)
        {
            let contents = await this.fileReaderService.readAsText(files[0]);
            await this.massImportCommands(contents);
        }
    }

    public async massImportCommands(importText: string): Promise<void>
    {
        let regexMatch = /SCR \d \d (\w*) "Custom: Open (.*)\.lua" ".*"/;
        let lines = importText.split("\n");
        for (let line of lines)
        {
            if (regexMatch.test(line))
            {
                let result = regexMatch.exec(line);
                let command = "_" + result[1];
                let songName = result[2];
                let song = this.songs.find((value: Song) => value.name == songName);
                if (song != null)
                {
                    if (song.command != command)
                    {
                        song.command = command;
                        await this.songService.putSong(song);
                        this.notificationsService.add(StatusCode.Success, "Successfully updated command for " + song.name);
                    }
                    else
                    {
                        this.notificationsService.add(StatusCode.Warning, song.name + " already has the correct command; skipping.");
                    }
                }
                else
                {
                    this.notificationsService.add(StatusCode.Warning, songName + " was not found.");
                }
            }
        }
    }

}
