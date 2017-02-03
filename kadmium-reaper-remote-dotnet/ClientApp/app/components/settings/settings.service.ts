import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SettingsData } from "./settings";

@Injectable()
export class SettingsService
{
    private settingsUrl = "/api/Settings";

    constructor(private http: Http) { }

    public get(): Promise<SettingsData>
    {
        return this.http.get(this.settingsUrl)
            .toPromise()
            .then(response =>
            {
                let data = (response.json() as SettingsData);
                return data;
            })
            .catch(this.handleError);
    }

    public save(data: SettingsData): Promise<void>
    {
        return this.http.put(this.settingsUrl, data)
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