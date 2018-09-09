import { Injectable } from '@angular/core';

import { SettingsData } from "./settings";
import { UrlService } from "./url.service";
import { HttpClient } from '@angular/common/http';

@Injectable()
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

@Injectable()
export class MockSettingsService extends SettingsService
{
    private data: SettingsData;
    constructor()
    {
        super(null, null);
        this.data = {
            httpPort: 80,
            lightingVenueURI: "http://localhost:5000/api/Venue/ActivateByName",
            reaperURI: "http://localhost:9080/live.html"
        };
    }

    public get(): Promise<SettingsData>
    {
        return new Promise<SettingsData>(
            (resolve, reject) =>
            {
                resolve(this.data);
            }
        );
    }

    public save(data: SettingsData): Promise<void>
    {
        return new Promise<void>(
            (resolve, reject) =>
            {
                this.data = data;
                resolve();
            });
    }

}
