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
            })
            .catch(this.handleError);
    }

    public postSong(song: Song): Promise<void>
    {
        return this.http.post(this.songsUrl, song.serialize())
            .toPromise()
            .then(response =>
            {

            })
            .catch(this.handleError);
    }

    public putSong(song: Song): Promise<void>
    {
        return this.http.put(this.songsUrl + "/" + song.originalName, song.serialize())
            .toPromise()
            .then(response => { return; })
            .catch(this.handleError);
    }

    public removeSong(song: Song): Promise<void>
    {
        return this.http.delete(this.songsUrl + "/" + song.originalName)
            .toPromise()
            .then(response => { return; })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> 
    {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
