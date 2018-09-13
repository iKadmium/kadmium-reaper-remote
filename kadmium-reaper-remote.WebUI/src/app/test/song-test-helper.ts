import { Song } from "../song";

export class SongTestHelper
{
    public static getSong(name: string = "Test Song", minutes: number = 3, seconds: number = 30, command: string = "aaargh"): Song
    {
        let song = new Song();
        song.name = name;
        song.minutes = minutes;
        song.seconds = seconds;
        song.command = command;
        return song;
    }
}