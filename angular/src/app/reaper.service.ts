import { Injectable } from '@angular/core';

import { UrlService } from "./url.service";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReaperService
{
    constructor(private http: HttpClient, private urlService: UrlService) { }

    public runCommand(command: string): Promise<void>
    {
        return this.http.get(this.urlService.getUrl("Reaper", command, null))
            .toPromise()
            .then(response =>
            {

            });
    }

    public runCommands(commands: string[]): Promise<void>
    {
        return this.http.get(this.urlService.getUrl("Reaper", commands.join(";"), null))
            .toPromise()
            .then(response =>
            {

            });
    }
}

@Injectable()
export class MockReaperService extends ReaperService
{
    constructor()
    {
        super(null, null
        );
    }

    public runCommand(command: string): Promise<void>
    {
        return new Promise<void>(
            (resolve, reject) =>
            {
                resolve();
            }
        );
    }
}