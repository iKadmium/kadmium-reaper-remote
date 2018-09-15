import * as moment from "moment";
import 'moment/locale/en-au';
import { Song, SongData } from "./song";

export class SetSkeleton
{
    public id: number;
    public date: moment.Moment;
    public venue: string;

    constructor()
    {
        this.id = 0;
        this.date = moment();
        this.venue = "";
    }

    public get dateFormatted(): string
    {
        return this.date.format("L");
    }

    public set humanDate(originalDate: string)
    {
        this.date = moment(originalDate);
    }

    public get humanDate(): string
    {
        return this.date.format("YYYY-MM-DD");
    }

    public loadSkeleton(data: SetSkeletonData): SetSkeleton
    {
        this.id = data.id;
        this.date = moment(data.date);
        this.venue = data.venue;

        return this;
    }
}

export class SetEntry
{
    constructor(public song: Song) { }
}

export class Set extends SetSkeleton
{
    public entries: SetEntry[];

    constructor()
    {
        super();

        this.entries = [];
    }

    public addSong(song: Song): void
    {
        this.entries.push(new SetEntry(song));
    }

    public removeSong(index: number): void
    {
        this.entries.splice(index, 1);
    }

    public moveSong(index: number, positionChange: number): void
    {
        this.entries.splice(index + positionChange, 0, this.entries.splice(index, 1)[0]);
    }

    public get duration(): moment.Duration
    {
        let duration = moment.duration();
        for (let entry of this.entries)
        {
            duration.add(entry.song.duration);
        }

        return duration;
    }

    public get durationFormatted(): string
    {
        return moment.utc(this.duration.asMilliseconds()).format("HH:mm:ss");
    }

    public load(data: SetData): Set
    {
        this.id = data.id;
        this.date = moment(data.date);
        this.venue = data.venue;
        this.entries = data.songs.map((value: SongData) =>
        {
            let song = new Song();
            song.load(value);
            return new SetEntry(song);
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
            songs: this.entries.map((value) => value.song.serialize())
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

export interface SetSkeletonData
{
    id: number;
    date: string;
    venue: string;
}