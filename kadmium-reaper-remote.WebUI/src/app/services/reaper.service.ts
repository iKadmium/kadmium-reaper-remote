import { Injectable } from '@angular/core';

import { UrlService } from "./url.service";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ReaperService
{
    constructor(private http: HttpClient, private urlService: UrlService) { }

    public runCommand(command: string): Promise<void>
    {
        return this.http
            .post(this.urlService.getUrl("Reaper", command, null), null)
            .toPromise()
            .then(response =>
            {

            });
    }
}

export const ReaperCommands = {
    OpenNewTab: '40859',
    CloseAllTabs: '40886'
}