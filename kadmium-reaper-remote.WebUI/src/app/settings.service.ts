import { Injectable } from '@angular/core';

import { SettingsData } from "./settings";
import { UrlService } from "./url.service";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SettingsService
{
    constructor(private http: HttpClient, private urlService: UrlService) { }

    public get(): Promise<SettingsData>
    {
        return this.http.get<SettingsData>(this.urlService.getUrl("Settings", null, null))
            .toPromise();
    }

    public save(data: SettingsData): Promise<void>
    {
        return this.http.put<void>(this.urlService.getUrl("Settings", null, null), data)
            .toPromise();
    }

}