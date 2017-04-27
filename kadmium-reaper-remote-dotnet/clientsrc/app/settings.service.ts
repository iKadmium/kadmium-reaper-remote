import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SettingsData } from "./settings";
import { UrlService } from "./url.service";

@Injectable()
export class SettingsService
{
  constructor(private http: Http, private urlService: UrlService) { }

  public get(): Promise<SettingsData>
  {
    return this.http.get(this.urlService.getUrl("Settings", null, null))
      .toPromise()
      .then(response =>
      {
        let data = (response.json() as SettingsData);
        return data;
      });
  }

  public save(data: SettingsData): Promise<void>
  {
    return this.http.put(this.urlService.getUrl("Settings", null, null), data)
      .toPromise()
      .then(response =>
      {
      });
  }

}
