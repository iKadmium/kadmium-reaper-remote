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

            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> 
    {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}