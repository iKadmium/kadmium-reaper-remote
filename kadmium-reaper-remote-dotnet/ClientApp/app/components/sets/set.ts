import { NgModule } from '@angular/core';
import * as moment from "moment";
import { Song } from "../songs/song";
import { SetsComponent } from "./sets.component";

export class Set
{
    public date: moment.Moment;
    public venue: string;
    public songs: Song[];

    private originalData: SetData;

    constructor()
    {
        this.date = moment();
        this.venue = "";
        this.songs = [];
    }

    public get originalDate(): moment.Moment
    {
        return moment(this.originalData.date);
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

    public get isNew(): boolean
    {
        return this.originalData == null;
    }

    public get isDirty(): boolean
    {
        return this.serialize() != this.originalData;
    }

    public load(allSongs: Song[], data: SetData): Set
    {
        this.date = moment(data.date);
        this.venue = data.venue;
        this.songs = [];
        for (let song of data.songs)
        {
            let matchingSongs = allSongs.filter((value: Song) => value.name == song);
            if (matchingSongs.length == 1)
            {
                this.songs.push(matchingSongs[0]);
            }
        }

        this.originalData = data;

        return this;
    }

    public save(): void
    {
        this.originalData = this.serialize();
    }

    public revert(allSongs: Song[]): void
    {
        this.load(allSongs, this.originalData);
    }

    public serialize(): SetData
    {
        let data: SetData =
            {
                date: this.date.format("YYYY-MM-DD"),
                songs: this.songs.map((value: Song) => value.name),
                venue: this.venue
            };
        return data;
    }
}

export interface SetData
{
    date: string;
    venue: string;
    songs: string[];
}
