import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NgModule } from '@angular/core';

import { Song, SongData } from "../songs/song";

import { SongService } from "../songs/song.service";

var $ = require("jquery");

@Component({
    selector: 'songs',
    template: require('./songs.component.html'),
    providers: [SongService]
})
export class SongsComponent
{
    public activeSong: Song;
    private songs: Song[];

    constructor(private songService: SongService)
    {
        this.songService.getSongs().then(songs =>
        {
            this.songs = songs;
        });
    }

    public save(song: Song): void
    {
        if (song.isNew)
        {
            this.songService.postSong(song).then(() => 
            {
                song.save();
                this.songs.push(song);
                $("#myModal").modal("hide");
            });
        }
        else
        {
            this.songService.putSong(song).then(() => 
            {
                song.save();
                $("#myModal").modal("hide");
            });
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
                $("#myModal").modal("hide");
            }
        }
        else
        {
            $("#myModal").modal("hide");
        }
    }

    public load(song: Song): void
    {

    }

    public edit(song: Song): void
    {
        this.activeSong = song;
        $("#myModal").modal("show");
    }

    public delete(set: Song)
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

    public add()
    {
        this.activeSong = new Song();
        $("#myModal").modal("show");
    }
}