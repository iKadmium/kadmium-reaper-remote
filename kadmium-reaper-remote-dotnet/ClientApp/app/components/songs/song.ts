import * as moment from "moment";

export class Song
{
    public name: string;
    public duration: moment.Duration;
    public command: string;

    private originalData: SongData;

    constructor()
    {
        this.name = "";
        this.duration = moment.duration(0);
        this.command = "";
    }

    public get originalName(): string
    {
        return this.originalData.name;
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

    public get isNew(): boolean
    {
        return this.originalData == null;
    }

    public get isDirty(): boolean
    {
        let data = this.serialize();
        let equal =
            (data.name == this.originalData.name)
            && (data.duration == this.originalData.duration)
            && (data.command == this.originalData.command);
        return !equal;
    }

    public load(data: SongData): Song
    {
        this.name = data.name;
        this.duration = moment.duration(data.duration);
        this.command = data.command;
        this.originalData = data;
        return this;
    }

    public save(): void
    {
        this.originalData = this.serialize();
    }

    public revert(): void
    {
        this.load(this.originalData);
    }

    public serialize(): SongData
    {
        let data: SongData = {
            name: this.name,
            duration: this.durationFormatted,
            command: this.command
        };
        return data;
    }
}

export interface SongData
{
    name: string;
    duration: string;
    command: string;
}