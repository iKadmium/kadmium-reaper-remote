import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Set, SetData, SetSkeletonData, SetSkeleton } from "./set";
import { Song, SongData } from "./song";
import { UrlService } from "./url.service";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SetService
{
    constructor(private http: HttpClient, private urlService: UrlService) { }

    public postSet(set: Set): Promise<number>
    {

        return this.http.post<number>(this.urlService.getUrl("Set", null, null), set.serialize())
            .toPromise();
    }

    public putSet(set: Set): Promise<void>
    {
        return this.http.put<void>(this.urlService.getUrl("Set", null, set.id), set.serialize())
            .toPromise();
    }

    public removeSet(set: SetSkeleton): Promise<void>
    {
        return this.http.delete<void>(this.urlService.getUrl("Set", null, set.id))
            .toPromise();
    }

    public getSets(allSongs: Song[]): Promise<Set[]>
    {
        return this.http.get<SetData[]>(this.urlService.getUrl("Set", null, null))
            .toPromise()
            .then(response =>
            {
                return response.map(x => new Set().load(allSongs, x));
            });
    }

    public getSet(id: number, allSongs: Song[]): Promise<Set>
    {
        return this.http.get<SetData>(this.urlService.getUrl("Set", null, id))
            .toPromise()
            .then(response =>
            {
                let set = new Set();
                set.load(allSongs, response);
                return set;
            });
    }

    public activateVenue(venue: string): Promise<void>
    {
        return this.http.get<void>(this.urlService.getUrl("Set", "activate", venue))
            .toPromise();
    }

}
