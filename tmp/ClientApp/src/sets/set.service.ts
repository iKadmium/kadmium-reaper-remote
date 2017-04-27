import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Set, SetData, SetSkeleton } from "./set";
import { Song } from "../songs/song";

@Injectable()
export class SetService
{
    private setsUrl = "/api/Set";

    constructor(private http: Http) { }

    public postSet(set: Set): Promise<void>
    {
        return this.http.post(this.setsUrl, set.serialize())
            .toPromise()
            .then(response =>
            {

            });
    }

    public putSet(set: Set): Promise<void>
    {
        return this.http.put(this.setsUrl + "/" + set.id, set.serialize())
            .toPromise()
            .then(response => { return; });
    }

    public removeSet(set: SetSkeleton): Promise<void>
    {
        return this.http.delete(this.setsUrl + "/" + set.id)
            .toPromise()
            .then(response => { return; });
    }

    public getSets(): Promise<SetSkeleton[]>
    {
        return this.http.get(this.setsUrl)
            .toPromise()
            .then(response =>
            {
                let data = (response.json() as SetSkeleton[]);
                return data;
            });
    }

    public getSet(id: number, allSongs: Song[]): Promise<Set>
    {
        return this.http.get(this.setsUrl + "/" + id)
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
        return this.http.get(this.setsUrl + "/activate/" + id)
            .toPromise()
            .then(response => { });
    }
}
