import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SongData, Song } from "./song";

@Injectable()
export class SongService
{
    private songsUrl = "/api/Song";

    constructor(private http: Http) { }

    public getSongs(): Promise<Song[]>
    {
        return this.http.get(this.songsUrl)
            .toPromise()
            .then(response =>
            {
                let data = (response.json() as SongData[]);
                return data.map((value: SongData) => new Song().load(value));
            });
    }

    public getSong(id: number): Promise<Song>
    {
        return this.http.get(this.songsUrl + "/" + id)
            .toPromise()
            .then(response =>
            {
                let data = (response.json() as SongData);
                let song = new Song();
                song.load(data);
                return song;
            });
    }

    public postSong(song: Song): Promise<number>
    {
        return this.http.post(this.songsUrl, song.serialize())
            .toPromise()
            .then(response =>
            {
                return response.json() as number;
            });
    }

    public putSong(song: Song): Promise<void>
    {
        return this.http.put(this.songsUrl + "/" + song.id, song.serialize())
            .toPromise()
            .then(response => { return; });
    }

    public removeSong(song: Song): Promise<void>
    {
        return this.http.delete(this.songsUrl + "/" + song.id)
            .toPromise()
            .then(response => { return; });
    }
}
