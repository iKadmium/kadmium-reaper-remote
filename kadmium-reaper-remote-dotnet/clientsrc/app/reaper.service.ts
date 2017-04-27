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
}