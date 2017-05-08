import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { SongData, Song } from "./song";
import { UrlService } from "./url.service";

@Injectable()
export class SongService
{
    constructor(private http: Http, private urlService: UrlService) { }

    public getSongs(): Promise<Song[]>
    {
        return this.http.get(this.urlService.getUrl("Song", null, null))
            .toPromise()
            .then(response =>
            {
                let data = (response.json() as SongData[]);
                return data.map((value: SongData) => new Song().load(value));
            });
    }

    public getSong(id: number): Promise<Song>
    {
        return this.http.get(this.urlService.getUrl("Song", null, id))
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
        return this.http.post(this.urlService.getUrl("Song", null, null), song.serialize())
            .toPromise()
            .then(response =>
            {
                return response.json() as number;
            });
    }

    public putSong(song: Song): Promise<void>
    {
        return this.http.put(this.urlService.getUrl("Song", null, song.id), song.serialize())
            .toPromise()
            .then(response => { return; });
    }

    public removeSong(song: Song): Promise<void>
    {
        return this.http.delete(this.urlService.getUrl("Song", null, song.id))
            .toPromise()
            .then(response => { return; });
    }
}


@Injectable()
export class MockSongService extends SongService
{
    private songs: SongData[];
    constructor()
    {
        super(null, null);
        this.songs = [
            {
                command: "",
                duration: "6MM3SS",
                id: 1,
                name: "Mock Song"
            }
        ];
    }

    public getSongs(): Promise<Song[]>
    {
        return new Promise<Song[]>(
            (resolve, reject) =>
            {
                resolve(this.songs.map(value => new Song().load(value)));
            }
        );
    }

    public getSong(id: number): Promise<Song>
    {
        return new Promise<Song>(
            (resolve, reject) => 
            {
                let data = this.songs.find(x => x.id == id);
                let song = new Song().load(data);
                resolve(song);
            }
        );
    }

    public postSong(song: Song): Promise<number>
    {
        return new Promise<number>(
            (resolve, reject) => 
            {
                let data = song.serialize();
                data.id = this.songs.length;
                this.songs.push(data);
                resolve(data.id);
            }
        );
    }

    public putSong(song: Song): Promise<void>
    {
        return new Promise<void>(
            (resolve, reject) =>
            {
                let index = this.songs.findIndex(x => x.id == song.id);
                this.songs.splice(index, 1);
                this.songs.push(song.serialize());
            }
        );
    }

    public removeSong(song: Song): Promise<void>
    {
        return new Promise<void>(
            (resolve, reject) =>
            {
                let index = this.songs.findIndex(x => x.id == song.id);
                this.songs.splice(index, 1);
            }
        );
    }
}