import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

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
