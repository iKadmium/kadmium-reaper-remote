import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Set, SetData, SetSkeleton } from "./set";
import { Song } from "./song";
import { UrlService } from "./url.service";

@Injectable()
export class SetService
{
  constructor(private http: Http, private urlService: UrlService) { }

  public postSet(set: Set): Promise<void>
  {
    return this.http.post(this.urlService.getUrl("Set", null, null), set.serialize())
      .toPromise()
      .then(response =>
      {

      });
  }

  public putSet(set: Set): Promise<void>
  {
    return this.http.put(this.urlService.getUrl("Set", null, set.id), set.serialize())
      .toPromise()
      .then(response => { return; });
  }

  public removeSet(set: SetSkeleton): Promise<void>
  {
    return this.http.delete(this.urlService.getUrl("Set", null, set.id))
      .toPromise()
      .then(response => { return; });
  }

  public getSets(): Promise<SetSkeleton[]>
  {
    return this.http.get(this.urlService.getUrl("Set", null, null))
      .toPromise()
      .then(response =>
      {
        let data = (response.json() as SetSkeleton[]);
        return data;
      });
  }

  public getSet(id: number, allSongs: Song[]): Promise<Set>
  {
    return this.http.get(this.urlService.getUrl("Set", null, id))
      .toPromise()
      .then(response =>
      {
        let data = (response.json() as SetData);
        let set = new Set();
        set.load(allSongs, data);
        return set;
      });
  }

  public activateSet(id: number): Promise<void>
  {
    return this.http.get(this.urlService.getUrl("Set", "activate", id))
      .toPromise()
      .then(response => { });
  }

}
