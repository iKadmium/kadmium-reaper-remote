import * as moment from "moment";

export class Song
{
    public id: number;
    public name: string;
    public duration: moment.Duration;
    public command: string;

    constructor()
    {
        this.id = 0;
        this.name = "";
        this.duration = moment.duration(0);
        this.command = "";
    }

    public get durationFormatted(): string
    {
        return moment.utc(this.duration.asMilliseconds()).format("HH:mm:ss")
    }

    public get minutes(): number
    {
        return this.duration.minutes();
    }

    public set minutes(minutes: number)
    {
        this.duration.subtract(this.minutes, "minutes");
        this.duration.add(minutes, "minutes");
    }

    public get seconds(): number
    {
        return this.duration.seconds();
    }

    public set seconds(seconds: number)
    {
        this.duration.subtract(this.seconds, "seconds");
        this.duration.add(seconds, "seconds");
    }

    public load(data: SongData): Song
    {
        this.id = data.id;
        this.name = data.name;
        this.duration = moment.duration(data.duration);
        this.command = data.command;
        return this;
    }

    public serialize(): SongData
    {
        let data: SongData = {
            id: this.id,
            name: this.name,
            duration: this.durationFormatted,
            command: this.command
        };
        return data;
    }
}

export interface SongData
{
    id: number;
    name: string;
    duration: string;
    command: string;
}