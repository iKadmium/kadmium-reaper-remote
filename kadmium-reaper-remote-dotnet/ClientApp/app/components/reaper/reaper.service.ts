import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReaperService
{
    private reaperUrl = "/api/Reaper";
    constructor(private http: Http) { }

    public runCommand(command: string): Promise<void>
    {
        return this.http.get(this.reaperUrl + "/" + command)
            .toPromise()
            .then(response =>
            {

            });
    }
}