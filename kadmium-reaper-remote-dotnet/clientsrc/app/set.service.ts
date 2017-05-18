import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Set, SetData, SetSkeletonData, SetSkeleton } from "./set";
import { Song, SongData } from "./song";
import { UrlService } from "./url.service";

@Injectable()
export class SetService
{
    constructor(private http: Http, private urlService: UrlService) { }

    public postSet(set: Set): Promise<number>
    {
        return this.http.post(this.urlService.getUrl("Set", null, null), set.serialize())
            .toPromise()
            .then(response =>
            {
                return response.json() as number;

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

    public getSets(): Promise<SetSkeletonData[]>
    {
        return this.http.get(this.urlService.getUrl("Set", null, null))
            .toPromise()
            .then(response =>
            {
                let data = (response.json() as SetSkeletonData[]);
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

    public activateVenue(venue: string): Promise<void>
    {
        return this.http.get(this.urlService.getUrl("Set", "activate", venue))
            .toPromise()
            .then(response => { });
    }

}

@Injectable()
export class MockSetService extends SetService
{
    private sets: SetData[];
    private songs: SongData[];

    constructor()
    {
        super(null, null);
        this.songs = [
            {
                command: "12345",
                duration: "6MM3SS",
                id: 1,
                name: "Mock Song"
            }
        ];
        this.sets = [
            {
                date: "04/01/1987",
                songs: [this.songs[0]],
                id: 1,
                venue: "Mock Venue"
            }
        ];
    }

    public getSets(): Promise<SetSkeletonData[]>
    {
        return new Promise<SetSkeletonData[]>(
            (resolve, reject) =>
            {
                resolve(
                    this.sets.map(x =>
                    {
                        let skeleton: SetSkeletonData = {
                            date: x.date,
                            id: x.id,
                            venue: x.venue
                        };
                        return skeleton;
                    })
                );
            }
        );
    }

    public getSet(id: number): Promise<Set>
    {
        return new Promise<Set>(
            (resolve, reject) => 
            {
                let data = this.sets.find(x => x.id == id);
                let set = new Set().load(this.songs.map(x => new Song().load(x)), data);
                resolve(set);
            }
        );
    }

    public postSet(set: Set): Promise<number>
    {
        return new Promise<number>(
            (resolve, reject) => 
            {
                let data = set.serialize();
                data.id = this.sets.length;
                this.sets.push(data);
                resolve(data.id);
            }
        );
    }

    public putSet(set: Set): Promise<void>
    {
        return new Promise<void>(
            (resolve, reject) =>
            {
                let index = this.sets.findIndex(x => x.id == set.id);
                this.sets.splice(index, 1);
                this.sets.push(set.serialize());
            }
        );
    }

    public removeSet(set: SetSkeleton): Promise<void>
    {
        return new Promise<void>(
            (resolve, reject) =>
            {
                let index = this.sets.findIndex(x => x.id == set.id);
                this.sets.splice(index, 1);
            }
        );
    }
}