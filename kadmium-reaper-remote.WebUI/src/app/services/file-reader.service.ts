import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class FileReaderService
{
	constructor() { }

	public async readAsText(file: File): Promise<string>
	{
		return new Promise<string>((resolve, reject) =>
		{
			let reader = new FileReader();
			reader.onload = (event: any) =>
			{
				let data: string = event.target.result;
				resolve(data);
			}
			reader.readAsText(file);
		});
	}

	public async deserialize<T>(file: File): Promise<T>
	{
		let text = await this.readAsText(file);
		let deserialized = JSON.parse(text) as T;
		return deserialized;
	}
}
