import { Injectable } from '@angular/core';
import { Url } from 'url';

@Injectable({
	providedIn: 'root'
})
export class LocationService
{
	constructor() { }

	public getBaseUrl(): Url
	{
		return window.location;
	}
}
