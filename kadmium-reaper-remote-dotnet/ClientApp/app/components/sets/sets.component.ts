import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NgModule } from '@angular/core';

import { Set, SetData } from "./set";
import { Song, SongData } from "../songs/song";

import { SetService } from "./set.service";
import { SongService } from "../songs/song.service";
import { ReaperService } from "../reaper/reaper.service";

var $ = require("jquery");

@Component({
    selector: 'sets',
    template: require('./sets.component.html'),
    providers: [SetService, SongService, ReaperService]
})
export class SetsComponent
{
    public sets: Set[];
    public activeSet: Set;
    public allSongs: Song[];

    private errors: string[];

    constructor(private setService: SetService, private songService: SongService, private reaperService: ReaperService)
    {
        this.errors = [];
        songService.getSongs().then(songs =>
        {
            this.allSongs = songs;
            setService.getSets(songs).then(sets => this.sets = sets);
        });

    }

    public save(set: Set): void
    {
        if (set.isNew)
        {
            this.setService.postSet(set).then(() => 
            {
                set.save();
                this.sets.push(set);
                $("#myModal").modal("hide");
            });
        }
        else
        {
            this.setService.putSet(set).then(() => 
            {
                set.save();
                $("#myModal").modal("hide");
            });
        }
    }

    public cancel(set: Set): void
    {
        let hiding = false;
        if (set.isNew || set.isDirty)
        {
            if (window.confirm("Are you sure? Unsaved data will be lost."))
            {
                set.revert(this.allSongs);
                $("#myModal").modal("hide");
            }
        }
        else
        {
            $("#myModal").modal("hide");
        }
    }

    public async load(set: Set): Promise<void>
    {
        await this.reaperService.runCommand("40886").catch(reason => this.errors.push("Error closing tabs for " + set.humanDate + ". " + reason)) //close all tabs
        let firstTab = true;
        for (let song of set.songs)
        {
            if (!firstTab)
            {
                await this.reaperService.runCommand("40859").catch(reason => this.errors.push("Error opening new tab for set " + set.humanDate + ". " + reason)); //open a new tab
            }
            else
            {
                firstTab = false;
            }
            await this.reaperService.runCommand(song.command).catch(reason => this.errors.push("Error opening song " + song.name + ". " + reason)); //open the song
        }
    }

    public edit(set: Set): void
    {
        this.activeSet = set;
        $("#myModal").modal("show");
    }

    public delete(set: Set)
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

    public add()
    {
        this.activeSet = new Set();
        $("#myModal").modal("show");
    }
}

