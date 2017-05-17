import { Injectable } from '@angular/core';

@Injectable()
export class UrlService
{
  private ngServed: boolean;

  constructor()
  {
    this.ngServed = parseInt(window.location.port) == 4200;
  }

  getUrl(controller: string, action: string | null, id: number | null | string): string
  {
    let protocol = window.location.protocol;
    let hostname = window.location.hostname;
    let port = this.ngServed ? 80 : window.location.port;
    let address = ["api", controller];
    if (action != null)
    {
      address.push(action);
    }
    if (id != null)
    {
      address.push(id.toString());
    }
    let url = protocol + "//" + hostname + ":" + port + "/" + address.join("/");
    return url;
  }
}
