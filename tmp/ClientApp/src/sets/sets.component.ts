import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NgModule, OnInit } from '@angular/core';

import { Set, SetData, SetSkeleton } from "./set";
import { Song, SongData } from "../songs/song";

import { SetService } from "./set.service";
import { SongService } from "../songs/song.service";
import { ReaperService } from "../reaper/reaper.service";
import { MessageBarService } from "../status/message-bar/message-bar.service";
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'sets',
    template: require('./sets.component.html'),
    providers: [SetService, SongService, ReaperService]
})
export class SetsComponent implements OnInit
{
    private sets: SetSkeleton[];
    private allSongs: Song[];

    constructor(private title: Title, private messageBarService: MessageBarService, private setService: SetService, private songService: SongService, private reaperService: ReaperService)
    {

    }

    async ngOnInit(): Promise<void>
    {
        try
        {
            this.title.setTitle("Sets");
            this.allSongs = await this.songService.getSongs();
            this.sets = await this.setService.getSets();
        }
        catch (reason)
        {
            this.messageBarService.add("Error", reason);
        }
    }

    public async activate(skeleton: SetSkeleton): Promise<void>
    {
        await this.reaperService.runCommand("40886").catch(reason => this.messageBarService.add("Error", "Error closing tabs for " + skeleton.venue + ". " + reason)); //close all tabs
        let firstTab = true;
        let set = await this.setService.getSet(skeleton.id, this.allSongs);
        for (let song of set.songs)
        {
            if (!firstTab)
            {
                await this.reaperService.runCommand("40859").catch(reason => this.messageBarService.add("Error", "Error opening new tab for set " + skeleton.venue + ". " + reason)); //open a new tab
            }
            else
            {
                firstTab = false;
            }
            await this.reaperService.runCommand(song.command).catch(reason => this.messageBarService.add("Error", "Error opening song " + song.name + ". " + reason)); //open the song
        }
    }

    public delete(set: SetSkeleton)
    {
        if (window.confirm("Are you sure you want to delete this set?"))
        {
            this.setService.removeSet(set).then(response =>
            {
                let positions = this.sets.indexOf(set);
                this.sets.splice(positions, 1);
            })
        }
    }

}

