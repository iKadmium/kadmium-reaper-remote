import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NgModule } from '@angular/core';

import { Song, SongData } from "../songs/song";

import { SongService } from "../songs/song.service";
import { ReaperService } from "../reaper/reaper.service";

var $ = require("jquery");

@Component({
    selector: 'songs',
    template: require('./songs.component.html'),
    providers: [SongService, ReaperService]
})
export class SongsComponent
{
    public activeSong: Song;
    private songs: Song[];
    private massImportText: string;

    private errors: string[];

    constructor(private songService: SongService, private reaperService: ReaperService)
    {
        this.errors = [];
        this.songService.getSongs().then(songs =>
        {
            this.songs = songs;
        });
        this.massImportText = "";
    }

    public save(song: Song): void
    {
        try
        {
            if (song.isNew)
            {
                this.songService.postSong(song).then(() => 
                {
                    song.save();
                    this.songs.push(song);
                    $("#songEditor").modal("hide");
                });
            }
            else
            {
                this.songService.putSong(song).then(() => 
                {
                    song.save();
                    $("#songEditor").modal("hide");
                });
            }
        } catch (error)
        {
            this.errors.push(error);
        }
    }

    public cancel(song: Song): void
    {
        let hiding = false;
        if (song.isNew || song.isDirty)
        {
            if (window.confirm("Are you sure? Unsaved data will be lost."))
            {
                song.revert();
                $("#songEditor").modal("hide");
            }
        }
        else
        {
            $("#songEditor").modal("hide");
        }
    }

    public async load(song: Song): Promise<void>
    {
        await this.reaperService.runCommand("40859").catch(reason => this.errors.push("Error loading " + song.name + ". " + reason)); //open a new tab
        await this.reaperService.runCommand(song.command).catch(reason => this.errors.push("Error loading " + song.name + ". " + reason)); //open the song
    }

    public edit(song: Song): void
    {
        this.activeSong = song;
        $("#songEditor").modal("show");
    }

    public delete(set: Song): void
    {
        if (window.confirm("Are you sure you want to delete this set?"))
        {
            this.songService.removeSong(set).then(response =>
            {
                let positions = this.songs.indexOf(set);
                this.songs.splice(positions, 1);
            })
        }
    }

    public add(): void
    {
        this.activeSong = new Song();
        $("#songEditor").modal("show");
    }

    public massImportCommands(): void
    {
        $("#massImportCommands").modal("show");
    }

    public async getFileContents(file: File)
    {
        return new Promise<string>((resolve, reject) =>
        {
            let reader = new FileReader();
            reader.onload = (event: any) =>
            {
                let data: string = event.target.result;
                resolve(data);
            }
            reader.readAsText(file);
        });
    }

    public async loadMassImport(importElementName: string): Promise<void>
    {
        let importFileElement = $("#" + importElementName)[0] as HTMLInputElement;
        let contents = await this.getFileContents(importFileElement.files[0]);
        await this.massImport(contents);
    }

    public async massImport(importText: string): Promise<void>
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
                let matchedSongs = this.songs.filter((value: Song) => value.name == songName);
                if (matchedSongs.length == 1)
                {
                    let song = matchedSongs[0];
                    song.command = command;
                    await this.songService.putSong(song);
                    song.save();
                }
            }
        }
        $("#massImportCommands").modal("hide");
    }
}