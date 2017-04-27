import { NgModule } from '@angular/core';
import * as moment from "moment";
import { Song, SongData } from "../songs/song";
import { SetsComponent } from "./sets.component";

export class Set
{
    public id: number;
    public date: moment.Moment;
    public venue: string;
    public songs: Song[];

    constructor()
    {
        this.id = 0;
        this.date = moment();
        this.venue = "";
        this.songs = [];
    }

    public addSong(song: Song): void
    {
        this.songs.push(song);
    }

    public removeSong(song: Song): void
    {
        let position = this.songs.findIndex((value: Song) => value == song);
        this.songs.splice(position, 1);
    }

    public moveSong(song: Song, positionChange: number): void
    {
        let position = this.songs.findIndex((value: Song) => value == song);
        this.songs.splice(position + positionChange, 0, this.songs.splice(position, 1)[0]);
    }

    public get duration(): moment.Duration
    {
        let duration = moment.duration();
        for (let song of this.songs)
        {
            duration.add(song.duration);
        }
        return duration;
    }

    public get durationFormatted(): string
    {
        return moment.utc(this.duration.asMilliseconds()).format("HH:mm:ss");
    }

    public get dateFormatted(): string
    {
        return moment(this.date).format("L");
    }

    public set humanDate(originalDate: string)
    {
        this.date.set(originalDate);
    }

    public get humanDate(): string
    {
        return this.date.format("YYYY-MM-DD");
    }

    public load(allSongs: Song[], data: SetData): Set
    {
        this.id = data.id;
        this.date = moment(data.date);
        this.venue = data.venue;
        this.songs = data.songs.map((value: SongData) =>
        {
            let song = new Song();
            song.load(value);
            return song;
        });

        return this;
    }

    public serialize(): SetData
    {
        let data: SetData =
            {
                id: this.id,
                date: this.date.format("YYYY-MM-DD") + "T00:00:00",
                venue: this.venue,
                songs: this.songs.map((value: Song) => value.serialize())
            };
        return data;
    }
}

export interface SetData
{
    id: number;
    date: string;
    venue: string;
    songs: SongData[];
}

export interface SetSkeleton
{
    id: number;
    date: string;
    venue: string;
}