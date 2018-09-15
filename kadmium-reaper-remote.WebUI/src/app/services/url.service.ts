import { Injectable } from '@angular/core';
import { LocationService } from './location.service';

@Injectable({
	providedIn: 'root'
})
export class UrlService
{
	constructor(private locationService: LocationService) { }

	private isNgServed(): boolean
	{
		return parseInt(this.locationService.getBaseUrl().port) == 4200;
	}

	public getUrl(controller: string, action?: string | null, id?: number | null | string): string
	{
		let protocol = this.locationService.getBaseUrl().protocol;
		let hostname = this.locationService.getBaseUrl().hostname;
		let port = this.isNgServed() ? 80 : this.locationService.getBaseUrl().port;
		let address = ["api", controller];
		if (action != null)
		{
			address.push(action);
		}
		if (id != null)
		{
			address.push(id.toString());
		}
		let urlAddress = protocol + "//" + hostname + ":" + port + "/" + address.join("/");
		return urlAddress;
	}
}
