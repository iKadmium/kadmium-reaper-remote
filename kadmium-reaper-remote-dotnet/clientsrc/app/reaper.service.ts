import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UrlService } from "./url.service";

@Injectable()
export class ReaperService
{
    constructor(private http: Http, private urlService: UrlService) { }

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