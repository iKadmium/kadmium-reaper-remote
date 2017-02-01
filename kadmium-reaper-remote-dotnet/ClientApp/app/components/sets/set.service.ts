import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Set, SetData } from "./set";
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

            })
            .catch(this.handleError);
    }

    public putSet(set: Set): Promise<void>
    {
        return this.http.put(this.setsUrl + "/" + set.originalDate.toISOString(), set.serialize())
            .toPromise()
            .then(response => { return; })
            .catch(this.handleError);
    }

    public removeSet(set: Set): Promise<void>
    {
        return this.http.delete(this.setsUrl + "/" + set.originalDate.toISOString())
            .toPromise()
            .then(response => { return; })
            .catch(this.handleError);
    }

    public getSets(songs: Song[]): Promise<Set[]>
    {
        return this.http.get(this.setsUrl)
            .toPromise()
            .then(response =>
            {
                let data = (response.json() as SetData[]);
                return data.map((value: SetData) => new Set().load(songs, value));
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> 
    {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
