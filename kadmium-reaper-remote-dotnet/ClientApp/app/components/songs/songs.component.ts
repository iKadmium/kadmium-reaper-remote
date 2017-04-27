import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NgModule, OnInit } from '@angular/core';

import { Song, SongData } from "../songs/song";

import { SongService } from "../songs/song.service";
import { ReaperService } from "../reaper/reaper.service";
import { MessageBarService } from "../status/message-bar/message-bar.service";
import { Title } from "@angular/platform-browser";

var $ = require("jquery");

@Component({
    selector: 'songs',
    template: require('./songs.component.html'),
    providers: [SongService, ReaperService]
})
export class SongsComponent implements OnInit
{
    public activeSong: Song;
    private songs: Song[];
    private massImportText: string;

    constructor(private songService: SongService, private reaperService: ReaperService, private title: Title, private messageBarService: MessageBarService)
    {
        this.songService.getSongs().then(songs =>
        {
            this.songs = songs;
        });
        this.massImportText = "";
    }

    async ngOnInit(): Promise<void>
    {
        this.title.setTitle("Songs");
        this.songs = await this.songService.getSongs();
    }

    public async activate(song: Song): Promise<void>
    {
        try
        {
            await this.reaperService.runCommand("40859"); //open a new tab
            await this.reaperService.runCommand(song.command); //open the song
        }
        catch (reason)
        {
            this.messageBarService.add("Error", "Error loading " + song.name + " " + reason);
        }
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

    public async importFilesSelected(files: File[]): Promise<void>
    {
        if (files.length > 0)
        {
            let contents = await this.getFileContents(files[0]);
            let songs = JSON.parse(contents) as SongData[];
            for (let songData of songs)
            {
                try
                {
                    let song = new Song();
                    song.load(songData);
                    if (this.songs.find(value => value.name == song.name))
                    {
                        this.messageBarService.add("Warning", song.name + " already exists; skipping.");
                    }
                    else
                    {
                        let id = await this.songService.postSong(song);
                        this.messageBarService.add("Success", "Successfully added " + song.name);
                        song.id = id;
                        this.songs.push(song);
                    }
                }
                catch (reason)
                {
                    this.messageBarService.add("Error", reason);
                }
            }
        }
    }

    public async keymapFilesSelected(files: File[]): Promise<void>
    {
        if (files.length > 0)
        {
            let contents = await this.getFileContents(files[0]);
            await this.massImportCommands(contents);
        }
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
                        this.messageBarService.add("Success", "Successfully updated command for " + song.name);
                    }
                    else
                    {
                        this.messageBarService.add("Warning", song.name + " already has the correct command; skipping.");
                    }
                }
                else
                {
                    this.messageBarService.add("Warning", songName + " was not found.");
                }
            }
        }
    }
}